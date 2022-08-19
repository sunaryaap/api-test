import {IsNotEmpty} from "class-validator";

export class CreateDataClientDto {
    @IsNotEmpty()
    id_device: string;
    
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    user_agent: string;

    @IsNotEmpty()
    remote_address: string;

    @IsNotEmpty()
    geolocation: string;
}
