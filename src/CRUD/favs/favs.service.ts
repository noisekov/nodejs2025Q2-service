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

  createAlbum(id: string) {
    return this.mapper.createAlbum(id);
  }

  createArtist(id: string) {
    return this.mapper.createArtist(id);
  }

  remove(id: string) {
    return `This action removes a #${id} fav`;
  }
}
