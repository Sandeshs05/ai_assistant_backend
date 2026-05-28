"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT ?? '3001', 10),
    jwt: {
        secret: process.env.JWT_SECRET ?? 'dev-secret',
        expiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
    },
    frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:3000',
});
//# sourceMappingURL=configuration.js.map