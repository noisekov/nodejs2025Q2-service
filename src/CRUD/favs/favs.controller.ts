import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  status: object;
  constructor(private readonly favsService: FavsService) {
    this.status = {
      'Invalid id': HttpStatus.BAD_REQUEST,
      UNPROCESSABLE_ENTITY: HttpStatus.UNPROCESSABLE_ENTITY,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.favsService.findAll();
  }

  @Post('/track/:id')
  @HttpCode(HttpStatus.CREATED)
  createTrack(@Param('id') id: string) {
    try {
      return this.favsService.createTrack(id);
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

  @Post('/album/:id')
  @HttpCode(HttpStatus.CREATED)
  createAlbum(@Param('id') id: string) {
    try {
      return this.favsService.createAlbum(id);
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

  @Post('/artist/:id')
  @HttpCode(HttpStatus.CREATED)
  createArtist(@Param('id') id: string) {
    try {
      return this.favsService.createArtist(id);
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

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.favsService.remove(id);
  }
}
