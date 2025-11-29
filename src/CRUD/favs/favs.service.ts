import { Injectable } from '@nestjs/common';
import { CreateFavDto } from './dto/create-fav.dto';
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

  createTrack(createFavDto: CreateFavDto) {
    return this.mapper.createTrack(createFavDto);
  }

  remove(id: string) {
    return `This action removes a #${id} fav`;
  }
}
