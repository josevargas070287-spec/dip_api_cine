import { Injectable } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto.js';
import { UpdatePersonaDto } from './dto/update-persona.dto.js';
import { PersonaRepository } from './persona.repository.js';
import { Persona } from './entities/persona.entity.js';

@Injectable()
export class PersonaService {
  constructor(
    private readonly personaRepository: PersonaRepository
  ){}

  async obtenerPersonas():Promise<Persona[]>{
    const persona = this.personaRepository.obtenerPersona();
    return persona;
  }
}
