"use client";

import type React from "react";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

type ContactFormValues = {
	name: string;
	email: string;
	phone?: string;
	message: string;
	interest?: string;
};

export function ContactModal({
	children,
	buttonText = "Contact Us",
	interest = "",
}: {
	children?: React.ReactNode;
	buttonText?: string;
	interest?: string;
}) {
	const [open, setOpen] = useState(false);

	const defaultValues: Partial<ContactFormValues> = {
		name: "",
		email: "",
		phone: "",
		message: "",
		interest: interest,
	};

	const form = useForm<ContactFormValues>({
		defaultValues,
	});

	function onSubmit(data: ContactFormValues) {
		// In a real application, you would send this data to your backend
		console.log(data);

		toast({
			title: "Contact request submitted",
			description: "We'll get back to you as soon as possible.",
		});

		// Close the modal after submission
		setOpen(false);

		// Reset the form
		form.reset();
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{children || <Button variant="default">{buttonText}</Button>}
			</DialogTrigger>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Contact Us</DialogTitle>
					<DialogDescription>
						Fill out the form below and our team will get back to
						you as soon as possible.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											placeholder="John Doe"
											{...field}
											required
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder="john.doe@example.com"
											{...field}
											required
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone (optional)</FormLabel>
									<FormControl>
										<Input
											placeholder="+1 (555) 123-4567"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{interest && (
							<FormField
								control={form.control}
								name="interest"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Product Interest</FormLabel>
										<FormControl>
											<Input readOnly {...field} />
										</FormControl>
										<FormDescription>
											This product has been pre-selected
											based on your interest.
										</FormDescription>
									</FormItem>
								)}
							/>
						)}
						<FormField
							control={form.control}
							name="message"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Message</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Please let us know how we can help you..."
											className="min-h-[100px]"
											{...field}
											required
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex justify-end gap-2 pt-2">
							<Button
								type="button"
								variant="outline"
								onClick={() => setOpen(false)}
							>
								Cancel
							</Button>
							<Button type="submit">Submit</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
