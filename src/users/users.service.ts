import { Injectable, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export class User {
  userId: number;
  username: string;
  password?: string;
}

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async onModuleInit() {
    const saltRounds = 10;
    for (const user of this.users) {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, saltRounds);
      }
    }
  }

  findOne(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }
}
