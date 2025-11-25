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
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
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
  @HttpCode(200)
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
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
