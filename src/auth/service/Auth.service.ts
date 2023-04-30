import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Routes } from 'src/routes/Routes.enum';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class AuthService {
    private readonly BASE_URL: string | undefined;
    private readonly AUTH0_BASE_URL: string | undefined;
    private readonly AUTH0_CLIENT_ID: string | undefined;
    private readonly AUTH0_CLIENT_SECRET: string | undefined;
    private readonly AUTH0_AUTHORIZE_ROUTE: string | undefined;
    private readonly AUTH0_GET_TOKEN_ROUTE: string | undefined;
    private readonly AUTH0_AUTH_API_AUDIENCE: string | undefined;

    constructor(private readonly configService: ConfigService) {
        this.BASE_URL = this.configService.get<string>('BASE_URL');
        this.AUTH0_BASE_URL = this.configService.get<string>('AUTH0_BASE_URL');
        this.AUTH0_CLIENT_ID =
            this.configService.get<string>('AUTH0_CLIENT_ID');
        this.AUTH0_CLIENT_SECRET = this.configService.get<string>(
            'AUTH0_CLIENT_SECRET',
        );
        this.AUTH0_AUTHORIZE_ROUTE = this.configService.get<string>(
            'AUTH0_AUTHORIZE_ROUTE',
        );
        this.AUTH0_GET_TOKEN_ROUTE = this.configService.get<string>(
            'AUTH0_GET_TOKEN_ROUTE',
        );
        this.AUTH0_AUTH_API_AUDIENCE = this.configService.get<string>(
            'AUTH0_AUTH_API_AUDIENCE',
        );

        if (
            !this.BASE_URL ||
            !this.AUTH0_BASE_URL ||
            !this.AUTH0_CLIENT_ID ||
            !this.AUTH0_CLIENT_SECRET ||
            !this.AUTH0_AUTHORIZE_ROUTE ||
            !this.AUTH0_GET_TOKEN_ROUTE ||
            !this.AUTH0_AUTH_API_AUDIENCE
        ) {
            throw new Error('Auth0 config is not set!');
        }
    }

    public getAuthUrl(): string {
        const queryParams: URLSearchParams = new URLSearchParams({
            response_type: 'code',
            client_id: this.AUTH0_CLIENT_ID as string,
            redirect_uri: `${this.BASE_URL}${Routes.AUTH_ROUTE}${Routes.AUTH_CALLBACK_ROUTE}`,
            scope: 'offline_access',
        });

        return `${this.AUTH0_BASE_URL}${this.AUTH0_AUTHORIZE_ROUTE}?${queryParams}`;
    }

    public async getToken(code: string): Promise<void> {
        const response: AxiosResponse = await axios({
            method: 'POST',
            url: `${this.AUTH0_BASE_URL}${this.AUTH0_GET_TOKEN_ROUTE}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: {
                grant_type: 'authorization_code',
                client_id: this.AUTH0_CLIENT_ID,
                client_secret: this.AUTH0_CLIENT_SECRET,
                code,
                redirect_uri: `${this.BASE_URL}${Routes.AUTH_ROUTE}${Routes.AUTH_CALLBACK_ROUTE}`,
            },
        });

        console.log('data ----> ', response.data);
    }

    public async refreshToken(refreshToken: string): Promise<void> {
        const response: AxiosResponse = await axios({
            method: 'POST',
            url: `${this.AUTH0_BASE_URL}${this.AUTH0_GET_TOKEN_ROUTE}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: {
                grant_type: 'refresh_token',
                client_id: this.AUTH0_CLIENT_ID,
                client_secret: this.AUTH0_CLIENT_SECRET,
                refresh_token: refreshToken,
            },
        });
        
        console.log('data ----> ', response.data);
    }
}
