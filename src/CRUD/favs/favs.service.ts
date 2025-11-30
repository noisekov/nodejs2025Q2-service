import { Injectable } from '@nestjs/common';
import { FavsRepository } from './favs.repository';

@Injectable()
export class FavsService {
  mapper: FavsRepository;
  constructor() {
    this.mapper = new FavsRepository();
  }

  findAll() {
    return this.mapper.findAll();
  }

  createTrack(id: string) {
    return this.mapper.createTrack(id);
  }

  // removeTrack(id: string) {
  //   return this.mapper.removeTrack(id);
  // }

  createAlbum(id: string) {
    return this.mapper.createAlbum(id);
  }

  // removeAlbum(id: string) {
  //   return this.mapper.removeAlbum(id);
  // }

  createArtist(id: string) {
    return this.mapper.createArtist(id);
  }

  // removeArtist(id: string) {
  //   return this.mapper.removeArtist(id);
  // }
}
