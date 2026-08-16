import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const url = process.env.FRONTEND_URL!
  if (!url) throw new Error("Frontend Doesnot exist")
  const app = await NestFactory.create(AppModule);
  app.use("/api/auth", (req, res, next) => next())
  app.enableCors({
    origin: url,
    credentials: true
  })
  await app.listen(process.env.PORT ?? 4000);

}
bootstrap();
