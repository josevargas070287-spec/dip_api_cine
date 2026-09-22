import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { createObserveModule } from '@nestjs/observe';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonaModule } from './modules/persona/persona.module.js';
import { ReservasModule } from './modules/reservas/reservas.module.js';
import { seconds, ThrottlerGuard, ThrottlerModule} from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core';


export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ThrottlerModule.forRoot(
      {
        throttlers:[
          {
            ttl: seconds(10),
            limit:5
          }
        ],
        errorMessage:'Demasiadas solicitudes vuela a conectarse'
      }
    ),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASWORD,
      entities: [import.meta.dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      logging: true
    }),
    
    /*
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'api-cine',
    }),
    */
    PersonaModule,
    
    ReservasModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule {

}
