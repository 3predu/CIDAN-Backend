import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    TokenModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
