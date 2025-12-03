import { User } from 'src/types/types';
import { CreateUserDto } from 'src/CRUD/user/dto/create-user.dto';
import { randomUUID } from 'crypto';
import { UpdateUserDto } from 'src/CRUD/user/dto/update-user.dto';
import { isValidUUID } from 'src/utils/validateUUID';
import { DataBase } from 'src/db/db';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

export class UserRepository {
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
    const data = Object.values(this.db.getData())[this.USERS_KEY] as User[];

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
    const { password: _, ...userDataWithoutPassword } = userData;
    void _;

    return userDataWithoutPassword;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }

    const data = Object.values(this.db.getData())[this.USERS_KEY] as User[];
    const userData = data.find((user: User) => user.id === id);

    if (!userData) {
      throw new NotFoundException('User not found');
    }

    const { oldPassword, newPassword } = updateUserDto;

    if (oldPassword !== userData.password) {
      throw new ForbiddenException('Invalid password');
    }

    if (oldPassword === newPassword) {
      throw new ForbiddenException('Password is the same');
    }

    const newDataUser = Object.assign(
      userData,
      { password: newPassword },
      {
        version: userData.version + 1,
        updatedAt: Date.now(),
      },
    );

    const { password: _, ...userDataWithoutPassword } = newDataUser;
    void _;

    return userDataWithoutPassword;
  }

  remove(id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }

    const data = Object.values(this.db.getData())[this.USERS_KEY] as User[];
    const userData = data.findIndex((user: User) => user.id === id);

    if (userData === -1) {
      throw new NotFoundException('User not found');
    }

    data.splice(userData, 1);
  }
}
