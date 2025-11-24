import { User } from 'src/types/types';
import { DataBase } from '../db/db';

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

  findOne(id: number) {
    const data = Object.values(this.db.getData())[this.USERS_KEY];

    return data.find((user: User) => user.id === `${id}`);
  }
}
