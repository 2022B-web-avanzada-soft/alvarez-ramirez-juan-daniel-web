import Layout from "@/components/layout";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function Login() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [remember, setRemember] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	function signup() {
		router.push("/signup");
	}
	async function handleSubmit(event: any) {
		event.preventDefault();
		try {
			const response = await axios.post("http://localhost:3000/auth/login", {
				email: email,
				password: password,
			});
			window.localStorage.setItem("activeUserId", response.data.id);
			console.log("activeUserId", response.data.id);
			if (remember) {
				window.localStorage.setItem("loggedIn", "true");
			}
			router.push("/groups");
		} catch (error) {
			console.log(error);
			setErrorMessage("Error: usuario o contraseña incorrectos");
		}
	}
	return (
		<>
			<Layout>
				<Container>
					<Row className="justify-content-between">
						<Col xs={6} className="container-left">
							<h1>GRUPOS DE INVESIGACIÓN</h1>
							<h2>Conoce investigadores que compartan tus intereses</h2>
						</Col>
						<Col xs={6} className="floating-form-continer">
							<Container className="floating-form">
								<Form onSubmit={handleSubmit}>
									<h3 className="form-title">Inicia Sesión</h3>
									<Form.Group controlId="formBasicEmail">
										<Form.Label>Correo</Form.Label>
										<Form.Control
											type="email"
											placeholder="Ingresa tu correo electrónico"
											onChange={(e) => {
												setEmail(e.target.value);
												setErrorMessage("");
											}}
										/>
									</Form.Group>

									<Form.Group controlId="formBasicPassword">
										<Form.Label>Contraseña</Form.Label>
										<Form.Control
											type="password"
											placeholder="Ingresa tu contraseña"
											onChange={(e) => {
												setPassword(e.target.value);
												setErrorMessage("");
											}}
										/>
									</Form.Group>

									<Form.Group controlId="formBasicCheckbox">
										<Form.Check
											type="checkbox"
											label="Recuerdame"
											onChange={(e) => {
												setRemember(e.target.checked);
												setErrorMessage("");
											}}
										/>
									</Form.Group>
									<Col className="btn-box">
										<Row>
											<Button type="submit">Iniciar Sesión</Button>
										</Row>
										{errorMessage && (
											<span className="error-message">{errorMessage}</span>
										)}
										<Row>
											<Button className="btn-secondary" onClick={signup}>
												Registrarse
											</Button>
										</Row>
									</Col>
								</Form>
							</Container>
						</Col>
					</Row>
				</Container>
			</Layout>
		</>
	);
}
