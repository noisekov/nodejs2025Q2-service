import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { isValidUUID } from 'src/utils/validateUUID';
import { PrismaService } from 'src/prisma/prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  selectData = {
    id: true,
    login: true,
    version: true,
    createdAt: true,
    updatedAt: true,
  };

  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;
    const now = BigInt(Date.now());

    const userData = await this.prisma.user.create({
      data: {
        id: randomUUID(),
        login,
        password,
        version: 1,
        createdAt: now,
        updatedAt: now,
      },
      select: this.selectData,
    });

    return {
      ...userData,
      createdAt: Number(userData.createdAt),
      updatedAt: Number(userData.updatedAt),
    };
  }

  async findAll() {
    return this.prisma.user
      .findMany({
        select: this.selectData,
      })
      .then((users) =>
        users.map((user) => ({
          ...user,
          createdAt: Number(user.createdAt),
          updatedAt: Number(user.updatedAt),
        })),
      );
  }

  async findOne(id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }

    const userData = await this.prisma.user.findUnique({
      where: { id },
      select: this.selectData,
    });

    if (!userData) {
      throw new NotFoundException('User not found');
    }

    return {
      ...userData,
      createdAt: Number(userData.createdAt),
      updatedAt: Number(userData.updatedAt),
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }

    const { oldPassword, newPassword } = updateUserDto;

    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (oldPassword !== user.password) {
      throw new ForbiddenException('Invalid password');
    }

    if (oldPassword === newPassword) {
      throw new ForbiddenException('Password is the same');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: newPassword,
        version: user.version + 1,
        updatedAt: BigInt(Date.now()),
      },
      select: this.selectData,
    });

    return {
      ...updatedUser,
      createdAt: Number(updatedUser.createdAt),
      updatedAt: Number(updatedUser.updatedAt),
    };
  }

  async remove(id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }

    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.delete({
      where: { id },
    });
  }
}
