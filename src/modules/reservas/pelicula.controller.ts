import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PeliculaServices } from './pelicula.service.js';
import { Pelicula } from './entities/pelicula.entity.js';
import { identity } from 'rxjs';
import { CrearPeliculaDto } from './dto-reservas/crear-pelicula.dto.js';
import { HandleException } from '../../common/decorators/handleException.decorator.js';
import { SuccessResponse } from '../../common/interfaces/CustomResponse.interface.js';
import { ResponseUtils } from '../../common/utils/Response.utils.js';
import { PaginacionParamsDto } from '../../common/dto/PaginacionParams.dto.js';
import { PaginationResult } from '../../common/interfaces/PaginationResult.type.js';

@Controller('pelicula')
export class PeliculaController {

    constructor(
        private readonly peliculaService: PeliculaServices
    ){}

    @Get()
    async obtenerpelicula(@Query() dtoPelicula:PaginacionParamsDto):Promise<PaginationResult<Pelicula>>{
        const peliculas = await this.peliculaService.obtenerPelicula(dtoPelicula);
        return ResponseUtils.paginated(
            peliculas.data,
            peliculas.total,
            dtoPelicula.pagina,
            dtoPelicula.porPagina,
            'Listado de peliculas'
        );
    }

    @Get(':idpelicula')
    async obtenerpeliculaId(@Param('idpelicula') id:number):Promise<Pelicula>{
        return await this.peliculaService.obtenerPeliculaId(id);
    }

    @Post()
    @HandleException('Error al registrar a la pelicula')
    async crearPelicula(
        @Body() dataPeliculaDto: CrearPeliculaDto,
    ):Promise<SuccessResponse<Partial<Pelicula>>>{
        const guaradarPelicula= await this.peliculaService.crearPelicula(dataPeliculaDto);
        return ResponseUtils.success(guaradarPelicula,'Pelicula registrada correctamente');
    }

    @Patch(':idpeli')
    @HandleException('Error al registrar a la pelicula')
    async modificarPelicula(@Param('idpeli') id:number,@Body() dataPeliculaDto:CrearPeliculaDto){
        const modificarPelicula = await this.peliculaService.modificarPelicula(id,dataPeliculaDto);
        return ResponseUtils.success(modificarPelicula,'Se modifico correctamente');
    }

}
