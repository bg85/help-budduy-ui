import { IsNumber, IsString } from 'class-validator';

export class Step {
    @IsString() id: string;
    @IsString() name: string;
    @IsNumber() order: number;
    @IsString() serviceId: string;

    constructor(init?: Partial<Step>) {
        const defaultStep: Partial<Step> = {
            id: "",
            name: "",
            order: 0,
            serviceId: ""
        };
        Object.assign(this, defaultStep, init);
    }
}