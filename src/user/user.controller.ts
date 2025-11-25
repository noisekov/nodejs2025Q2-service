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
  constructor(private readonly userService: UserService) {}

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
      const STATUS = {
        'User not found': HttpStatus.NOT_FOUND,
        'Invalid id': HttpStatus.BAD_REQUEST,
      };

      throw new HttpException(
        {
          status: STATUS[message],
          error: message,
        },
        STATUS[message],
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
      const STATUS = {
        'Password is the same': HttpStatus.NOT_FOUND,
        'Invalid password': HttpStatus.BAD_REQUEST,
      };

      throw new HttpException(
        {
          status: STATUS[message],
          error: message,
        },
        STATUS[message],
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
      const STATUS = {
        'User not found': HttpStatus.NOT_FOUND,
        'Invalid id': HttpStatus.BAD_REQUEST,
      };

      throw new HttpException(
        {
          status: STATUS[message],
          error: message,
        },
        STATUS[message],
        {
          cause: error,
        },
      );
    }
  }
}
