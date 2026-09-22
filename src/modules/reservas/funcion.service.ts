import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PaginacionParamsDto } from '../../common/dto/PaginacionParams.dto.js';
import { PaginationResult } from '../../common/interfaces/PaginationResult.type.js';
import { FuncionRepository } from './funcion.repository.js';
import { Funcion } from './entities/funcion.entity.js';
import { CrearFuncionDto } from './dto-reservas/crear-funcion.dto.js';

@Injectable()
export class FuncionServices{
    constructor(
        private readonly FuncionRepository:FuncionRepository,
        private readonly datasourceFuncion: DataSource
    ){}

    async obtenerFuncion(dtoFuncion:PaginacionParamsDto):Promise<PaginationResult<Funcion>>{
        const funcion = await this.FuncionRepository.obtenerFuncion(dtoFuncion);
        return funcion;
    }

    async obtenerFuncionId(idfun:number):Promise<Funcion>{
        const funcionobtenida= await this.FuncionRepository.obtenerFuncionId(idfun);
        if (!funcionobtenida)
            throw new NotFoundException("No existe Pelicula buscada");
        return funcionobtenida;
    }

    async crearfuncion(dataFuncionDto:CrearFuncionDto):Promise<Partial<Funcion>>{
        const queryRunnerFuncion = this.datasourceFuncion.createQueryRunner();
        await queryRunnerFuncion.connect();
        await queryRunnerFuncion.startTransaction();
        try {
            const funcionResultado = await this.FuncionRepository.crearFuncion(dataFuncionDto,queryRunnerFuncion);
            await queryRunnerFuncion.commitTransaction();
            return{
                fecha: funcionResultado.fecha,
                horaInicio: funcionResultado.horaInicio,
                horaFin: funcionResultado.horaFin,
                idPelicula: funcionResultado.idPelicula
            }
        } catch (error) {
            await queryRunnerFuncion.rollbackTransaction();
            throw error;
        }finally{
            await queryRunnerFuncion.release();
        }
    }
    
    async modificarfuncion(idfuncion:number,dataPeliculaDto:CrearFuncionDto):Promise<Partial<Funcion>>{
        const queryRunnerFuncion = this.datasourceFuncion.createQueryRunner();
        await queryRunnerFuncion.connect();
        await queryRunnerFuncion.startTransaction();
        try {
            const funcionResultado = await this.FuncionRepository.ModificarFuncion(idfuncion,dataPeliculaDto,queryRunnerFuncion);
            await queryRunnerFuncion.commitTransaction();
            return{
                fecha: funcionResultado!.fecha,
                horaInicio: funcionResultado!.horaInicio,
                horaFin: funcionResultado!.horaFin,
                idPelicula: funcionResultado!.idPelicula
            }
        } catch (error) {
            await queryRunnerFuncion.rollbackTransaction();
            throw error;
        }finally{
            await queryRunnerFuncion.release();
        }
    }


}
