import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavsService } from '../favs/favs.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, PrismaService, FavsService],
})
export class TrackModule {}
