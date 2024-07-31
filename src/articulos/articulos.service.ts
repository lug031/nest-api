import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticuloDto } from './dto/create-articulo.dto';
import { UpdateArticuloDto } from './dto/update-articulo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Articulo } from './entities/articulo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticulosService {
  constructor(
    @InjectRepository(Articulo)
    private readonly articuloRepository: Repository<Articulo>,
  ) {}

  async create(createArticuloDto: CreateArticuloDto) {
    try {
      return await this.articuloRepository.save(createArticuloDto);
    } catch (error) {
      //console.error('Error al creear:', error);
      throw new BadRequestException('Error al crear el artículo');
    }
  }

  async findAll() {
    try {
      return await this.articuloRepository.find();
    } catch (error) {
      //console.error('Error al buscatodo:', error);
      throw new BadRequestException('Error al obtener los artículos');
    }
  }

  async findById(id: string) {
    try {
      const articulo = await this.articuloRepository.findOneBy({ id });
      if (!articulo) {
        throw new NotFoundException('Artículo no encontrado');
      }
      return articulo;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new BadRequestException('Error al obtener el artículo por Id');
      }
    }
  }

  async findByTitulo(titulo: string) {
    try {
      const articulo = await this.articuloRepository.findOneBy({ titulo });
      if (!articulo) {
        throw new NotFoundException('Artículo no encontrado');
      }
      return articulo;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new BadRequestException('Error al obtener el artículo por título');
      }
    }
  }

  async update(id: string, updateArticuloDto: UpdateArticuloDto) {
    try {
      const result = await this.articuloRepository.update(id, updateArticuloDto);
      if (result.affected === 0) {
        throw new NotFoundException('Artículo no encontrado para actualizar');
      }
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new BadRequestException('Error al actualizar el artículo');
      }
    }
  }

  async remove(id: string) {
    try {
      const result = await this.articuloRepository.softDelete({ id });
      if (result.affected === 0) {
        throw new NotFoundException('Artículo no encontrado para eliminar');
      }
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new BadRequestException('Error al eliminar el artículo');
      }
    }
  }
}
