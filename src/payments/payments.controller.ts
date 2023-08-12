import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Payment } from 'src/models/payment';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {

    constructor(private readonly paymentsService: PaymentsService){}

    @Get(':email')
        async getPayments(@Param('email') email: string): Promise<Payment[]> {
        return await this.paymentsService.getPayments(email);
    }

    @Post()
        async registerPayment(@Body() payment: Payment): Promise<void> {
        await this.paymentsService.registerPayment(payment);
    }

    @Post('cancelSubscription')
        async cancelSubscription(@Body() subscriptionInfo: {email: string, subscriptionId: string}): Promise<void> {
        await this.paymentsService.cancelSubscription(subscriptionInfo.email, subscriptionInfo.subscriptionId);
    }
}
