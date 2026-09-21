import { Injectable, NotFoundException } from '@nestjs/common';
import { PeliculaRepository } from './pelicula.repository.js';
import { Pelicula } from './entities/pelicula.entity.js';
import { CrearPeliculaDto } from './dto-reservas/crear-pelicula.dto.js';
import { DataSource } from 'typeorm';

@Injectable()
export class PeliculaServices{
    constructor(
        private readonly peliculaRepository:PeliculaRepository,
        private readonly datasourcePelicula: DataSource
    ){}

    async obtenerPelicula():Promise<Pelicula[]>{
        const pelicula = await this.peliculaRepository.obtenerPelicula();
        return pelicula;
    }

    async obtenerPeliculaId(idpeli2:number):Promise<Pelicula>{
        const peliculaobtenida= await this.peliculaRepository.obtenerPeliculaId(idpeli2);
        if (!peliculaobtenida)
            throw new NotFoundException("No existe Pelicula buscada");
        return peliculaobtenida;
    }

    async crearPelicula(dataPeliculaDto:CrearPeliculaDto):Promise<Partial<Pelicula>>{
        const queryRunnerPelicula = this.datasourcePelicula.createQueryRunner();
        await queryRunnerPelicula.connect();
        await queryRunnerPelicula.startTransaction();
        try {
            const peliculaResultado = await this.peliculaRepository.crearPelicula(dataPeliculaDto,queryRunnerPelicula);
            await queryRunnerPelicula.commitTransaction();
            return{
                titulo: peliculaResultado.titulo,
                sinopsis: peliculaResultado.sinopsis,
                duracion: peliculaResultado.duracion
            }
        } catch (error) {
            await queryRunnerPelicula.rollbackTransaction();
            throw error;
        }finally{
            await queryRunnerPelicula.release();
        }
    }
    
    async modificarPelicula(idpeli:number,dataPeliculaDto:CrearPeliculaDto):Promise<Partial<Pelicula>>{
        const queryRunnerPelicula = this.datasourcePelicula.createQueryRunner();
        await queryRunnerPelicula.connect();
        await queryRunnerPelicula.startTransaction();
        try {
            const peliculaResultado = await this.peliculaRepository.ModificarPelicula(idpeli,dataPeliculaDto,queryRunnerPelicula);
            await queryRunnerPelicula.commitTransaction();
            return{
                titulo: peliculaResultado!.titulo,
                sinopsis: peliculaResultado!.sinopsis,
                duracion: peliculaResultado!.duracion
            }
        } catch (error) {
            await queryRunnerPelicula.rollbackTransaction();
            throw error;
        }finally{
            await queryRunnerPelicula.release();
        }
    }


}
