import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReservasService } from './reservas.service.js';
import { Reserva } from './entities/reserva.entity.js';
import { CreateReservaDto } from './dto-reservas/create-reserva.dto.js';
import { HandleException } from '../../common/decorators/handleException.decorator.js';
import { ResponseUtils } from '../../common/utils/Response.utils.js';
import { SuccessResponse } from '../../common/interfaces/CustomResponse.interface.js';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Get()
  async obtenerreserva():Promise<Reserva[]>{
    return this.reservasService.obtenerReserva();
  }

  @Get(':id')
    async obtenerPersonaId(@Param('id') id:number):Promise<Reserva>{
      return await this.reservasService.obtenerReservaId(id);
    }

  @Post()
  @HandleException('Error al registrar a la reserva')
  async crearReserva(@Body() dataDtoReserva: CreateReservaDto):Promise<SuccessResponse<Partial<Reserva>>>{
    const reserva = await this.reservasService.crearReserva(dataDtoReserva);
    return ResponseUtils.success(reserva,'Reserva registrada correctamente')    
  }

}


