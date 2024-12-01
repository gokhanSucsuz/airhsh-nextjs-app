"use client";
import loading from "@/app/checkout/loading";
import dynamic from "next/dynamic";

const DynamicComp = dynamic(() => import("@/components/checkout/Checkout"), {
	loading: () => loading(),
	ssr: false
});
export default DynamicComp;
