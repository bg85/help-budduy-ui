import { IsString } from 'class-validator';

export class Service {
    @IsString() id: string;
    @IsString() name: string;

    constructor(init?: Partial<Service>) {
        const defaultService: Partial<Service> = {
            id: "",
            name: ""
        };
        Object.assign(this, defaultService, init);
    }
}