import { CreateArtistDto } from 'src/CRUD/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/CRUD/artist/dto/update-artist.dto';
import { Album, Artist, Track } from 'src/types/types';
import { randomUUID } from 'crypto';
import { isValidUUID } from 'src/utils/validateUUID';
import { DataBase } from 'src/db/db';

export class ArtistRepository {
  db: DataBase;
  ARTIST_KEY = 1;
  ALBUM_KEY = 3;
  TRACKS_KEY = 2;
  constructor() {
    this.db = DataBase.instance;
  }

  findAll() {
    const data = Object.values(this.db.getData())[this.ARTIST_KEY];

    return data;
  }

  findOne(id: string) {
    const data = Object.values(this.db.getData())[this.ARTIST_KEY] as Artist[];

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

    const data = Object.values(this.db.getData());
    const dataArtists = data[this.ARTIST_KEY] as Artist[];
    const artistData = dataArtists.findIndex(
      (Artist: Artist) => Artist.id === id,
    );

    if (artistData === -1) {
      throw new Error('Artist not found');
    }

    [
      ...(data[this.ALBUM_KEY] as Album[]),
      ...(data[this.TRACKS_KEY] as Track[]),
    ]
      .filter((album: Album | Track) => album.artistId === id)
      .forEach((album: Album | Track) => (album.artistId = null));

    dataArtists.splice(artistData, 1);
  }
}
