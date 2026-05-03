import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HotelsModule } from './hotels/hotels.module';
import { RoomsModule } from './rooms/rooms.module';
import { BookingsModule } from './bookings/bookings.module';
import { ReviewsModule } from './reviews/reviews.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { StripeModule } from './stripe/stripe.module';
import { EmailModule } from './email/email.module';
import { UmrahModule } from './umrah/umrah.module';
import { UmrahbookingsModule } from './umrahbookings/umrahbookings.module';
import { InvoicesModule } from './invoices/invoices.module';
import { InvoiceModule } from './invoice/invoice.module';
import { HotelInvoiceModule } from './hotel-invoice/hotel-invoice.module';
import { NotificationsModule } from './notifications/notifications.module';

// Debug: log raw env at module load time
console.log('=== APP MODULE LOAD ===');
console.log('DATABASE_URL at module load:', process.env.DATABASE_URL);
console.log('=======================');

@Module({
  imports: [
    // ConfigModule MUST be first so env is available to everything below
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        // Debug: log what TypeORM actually receives
        console.log('=== TYPEORM CONFIG ===');
        console.log('DATABASE_URL received:', process.env.DATABASE_URL);
        console.log('=====================');

        return {
          type: 'postgres',
          url: process.env.DATABASE_URL,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: false,
          ssl: {
            rejectUnauthorized: true,
          },
        };
      },
    }),
    UserModule,
    AuthModule,
    HotelsModule,
    RoomsModule,
    BookingsModule,
    ReviewsModule,
    FileUploadModule,
    StripeModule,
    EmailModule,
    UmrahModule,
    UmrahbookingsModule,
    InvoicesModule,
    InvoiceModule,
    HotelInvoiceModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}