// types/next-auth.d.ts или просто next-auth.d.ts в корне
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      company?: string;
      companyName?: string;
    };
  }
  interface User extends DefaultUser {
    company?: string;
    companyName?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    company?: string;
    companyName?: string;
  }
}
