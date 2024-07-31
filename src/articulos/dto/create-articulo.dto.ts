import { IsDate, IsDateString, IsOptional, IsString, Max, MinLength } from "class-validator";

export class CreateArticuloDto {

    @IsString()
    //@MinLength(5)
    titulo: string;

    @IsString()
    //@MinLength(10)
    contenido: string;

    @IsDateString()
    fechaPublicacion: string;
    
    @IsString()
    //@MinLength(3)
    autor: string;
}
