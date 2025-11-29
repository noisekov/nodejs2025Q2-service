import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from 'src/shared/mapper/UserRepository';
import { isValidUUID } from 'src/utils/validateUUID';

@Injectable()
export class UserService {
  mapper: UserRepository;

  constructor() {
    this.mapper = new UserRepository();
  }
  create(createUserDto: CreateUserDto) {
    return this.mapper.create(createUserDto);
  }

  findAll() {
    return this.mapper.findAll();
  }

  findOne(id: string) {
    if (!isValidUUID(id)) {
      throw new Error('Invalid id');
    }

    const userData = this.mapper.findOne(id);

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
