import { Body, ConflictException, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService,
        private usersService: UsersService) { }


    @Post('signin')
    async signIn(@Body() body, @Res() res) {
        const user = await this.authService.signIn(body.email, body.password);

        if (user) {
            var jwt = await this.authService.createToken(user);
            res.status(HttpStatus.OK).send({ "jwt": jwt });
        } else {
            res.status(HttpStatus.OK).send({});
        }
    }

    @Post('signup')
    async signUp(@Body() createUserDto: CreateUserDto, @Res() res) {
        const emailConflict = await this.usersService.findOne({ email: createUserDto.email });

        if (emailConflict)
            throw new ConflictException("email");

        const user = await this.authService.signUp(createUserDto);

        if (user) {
            res.status(HttpStatus.OK).send(true);
        } else {
            res.status(HttpStatus.OK).send(false);
        }
    }

    @Get('email-free/:email')
    async emailFree(@Param() params, @Res() res) {
        const user = await this.usersService.findOne({ email: params.email });

        if (!user) {
            res.status(HttpStatus.OK).send(true);
        } else {
            res.status(HttpStatus.OK).send({});
        }
    }
}
