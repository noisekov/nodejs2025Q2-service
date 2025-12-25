import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.favsService.findAll();
  }

  @Post('/track/:id')
  @HttpCode(HttpStatus.CREATED)
  createTrack(@Param('id') id: string) {
    return this.favsService.createTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id') id: string) {
    return this.favsService.removeTrack(id);
  }

  @Post('/album/:id')
  @HttpCode(HttpStatus.CREATED)
  createAlbum(@Param('id') id: string) {
    return this.favsService.createAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id') id: string) {
    return this.favsService.removeAlbum(id);
  }

  @Post('/artist/:id')
  @HttpCode(HttpStatus.CREATED)
  createArtist(@Param('id') id: string) {
    return this.favsService.createArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id') id: string) {
    return this.favsService.removeArtist(id);
  }
}
