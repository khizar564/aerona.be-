"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const hotels_module_1 = require("./hotels/hotels.module");
const rooms_module_1 = require("./rooms/rooms.module");
const bookings_module_1 = require("./bookings/bookings.module");
const reviews_module_1 = require("./reviews/reviews.module");
const file_upload_module_1 = require("./file-upload/file-upload.module");
const stripe_module_1 = require("./stripe/stripe.module");
const email_module_1 = require("./email/email.module");
const umrah_module_1 = require("./umrah/umrah.module");
const umrahbookings_module_1 = require("./umrahbookings/umrahbookings.module");
const invoices_module_1 = require("./invoices/invoices.module");
const invoice_module_1 = require("./invoice/invoice.module");
const hotel_invoice_module_1 = require("./hotel-invoice/hotel-invoice.module");
const notifications_module_1 = require("./notifications/notifications.module");
console.log('=== APP MODULE LOAD ===');
console.log('DATABASE_URL at module load:', process.env.DATABASE_URL);
console.log('=======================');
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: () => {
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
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            hotels_module_1.HotelsModule,
            rooms_module_1.RoomsModule,
            bookings_module_1.BookingsModule,
            reviews_module_1.ReviewsModule,
            file_upload_module_1.FileUploadModule,
            stripe_module_1.StripeModule,
            email_module_1.EmailModule,
            umrah_module_1.UmrahModule,
            umrahbookings_module_1.UmrahbookingsModule,
            invoices_module_1.InvoicesModule,
            invoice_module_1.InvoiceModule,
            hotel_invoice_module_1.HotelInvoiceModule,
            notifications_module_1.NotificationsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map