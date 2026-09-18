import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonaService } from './persona.service.js';
import { CreatePersonaDto } from './dto/create-persona.dto.js';
import { UpdatePersonaDto } from './dto/update-persona.dto.js';
import { Persona } from './entities/persona.entity.js';

@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Get()
  async obtenerpersonas():Promise<Persona[]>{
    return await this.personaService.obtenerPersonas();
  }

  @Get(':id')
  async obtenerPersonaId(@Param('id') id:number):Promise<Persona>{
    return await this.personaService.obtenerPersonaId(id);
  }

  @Post()
  async crearPersona(@Body() dataDto:CreatePersonaDto):Promise<Partial<Persona>>{
    return await this.personaService.crearPersona(dataDto);
  }
}