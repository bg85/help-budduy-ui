import { Injectable } from '@nestjs/common';
import { Service } from 'src/models/service';
import { Step } from 'src/models/step';
import { Wording } from 'src/models/wording';
import firebase from 'src/database';

@Injectable()
export class LookupsService {

    private readonly serviceName: string = "LookupsService";

    async getAllServices(): Promise<Service[]> {
        try {
            const servicesRef = firebase.collection('services');
            const servicesSnapshot = await servicesRef.get();
            let services: Service[] = servicesSnapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name
            }));
            
            return services;
        } catch(error: any) {
            throw new Error(`${this.serviceName}.Error getting services. Exception: ${error}`);
        }
      }
    
    async getStepsByServiceId(serviceId: string): Promise<Step[]> {
        try {
            const stepRef = firebase.collection('steps').where('serviceId', '==', serviceId);
            const stepSnapshot = await stepRef.get()
        
            let steps: Step[] = stepSnapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            order: doc.data().order,
            serviceId: doc.data().serviceId
            }));
        
            return steps;

        } catch(error: any) {
            throw new Error(`${this.serviceName}.Error getting steps by service id. Exception: ${error}`);
        }
    }
    
    async getWordingsByStepId(stepId: string): Promise<Wording[]> {
        try {
            const wordingRef = firebase.collection('wordings').where('stepId', '==', stepId);
            const wordingSnapshot = await wordingRef.get()
        
            let wordings: Wording[] = wordingSnapshot.docs.map((doc) => ({
            id: doc.id,
            stepId: doc.data().stepId,
            text: doc.data().text
            }));
        
            return wordings;

          } catch(error: any) {
            throw new Error(`${this.serviceName}.Error getting wordings by step id. Exception: ${error}`);
          }
    }
}
