import { Album, Artist, Favorites, Track, User } from 'src/types/types';

export class DataBase {
  static #instance: DataBase;
  data: {
    users: User[];
    artists: Artist[];
    track: Track[];
    album: Album[];
    favorites: Favorites[];
  };

  private constructor() {
    this.data = {
      users: [
        {
          id: '12',
          login: 'string',
          password: 'string',
          version: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      ],
      artists: [
        {
          id: 'string',
          name: 'string',
          grammy: true,
        },
      ],
      track: [
        {
          id: 'string',
          name: 'string',
          artistId: 'string',
          albumId: 'string',
          duration: 5,
        },
      ],
      album: [
        {
          id: 'string',
          name: 'string',
          year: 1,
          artistId: 'string',
        },
      ],
      favorites: [
        {
          artists: ['string'],
          albums: ['string'],
          tracks: ['string'],
        },
      ],
    };
  }

  public static get instance(): DataBase {
    if (!DataBase.#instance) {
      DataBase.#instance = new DataBase();
    }

    return DataBase.#instance;
  }

  getData() {
    return this.data;
  }
}
