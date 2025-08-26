import { Global, Module } from '@nestjs/common';
import { TransactionManager } from './transaction/transaction.manager';
import { TransformInterceptor } from './interceptors/transform.interceptor';

// Mark this module as global so its providers are available throughout the application
@Global()
@Module({
  providers: [TransactionManager, TransformInterceptor],
  exports: [TransactionManager, TransformInterceptor],
})
export class CommonModule {}
