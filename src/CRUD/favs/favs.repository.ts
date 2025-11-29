// import { isValidUUID } from 'src/utils/validateUUID';
import { DataBase } from 'src/db/db';
import { Favorites, Track } from 'src/types/types';

export class FavsRepository {
  db: DataBase;
  FAVS_KEY = 4;
  TRACKS_KEY = 2;
  constructor() {
    this.db = DataBase.instance;
  }

  findAll() {
    const data = Object.values(this.db.getData())[this.FAVS_KEY];

    return data;
  }

  createTrack(id: string) {
    const data = Object.values(this.db.getData());
    const dataFavs = data[this.FAVS_KEY] as Favorites;
    const dataTracks = data[this.TRACKS_KEY] as Track[];
    const track = dataTracks.find((track: Track) => track.id === id);

    if (!track) {
      return;
    }

    dataFavs.tracks.push(track);

    return dataFavs;
  }
}
