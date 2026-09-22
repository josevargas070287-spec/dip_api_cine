import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Persona } from "./entities/persona.entity.js";
import { Repository, QueryRunner } from "typeorm";
import { PaginacionParamsDto } from "../../common/dto/PaginacionParams.dto.js";
import { PaginationResult } from "../../common/interfaces/PaginationResult.type.js";

@Injectable()
export class PersonaRepository{
    constructor(
        @InjectRepository(Persona)
        private readonly personaRepository: Repository<Persona>
    ){}

    //lista todas las personas
    /*
    async obtenerPersona(dtopersona:PaginacionParamsDto):Promise<PaginationResult<Persona>>{
        return await this.personaRepository.find(
            {
                order:{
                    idPersona:'ASC'
                }
            }
        );
    }*/
    async obtenerPersona(dtopersona:PaginacionParamsDto):Promise<PaginationResult<Persona>>{
        const [persona, total] = await this.personaRepository.findAndCount({
            // muestra cantidad de datos
            skip: (dtopersona.pagina -1) * dtopersona.porPagina,
            take: dtopersona.porPagina,
            order:{
                idPersona:'ASC'
            }
        });
        return {data:persona, total} 
    }
       
       //return this.personaRepository.createQueryBuilder('pp')
            //.orderBy('pp.idPersona', 'DESC')
        //.getMany();
        

    async obtenerPersonaId(id:number):Promise<Persona | null>{
        return await this.personaRepository.findOne({where:{idPersona:id}});
    }

    async crearpersona(
        data: Partial<Persona>, 
        queryRunner:QueryRunner
    ):Promise<Persona>{
        const manager = queryRunner.manager;
        const persona = manager.create(Persona, data);
        return await manager.save(persona);
    }

    async modificarpersona(
        idPersona:number,
        datamodificar: Partial<Persona>, 
        queryRunner:QueryRunner        
    ):Promise<Partial<Persona | null | undefined>>{
        const manager = queryRunner.manager
        const personaModifica = await manager.preload(Persona,{
            idPersona,
            ...datamodificar
        });
    return await manager.save(personaModifica)
    }

}
