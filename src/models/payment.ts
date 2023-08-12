import { IsString, IsNumber } from 'class-validator';

export class Payment {
    @IsString() id: string;
    @IsString() userEmail: string;
    @IsString() paypalEmail: string;
    @IsString() date: string;
    @IsNumber() amount: number;
    @IsString() orderId: string;
    @IsString() subscriptionId: string;

    constructor(init?: Partial<Payment>) {
        const defaultPayment: Partial<Payment> = {
            id: "",
            paypalEmail: "",
            date: "",
            amount: 0.0,
            orderId: "",
            subscriptionId: ""
        };
        Object.assign(this, defaultPayment, init);
    }
}