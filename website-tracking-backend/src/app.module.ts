import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule } from "@nestjs/config"
import { PrismaModule } from './prisma/prisma.module';
import { QueueModule } from './queues/queue.module';
import { ScanModule } from './scans/scan.module';
import { WebsitesModule } from './websites/website.module';

@Module({
  imports: [BullModule.forRoot({
    connection: {
      host: "localhost",
      port: 6379
    }
  }), ConfigModule.forRoot({
    isGlobal: true
  }),
  PrismaModule,
  QueueModule,
  ScanModule,
  WebsitesModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
