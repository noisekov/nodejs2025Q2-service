import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { isValidUUID } from 'src/utils/validateUUID';
import { PrismaService } from 'src/prisma/prisma.service';
import { randomUUID } from 'crypto';
import { FavsService } from 'src/CRUD/favs/favs.service';

@Injectable()
export class ArtistService {
  selectData = {
    id: true,
    name: true,
    grammy: true,
    createdAt: true,
    updatedAt: true,
  };

  constructor(
    private prisma: PrismaService,
    private favsService: FavsService,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const { name, grammy } = createArtistDto;
    const now = BigInt(Date.now());

    const artistData = await this.prisma.artist.create({
      data: {
        id: randomUUID(),
        name,
        grammy: grammy || false,
        createdAt: now,
        updatedAt: now,
      },
      select: this.selectData,
    });

    return {
      ...artistData,
      createdAt: Number(artistData.createdAt),
      updatedAt: Number(artistData.updatedAt),
    };
  }

  async findAll() {
    const artists = await this.prisma.artist.findMany({
      select: this.selectData,
    });

    return artists.map((artist) => ({
      ...artist,
      createdAt: Number(artist.createdAt),
      updatedAt: Number(artist.updatedAt),
    }));
  }

  async findOne(id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }

    const artistData = await this.prisma.artist.findUnique({
      where: { id },
      select: this.selectData,
    });

    if (!artistData) {
      throw new NotFoundException('Artist not found');
    }

    return {
      ...artistData,
      createdAt: Number(artistData.createdAt),
      updatedAt: Number(artistData.updatedAt),
    };
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }

    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    const updatedArtist = await this.prisma.artist.update({
      where: { id },
      data: {
        ...updateArtistDto,
        updatedAt: BigInt(Date.now()),
      },
      select: this.selectData,
    });

    return {
      ...updatedArtist,
      createdAt: Number(updatedArtist.createdAt),
      updatedAt: Number(updatedArtist.updatedAt),
    };
  }

  async remove(id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }

    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    await Promise.all([
      this.prisma.track.updateMany({
        where: { artistId: id },
        data: { artistId: null },
      }),
      this.prisma.album.updateMany({
        where: { artistId: id },
        data: { artistId: null },
      }),
    ]);

    try {
      await this.favsService.removeArtist(id);
    } catch (error) {}
    await this.prisma.artist.delete({
      where: { id },
    });
  }
}
