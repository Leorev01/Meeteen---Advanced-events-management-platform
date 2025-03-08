import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/supabase"; // Make sure your Supabase client is set up correctly

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error || !data) {
          return null;
        }
        return {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata.full_name || "User",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT for session management
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      return session;
    },
  },
  pages: {
    error: "/auth/error", // Custom error page
  },
});

export { handler as GET, handler as POST };
