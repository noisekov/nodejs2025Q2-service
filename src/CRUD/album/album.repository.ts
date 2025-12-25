import { CreateAlbumDto } from 'src/CRUD/Album/dto/create-Album.dto';
import { DataBase } from '../../db/db';
import { UpdateAlbumDto } from 'src/CRUD/Album/dto/update-Album.dto';
import { Album, Track } from 'src/types/types';
import { randomUUID } from 'crypto';
import { isValidUUID } from 'src/utils/validateUUID';
import { FavsRepository } from '../favs/favs.repository';

export class AlbumRepository {
  db: DataBase;
  ALBUM_KEY = 3;
  TRACKS_KEY = 2;
  constructor() {
    this.db = DataBase.instance;
  }

  findAll() {
    const data = Object.values(this.db.getData())[this.ALBUM_KEY];

    return data;
  }

  findOne(id: string) {
    const data = Object.values(this.db.getData())[this.ALBUM_KEY] as Album[];

    return data.find((album: Album) => album.id === id);
  }

  create(createAlbumDto: CreateAlbumDto) {
    const data = Object.values(this.db.getData())[this.ALBUM_KEY] as Album[];
    const { name, year, artistId } = createAlbumDto;
    const albumData = {
      id: randomUUID(),
      name,
      year,
      artistId,
    };

    data.push(albumData);

    return albumData;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!isValidUUID(id)) {
      throw new Error('Invalid id');
    }

    const data = Object.values(this.db.getData())[this.ALBUM_KEY] as Album[];
    const albumData = data.find((album: Album) => album.id === id);

    if (!albumData) {
      throw new Error('Album not found');
    }

    const newDataAlbum = Object.assign(albumData, updateAlbumDto);

    return newDataAlbum;
  }

  remove(id: string) {
    if (!isValidUUID(id)) {
      throw new Error('Invalid id');
    }

    const dataAlbum = Object.values(this.db.getData())[
      this.ALBUM_KEY
    ] as Album[];
    const albumData = dataAlbum.findIndex((album: Album) => album.id === id);

    if (albumData === -1) {
      throw new Error('Album not found');
    }

    const dataTrack = Object.values(this.db.getData())[
      this.TRACKS_KEY
    ] as Track[];
    const trackData = dataTrack.filter((track: Track) => track.albumId === id);
    trackData.forEach((track: Track) => (track.albumId = null));

    dataAlbum.splice(albumData, 1);
    new FavsRepository().removeAlbum(id);
  }
}
