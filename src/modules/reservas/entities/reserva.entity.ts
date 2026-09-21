import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';

import { DetalleReserva } from './detalle-reserva.entity.js';
import { Funcion } from './funcion.entity.js';
import { Cliente } from '../../persona/entities/cliente.entity.js';

@Entity({ schema: 'ventas', name: 'reserva' })
export class Reserva{

  @PrimaryGeneratedColumn({ name: 'id_reserva' })
  id!: number;

  @Column({ name: 'id_cliente' })
  idCliente!: number;

  @Column({ name: 'id_funcion' })
  idFuncion!: number;

  @Column({ name: 'fecha_reserva' })
  fechaReserva!: Date;

  @Column({ name: 'codigo_reserva' })
  codigo!: string;

  @Column({ name: 'estado' })
  estado!: string;

  @Column({ name: 'total' })
  total!: number;

  @ManyToOne(
    () => Cliente,
    (cliente: Cliente) => cliente.reservas
  )
  @JoinColumn({ name: 'id_cliente' })
  cliente!: Cliente[];

  @OneToMany(
    ()=>DetalleReserva,
    (detalleReserva: DetalleReserva) => detalleReserva.reserva
  )
  detalleReserva!: DetalleReserva[];

  @ManyToOne(
    () => Funcion,
    (funcion: Funcion) => funcion.reserva
  )
  @JoinColumn({ name: 'id_funcion' })
  funcion!: Funcion;
}