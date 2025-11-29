import { CreateArtistDto } from 'src/CRUD/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/CRUD/artist/dto/update-artist.dto';
import { Artist } from 'src/types/types';
import { randomUUID } from 'crypto';
import { isValidUUID } from 'src/utils/validateUUID';
import { DataBase } from 'src/db/db';

export class ArtistRepository {
  db: DataBase;
  ARTIST_KEY = 1;
  constructor() {
    this.db = DataBase.instance;
  }

  findAll() {
    const data = Object.values(this.db.getData())[this.ARTIST_KEY];

    return data;
  }

  findOne(id: string) {
    const data = Object.values(this.db.getData())[this.ARTIST_KEY];

    return data.find((Artist: Artist) => Artist.id === id);
  }

  create(createArtistDto: CreateArtistDto) {
    const data = Object.values(this.db.getData())[this.ARTIST_KEY] as Artist[];
    const { name, grammy } = createArtistDto;
    const artistData = {
      id: randomUUID(),
      name,
      grammy,
    };

    data.push(artistData);

    return artistData;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!isValidUUID(id)) {
      throw new Error('Invalid id');
    }

    const data = Object.values(this.db.getData())[this.ARTIST_KEY] as Artist[];
    const artistData = data.find((Artist: Artist) => Artist.id === id);

    if (!artistData) {
      throw new Error('Artist not found');
    }

    const newDataArtist = Object.assign(artistData, updateArtistDto);

    return newDataArtist;
  }

  remove(id: string) {
    if (!isValidUUID(id)) {
      throw new Error('Invalid id');
    }

    const data = Object.values(this.db.getData())[this.ARTIST_KEY] as Artist[];
    const artistData = data.indexOf(
      data.find((Artist: Artist) => Artist.id === id),
    );

    if (artistData === -1) {
      throw new Error('Artist not found');
    }

    return data.splice(artistData, 1);
  }
}
