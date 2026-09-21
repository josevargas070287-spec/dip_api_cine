import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { PersonaService } from './persona.service.js';
import { CreatePersonaDto } from './dto/create-persona.dto.js';
import { UpdatePersonaDto } from './dto/update-persona.dto.js';
import { Persona } from './entities/persona.entity.js';
import type { Response } from 'express';

@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Get()
  @HttpCode(HttpStatus.ACCEPTED)
  async obtenerpersonas(
    @Res() response: Response
  ):Promise<Response>{
    const persona = await this.personaService.obtenerPersonas();
    return response
    .status(HttpStatus.ACCEPTED)
    .header('Content-Type','application/json')
    .json({
      success: true,
      statusCode: HttpStatus.ACCEPTED,
      message: 'Lista de personas obtenidas',
      data: persona,
      timetamp: new Date().toISOString()
    })
  }

  @Get(':id')
  async obtenerPersonaId(@Param('id') id:number):Promise<Persona>{
    return await this.personaService.obtenerPersonaId(id);
  }

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async crearPersona(
      @Body() dataDto:CreatePersonaDto,
      @Res() response: Response
    ):Promise<Response>{
    try {
      const persona = await this.personaService.crearPersona(dataDto);
      return response 
      .status(HttpStatus.ACCEPTED)
      .header('Content-Type','application/json')
      .json({
        success: true,
        statusCode: HttpStatus.ACCEPTED,
        message: 'Se Guardo la persona correctamente',
        data: persona,
        timetamp: new Date().toISOString()
      })
    } catch (error) {
      return response 
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .header('Content-Type','application/json')
      .json({
        success: true,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Ocurrio un Problema al guardar los datos',
        data: null,
        timetamp: new Date().toISOString()
      })
    }
    
  }

  @Patch(':id')
  async modificarPersona(@Param('id') id:number, @Body() dataDto: CreatePersonaDto){
    return await this.personaService.ModificarPersona(id,dataDto);
  }
}