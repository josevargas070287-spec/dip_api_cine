import { Module } from '@nestjs/common';
import { ReservasService } from './reservas.service.js';
import { ReservasController } from './reservas.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity.js';
import { Asiento } from './entities/asiento.entity.js';
import { DetalleReserva } from './entities/detalle-reserva.entity.js';

@Module({
  imports:[
    TypeOrmModule.forFeature([Reserva,Asiento,DetalleReserva])
  ],
  controllers: [ReservasController],
  providers: [ReservasService],
})
export class ReservasModule {}
