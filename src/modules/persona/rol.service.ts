import { Injectable, NotFoundException } from "@nestjs/common";
import { RolRepository } from "./rol.repository.js";
import { Rol } from "./entities/rol.entity.js";
import { NotFoundError } from "rxjs";

@Injectable()
export class RolService{
    constructor(
        private readonly rolRepository:RolRepository
    ){}

    async obtenerROl():Promise<Rol[]>{
        const rol = await this.rolRepository.obtenerRol();
        return rol;
    }

    async obternetRolId(id:number){
        const rol =  await this.rolRepository.obternerRolId(id);
        if (!rol)
            throw new NotFoundException("No Existe el Rol")
        return rol;
    }
}