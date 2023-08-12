import {IsString } from 'class-validator';

export class Wording {
    @IsString() id: string;
    @IsString() stepId: string;
    @IsString() text: string;

    constructor(init?: Partial<Wording>) {
        const defaultWording: Partial<Wording> = {
            id: "",
            stepId: "",
            text: ""
        };
        Object.assign(this, defaultWording, init);
    }
}