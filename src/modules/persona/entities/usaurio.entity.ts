import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({schema: 'seguridad', name:'usuario'})
export class Usuario{

    @PrimaryGeneratedColumn({name:'id_usuario'})
    idUsuario!: Number;

    @Column({name:'usuario'})
    usuario!: string;

    @Column({name:'constrasena'})
    contrasenia!:string;

    @Column({name:'fecha_creacion'})
    fechaCreacion!:Date;

}