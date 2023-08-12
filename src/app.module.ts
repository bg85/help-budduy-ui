import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from './users/users.module';
import { PaymentsModule } from './payments/payments.module';
import { LookupsModule } from './lookups/lookups.module';
import { LookupsService } from './lookups/lookups.service';
import { PaymentsService } from './payments/payments.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { PaymentsController } from './payments/payments.controller';
import { LookupsController } from './lookups/lookups.controller';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
    envFilePath: !ENV ? '.env.dev' : `.env.${ENV}`
    }), 
    HttpModule, 
    UsersModule, 
    PaymentsModule, 
    LookupsModule],
  controllers: [UsersController, PaymentsController, LookupsController],
  providers: [UsersService, PaymentsService, LookupsService],
})
export class AppModule {}
