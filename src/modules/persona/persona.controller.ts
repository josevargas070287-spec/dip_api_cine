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
    return this.personaService.obtenerPersonas();
  }
}