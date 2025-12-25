import { DataBase } from 'src/db/db';
import { Album, Artist, Favorites, Track } from 'src/types/types';
import { mappingFields } from 'src/utils/mappingFields';
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
    const data = this.db.getData();
    const dataValues = Object.values(data);
    const dataFavs = dataValues[this.FAVS_KEY] as Favorites;

    return mappingFields(data, dataFavs);
  }

  createTrack(id: string) {
    if (!isValidUUID(id)) {
      throw new Error('Invalid id');
    }

    const data = this.db.getData();
    const dataValues = Object.values(data);
    const dataFavs = dataValues[this.FAVS_KEY] as Favorites;
    const dataTracks = dataValues[this.TRACKS_KEY] as Track[];
    const track = dataTracks.find((track: Track) => track.id === id);

    if (!track) {
      throw new Error('UNPROCESSABLE_ENTITY');
    }

    dataFavs.tracks.push(track.id);

    return mappingFields(data, dataFavs);
  }

  removeTrack(id: string) {
    if (!isValidUUID(id)) {
      throw new Error('Invalid id');
    }

    const data = Object.values(this.db.getData())[this.FAVS_KEY] as Favorites;
    const trackIndex = data.tracks.findIndex(
      (trackId: Track['id']) => trackId === id,
    );

    if (trackIndex === -1) {
      throw new Error('Data not found');
    }

    data.tracks.splice(trackIndex, 1);
  }

  createAlbum(id: string) {
    if (!isValidUUID(id)) {
      throw new Error('Invalid id');
    }

    const data = this.db.getData();
    const dataValues = Object.values(data);
    const dataFavs = dataValues[this.FAVS_KEY] as Favorites;
    const dataAlbums = dataValues[this.ALBUM_KEY] as Album[];
    const album = dataAlbums.find((album: Album) => album.id === id);

    if (!album) {
      throw new Error('UNPROCESSABLE_ENTITY');
    }

    dataFavs.albums.push(album.id);

    return mappingFields(data, dataFavs);
  }

  removeAlbum(id: string) {
    if (!isValidUUID(id)) {
      throw new Error('Invalid id');
    }

    const data = Object.values(this.db.getData())[this.FAVS_KEY] as Favorites;
    const albumIndex = data.albums.findIndex(
      (albumId: Album['id']) => albumId === id,
    );

    if (albumIndex === -1) {
      throw new Error('Data not found');
    }

    data.albums.splice(albumIndex, 1);
  }

  createArtist(id: string) {
    if (!isValidUUID(id)) {
      throw new Error('Invalid id');
    }

    const data = this.db.getData();
    const dataValues = Object.values(data);
    const dataFavs = dataValues[this.FAVS_KEY] as Favorites;
    const dataArtists = dataValues[this.ARTIST_KEY] as Artist[];
    const artist = dataArtists.find((artist: Artist) => artist.id === id);

    if (!artist) {
      throw new Error('UNPROCESSABLE_ENTITY');
    }

    dataFavs.artists.push(artist.id);

    return mappingFields(data, dataFavs);
  }

  removeArtist(id: string) {
    if (!isValidUUID(id)) {
      throw new Error('Invalid id');
    }

    const data = Object.values(this.db.getData())[this.FAVS_KEY] as Favorites;
    const artistsIndex = data.artists.findIndex(
      (artistId: Artist['id']) => artistId === id,
    );

    if (artistsIndex === -1) {
      throw new Error('Data not found');
    }

    data.artists.splice(artistsIndex, 1);
  }
}
