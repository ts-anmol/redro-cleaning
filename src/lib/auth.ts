import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

/**
 * Single hardcoded admin user, credentials supplied via env vars.
 * No database lookup here so this config stays edge-safe for `proxy.ts`.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email =
          typeof credentials?.email === "string" ? credentials.email : "";
        const password =
          typeof credentials?.password === "string" ? credentials.password : "";

        const adminEmail = process.env.ADMIN_EMAIL ?? "";
        const adminPassword = process.env.ADMIN_PASSWORD ?? "";

        if (
          adminEmail &&
          adminPassword &&
          email.toLowerCase() === adminEmail.toLowerCase() &&
          password === adminPassword
        ) {
          return { id: "admin", email: adminEmail, name: "Admin" };
        }

        return null;
      },
    }),
  ],
});
