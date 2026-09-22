import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { PersonaService } from './persona.service.js';
import { CreatePersonaDto } from './dto/create-persona.dto.js';
import { Persona } from './entities/persona.entity.js';
import type { Response } from 'express';
import { HandleException } from '../../common/decorators/handleException.decorator.js';
import { PaginatedResponse, SuccessResponse } from '../../common/interfaces/CustomResponse.interface.js';
import { ResponseUtils } from '../../common/utils/Response.utils.js';
import { PaginacionParamsDto } from '../../common/dto/PaginacionParams.dto.js';

@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Get()
  @HandleException('Error al cargar la lista de personas')
  async obtenerpersonas(@Query() dto:PaginacionParamsDto):Promise<PaginatedResponse<Persona>>{
    const personas = await this.personaService.obtenerPersonas(dto);
    return ResponseUtils.paginated(
      personas.data,
      personas.total,
      dto.pagina,
      dto.porPagina,
      'Listado de personas'
    );
  }

  @Get(':id')
  @HandleException('Error al buscar persona')
  async obtenerPersonaId(@Param('id') id:number):Promise<Persona>{
    return await this.personaService.obtenerPersonaId(id);
  }

  @Post()
  @HandleException('Error al registrar a la persona')
  async crearPersona(@Body() dataDto:CreatePersonaDto):Promise<SuccessResponse<Partial<Persona>>>{
      const persona = await this.personaService.crearPersona(dataDto);
      return ResponseUtils.success(persona,'Persona registrada correctamente');
  }

  @Patch(':id')
  @HandleException('Error al modificar la persona')
  async modificarPersona(@Param('id') id:number, @Body() dataDto: CreatePersonaDto){
    const persona = await this.personaService.ModificarPersona(id, dataDto);
      return ResponseUtils.success(persona,'Persona modifica correctamente');
  }

}