import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { ClientSession, Connection } from 'mongoose';

@Injectable()
export class TransactionManager {
  constructor(@InjectConnection() private readonly connection: Connection) {}
  private readonly logger = new Logger('Transaction');
  /**
   * Executes a given function within a MongoDB transaction.
   * @param fn The function to execute, which receives the transaction session.
   * @returns The result of the executed function.
   */
  async runInTransaction<T>(
    fn: (session: ClientSession) => Promise<T>,
  ): Promise<T> {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const result = await fn(session);
      await session.commitTransaction();
      this.logger.log('Transaction committed successfully');
      return result;
    } catch (error) {
      await session.abortTransaction();
      this.logger.error('Transaction aborted due to an error', error.stack);
      throw error;
    } finally {
      session.endSession();
      this.logger.log('Transaction session ended');
    }
  }
}
