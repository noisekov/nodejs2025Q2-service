// import { isValidUUID } from 'src/utils/validateUUID';
import { DataBase } from 'src/db/db';
import { Favorites } from 'src/types/types';
import { CreateFavDto } from './dto/create-fav.dto';

export class FavsRepository {
  db: DataBase;
  FAVS_KEY = 4;
  constructor() {
    this.db = DataBase.instance;
  }

  findAll() {
    const data = Object.values(this.db.getData())[this.FAVS_KEY];

    return data;
  }

  findOne(id: string) {
    console.log(id);
    // const data = Object.values(this.db.getData())[this.FAVS_KEY];

    // return data.find((favorites: Favorites) => favorites.id === id);
  }

  createTrack(createFavoritesDto: CreateFavDto) {
    const data = Object.values(this.db.getData())[this.FAVS_KEY] as Favorites;
    const { tracks } = createFavoritesDto;
    console.log(tracks);
    // data.tracks.push({ ...tracks });

    return data;
  }

  remove(id: string) {
    console.log(id);
    // if (!isValidUUID(id)) {
    //   throw new Error('Invalid id');
    // }
    // const data = Object.values(this.db.getData());
    // const dataFavoritess = data[this.FAVS_KEY] as Favorites[];
    // const FavoritesData = dataFavoritess.findIndex(
    //   (favorites: Favorites) => favorites.id === id,
    // );
    // if (FavoritesData === -1) {
    //   throw new Error('Favorites not found');
    // }
    // dataFavoritess.splice(FavoritesData, 1);
  }
}
