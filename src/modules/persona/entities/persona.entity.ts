import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity.js";
import { Cliente } from "./cliente.entity.js";

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

    @BeforeInsert()
    @BeforeUpdate()
    checkSlugInsert(){
        this.nombres = this.nombres.toUpperCase();
        this.apellidos = this.apellidos.toUpperCase();
        
    }

    @OneToOne(
        ()=> Usuario,
        (usuario:Usuario) => usuario.persona
    )
    usuario:Usuario;

    @OneToOne(
        ()=>Cliente,
        (cliente:Cliente) => cliente.persona
    )
    cliente!:Cliente;

}
