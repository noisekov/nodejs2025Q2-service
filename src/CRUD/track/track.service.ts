import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackMapper } from 'src/shared/mapper/TrackMapper';
import { isValidUUID } from 'src/utils/validateUUID';

@Injectable()
export class TrackService {
  mapper: TrackMapper;

  constructor() {
    this.mapper = new TrackMapper();
  }

  create(createTrackDto: CreateTrackDto) {
    return this.mapper.create(createTrackDto);
  }

  findAll() {
    return this.mapper.findAll();
  }

  findOne(id: string) {
    const trackData = this.mapper.findOne(id);

    if (!isValidUUID(id)) {
      throw new Error('Invalid id');
    }

    if (!trackData) {
      throw new Error('Track not found');
    }

    return trackData;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.mapper.update(id, updateTrackDto);
  }

  remove(id: string) {
    return this.mapper.remove(id);
  }
}
