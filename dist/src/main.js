"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_config_1 = require("./config/swagger.config");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    console.log('=== ENV DEBUG ===');
    console.log('DATABASE_URL:', process.env.DATABASE_URL);
    console.log('PORT:', process.env.PORT);
    console.log('=================');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
    }));
    app.enableCors();
    (0, swagger_config_1.setupSwagger)(app);
    await app.listen(process.env.PORT || 3001);
    console.log('=== APP STARTED ===');
    console.log('DATABASE_URL loaded:', !!process.env.DATABASE_URL);
    console.log('App running on port:', process.env.PORT || 3001);
    console.log('===================');
}
bootstrap();
//# sourceMappingURL=main.js.map