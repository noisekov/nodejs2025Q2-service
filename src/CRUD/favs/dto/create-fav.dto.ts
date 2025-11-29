import { IsNotEmpty } from 'class-validator';
import { Album, Artist, Track } from 'src/types/types';

export class CreateFavDto {
  @IsNotEmpty()
  artists?: Album;

  @IsNotEmpty()
  albums?: Artist;

  @IsNotEmpty()
  tracks?: Track;
}
