import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavsService } from '../favs/favs.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, PrismaService, FavsService],
})
export class AlbumModule {}
