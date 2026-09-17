import { Injectable, NotFoundException } from '@nestjs/common';
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

  async obtenerPersonaId(id:number):Promise<Persona | null>{
      const persona= this.personaRepository.obtenerPersonaId(id);
      if(!persona)
        throw new NotFoundException("No existe la persona");
      return persona;
  }
}
