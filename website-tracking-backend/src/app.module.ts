import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule } from "@nestjs/config"

@Module({
  imports: [BullModule.forRoot({
    connection: {
      host: "localhost",
      port: 6379
    }
  }), ConfigModule.forRoot({
    isGlobal: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
