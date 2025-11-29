import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from 'src/shared/mapper/AlbumRepository';
import { isValidUUID } from 'src/utils/validateUUID';

@Injectable()
export class AlbumService {
  mapper: AlbumRepository;
  constructor() {
    this.mapper = new AlbumRepository();
  }

  create(createAlbumDto: CreateAlbumDto) {
    return this.mapper.create(createAlbumDto);
  }

  findAll() {
    return this.mapper.findAll();
  }

  findOne(id: string) {
    if (!isValidUUID(id)) {
      throw new Error('Invalid id');
    }

    const albumData = this.mapper.findOne(id);

    if (!albumData) {
      throw new Error('Album not found');
    }

    return albumData;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.mapper.update(id, updateAlbumDto);
  }

  remove(id: string) {
    return this.mapper.remove(id);
  }
}
