import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
	const router = useRouter();
	const [loggedIn, setLoggedIn] = useState(false);

	function handleSignOut() {
		window.localStorage.removeItem("activeUserId");
		router.push("/login");
	}

	function handleEditProfile() {
		router.push("/edit-profile");
	}

	useEffect(() => {
		const loggedIn = window.localStorage.getItem("activeUserId");
		if (loggedIn) {
			setLoggedIn(true);
		}
	}, []);

	return (
		<>
			<Navbar bg="light" expand="lg">
				<Container>
					<Navbar.Brand href="/">GRUPOS DE INVESTIGACIÓN</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					{loggedIn && (
						<Navbar.Collapse
							id="basic-navbar-nav"
							className="justify-content-end"
						>
							<Nav className="ml-auto">
								<Nav.Link href="#" onClick={handleSignOut}>
									Cerrar Sesión
								</Nav.Link>
							</Nav>
							<Nav className="ml-auto">
								<Nav.Link href="#" onClick={handleEditProfile}>
									Editar Perfil
								</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					)}
				</Container>
			</Navbar>
			<Container className="document-body">{children}</Container>
		</>
	);
}
