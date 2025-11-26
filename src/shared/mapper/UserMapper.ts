import { User } from 'src/types/types';
import { DataBase } from '../db/db';
import { CreateUserDto } from 'src/CRUD/user/dto/create-user.dto';
import { randomUUID } from 'crypto';
import { UpdateUserDto } from 'src/CRUD/user/dto/update-user.dto';
import { isValidUUID } from 'src/utils/validateUUID';

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

  update(id: string, updateUserDto: UpdateUserDto) {
    const data = Object.values(this.db.getData())[this.USERS_KEY] as User[];
    const userData = data.find((user: User) => user.id === id);
    const { oldPassword, newPassword } = updateUserDto;

    if (oldPassword !== userData.password) {
      throw new Error('Invalid password');
    }

    if (oldPassword === newPassword) {
      throw new Error('Password is the same');
    }

    const newDataUser = Object.assign(
      userData,
      { password: newPassword },
      {
        version: userData.version + 1,
        updatedAt: Date.now(),
      },
    );

    return newDataUser;
  }

  remove(id: string) {
    if (!isValidUUID(id)) {
      throw new Error('Invalid id');
    }

    const data = Object.values(this.db.getData())[this.USERS_KEY] as User[];
    const userData = data.indexOf(data.find((user: User) => user.id === id));

    if (userData === -1) {
      throw new Error('User not found');
    }

    return data.splice(userData, 1);
  }
}
