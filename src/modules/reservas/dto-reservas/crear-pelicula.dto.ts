import { Type, Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';
export class CrearPeliculaDto{

    @IsString({message:'El titulo de la pelicula es obligatorio'})
    titulo!: string;
    
    @IsString({message:'Debe enviar la sinopsis de la pelicula'})
    sinopsis!: string;
    
    @IsNumber()
    @Min(1)
    duracion!: number;
    
    @IsDateString()
    fecha!: Date;
    
    @IsBoolean()
    activo!: boolean;
}