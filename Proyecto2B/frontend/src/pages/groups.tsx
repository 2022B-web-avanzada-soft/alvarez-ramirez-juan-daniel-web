import Layout from "@/components/layout";
import Container from "@/components/layout";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Groups() {
	const router = useRouter();

	useEffect(() => {
		const activeUserId = window.localStorage.getItem("activeUserId");
		if (!activeUserId) {
			router.push("/login");
			return;
		}
	}, []);

	return (
		<>
			<Layout>
				<h1>groups</h1>
			</Layout>
		</>
	);
}
