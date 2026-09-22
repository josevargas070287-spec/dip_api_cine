import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { HandleException } from '../../common/decorators/handleException.decorator.js';
import { SuccessResponse } from '../../common/interfaces/CustomResponse.interface.js';
import { ResponseUtils } from '../../common/utils/Response.utils.js';
import { PaginacionParamsDto } from '../../common/dto/PaginacionParams.dto.js';
import { PaginationResult } from '../../common/interfaces/PaginationResult.type.js';
import { FuncionServices } from './funcion.service.js';
import { Funcion } from './entities/funcion.entity.js';
import { CrearFuncionDto } from './dto-reservas/crear-funcion.dto.js';

@Controller('funcion')
export class FuncionController {

    constructor(
        private readonly funcionService: FuncionServices
    ){}

    @Get()
    @HandleException('Error al obtener listado de funciones')
    async obtenerfuncion(@Query() dtoFuncion:PaginacionParamsDto):Promise<PaginationResult<Funcion>>{
        const funcion = await this.funcionService.obtenerFuncion(dtoFuncion);
        return ResponseUtils.paginated(
            funcion.data,
            funcion.total,
            dtoFuncion.pagina,
            dtoFuncion.porPagina,
            'Listado de Funciones'
        );
    }

    @Get(':id')
    @HandleException('Error al buscar función')
    async obtenerpeliculaId(@Param('id') id:number):Promise<Funcion>{
        return await this.funcionService.obtenerFuncionId(id);
    }
    /*
    @Post()
    @HandleException('Error al registrar a la función')
    async crearFuncion(
        @Body() datafuncionDto: CrearFuncionDto,
    ):Promise<SuccessResponse<Partial<Funcion>>>{
        const guardarfuncion= await this.funcionService.crearfuncion(datafuncionDto);
        return ResponseUtils.success(guardarfuncion,'Pelicula registrada correctamente');
    }
    */

    @Post()
    @HandleException('Error al registrar a la función')
    async crearFuncion(
        @Body() datafuncionDto: CrearFuncionDto,
    ): Promise<SuccessResponse<Partial<Funcion>>> {
        const guardarfuncion = await this.funcionService.crearfuncion(datafuncionDto);

        return ResponseUtils.success(
            guardarfuncion,
            'Pelicula registrada correctamente'
        );
    }

    @Patch(':idfun')
    @HandleException('Error al actuaizar la función')
    async modificarFuncion(@Param('idfun') id:number,@Body() dataFuncionDto:CrearFuncionDto){
        const modificarFunciones = await this.funcionService.modificarfuncion(id,dataFuncionDto);
        return ResponseUtils.success(modificarFunciones,'Se modifico correctamente');
    }

}
