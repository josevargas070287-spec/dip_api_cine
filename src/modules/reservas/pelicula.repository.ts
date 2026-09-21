import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Pelicula } from "./entities/pelicula.entity.js";
import { QueryRunner } from "typeorm/browser";

@Injectable()
export class PeliculaRepository {
    constructor(
        @InjectRepository(Pelicula)
        private readonly peliculaRepository: Repository<Pelicula>
    ){}

    async obtenerPelicula():Promise<Pelicula[]>{
        return await this.peliculaRepository.find(
            {
                order:{
                    idPelicula: 'ASC'
                }
            }
        )
    }

    async obtenerPeliculaId(idpeli:number):Promise<Pelicula | null>{
        const pelicula = await this.peliculaRepository.findOne({where:{idPelicula:idpeli}})
        return pelicula;
    }

    async crearPelicula(
        dataPelicula: Partial<Pelicula>,
        queryPelicula:QueryRunner
    ):Promise<Pelicula>{
        const managerPelicula = queryPelicula.manager;
        const pelicula = managerPelicula.create(Pelicula, dataPelicula);
        return await managerPelicula.save(pelicula);
    }

    async ModificarPelicula(
        idPelicula:number,
        datamodificarPeli: Partial<Pelicula>,
        queryPelicula:QueryRunner
    ){
        const manager= queryPelicula.manager;
        const modificarPelicula= await manager.preload(Pelicula,{
            idPelicula,
            ...datamodificarPeli
        })
    return await manager.save(modificarPelicula);
    }
        
}
