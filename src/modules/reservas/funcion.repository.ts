import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Funcion } from "./entities/funcion.entity.js";
import { QueryRunner, Repository } from "typeorm";
import { PaginacionParamsDto } from "../../common/dto/PaginacionParams.dto.js";
import { PaginationResult } from "../../common/interfaces/PaginationResult.type.js";

@Injectable()
export class FuncionRepository {
    constructor(
        @InjectRepository(Funcion)
        private readonly funcionRepository: Repository<Funcion>
    ){}

    async obtenerFuncion(dtoFuncion:PaginacionParamsDto):Promise<PaginationResult<Funcion>>{
        const [funcion, total] = await this.funcionRepository.findAndCount({
            skip: (dtoFuncion.pagina -1) * dtoFuncion.porPagina,
            take: dtoFuncion.porPagina,
            order:{
                id:'ASC'
            }
        });
    return {data:funcion,total}
    }
    
    /*async obtenerPelicula():Promise<Pelicula[]>{
        return await this.peliculaRepository.find(
            {
                order:{
                    idPelicula: 'ASC'
                }
            }
        )
    }*/

    async obtenerFuncionId(idfuncion:number):Promise<Funcion | null>{
        const funcion = await this.funcionRepository.findOne({where:{id:idfuncion}})
        return funcion;
    }

    async crearFuncion(
        datafuncion: Partial<Funcion>,
        queryFuncion:QueryRunner
    ):Promise<Funcion>{
        const managerFuncion = queryFuncion.manager;
        const funcion = managerFuncion.create(Funcion, datafuncion);
        return await managerFuncion.save(funcion);
    }

    async ModificarFuncion(
        id:number,
        datamodificarFuncion: Partial<Funcion>,
        queryFuncion:QueryRunner
    ){
        const manager= queryFuncion.manager;
        const modificarFuncion= await manager.preload(Funcion,{
            id,
            ...datamodificarFuncion
        })
    return await manager.save(modificarFuncion);
    }
        
}
