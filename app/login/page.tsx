import { GraphQLClient } from "graphql-request";
import { Suspense } from "react";
import AcmeLogo from "@/app/ui/acme-logo";
import LoginForm from "@/app/ui/login-form";
import { getSdk } from "../graphql/generated";

const client = new GraphQLClient("http://localhost:8080/graphql");
const sdk = getSdk(client);

export default async function LoginPage() {
	const data = await sdk.GetAuthor({ id: 1 });
	console.log(data.author?.firstName);
	return (
		<main className="flex items-center justify-center md:h-screen">
			<div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
				<div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
					<div className="w-32 text-white md:w-36">
						<AcmeLogo />
					</div>
				</div>
				<Suspense>
					<LoginForm />
				</Suspense>
			</div>
		</main>
	);
}
