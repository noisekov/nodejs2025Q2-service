import { DataBase } from 'src/db/db';
import { Album, Artist, Favorites, Track } from 'src/types/types';
import { isValidUUID } from 'src/utils/validateUUID';

export class FavsRepository {
  db: DataBase;
  FAVS_KEY = 4;
  TRACKS_KEY = 2;
  ALBUM_KEY = 3;
  ARTIST_KEY = 1;
  constructor() {
    this.db = DataBase.instance;
  }

  findAll() {
    const data = Object.values(this.db.getData())[this.FAVS_KEY];

    return data;
  }

  createTrack(id: string) {
    if (!isValidUUID(id)) {
      throw new Error('Invalid id');
    }

    const data = Object.values(this.db.getData());
    const dataFavs = data[this.FAVS_KEY] as Favorites;
    const dataTracks = data[this.TRACKS_KEY] as Track[];
    const track = dataTracks.find((track: Track) => track.id === id);

    if (!track) {
      throw new Error('UNPROCESSABLE_ENTITY');
    }

    dataFavs.tracks.push(track);

    return dataFavs;
  }

  createAlbum(id: string) {
    if (!isValidUUID(id)) {
      throw new Error('Invalid id');
    }

    const data = Object.values(this.db.getData());
    const dataFavs = data[this.FAVS_KEY] as Favorites;
    const dataAlbums = data[this.ALBUM_KEY] as Album[];
    const album = dataAlbums.find((album: Album) => album.id === id);

    if (!album) {
      throw new Error('UNPROCESSABLE_ENTITY');
    }

    dataFavs.albums.push(album);

    return dataFavs;
  }

  createArtist(id: string) {
    if (!isValidUUID(id)) {
      throw new Error('Invalid id');
    }

    const data = Object.values(this.db.getData());
    const dataFavs = data[this.FAVS_KEY] as Favorites;
    const dataArtists = data[this.ARTIST_KEY] as Artist[];
    const artist = dataArtists.find((artist: Artist) => artist.id === id);

    if (!artist) {
      throw new Error('UNPROCESSABLE_ENTITY');
    }

    dataFavs.artists.push(artist);

    return dataFavs;
  }
}
