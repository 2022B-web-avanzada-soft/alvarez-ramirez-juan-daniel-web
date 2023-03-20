import Layout from "@/components/layout";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function Signup() {
	const router = useRouter();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [remember, setRemember] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");

	async function handleSubmit(event: any) {
		event.preventDefault();
		if (password !== confirmPassword) {
			setErrorMessage("Error: las contraseñas no coinciden");
			setConfirmPasswordError("Error: las contraseñas no coinciden");
			return;
		}
		try {
			const response = await axios.post("http://localhost:3000/auth/register", {
				name: name,
				email: email,
				password: password,
			});
			window.localStorage.setItem("activeUserId", response.data.id);
			if (remember) {
				window.localStorage.setItem("loggedIn", "true");
			}
			router.push("/groups");
		} catch (error) {
			console.log(error);
			setErrorMessage("Error: ya existe un usuario con ese correo");
		}
	}

	function login() {
		router.push("/login");
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
						<Col xs={6}>
							<Container className="floating-form">
								<Form onSubmit={handleSubmit}>
									<h3 className="form-title">Regístrate</h3>
									<Form.Group controlId="formBasicName">
										<Form.Label>Nombre</Form.Label>
										<Form.Control
											type="text"
											placeholder="Ingresa tu nombre"
											onChange={(e) => {
												setName(e.target.value);
												setErrorMessage("");
											}}
										/>
									</Form.Group>

									<Form.Group controlId="formBasicEmail">
										<Form.Label>Correo electrónico</Form.Label>
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

									<Form.Group controlId="formConfirmPassword">
										<Form.Label>Confirma tu contraseña</Form.Label>
										<Form.Control
											type="password"
											placeholder="Ingresa de nuevo tu contraseña"
											onChange={(e) => {
												setConfirmPassword(e.target.value);
												if (e.target.value !== password) {
													setConfirmPasswordError(
														"Las contraseñas no coinciden"
													);
												} else {
													setConfirmPasswordError("");
												}
											}}
										/>
										{confirmPasswordError && (
											<Form.Text className="text-danger">
												{confirmPasswordError}
											</Form.Text>
										)}
									</Form.Group>

									<Form.Group controlId="formBasicCheckbox">
										<Form.Check
											type="checkbox"
											label="Recuerdame"
											onChange={(e) => {
												setRemember(e.target.checked);
											}}
										/>
									</Form.Group>
									<Col className="btn-box">
										<Row>
											<Button type="submit">Registrarse</Button>
										</Row>
										{errorMessage && (
											<span className="error-message">{errorMessage}</span>
										)}
										<Row>
											<Button className="btn-secondary" onClick={login}>
												Iniciar Sesión
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
