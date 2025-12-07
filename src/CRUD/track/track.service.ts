import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { isValidUUID } from 'src/utils/validateUUID';
import { PrismaService } from 'src/prisma/prisma.service';
import { randomUUID } from 'crypto';
import { FavsService } from 'src/CRUD/favs/favs.service';

@Injectable()
export class TrackService {
  selectData = {
    id: true,
    name: true,
    artistId: true,
    albumId: true,
    duration: true,
  };

  constructor(
    private prisma: PrismaService,
    private favsService: FavsService,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const { name, artistId, albumId, duration } = createTrackDto;

    if (artistId) {
      const artist = await this.prisma.artist.findUnique({
        where: { id: artistId },
      });

      if (!artist) {
        throw new BadRequestException('Artist not found');
      }
    }

    if (albumId) {
      const album = await this.prisma.album.findUnique({
        where: { id: albumId },
      });

      if (!album) {
        throw new BadRequestException('Album not found');
      }
    }

    const trackData = await this.prisma.track.create({
      data: {
        id: randomUUID(),
        name,
        duration,
        artistId: artistId || null,
        albumId: albumId || null,
      },
      select: this.selectData,
    });

    return trackData;
  }

  async findAll() {
    const tracks = await this.prisma.track.findMany({
      select: this.selectData,
    });

    return tracks;
  }

  async findOne(id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }

    const trackData = await this.prisma.track.findUnique({
      where: { id },
      select: this.selectData,
    });

    if (!trackData) {
      throw new NotFoundException('Track not found');
    }

    return trackData;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }

    const track = await this.prisma.track.findUnique({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    if (updateTrackDto.artistId) {
      const artist = await this.prisma.artist.findUnique({
        where: { id: updateTrackDto.artistId },
      });

      if (!artist) {
        throw new BadRequestException('Artist not found');
      }
    }

    if (updateTrackDto.albumId) {
      const album = await this.prisma.album.findUnique({
        where: { id: updateTrackDto.albumId },
      });

      if (!album) {
        throw new BadRequestException('Album not found');
      }
    }

    const updatedTrack = await this.prisma.track.update({
      where: { id },
      data: {
        ...updateTrackDto,
      },
      select: this.selectData,
    });

    return updatedTrack;
  }

  async remove(id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }

    const track = await this.prisma.track.findUnique({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    try {
      await this.favsService.removeTrack(id);
    } catch (error) {}
    await this.prisma.track.delete({
      where: { id },
    });
  }
}
