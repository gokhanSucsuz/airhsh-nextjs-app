"use client";
import { useSearchParams } from "next/navigation";

export default function NotFound() {
	const searchParams = useSearchParams();
	console.log(searchParams.get("example"));
	return <h1>404 - Page Not Found</h1>;
}
