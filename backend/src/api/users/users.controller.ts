import { Controller, Get } from '@nestjs/common';
import { AuthUser } from '../../shared/decorators/auth-user.decorator';
import { Roles } from '../../shared/decorators/roles.decorators';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Get('me')
    @Roles('user', 'premium', 'admin')
    async getMe(@AuthUser() user) {
        return await this.usersService.findOne({
            id: user.id
        });
    }
}
