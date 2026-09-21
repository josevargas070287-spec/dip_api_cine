import { Injectable } from "@nestjs/common";
import { Rol } from "./entities/rol.entity.js";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class RolRepository{
    constructor (
        @InjectRepository(Rol)
        private readonly rolRepository: Repository<Rol>
    ){}

    async obtenerRol():Promise<Rol[]>{
        return await this.rolRepository.find(
            {
                order:{
                    rol:'ASC'
                }
            }
        )
    }

    async obternerRolId(id: number):Promise<Rol | null>{
            return await this.rolRepository.findOne({where:{idrol:id}});
    }

}