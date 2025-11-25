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
          id: '42314748-f37b-498c-92d6-0b435ae8b0ef',
          login: 'string',
          password: 'string',
          version: 1,
          createdAt: 1764019484517,
          updatedAt: 1764019484517,
        },
        {
          id: '42314748-f37b-498c-92d6-0b435ae8b0ea',
          login: 'string',
          password: 'string',
          version: 1,
          createdAt: 1764091562670,
          updatedAt: 1764091562670,
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
          id: '42314748-f37b-498c-92d6-0b435ae8b0ef',
          name: 'La la la',
          artistId: null,
          albumId: null,
          duration: 300,
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
