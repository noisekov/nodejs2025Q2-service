import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
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
      return this.userService.findOne(+id);
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
