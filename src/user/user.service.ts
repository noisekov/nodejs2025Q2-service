import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserMapper } from 'src/shared/mapper/UserMapper';

@Injectable()
export class UserService {
  mapper: UserMapper;
  constructor() {
    this.mapper = new UserMapper();
  }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return this.mapper.findAll();
  }

  findOne(id: number) {
    const userData = this.mapper.findOne(id);

    if (!userData) {
      throw new Error('User not found');
    }

    return userData;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
