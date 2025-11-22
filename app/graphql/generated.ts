import type { GraphQLClient, RequestOptions } from "graphql-request";
import gql from "graphql-tag";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
	T extends { [key: string]: unknown },
	K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
	| T
	| {
			[P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
	  };
type GraphQLClientRequestHeaders = RequestOptions["requestHeaders"];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
};

export type Author = {
	__typename?: "Author";
	firstName?: Maybe<Scalars["String"]["output"]>;
	id: Scalars["Int"]["output"];
	lastName?: Maybe<Scalars["String"]["output"]>;
	posts?: Maybe<Array<Maybe<Post>>>;
};

export type Comment = {
	__typename?: "Comment";
	content: Scalars["String"]["output"];
	id: Scalars["Int"]["output"];
};

export type Mutation = {
	__typename?: "Mutation";
	addComment?: Maybe<Comment>;
	upvotePost?: Maybe<Post>;
};

export type MutationAddCommentArgs = {
	content: Scalars["String"]["input"];
	postId: Scalars["Int"]["input"];
};

export type MutationUpvotePostArgs = {
	postId: Scalars["Int"]["input"];
};

export type Post = {
	__typename?: "Post";
	id: Scalars["Int"]["output"];
	title: Scalars["String"]["output"];
	votes?: Maybe<Scalars["Int"]["output"]>;
};

export type Query = {
	__typename?: "Query";
	author?: Maybe<Author>;
};

export type QueryAuthorArgs = {
	id: Scalars["Int"]["input"];
};

export type Subscription = {
	__typename?: "Subscription";
	commentAdded: Comment;
};

export type GetAuthorQueryVariables = Exact<{
	id: Scalars["Int"]["input"];
}>;

export type GetAuthorQuery = {
	__typename?: "Query";
	author?: {
		__typename?: "Author";
		id: number;
		firstName?: string | null;
		lastName?: string | null;
	} | null;
};

export const GetAuthorDocument = gql`
    query GetAuthor($id: Int!) {
  author(id: $id) {
    id
    firstName
    lastName
  }
}
    `;

export type SdkFunctionWrapper = <T>(
	action: (requestHeaders?: Record<string, string>) => Promise<T>,
	operationName: string,
	operationType?: string,
	variables?: any,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
	action,
	_operationName,
	_operationType,
	_variables,
) => action();

export function getSdk(
	client: GraphQLClient,
	withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
	return {
		GetAuthor(
			variables: GetAuthorQueryVariables,
			requestHeaders?: GraphQLClientRequestHeaders,
			signal?: RequestInit["signal"],
		): Promise<GetAuthorQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<GetAuthorQuery>({
						document: GetAuthorDocument,
						variables,
						requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
						signal,
					}),
				"GetAuthor",
				"query",
				variables,
			);
		},
	};
}
export type Sdk = ReturnType<typeof getSdk>;
