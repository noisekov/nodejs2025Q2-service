import { User } from 'src/types/types';
import { DataBase } from '../db/db';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { randomUUID } from 'crypto';

export class UserMapper {
  db: DataBase;
  USERS_KEY = 0;
  constructor() {
    this.db = DataBase.instance;
  }

  findAll() {
    const data = Object.values(this.db.getData())[this.USERS_KEY];

    return data;
  }

  findOne(id: string) {
    const data = Object.values(this.db.getData())[this.USERS_KEY];

    return data.find((user: User) => user.id === id);
  }

  create(createUserDto: CreateUserDto) {
    const data = Object.values(this.db.getData())[this.USERS_KEY] as User[];
    const { login, password } = createUserDto;

    const userData = {
      id: randomUUID(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    data.push(userData);
  }
}
