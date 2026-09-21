import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { reservasRepository } from './reservas.repository.js';
import { Reserva } from './entities/reserva.entity.js';
import { CreatePersonaDto } from '../persona/dto/create-persona.dto.js';
import { CreateReservaDto } from './dto-reservas/create-reserva.dto.js';

@Injectable()
export class ReservasService {
    constructor(
        private readonly reservaRepository: reservasRepository,
        private readonly datasourceReserva: DataSource
      ){}


    async obtenerReserva():Promise<Reserva[]>{
       const reserva = await this.reservaRepository.obtenerReserva();
       return reserva;
     }   
    
    async obtenerReservaId(id:number){
        const reserva= await this.reservaRepository.obtenerReservaId(id);
          if(!reserva)
            throw new NotFoundException("No existe reserva");
          return reserva;
       }

    async crearReserva(dataDtoReserva: CreateReservaDto):Promise<Partial<Reserva>>{
        const queryRunnerReserva = this.datasourceReserva.createQueryRunner();
        await queryRunnerReserva.connect();
        await queryRunnerReserva.startTransaction();
        try {
            const reservaResultado = await this.reservaRepository.crearReserva(dataDtoReserva,queryRunnerReserva);
            await queryRunnerReserva.commitTransaction();
            return reservaResultado;
        } catch (error) {
            await queryRunnerReserva.rollbackTransaction();
            throw error;
        } finally{
            await queryRunnerReserva.release();
        }
        
    }

}
