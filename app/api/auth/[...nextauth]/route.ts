import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { credentials } from '@/lib/credentials';
import type { User as NextAuthUser } from 'next-auth';

// ВНИМАНИЕ: Для корректной типизации создайте файл types/next-auth.d.ts (см. ниже)

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        login: { label: 'Login', type: 'text', placeholder: 'company1' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(creds) {
        const found = credentials.find(
          (c) => c.login === creds?.login && c.password === creds?.password
        );
        if (found) {
          return {
            id: found.company,
            name: found.companyName,
            company: found.company,
            companyName: found.companyName,
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/', // Кастомная страница входа
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Явное расширение типа user
        const u = user as NextAuthUser & {
          company?: string;
          companyName?: string;
        };
        token.company = u.company;
        token.companyName = u.companyName;
      }
      return token;
    },
    async session({ session, token }) {
      // session.user может быть undefined по типу, нужна проверка
      if (session.user && token?.company) {
        // Приведение к string для безопасности
        (session.user as any).company = token.company as string;
        (session.user as any).companyName = token.companyName as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
