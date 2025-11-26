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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.artistService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    try {
      return this.artistService.update(id, updateArtistDto);
    } catch (error) {
      const { message } = error;
      const STATUS = {
        'Artist not found': HttpStatus.NOT_FOUND,
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

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    try {
      return this.artistService.remove(id);
    } catch (error) {
      const { message } = error;
      const STATUS = {
        'Artist not found': HttpStatus.NOT_FOUND,
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
