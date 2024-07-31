import { Test, TestingModule } from '@nestjs/testing';
import { ArticulosService } from './articulos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Articulo } from './entities/articulo.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ArticulosService', () => {
  let service: ArticulosService;
  let repository: Repository<Articulo>;

  const mockArticuloRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticulosService,
        {
          provide: getRepositoryToken(Articulo),
          useValue: mockArticuloRepository,
        },
      ],
    }).compile();

    service = module.get<ArticulosService>(ArticulosService);
    repository = module.get<Repository<Articulo>>(getRepositoryToken(Articulo));
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('debería crear un artículo', async () => {
      const dto = { titulo: 'Título', contenido: 'Contenido', fechaPublicacion: new Date().toISOString(), autor: 'Autor' };
      const result = new Articulo();
      jest.spyOn(repository, 'save').mockResolvedValue(result);

      expect(await service.create(dto)).toBe(result);
    });

    it('debería lanzar BadRequestException si ocurre un error', async () => {
      jest.spyOn(repository, 'save').mockRejectedValue(new Error('Error'));

      await expect(service.create({ titulo: 'Título', contenido: 'Contenido', fechaPublicacion: new Date().toISOString(), autor: 'Autor' }))
        .rejects
        .toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('debería retornar todos los artículos', async () => {
      const result = [new Articulo()];
      jest.spyOn(repository, 'find').mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
    });

    it('debería lanzar BadRequestException si ocurre un error', async () => {
      jest.spyOn(repository, 'find').mockRejectedValue(new Error('Error'));

      await expect(service.findAll()).rejects.toThrow(BadRequestException);
    });
  });

  describe('findById', () => {
    it('debería retornar un artículo por id', async () => {
      const result = new Articulo();
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(result);

      expect(await service.findById('id')).toBe(result);
    });

    it('debería lanzar NotFoundException si no se encuentra el artículo', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      await expect(service.findById('id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByTitulo', () => {
    it('debería retornar un artículo por título', async () => {
      const result = new Articulo();
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(result);

      expect(await service.findByTitulo('Título')).toBe(result);
    });

    it('debería lanzar NotFoundException si no se encuentra el artículo', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      await expect(service.findByTitulo('Título')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('debería actualizar un artículo', async () => {
      const dto = { titulo: 'Título actualizado' };
      const result: UpdateResult = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };
      jest.spyOn(repository, 'update').mockResolvedValue(result);

      expect(await service.update('id', dto)).toBe(result);
    });

    it('debería lanzar NotFoundException si no se encuentra el artículo', async () => {
      const result: UpdateResult = {
        generatedMaps: [],
        raw: [],
        affected: 0,
      };
      jest.spyOn(repository, 'update').mockResolvedValue(result);

      await expect(service.update('id', { titulo: 'Título' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('debería eliminar un artículo', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };
      jest.spyOn(repository, 'softDelete').mockResolvedValue(result);

      expect(await service.remove('id')).toBe(result);
    });

    it('debería lanzar NotFoundException si no se encuentra el artículo', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 0,
      };
      jest.spyOn(repository, 'softDelete').mockResolvedValue(result);

      await expect(service.remove('id')).rejects.toThrow(NotFoundException);
    });
  });
});
