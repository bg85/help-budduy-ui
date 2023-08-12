import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { User } from 'src/models/user';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get(':email')
    async getUserForEmail(@Param('email') email: string): Promise<User> {
        return await this.usersService.getUserByEmail(email);
    }

    @Post()
    async createUser(@Body() user: User): Promise<void> {
        await this.usersService.createUser(user);
    }

    @Put()
    async updateUser(@Body() user: User): Promise<void> {
        await this.usersService.updateUser(user);
    }
}
