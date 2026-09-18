import { Controller } from '@nestjs/common';
import { ReservasService } from './reservas.service.js';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}
}
