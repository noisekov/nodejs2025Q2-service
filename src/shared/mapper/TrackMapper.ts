import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { DataBase } from '../db/db';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import { Track } from 'src/types/types';
import { randomUUID } from 'crypto';
import { isValidUUID } from 'src/utils/validateUUID';

export class TrackMapper {
  db: DataBase;
  TRACKS_KEY = 2;
  constructor() {
    this.db = DataBase.instance;
  }

  findAll() {
    const data = Object.values(this.db.getData())[this.TRACKS_KEY];

    return data;
  }

  findOne(id: string) {
    const data = Object.values(this.db.getData())[this.TRACKS_KEY];

    return data.find((track: Track) => track.id === id);
  }

  create(createTrackDto: CreateTrackDto) {
    const data = Object.values(this.db.getData())[this.TRACKS_KEY] as Track[];
    const { name, artistId, albumId, duration } = createTrackDto;
    const trackData = {
      id: randomUUID(),
      name,
      artistId,
      albumId,
      duration,
    };

    data.push(trackData);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const data = Object.values(this.db.getData())[this.TRACKS_KEY] as Track[];
    const trackData = data.find((track: Track) => track.id === id);
    const newDataTrack = Object.assign(trackData, updateTrackDto);

    return newDataTrack;
  }

  remove(id: string) {
    if (!isValidUUID(id)) {
      throw new Error('Invalid id');
    }

    const data = Object.values(this.db.getData())[this.TRACKS_KEY] as Track[];
    const trackData = data.indexOf(
      data.find((track: Track) => track.id === id),
    );

    if (trackData === -1) {
      throw new Error('Track not found');
    }

    return data.splice(trackData, 1);
  }
}
