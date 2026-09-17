import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Persona } from "./entities/persona.entity.js";
import { Repository } from "typeorm";

@Injectable()
export class PersonaRepository{
    constructor(
        @InjectRepository(Persona)
        private readonly personaRepository: Repository<Persona>
    ){}

    async obtenerPersona():Promise<Persona[]>{
        return this.personaRepository.createQueryBuilder('pp')
        //.orderBy('pp.idPersona', 'DESC')
        .getMany();
    }

    async obtenerPersonaId(id:number):Promise<Persona | null>{
        return this.personaRepository.findOne({where:{idPersona:id}});
    }
}