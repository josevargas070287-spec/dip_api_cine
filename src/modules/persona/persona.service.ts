import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto.js';
import { UpdatePersonaDto } from './dto/update-persona.dto.js';
import { PersonaRepository } from './persona.repository.js';
import { Persona } from './entities/persona.entity.js';
import { DataSource } from 'typeorm';
import { PaginacionParamsDto } from '../../common/dto/PaginacionParams.dto.js';
import { PaginationResult } from '../../common/interfaces/PaginationResult.type.js';

@Injectable()
export class PersonaService {
  constructor(
    private readonly personaRepository: PersonaRepository,
    private readonly datasource: DataSource
  ){}

  async obtenerPersonas(dtopersona:PaginacionParamsDto):Promise<PaginationResult<Persona>>{
    const persona = await this.personaRepository.obtenerPersona(dtopersona);
    return persona;
  }

  async obtenerPersonaId(id:number){
      const persona= await this.personaRepository.obtenerPersonaId(id);
      if(!persona)
        throw new NotFoundException("No existe la persona");
      return persona;
  }

  async crearPersona(dataDto: CreatePersonaDto):Promise<Partial<Persona>>{
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const personaResultado = await this.personaRepository.crearpersona(dataDto, queryRunner);
      await queryRunner.commitTransaction();
      //return personaResultado;//devuelve todo el json
      return {
        nombres : personaResultado.nombres,
        apellidos: personaResultado.apellidos,
        telefono: personaResultado.telefono
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally{
      await queryRunner.release();
    }    

  }

  async ModificarPersona(id:number,dataDto: CreatePersonaDto):Promise<Partial<Persona>>{
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const personaResultado = await this.personaRepository.modificarpersona(id, dataDto, queryRunner);
      await queryRunner.commitTransaction();
      //return personaResultado;//devuelve todo el json
      return {
        nombres : personaResultado!.nombres,
        apellidos: personaResultado!.apellidos,
        telefono: personaResultado!.telefono
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally{
      await queryRunner.release();
    }    

  }
}
