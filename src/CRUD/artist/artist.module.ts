import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavsService } from '../favs/favs.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, PrismaService, FavsService],
})
export class ArtistModule {}
