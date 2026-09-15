import { Module } from '@nestjs/common';
import { PersonaService } from './persona.service.js';
import { PersonaController } from './persona.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity.js';
import { PersonaRepository } from './persona.repository.js';

@Module({
  imports:[
    TypeOrmModule.forFeature([Persona])
  ],

  controllers: [PersonaController],
  providers: [PersonaService,PersonaRepository],
})
export class PersonaModule {}
