import { IsNotEmpty } from 'class-validator';
import { Album, Artist, Track } from 'src/types/types';

export class CreateFavDto {
  @IsNotEmpty()
  artists?: Album['id'][];

  @IsNotEmpty()
  albums?: Artist['id'][];

  @IsNotEmpty()
  tracks?: Track['id'][];
}
