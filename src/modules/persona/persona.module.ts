import { Module } from '@nestjs/common';
import { PersonaService } from './persona.service.js';
import { PersonaController } from './persona.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity.js';
import { PersonaRepository } from './persona.repository.js';
import { Rol } from './entities/rol.entity.js';
import { RolUsuario } from './entities/rol-usuario.entity.js';
import { Usuario } from './entities/usuario.entity.js';
import { Cliente } from './entities/cliente.entity.js';
import { RolController } from './rol.controller.js';
import { RolService } from './rol.service.js';
import { RolRepository } from './rol.repository.js';

@Module({
  imports:[
    TypeOrmModule.forFeature([Persona,Rol,RolUsuario,Usuario,Cliente])
  ],

  controllers: [PersonaController,RolController],
  providers: [PersonaService,PersonaRepository,RolService,RolRepository],
})
export class PersonaModule {}
