import { IsDate, IsDateString, IsEmail, IsString } from "class-validator";

export class CreatePersonaDto {

    @IsString({message: 'Los nombres son obligatorios'})
    nombres!:String;

    @IsString({message: 'Los apellidos son obligatorios'})
    apellidos!:String;

    @IsString({message: 'El numero de documento es obligatorio'})
    documento!:String;

    @IsString({message: 'El numero de telefono es requerido'})
    telefono!:String;

    @IsEmail()
    email!:String;

    @IsDateString()
    fechaNacimiento!:Date;

}
