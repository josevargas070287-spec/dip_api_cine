import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Pelicula } from "./entities/pelicula.entity.js";

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
        
}
