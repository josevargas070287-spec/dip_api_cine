import { IsDateString, IsNumber, IsString, Min, min } from "class-validator";

export class CreateReservaDto{

    @IsNumber()
    idCliente!: number;
    
    @IsNumber()
    idFuncion!: number;
    
    @IsDateString()
    fechaReserva!: Date;
    
    @IsString({message:'EL codigo es obligatorio'})
    codigo!: string;
    
    @IsString({message:'EL estado es obligatorio'})
    estado!: string;
    
    @IsNumber()
    @Min(1)
    total!: number;
    
}