import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Favorites } from 'src/types/types';
import { isValidUUID } from 'src/utils/validateUUID';

@Injectable()
export class FavsService {
  constructor(private prisma: PrismaService) {}

  private async getOrCreateFavorites() {
    let favorites = await this.prisma.favorites.findFirst();

    if (!favorites) {
      favorites = await this.prisma.favorites.create({
        data: {
          artists: JSON.stringify([]),
          albums: JSON.stringify([]),
          tracks: JSON.stringify([]),
        },
      });
    }

    return favorites;
  }

  private parseFavoritesJson(favorites: any): Favorites {
    return {
      artists: JSON.parse(favorites.artists as string),
      albums: JSON.parse(favorites.albums as string),
      tracks: JSON.parse(favorites.tracks as string),
    };
  }

  async findAll() {
    const favorites = await this.getOrCreateFavorites();
    const {
      artists: artistIds,
      albums: albumIds,
      tracks: trackIds,
    } = this.parseFavoritesJson(favorites);

    const [artists, albums, tracks] = await Promise.all([
      this.prisma.artist.findMany({
        where: { id: { in: artistIds } },
        select: {
          id: true,
          name: true,
          grammy: true,
        },
      }),
      this.prisma.album.findMany({
        where: { id: { in: albumIds } },
        select: {
          id: true,
          name: true,
          year: true,
          artistId: true,
        },
      }),
      this.prisma.track.findMany({
        where: { id: { in: trackIds } },
        select: {
          id: true,
          name: true,
          duration: true,
          artistId: true,
          albumId: true,
        },
      }),
    ]);

    return {
      artists,
      albums,
      tracks,
    };
  }

  async createTrack(id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }

    const track = await this.prisma.track.findUnique({
      where: { id },
    });

    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }

    const favorites = await this.getOrCreateFavorites();
    const favoritesData = this.parseFavoritesJson(favorites);

    if (!favoritesData.tracks.includes(id)) {
      favoritesData.tracks.push(id);
      await this.prisma.favorites.update({
        where: { id: favorites.id },
        data: { tracks: JSON.stringify(favoritesData.tracks) },
      });
    }

    return this.findAll();
  }

  async removeTrack(id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }

    const favorites = await this.prisma.favorites.findFirst();

    if (!favorites) {
      throw new NotFoundException('Favorites not found');
    }

    const favoritesData = this.parseFavoritesJson(favorites);
    const trackIndex = favoritesData.tracks.indexOf(id);

    if (trackIndex === -1) {
      throw new NotFoundException('Track not found in favorites');
    }

    favoritesData.tracks.splice(trackIndex, 1);

    await this.prisma.favorites.update({
      where: { id: favorites.id },
      data: { tracks: JSON.stringify(favoritesData.tracks) },
    });
  }

  async createAlbum(id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }

    const album = await this.prisma.album.findUnique({
      where: { id },
    });

    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }

    const favorites = await this.getOrCreateFavorites();
    const favoritesData = this.parseFavoritesJson(favorites);

    if (!favoritesData.albums.includes(id)) {
      favoritesData.albums.push(id);
      await this.prisma.favorites.update({
        where: { id: favorites.id },
        data: { albums: JSON.stringify(favoritesData.albums) },
      });
    }

    return this.findAll();
  }

  async removeAlbum(id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }

    const favorites = await this.prisma.favorites.findFirst();

    if (!favorites) {
      throw new NotFoundException('Favorites not found');
    }

    const favoritesData = this.parseFavoritesJson(favorites);
    const albumIndex = favoritesData.albums.indexOf(id);

    if (albumIndex === -1) {
      throw new NotFoundException('Album not found in favorites');
    }

    favoritesData.albums.splice(albumIndex, 1);

    await this.prisma.favorites.update({
      where: { id: favorites.id },
      data: { albums: JSON.stringify(favoritesData.albums) },
    });
  }

  async createArtist(id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }

    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });

    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }

    const favorites = await this.getOrCreateFavorites();
    const favoritesData = this.parseFavoritesJson(favorites);

    if (!favoritesData.artists.includes(id)) {
      favoritesData.artists.push(id);
      await this.prisma.favorites.update({
        where: { id: favorites.id },
        data: { artists: JSON.stringify(favoritesData.artists) },
      });
    }

    return this.findAll();
  }

  async removeArtist(id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }

    const favorites = await this.prisma.favorites.findFirst();

    if (!favorites) {
      throw new NotFoundException('Favorites not found');
    }

    const favoritesData = this.parseFavoritesJson(favorites);
    const artistIndex = favoritesData.artists.indexOf(id);

    if (artistIndex === -1) {
      throw new NotFoundException('Artist not found in favorites');
    }

    favoritesData.artists.splice(artistIndex, 1);

    await this.prisma.favorites.update({
      where: { id: favorites.id },
      data: { artists: JSON.stringify(favoritesData.artists) },
    });
  }
}
