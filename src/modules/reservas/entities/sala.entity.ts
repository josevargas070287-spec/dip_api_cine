import {Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Asiento } from './asiento.entity.js';
import { Funcion } from './funcion.entity.js';
import { Rol } from '../../persona/entities/rol.entity.js';



@Entity({name:'sala', schema:'cartelera' })
export class Sala{

    @PrimaryGeneratedColumn({name:'id_sala'})
    id!: number;

    @Column({name:'nombre'})
    nombre!: string;

    @Column({name:'capacidad'})
    capacidad!: number;

    @Column({name:'tipo'})
    tipo!: string;

    @Column({name:'activa'})
    activa!: boolean;

    @OneToMany(
        ()=>Asiento,
        (asiento: Asiento )=> asiento.sala
    )
    asiento!: Asiento[];

     @OneToMany(
        ()=>Funcion,
        (funcion: Funcion)=> funcion.sala
     )
     funcion!:Funcion[];
     

}