import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserMapper } from 'src/shared/mapper/UserMapper';

@Injectable()
export class UserService {
  mapper: UserMapper;
  UUID_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
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

    if (!this.UUID_REGEX.test(`${id}`)) {
      throw new Error('Invalid id');
    }

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
