import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  HttpException,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    try {
      return this.trackService.findOne(id);
    } catch (error) {
      const { message } = error;
      const STATUS = {
        'Track not found': HttpStatus.NOT_FOUND,
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
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    try {
      return this.trackService.remove(id);
    } catch (error) {
      const { message } = error;
      const STATUS = {
        'Track not found': HttpStatus.NOT_FOUND,
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
