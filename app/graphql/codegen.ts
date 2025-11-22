import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	// スキーマ取得元（HTTP でもファイルでもOK）
	schema: "./app/graphql/schema.graphql",
	// クエリやミューテーションを定義したファイル
	documents: ["./app/graphql/operations/*.graphql"],
	// 出力ファイル
	generates: {
		"./app/graphql/generated.ts": {
			plugins: [
				"typescript",
				"typescript-operations",
				"typescript-graphql-request",
			],
		},
	},
};

export default config;
