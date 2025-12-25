import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { isValidUUID } from 'src/utils/validateUUID';
import { ArtistRepository } from './artist.repository';

@Injectable()
export class ArtistService {
  mapper: ArtistRepository;
  constructor() {
    this.mapper = new ArtistRepository();
  }
  create(createArtistDto: CreateArtistDto) {
    return this.mapper.create(createArtistDto);
  }

  findAll() {
    return this.mapper.findAll();
  }

  findOne(id: string) {
    if (!isValidUUID(id)) {
      throw new Error('Invalid id');
    }

    const artistData = this.mapper.findOne(id);

    if (!artistData) {
      throw new Error('Artist not found');
    }

    return artistData;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.mapper.update(id, updateArtistDto);
  }

  remove(id: string) {
    return this.mapper.remove(id);
  }
}
