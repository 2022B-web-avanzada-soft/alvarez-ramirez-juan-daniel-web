import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import TeamsList from "@/components/TeamsList";
import { useState } from "react";
import PlayersList from "@/components/PlayersList";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const [currentTeam, setCurrentTeam] = useState(0);

	return (
		<>
			<div className="custom-container">
				<Head>
					<meta charSet="utf-8" />
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
					/>
					<link
						href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
						rel="stylesheet"
						integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
						crossOrigin="anonymous"
					></link>
				</Head>
				{currentTeam === 0 ? (
					<TeamsList setCurrentTeam={setCurrentTeam}></TeamsList>
				) : (
					<PlayersList
						currentTeam={currentTeam}
						setCurrentTeam={setCurrentTeam}
					></PlayersList>
				)}
			</div>
		</>
	);
}
