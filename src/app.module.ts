import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TokenModule } from './token/token.module';
import { UnityModule } from './unity/unity.module';
import { RequirementModule } from './requirement/requirement.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    TokenModule,
    UnityModule,
    RequirementModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
