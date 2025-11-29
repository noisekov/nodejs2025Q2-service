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
      'Data not found': HttpStatus.NOT_FOUND,
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

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id') id: string) {
    return this.favsService.removeTrack(id);
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

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id') id: string) {
    return this.favsService.removeAlbum(id);
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

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id') id: string) {
    return this.favsService.removeArtist(id);
  }
}
