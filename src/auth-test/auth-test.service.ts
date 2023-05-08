import { Injectable } from '@nestjs/common';

// TO REMOVE AFTER MANUAL TESTS
@Injectable()
export class AuthTestService {
    private testElements: string[] = ['test1', 'test2', 'test3'];

    public getTestElements(): string[] {
        return this.testElements;
    }
}
