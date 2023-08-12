import { IsBoolean, IsString } from 'class-validator';

export class User {
    @IsString() id: string;
    @IsString() email: string;
    @IsString() firstName: string;
    @IsString() lastName: string;
    @IsBoolean() active: boolean;
    @IsBoolean() subscribed: boolean;
    @IsString() role: string;
    @IsString() institution: string;
    @IsString() lastPayment: string;
    @IsString() subscriptionId: string;

    constructor(init?: Partial<User>) {
        const defaultUser: Partial<User> = {
            id: "",
            email: "",
            firstName: "",
            lastName: "",
            role: "",
            institution: "",
            subscriptionId: "",
            lastPayment: ""
        };
        Object.assign(this, defaultUser, init);
    }
}