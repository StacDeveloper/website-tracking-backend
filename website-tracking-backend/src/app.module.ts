import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule } from "@nestjs/config"
import { PrismaModule } from './prisma/prisma.module';
import { QueueModule } from './queues/queue.module';
import { ScanModule } from './scans/scan.module';
import { WebsitesModule } from './websites/website.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    BullModule.forRoot({
    connection: {
      host: "localhost",
      port: 6379
    }
  }), ConfigModule.forRoot({
    isGlobal: true
  }),
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver:ApolloDriver,
    autoSchemaFile:join(process.cwd(), "src/schema.gql"),
    sortSchema:true,
    installSubscriptionHandlers:true
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
