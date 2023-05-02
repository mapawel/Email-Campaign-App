import { Injectable, Inject } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { Routes } from 'src/routes/Routes.enum';
import { AuthException } from '../exceptions/auth.exception';

@Injectable()
export class AuthService {
    constructor(
        @Inject('BASE_URL')
        private readonly BASE_URL: string,

        @Inject('AUTH0_BASE_URL')
        private readonly AUTH0_BASE_URL: string,

        @Inject('AUTH0_CLIENT_ID')
        private readonly AUTH0_CLIENT_ID: string,

        @Inject('AUTH0_CLIENT_SECRET')
        private readonly AUTH0_CLIENT_SECRET: string,

        @Inject('AUTH0_AUTHORIZE_ROUTE')
        private readonly AUTH0_AUTHORIZE_ROUTE: string,

        @Inject('AUTH0_GET_TOKEN_ROUTE')
        private readonly AUTH0_GET_TOKEN_ROUTE: string,

        @Inject('AUTH0_AUTH_API_AUDIENCE')
        private readonly AUTH0_AUTH_API_AUDIENCE: string,
    ) {
        this.validateIfExisting([
            this.BASE_URL,
            this.AUTH0_BASE_URL,
            this.AUTH0_CLIENT_ID,
            this.AUTH0_CLIENT_SECRET,
            this.AUTH0_AUTHORIZE_ROUTE,
            this.AUTH0_GET_TOKEN_ROUTE,
            this.AUTH0_AUTH_API_AUDIENCE,
        ]);
    }

    // TO REMOVE AFTER DEVELOPMENT AND IF TOKEN FLOW IMPLEMENTED IN FRONT
    public getAuthUrl(): string {
        const queryParams: URLSearchParams = new URLSearchParams({
            audience: this.AUTH0_AUTH_API_AUDIENCE,
            response_type: 'code',
            client_id: this.AUTH0_CLIENT_ID,
            redirect_uri: `${this.BASE_URL}${Routes.AUTH_ROUTE}${Routes.AUTH_CALLBACK_ROUTE}`,
            scope: 'offline_access openid profile email',
        });
        return `${this.AUTH0_BASE_URL}${this.AUTH0_AUTHORIZE_ROUTE}?${queryParams}`;
    }

    // TO REMOVE AFTER DEVELOPMENT AND IF TOKEN FLOW IMPLEMENTED IN FRONT
    public async getToken(code: string): Promise<string> {
        try {
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
            console.log('response.data ----> ', response.data);

            return response.data.access_token;
        } catch (err: any) {
            throw new AuthException('Error while getting an auth token', {
                cause: err,
            });
        }
    }

    // TO REMOVE IF TOKEN FLOW IMPLEMENTED IN FRONT
    // public async refreshToken(refreshToken: string): Promise<void> {
    //     try {
    //         const response: AxiosResponse = await axios({
    //             method: 'POST',
    //             url: `${this.AUTH0_BASE_URL}${this.AUTH0_GET_TOKEN_ROUTE}`,
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded',
    //             },
    //             data: {
    //                 grant_type: 'refresh_token',
    //                 client_id: this.AUTH0_CLIENT_ID,
    //                 client_secret: this.AUTH0_CLIENT_SECRET,
    //                 refresh_token: refreshToken,
    //             },
    //         });
    //         console.log('data ----> ', response.data);
    //     } catch (err: any) {
    //         throw new AuthException('Error while refreshing an auth token', {
    //             cause: err,
    //         });
    //     }
    // }

    private validateIfExisting(args: string[]): void {
        args.forEach((arg: string) => {
            if (!arg) {
                throw new AuthException('Missing required env.auth field');
            }
        });
    }
}
