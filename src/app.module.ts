import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobModule } from './module/job/job.module';
import { UserModule } from './module/user/user.module';
import { database } from "./config/mysql";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    JobModule, 
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        database,
      ],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get("db_config"),
      inject: [ConfigService]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
