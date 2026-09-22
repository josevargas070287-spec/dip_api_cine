import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Funcion } from './funcion.entity.js';


@Entity({ schema: 'cartelera', name: 'pelicula' })
export class Pelicula {

    @PrimaryGeneratedColumn({name:'id_pelicula'})
    idPelicula!: number;

    @Column({name:'titulo'})
    titulo!: string;

    @Column({name:'sinopsis'})
    sinopsis!: string;

    @Column({name:'duracion_minutos'})
    duracion!: number;

    @Column({name:'fecha_estreno'})
    fecha!: Date;

    @Column({name:'activo'})
    activo!: boolean;

    @Column({
    name: 'imagen',
    nullable: true,
    })
    imagen!: string;

    @BeforeInsert()
    @BeforeUpdate()
    checkSlugInsert(){
        this.titulo = this.titulo.toUpperCase();
    }

    @OneToMany(
        ()=> Funcion,
        (funcion: Funcion)=> funcion.pelicula
    )
    funcion!: Funcion[];
}
