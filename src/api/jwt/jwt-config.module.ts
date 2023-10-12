import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET"),
        // signOptions: { expiresIn: configService.get<string>("JWT_EXPIRES_IN") },
      }),
    }),
  ],
  exports: [JwtModule]
})
export class JwtConfigModule { }
