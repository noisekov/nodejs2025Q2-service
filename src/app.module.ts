import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './CRUD/user/user.module';
import { TrackModule } from './CRUD/track/track.module';
import { ArtistModule } from './CRUD/artist/artist.module';
import { AlbumModule } from './CRUD/album/album.module';

@Module({
  imports: [UserModule, TrackModule, ArtistModule, AlbumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
