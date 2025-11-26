import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  status: object;
  constructor(private readonly albumService: AlbumService) {
    this.status = {
      'Album not found': HttpStatus.NOT_FOUND,
      'Invalid id': HttpStatus.BAD_REQUEST,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    try {
      return this.albumService.findOne(id);
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
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    try {
      return this.albumService.update(id, updateAlbumDto);
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
      return this.albumService.remove(id);
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
