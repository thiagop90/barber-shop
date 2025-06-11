declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string
    DIRECT_URL: string
    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET: string
    NEXTAUTH_SECRET: string
  }
}
