import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import firebase from 'src/database';
import { Payment } from 'src/models/payment';
import { UsersService } from 'src/users/users.service';
import { catchError, lastValueFrom, map } from 'rxjs';

@Injectable()
export class PaymentsService {
    private readonly serviceName: string = "PaymentsService";

    constructor(private httpService: HttpService, private readonly userService: UsersService) { }

    async registerPayment(payment: Payment): Promise<void> {
        try {

            var newPaymentRef = firebase.collection("payments").doc();
            await newPaymentRef.set({
                userEmail: payment.userEmail,
                paypalEmail: payment.paypalEmail,
                amount: payment.amount,
                date: payment.date,
                orderId: payment.orderId,
                subscriptionId: payment.subscriptionId
            });

        } catch(error: any) {
            throw new Error(`${this.serviceName}.Error registering a payment. Exception: ${error}`);
        }
        
        try {

            await this.userService.updateUser({email: payment.userEmail, lastPayment: payment.date, active: true, subscribed: payment.subscriptionId !== "", subscriptionId: payment.subscriptionId });

        } catch(error: any) {
            throw new Error(`${this.serviceName}.Error updating the user after registering a payment. Exception: ${error}`);
        }
    }

    async getPayments(email: string): Promise<Payment[]> { 
        try {
            const decodedEmail = Buffer.from(email, "base64").toString("ascii");
            const paymentRef = firebase.collection('payments')
            .where('userEmail', '==', decodedEmail.toLocaleLowerCase())
            .orderBy("date", "desc");
            
            const paymentSnapshot = (await paymentRef.get()).docs;

            return paymentSnapshot.map(p =>
                new Payment({
                    id: p.id, 
                    date: p.data().date,
                    amount: p.data().amount,
                    orderId: p.data().orderId,
                    subscriptionId: p.data().subscriptionId,
                    userEmail: p.data().userEmail,
                    paypalEmail: p.data().paypalEmail
                }));

        } catch(error: any) {
            throw new Error(`${this.serviceName}.Error getting payment history. Exception: ${error}`);
        }  
    }

    async cancelSubscription(email: string, subscriptionId: string) {
        let authToken: any = null;

        try {

            authToken = await this.getAuthorizationToken();

        } catch(error: any) {
            throw new Error(`${this.serviceName}.Error getting authorization token to cancel subscription. Exception: ${error}`);
        }

        try {

            await this.cancelPaypalSubscription(authToken, subscriptionId);

        } catch(error: any) {
            throw new Error(`${this.serviceName}.Error cancelling paypal subscription subscription. Exception: ${error}`);
        }
    
        try {

            var today = new Date();
            var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1);
            await this.userService.updateUser({email: email, lastPayment: lastDayOfMonth.toString(), active: true, subscribed: false, subscriptionId: null });

        } catch(error: any) {
            throw new Error(`${this.serviceName}.Error updating user after cancelling subscription. Exception: ${error}`);
        }
    }

    private async getAuthorizationToken() {
        let result = await lastValueFrom(this.httpService.post(process.env.AUTH_TOKEN_URL, "grant_type=client_credentials", 
        {
            headers: {
            'accept': 'application/json',
            'accept-language': 'en_US',
            'authorization': `basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.SECRET}`).toString("base64")}`,
            'content-type': 'application/x-www-form-urlencoded',
            }
        })
        .pipe(
            catchError(e => {
                throw new HttpException(e.response.data, e.response.status);
            }),
        ).pipe(map(response => response.data.access_token)));
        
        return result;
    };

    private async cancelPaypalSubscription(authToken: string, subscriptionId: string) {
        let result = await lastValueFrom(this.httpService.post(`${process.env.SUBSCRIPTION_URL}/${subscriptionId}/cancel`, null, 
        {
            headers: {
            'authorization': `Bearer ${authToken}`,
            'content-type': 'application/json',
            'accept': 'application/json'
            }
        })
        .pipe(
            catchError(e => {
            console.log(e);
            throw new HttpException(e.response.data, e.response.status);
            }),
        ).pipe(map(response => response.data)));
        
        return result;
    }
}
