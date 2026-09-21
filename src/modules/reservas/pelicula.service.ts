import { Injectable } from '@nestjs/common';
import { PeliculaRepository } from './pelicula.repository.js';

@Injectable()
export class PeliculaServices{
    constructor(
        private readonly peliculaRepository:PeliculaRepository
    ){}

    
}
