import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumMapper } from 'src/shared/mapper/AlbumMapper';
import { isValidUUID } from 'src/utils/validateUUID';

@Injectable()
export class AlbumService {
  mapper: AlbumMapper;
  constructor() {
    this.mapper = new AlbumMapper();
  }

  create(createAlbumDto: CreateAlbumDto) {
    return this.mapper.create(createAlbumDto);
  }

  findAll() {
    return this.mapper.findAll();
  }

  findOne(id: string) {
    const albumData = this.mapper.findOne(id);

    if (!isValidUUID(id)) {
      throw new Error('Invalid id');
    }

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
