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
import GraphQLJSON from 'graphql-type-json';
import { AuthModule } from './auth/auth.module';

const url = new URL(process.env.REDIS_URL! as string)
if (!url) throw new Error("Redis is not initialized properly")
@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: url.host,
        port: Number(url.port),
        password: url.password,
        tls: url.protocol === "rediss:'" ? {} : undefined,
        maxRetriesPerRequest:null,
        enableReadyCheck:false
      }
    }), ConfigModule.forRoot({
      isGlobal: true
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      sortSchema: true,
      installSubscriptionHandlers: true,
      resolvers: { JSON: GraphQLJSON },
      context: ({ req, res }) => ({ req, res })
    }),
    PrismaModule,
    QueueModule,
    ScanModule,
    WebsitesModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

