export class AuthException extends Error {
    constructor(message: string, options?: any) {
        super(message, options);
    }
    name = 'AuthException';
}
