import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ArticulosService } from './articulos.service';
import { CreateArticuloDto } from './dto/create-articulo.dto';
import { UpdateArticuloDto } from './dto/update-articulo.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Articulo } from './entities/articulo.entity';

@ApiTags('Articulos')
@Controller('articulos')
export class ArticulosController {
  constructor(private readonly articulosService: ArticulosService) {}

  @Post()
  @ApiCreatedResponse({ description: 'El artículo ha sido creado exitosamente.', type: Articulo })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  create(@Body() createArticuloDto: CreateArticuloDto) {
    //console.log(createArticuloDto)
    return this.articulosService.create(createArticuloDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Lista de artículos obtenida exitosamente.', type: [Articulo] })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  findAll() {
    return this.articulosService.findAll();
  }

  @Get('titulo')
  @ApiOkResponse({ description: 'Artículo encontrado exitosamente.', type: Articulo })
  @ApiNotFoundResponse({ description: 'Artículo no encontrado.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  findByTitulo(@Query('titulo') titulo: string) {
    //console.log(titulo)
    return this.articulosService.findByTitulo(titulo);
  }
  
  @Get(':id')
  @ApiOkResponse({ description: 'Artículo encontrado exitosamente.', type: Articulo })
  @ApiNotFoundResponse({ description: 'Artículo no encontrado.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  findById(@Param('id') id: string) {
    //console.log(typeof id)
    return this.articulosService.findById(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Artículo actualizado exitosamente.', type: Articulo })
  @ApiNotFoundResponse({ description: 'Artículo no encontrado.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  update(@Param('id') id: string, @Body() updateArticuloDto: UpdateArticuloDto) {
    return this.articulosService.update(id, updateArticuloDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Artículo eliminado exitosamente.' })
  @ApiNotFoundResponse({ description: 'Artículo no encontrado.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  remove(@Param('id') id: string) {
    return this.articulosService.remove(id);
  }
}
