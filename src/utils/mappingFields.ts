import { Album, Artist, Favorites, IDB, Track } from 'src/types/types';

export const mappingFields = (dataBase: IDB, favorites: Favorites) => {
  const resultFavs = {
    artists: [],
    albums: [],
    tracks: [],
  };
  const mapping = {
    artists: 'artists',
    albums: 'album',
    tracks: 'track',
  };

  for (const key in favorites) {
    const favoritesValue = favorites[key];
    const dataBaseValues = dataBase[mapping[key]];

    if (dataBaseValues.length) {
      const newFavValues = favoritesValue.map((favId: string) =>
        dataBaseValues.find(
          (dbEntity: Album | Artist | Track) => dbEntity.id === favId,
        ),
      );

      resultFavs[key] = newFavValues;

      continue;
    }

    resultFavs[key] = [];
  }

  return resultFavs;
};
