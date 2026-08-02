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
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      sortSchema: true,
      installSubscriptionHandlers: true,
      resolvers: { JSON: GraphQLJSON }
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

// One heads-up: https://example.com is fine for passive tests, but active tests (SQLi, XSS, etc.) will just return harmless "not vulnerable" results against it since it's a static placeholder page — good enough to confirm the pipeline works end-to-end, not to prove the detection logic works. Want a suggestion for a legally safe target to test detection against real vulnerabilities?
// Note on JWT test realism: real sites don't expose tokens on a plain GET /. In practice, the user will need to provide a login endpoint + test credentials (or an existing token) when registering the site for scanning — worth adding a testCredentials field to Website later. For now this works for sites that set the JWT as a cookie/header on any page load.

// // That's JWT + Rate-limit done — 14 of 21 tests built. Remaining: BOT, FAKE_USER, FILE_UPLOAD, COMMAND_INJECTION_XXE, BROKEN_ACCESS_CONTROL, API_MASS_ASSIGNMENT, XSS. Want to keep going through these now?
// SSRF only fires against params that look URL-fetching — real coverage needs crawling the site first to discover such params (a future improvement, not needed now).
// OSV.dev is free/public, no key required, but package name matching (nginx, PHP, WordPress) needs to align with their ecosystem naming — you may need to map fingerprint names to OSV's expected package names as you test real sites.
// SSRF and DEPENDENCY_CVE are more involved — SSRF needs a param-fuzzing approach (try internal IPs like 169.254.169.254, localhost) and CVE-scanning needs a fingerprint-to-CVE-database lookup (e.g., via Wappalyzer-style detection + a vuln DB API)
