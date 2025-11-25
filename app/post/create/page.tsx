"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState } from "react";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { createPost } from "@/app/lib/actions";

const postSchema = z.object({
	title: z.string().min(1, "Title is required"),
	authorId: z.coerce.number().min(1, "Author ID is required"),
});

export default function Page() {
	// Server Actionの状態管理
	const [state, formAction, isPending] = useActionState(createPost, null);

	// React Hook Formのセットアップ
	const {
		register,
		control,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(postSchema),
	});

	return (
		<Form
			control={control}
			onSubmit={({ formData }) => startTransition(() => formAction(formData))}
		>
			<input id="title" {...register("title")} placeholder="Title" />
			{errors.title && <p>{errors.title.message}</p>}
			<input
				id="authorId"
				type="number"
				{...register("authorId")}
				placeholder="Author ID"
			/>
			{errors.authorId && <p>{errors.authorId.message}</p>}
			<button type="submit" disabled={isPending}>
				{isPending ? "Creating..." : "Create Post"}
			</button>
		</Form>
	);
}
