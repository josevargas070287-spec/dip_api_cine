import { Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { RolUsuario } from "./rol-usuario.entity.js";

@Entity({ schema: "seguridad", name: "rol" })
export class Rol {
  @PrimaryGeneratedColumn({ name: "id_rol" })
  idrol!: number;

  @Column({ name: "rol" })
  rol!: string;

  @OneToMany(
    "RolUsuario",
    (rolUsuario: RolUsuario) => rolUsuario.rol
  )
  rolUsuario!: RolUsuario[];
}