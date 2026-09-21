import { IsString } from "class-validator";

export class CrearRolDto{

    @IsString({message: 'El nombre del Rol es obligatorio'})
    rol!:String;

}