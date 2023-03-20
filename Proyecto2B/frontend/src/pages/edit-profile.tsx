import Layout from "@/components/layout";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EditProfile() {
	const router = useRouter();
	const [userName, setUserName] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const [activeUserId, setActiveUserId] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");

	useEffect(() => {
		const activeUserId = window.localStorage.getItem("activeUserId");
		if (!activeUserId) {
			router.push("/login");
			return;
		}
		console.log("activeUserId", activeUserId);
		setActiveUserId(activeUserId);
		getUserData(activeUserId);
	}, []);

	async function getUserData(activeUserId: string) {
		try {
			const response = await axios.get(
				`http://localhost:3000/auth/user/${activeUserId}`
			);
			setUserName(response.data.name);
			setUserEmail(response.data.email);
			setUserPassword(response.data.password);
		} catch (error) {
			console.log(error);
		}
	}

	async function handleSubmit(event) {
		event.preventDefault();
		try {
			const response = await axios.put(
				`http://localhost:3000/auth/update/${activeUserId}`,
				{
					name: userName,
					email: userEmail,
					password: userPassword,
				}
			);
			router.push("/groups");
		} catch (error) {
			console.log(error);
			setErrorMessage("Error: por favor, revisa los datos ingresados");
		}
	}

	function handleDiscard() {
		router.push("/");
	}
	return (
		<>
			<Layout>
				<Container>
					<Row className="justify-content-between">
						<Col xs={6}>
							<Container className="floating-form">
								<Form onSubmit={handleSubmit}>
									<h3 className="form-title">Edita tu Usuario</h3>
									<Form.Group controlId="formBasicName">
										<Form.Label>Nuevo nombre</Form.Label>
										<Form.Control
											type="text"
											placeholder={userName}
											onChange={(event) => {
												setUserName(event.target.value);
												setErrorMessage("");
											}}
										/>
									</Form.Group>

									<Form.Group controlId="formBasicEmail">
										<Form.Label>Nuevo correo electrónico</Form.Label>
										<Form.Control
											type="email"
											placeholder={userEmail}
											onChange={(event) => {
												setUserEmail(event.target.value);
												setErrorMessage("");
											}}
										/>
									</Form.Group>

									<Form.Group controlId="formBasicPassword">
										<Form.Label>Nueva contraseña</Form.Label>
										<Form.Control
											type="password"
											placeholder="*********"
											onChange={(event) => {
												setUserPassword(event.target.value);
												setErrorMessage("");
												setConfirmPasswordError("");
											}}
										/>
									</Form.Group>

									<Form.Group controlId="formConfirmPassword">
										<Form.Label>Confirma nueva tu contraseña</Form.Label>
										<Form.Control
											type="password"
											placeholder="*********"
											onChange={(event) => {
												if (userPassword !== event.target.value) {
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
									<Col className="btn-box">
										<Row>
											<Button type="submit">Guardar</Button>
										</Row>
										{errorMessage && (
											<span className="error-message">{errorMessage}</span>
										)}
										<Row>
											<Button className="btn-secondary" onClick={handleDiscard}>
												Descartar
											</Button>
										</Row>
									</Col>
								</Form>
							</Container>
						</Col>
						<Col xs={6}>
							<h1>¿Como editar tu usuario?</h1>
							<h2>
								Edita únicamente los datos que quieras cambiar. y luego da clic
								en guardar.
							</h2>
						</Col>
					</Row>
				</Container>
			</Layout>
		</>
	);
}
