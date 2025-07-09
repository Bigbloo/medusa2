import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:8000,https://medusa-storefront-*.onrender.com",
      adminCors: process.env.ADMIN_CORS || "http://localhost:9000,https://medusa2-*.onrender.com",
      authCors: process.env.AUTH_CORS || "http://localhost:8000,http://localhost:9000,https://medusa-storefront-*.onrender.com,https://medusa2-*.onrender.com",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  admin: {
    disable: true
  }
})
