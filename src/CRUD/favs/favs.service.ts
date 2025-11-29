import { Injectable } from '@nestjs/common';
import { CreateFavDto } from './dto/create-fav.dto';

@Injectable()
export class FavsService {
  findAll() {
    return `This action returns all favs`;
  }

  create(createFavDto: CreateFavDto) {
    return 'This action adds a new fav';
  }

  remove(id: string) {
    return `This action removes a #${id} fav`;
  }
}
