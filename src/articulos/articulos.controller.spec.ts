import { Test, TestingModule } from '@nestjs/testing';
import { ArticulosController } from './articulos.controller';
import { ArticulosService } from './articulos.service';
import { CreateArticuloDto } from './dto/create-articulo.dto';
import { UpdateArticuloDto } from './dto/update-articulo.dto';
import { Articulo } from './entities/articulo.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('ArticulosController', () => {
  let controller: ArticulosController;
  let service: ArticulosService;

  const mockArticuloService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findByTitulo: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticulosController],
      providers: [
        {
          provide: ArticulosService,
          useValue: mockArticuloService,
        },
      ],
    }).compile();

    controller = module.get<ArticulosController>(ArticulosController);
    service = module.get<ArticulosService>(ArticulosService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('debería crear un artículo', async () => {
      const dto: CreateArticuloDto = {
        titulo: 'Audio libro 5',
        contenido: 'El audio libro 5 en este articulo.',
        fechaPublicacion: "2024-07-30",
        autor: 'Anonimo',
      };

      const result = {
        id: 'ca9a0e81-2013-4861-ad3d-91758039882e',
        titulo: dto.titulo,
        contenido: dto.contenido,
        fechaPublicacion: dto.fechaPublicacion,
        autor: dto.autor,
        deletedAt: null,
        createdAt: "2024-07-31T09:55:37.853Z",
        updatedAt: "2024-07-31T09:55:37.853Z",
      };

      //jest.spyOn(service, 'create').mockResolvedValue(result);

      const response = await controller.create(dto);
      expect(response).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('debería retornar todos los artículos', async () => {
      const result = [new Articulo()];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findByTitulo', () => {
    it('debería retornar un artículo por título', async () => {
      const result = new Articulo();
      jest.spyOn(service, 'findByTitulo').mockResolvedValue(result);

      expect(await controller.findByTitulo('Título')).toBe(result);
    });
  });

  describe('findById', () => {
    it('debería retornar un artículo por id', async () => {
      const result = new Articulo();
      jest.spyOn(service, 'findById').mockResolvedValue(result);

      expect(await controller.findById('id')).toBe(result);
    });
  });

  describe('update', () => {
    it('debería actualizar un artículo', async () => {
      const dto: UpdateArticuloDto = { titulo: 'Título actualizado' };
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update('id', dto)).toBe(result);
    });
  });

  describe('remove', () => {
    it('debería eliminar un artículo', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };
      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove('id')).toBe(result);
    });
  });
});
