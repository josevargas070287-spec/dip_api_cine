import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({schema: 'ventas', name:'reserva'})
export class Reserva{

    @PrimaryGeneratedColumn({name:'id_reserva'})
    idReserva!:number;

    @Column({name:'id_cliente'})
    idCliente!:number;

    @Column({name:'id_funcion'})
    idFuncion!:number;

    @Column({name:'fecha_reserva'})
    fechaReserva!:Date;

    @Column({name:'codigo_reserva'})
    codigoReserva!:String;

    @Column({name:'estado'})
    estado!:string;

    @Column({name:'total'})
    total!:number;

}