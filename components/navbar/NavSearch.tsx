"use client";
import { useState, useEffect } from 'react';
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const NavSearch = () => {
	const searchParams = useSearchParams();
	const { replace } = useRouter();

	const [search, setSearch] = useState(searchParams.get("search")?.toString() || "");

	const handleSearch = useDebouncedCallback((value:string) => {
		const params = new URLSearchParams(searchParams)
		if (value) { params.set("search", value) }
		else { params.delete("search") }
		replace(`/?${params.toString()}`)
	},500)
	
	useEffect(() => {
		if(!searchParams.get("search")) setSearch("")
	},[searchParams.get("search")])

	return (
		<Input
			type="search"
			placeholder="Search a home..."
			className="max-w-xs dark:bg-muted"
			value={search}
			onChange={e => {
				setSearch(e.target.value)
				handleSearch(e.target.value)
			}}
		/>
	);
};

export default NavSearch;
