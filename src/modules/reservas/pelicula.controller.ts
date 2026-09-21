import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PeliculaServices } from './pelicula.service.js';
import { Pelicula } from './entities/pelicula.entity.js';
import { identity } from 'rxjs';
import { CrearPeliculaDto } from './dto-reservas/crear-pelicula.dto.js';

@Controller('pelicula')
export class PeliculaController {

    constructor(
        private readonly peliculaService: PeliculaServices
    ){}

    @Get()
    async obtenerpelicula():Promise<Pelicula[]>{
        return await this.peliculaService.obtenerPelicula();
    }

    @Get(':idpelicula')
    async obtenerpeliculaId(@Param('idpelicula') id:number):Promise<Pelicula>{
        return await this.peliculaService.obtenerPeliculaId(id);
    }

    @Post()
    async crearPelicula(
        @Body() dataPeliculaDto: CrearPeliculaDto,
    ):Promise<Partial<Pelicula>>{
        const guaradarPelicula= await this.peliculaService.crearPelicula(dataPeliculaDto);
        return guaradarPelicula;
    }

    @Patch(':idpeli')
    async modificarPelicula(@Param('idpeli') id:number,@Body() dataPeliculaDto:CrearPeliculaDto){
        return await this.peliculaService.modificarPelicula(id,dataPeliculaDto);
    }

}
