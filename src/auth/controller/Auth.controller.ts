import { Controller, Get, Post, Query, Res } from '@nestjs/common';
import { AuthService } from '../service/Auth.service';
import { Routes } from 'src/routes/Routes.enum';
import { Response } from 'express';

@Controller(Routes.AUTH_ROUTE)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    public startAuth(@Res() res: Response) {
        const url = this.authService.getAuthUrl();
        return res.redirect(url);
    }

    @Get(Routes.AUTH_CALLBACK_ROUTE)
    public async getToken(
        @Query('code') code: string,
        @Res() res: Response,
    ): Promise<void> {
        const token: string = await this.authService.getToken(code);
        return res
            .cookie('token', token, {
                httpOnly: true,
                secure: true,
            })
            .redirect(Routes.BASE_ROUTE);
    }
}
