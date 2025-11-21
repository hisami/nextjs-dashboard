import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
	pages: {
		signIn: "/login",
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const isDashboardPath = nextUrl.pathname.startsWith("/dashboard");
			if (isDashboardPath) {
				if (isLoggedIn) return true;
				return false;
			} else if (isLoggedIn) {
				return Response.redirect(new URL("/dashboard", nextUrl));
			}
			return true;
		},
	},
	providers: [Credentials({})],
} satisfies NextAuthConfig;
