import { IDB } from 'src/types/types';

export class DataBase {
  static #instance: DataBase;
  data: IDB;

  private constructor() {
    this.data = {
      users: [],
      artists: [],
      track: [],
      album: [],
      favorites: {
        artists: [],
        albums: [],
        tracks: [],
      },
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
