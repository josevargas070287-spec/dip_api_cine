import { Injectable } from "@nestjs/common";
import { QueryRunner, Repository } from "typeorm";
import { Reserva } from "./entities/reserva.entity.js";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class reservasRepository{
    constructor(
        @InjectRepository(Reserva)
        private readonly reservasRepository:Repository<Reserva> 
    ){}

    async obtenerReserva():Promise<Reserva[]>{
            return await this.reservasRepository.find(
                {
                    order:{
                        id:'ASC'
                    }
                }
            );
        }
         
    async obtenerReservaId(id:number):Promise<Reserva | null>{
            return await this.reservasRepository.findOne({where:{id:id}});
        }
    
    async crearReserva(
            dataReserva: Partial<Reserva>, 
            queryRunner:QueryRunner
        ):Promise<Reserva>{
            const manager = queryRunner.manager;
            const reserva = manager.create(Reserva, dataReserva);
            return await manager.save(reserva);
        }
    
        async modificarReserva(
            id:number,
            datamodificar: Partial<Reserva>, 
            queryRunner:QueryRunner        
        ):Promise<Partial<Reserva | null | undefined>>{
            const manager = queryRunner.manager
            const personaModifica = await manager.preload(Reserva,{
                id,
                ...datamodificar
            });
        return await manager.save(personaModifica)
        }
}