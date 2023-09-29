import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TokenModule } from './token/token.module';
import { UnityModule } from './unity/unity.module';
import { RequirementModule } from './requirement/requirement.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    TokenModule,
    UnityModule,
    RequirementModule,
    DashboardModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
