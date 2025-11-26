import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserMapper } from 'src/shared/mapper/UserMapper';
import { isValidUUID } from 'src/utils/validateUUID';

@Injectable()
export class UserService {
  mapper: UserMapper;

  constructor() {
    this.mapper = new UserMapper();
  }
  create(createUserDto: CreateUserDto) {
    return this.mapper.create(createUserDto);
  }

  findAll() {
    return this.mapper.findAll();
  }

  findOne(id: string) {
    const userData = this.mapper.findOne(id);

    if (!isValidUUID(id)) {
      throw new Error('Invalid id');
    }

    if (!userData) {
      throw new Error('User not found');
    }

    return userData;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.mapper.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.mapper.remove(id);
  }
}
