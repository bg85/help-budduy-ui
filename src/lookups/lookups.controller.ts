import { Controller, Get, Param } from '@nestjs/common';
import { Service } from 'src/models/service';
import { Step } from 'src/models/step';
import { Wording } from 'src/models/wording';
import { LookupsService } from './lookups.service';

@Controller('lookups')
export class LookupsController {

    constructor(private readonly lookupsService: LookupsService){}

    @Get('/services')
        async getTest(): Promise<Service[]> {
        return await this.lookupsService.getAllServices();
    }

    @Get('/steps/service/:id')
        async getStepsForService(@Param('id') serviceId: string): Promise<Step[]> {
        return await this.lookupsService.getStepsByServiceId(serviceId);
    }

    @Get('/wording/step/:id')
        async getWordingForStep(@Param('id') stepId: string): Promise<Wording[]> {
        return await this.lookupsService.getWordingsByStepId(stepId);
    }
}
