import { Entity, PrimaryGeneratedColumn } from "typeorm";

Entity({schema:'ventas', name:'detalle_reserva'})
export class DetalleReserva{

    @PrimaryGeneratedColumn({name:'id_detalle_reserva'})
    idDetalleReserva!:number;


}