import { Controller, Get, Param } from "@nestjs/common";
import { RolService } from "./rol.service.js";
import { Rol } from "./entities/rol.entity.js";


@Controller('rol')
export class RolController {
    constructor(
        private readonly rolServices:RolService
    ){}

    @Get()
    async obtenerrol():Promise<Rol[]>{
        return await this.rolServices.obtenerROl();
    }

    @Get(':idrol')
    async obtenerRolId(@Param ('idrol') idrol:number):Promise<Rol>{
        return await this.rolServices.obternetRolId(idrol);
    }
}