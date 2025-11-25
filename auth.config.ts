import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
	pages: {
		signIn: "/login",
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const isProtectedPath =
				nextUrl.pathname.startsWith("/dashboard") ||
				nextUrl.pathname.startsWith("/post");

			if (isProtectedPath) {
				return isLoggedIn; // 保護されたパスは認証が必要
			}

			// ログイン済みでログインページにアクセスした場合はdashboardにリダイレクト
			if (isLoggedIn && nextUrl.pathname === "/login") {
				return Response.redirect(new URL("/dashboard", nextUrl));
			}

			return true;
		},
	},
	providers: [Credentials({})],
} satisfies NextAuthConfig;
