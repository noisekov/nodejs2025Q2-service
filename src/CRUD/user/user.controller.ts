import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  status: object;
  constructor(private readonly userService: UserService) {
    this.status = {
      'User not found': HttpStatus.NOT_FOUND,
      'Invalid id': HttpStatus.BAD_REQUEST,
      'Password is the same': HttpStatus.FORBIDDEN,
      'Invalid password': HttpStatus.FORBIDDEN,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    try {
      return this.userService.findOne(id);
    } catch (error) {
      const { message } = error;

      throw new HttpException(
        {
          status: this.status[message],
          error: message,
        },
        this.status[message],
        {
          cause: error,
        },
      );
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.userService.update(id, updateUserDto);
    } catch (error) {
      const { message } = error;

      throw new HttpException(
        {
          status: this.status[message],
          error: message,
        },
        this.status[message],
        {
          cause: error,
        },
      );
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    try {
      return this.userService.remove(id);
    } catch (error) {
      const { message } = error;

      throw new HttpException(
        {
          status: this.status[message],
          error: message,
        },
        this.status[message],
        {
          cause: error,
        },
      );
    }
  }
}
