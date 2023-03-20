import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import Login from "./login";
import Groups from "./groups";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Index() {
	const [loggedIn, setLoggedIn] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const loggedIn = window.localStorage.getItem("loggedIn");
		if (loggedIn) {
			router.push("/groups");
		} else {
			router.push("/login");
		}
	}, []);
	return <></>;
}
