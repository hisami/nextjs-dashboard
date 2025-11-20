"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import { z } from "zod";

const sql = postgres(process.env.POSTGRES_URL ?? "", { ssl: "require" });

const FormSchema = z.object({
	id: z.string(),
	customerId: z.string(),
	amount: z.coerce.number(),
	status: z.enum(["paid", "pending"]),
	date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export const createInvoice = async (data: FormData) => {
	const { customerId, amount, status } = CreateInvoice.parse({
		customerId: data.get("customerId"),
		amount: data.get("amount"),
		status: data.get("status"),
	});

	const amountInCents = amount * 100;
	const date = new Date().toISOString().split("T")[0];

	try {
		await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
	} catch (error) {
		console.error(error);
		// return { message: "Database error: Failed to create invoice." };
	}

	revalidatePath("/dashboard/invoices");
	redirect("/dashboard/invoices");
};

export const updateInvoice = async (id: string, data: FormData) => {
	const { customerId, amount, status } = UpdateInvoice.parse({
		customerId: data.get("customerId"),
		amount: data.get("amount"),
		status: data.get("status"),
	});

	const amountInCents = amount * 100;

	try {
		await sql`
    UPDATE invoices SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
	} catch (error) {
		console.error(error);
		// return { message: "Database error: Failed to update invoice." };
	}

	revalidatePath("/dashboard/invoices");
	redirect("/dashboard/invoices");
};

export const deleteInvoice = async (id: string) => {
	await sql`
		DELETE FROM invoices WHERE id = ${id}
	`;

	revalidatePath("/dashboard/invoices");
};
