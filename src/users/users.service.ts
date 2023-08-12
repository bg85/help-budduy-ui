import { Injectable } from '@nestjs/common';
import firebase from 'src/database';
import { User } from 'src/models/user';

@Injectable()
export class UsersService {

    private readonly serviceName: string = "UserService";
    
    async getUserByEmail(email: string): Promise<User> {
        try {

            const decodedEmail = Buffer.from(email, "base64").toString("ascii");
            const userRef = firebase.collection('users').where('email', '==', decodedEmail.toLocaleLowerCase());
            const userSnapshot = (await userRef.get()).docs;

            return userSnapshot.length === 0 ? null :
            new User({
                id: userSnapshot[0].id, 
                firstName: userSnapshot[0].data().firstName,
                lastName: userSnapshot[0].data().lastName,
                email: userSnapshot[0].data().email,
                role: userSnapshot[0].data().role,
                institution: userSnapshot[0].data().institution,
                active: userSnapshot[0].data().active,
                lastPayment: userSnapshot[0].data()?.lastPayment,
                subscribed: userSnapshot[0].data().subscribed,
                subscriptionId: userSnapshot[0].data().subscriptionId
            });
            
        } catch(error: any) {
            throw new Error(`${this.serviceName}.Error getting user by email. Exception: ${error}`);
        }
    }

    async createUser(user: User): Promise<void> {
        try {
            var newUserRef = firebase.collection("users").doc();
            await newUserRef.set({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email.toLocaleLowerCase(),
                role: user.role,
                institution: user.institution,
                active: false,
                subscribed: false,
                lastPayment: ""
            });

        } catch(error: any) {
            throw new Error(`${this.serviceName}.Error creating user. Exception: ${error}`);
        }
    }

    async updateUser(user: Partial<User>): Promise<void> {
        try {
            
            if (user && user.email) {
                const userRef = firebase.collection('users').where('email', '==', user.email.toLocaleLowerCase());
                let userSnapshot = (await userRef.get()).docs;
                await userSnapshot[0].ref.set(user, {merge: true});
            }

        } catch(error: any) {
            throw new Error(`${this.serviceName}.Error updating user. Exception: ${error}`);
        }
    }
}
