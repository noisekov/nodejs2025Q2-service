import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { isValidUUID } from 'src/utils/validateUUID';
import { PrismaService } from 'src/prisma/prisma.service';
import { randomUUID } from 'crypto';
import { FavsService } from 'src/CRUD/favs/favs.service';

@Injectable()
export class AlbumService {
  selectData = {
    id: true,
    name: true,
    year: true,
    artistId: true,
  };

  constructor(
    private prisma: PrismaService,
    private favsService: FavsService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const { name, year, artistId } = createAlbumDto;

    if (artistId) {
      const artist = await this.prisma.artist.findUnique({
        where: { id: artistId },
      });

      if (!artist) {
        throw new BadRequestException('Artist not found');
      }
    }

    const albumData = await this.prisma.album.create({
      data: {
        id: randomUUID(),
        name,
        year,
        artistId: artistId || null,
      },
      select: this.selectData,
    });

    return albumData;
  }

  async findAll() {
    const albums = await this.prisma.album.findMany({
      select: this.selectData,
    });

    return albums;
  }

  async findOne(id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }

    const albumData = await this.prisma.album.findUnique({
      where: { id },
      select: this.selectData,
    });

    if (!albumData) {
      throw new NotFoundException('Album not found');
    }

    return albumData;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }

    const album = await this.prisma.album.findUnique({
      where: { id },
    });

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    if (updateAlbumDto.artistId) {
      const artist = await this.prisma.artist.findUnique({
        where: { id: updateAlbumDto.artistId },
      });

      if (!artist) {
        throw new BadRequestException('Artist not found');
      }
    }

    const updatedAlbum = await this.prisma.album.update({
      where: { id },
      data: {
        ...updateAlbumDto,
      },
      select: this.selectData,
    });

    return updatedAlbum;
  }

  async remove(id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }

    const album = await this.prisma.album.findUnique({
      where: { id },
    });

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    await this.prisma.track.updateMany({
      where: { albumId: id },
      data: { albumId: null },
    });

    try {
      await this.favsService.removeAlbum(id);
    } catch (error) {}
    await this.prisma.album.delete({
      where: { id },
    });
  }
}
