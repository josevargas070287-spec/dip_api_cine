import { IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({schema:'identidad',name:'persona'})
export class Persona {
    @PrimaryGeneratedColumn({name:'id_persona'})
    idPersona!:Number;

    @Column({name:'nombres'})
    nombres!:String;

    @Column({name:'apellidos'})
    apellidos!:String;

    @Column({name:'documento'})
    documento!:String;

    @Column({name:'telefono'})
    telefono!:String;

    @Column({name:'email'})
    email!:String;

    @Column({name:'fecha_nacimiento'})
    fechaNacimiento!:Date;

}
