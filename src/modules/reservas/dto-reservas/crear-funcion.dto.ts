import { IsDateString, IsNumber, IsPositive, IsString, Matches } from "class-validator";

export class CrearFuncionDto{

    @IsNumber()
    idPelicula!: number;
    
    @IsNumber()
    idSala!: number;
        
    @IsDateString()
    fecha!: Date;
    
    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'La hora de inicio debe tener el formato HH:mm:ss'})
    horaInicio!: string;

    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'La hora de fin debe tener el formato HH:mm:ss',
    })
    horaFin!: string;
    
    @IsNumber()
    @IsPositive()
    precio!: number;

    @IsString({message:'El estado es Requeridp'})
    estado!: string;

}