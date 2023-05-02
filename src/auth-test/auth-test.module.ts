import { Module } from '@nestjs/common';
import { AuthTestController } from './auth-test.controller';
import { AuthTestService } from './auth-test.service';

// TO REMOVE AFTER MANUAL TESTS
@Module({
  controllers: [AuthTestController],
  providers: [AuthTestService]
})
export class AuthTestModule {}
