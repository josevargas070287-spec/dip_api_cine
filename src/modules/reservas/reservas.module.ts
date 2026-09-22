import { Module } from '@nestjs/common';
import { ReservasService } from './reservas.service.js';
import { ReservasController } from './reservas.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity.js';
import { Asiento } from './entities/asiento.entity.js';
import { DetalleReserva } from './entities/detalle-reserva.entity.js';
import { Sala } from './entities/sala.entity.js';
import { Funcion } from './entities/funcion.entity.js';
import { Pelicula } from './entities/pelicula.entity.js';
import { PeliculaServices } from './pelicula.service.js';
import { PeliculaController} from './pelicula.controller.js';
import { PeliculaRepository } from './pelicula.repository.js';
import { reservasRepository } from './reservas.repository.js';
import { FuncionController } from './funcion.controller.js';
import { FuncionRepository } from './funcion.repository.js';
import { FuncionServices } from './funcion.service.js';

@Module({
  imports:[
    TypeOrmModule.forFeature([Reserva,Asiento,DetalleReserva,Sala,Funcion,Pelicula])
  ],
  controllers: [ReservasController, PeliculaController,FuncionController],
  providers: [ReservasService, PeliculaServices,PeliculaRepository,reservasRepository,
              FuncionRepository, FuncionServices
              ]
})
export class ReservasModule {}
