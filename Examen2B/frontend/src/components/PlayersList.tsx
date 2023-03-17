import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";

interface PlayerProps {
	id: number;
	name: string;
	surname: string;
	age: number;
	number: number;
	isStarter: boolean;
	team: number;
}

const PlayersList = ({ setCurrentTeam, currentTeam }) => {
	const [players, setPlayers] = useState([] as PlayerProps[]);
	const [editedPlayerData, setEditedPlayerData] = useState({
		id: 0,
		name: "",
		surname: "",
		age: 0,
		number: 0,
		isStarter: false,
		team: 0,
	} as PlayerProps);
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		const fetchPlayers = async () => {
			let url = "http://localhost:3000/player";
			if (currentTeam) {
				url = `http://localhost:3000/player?team=${currentTeam}`;
			}
			const response = await axios.get(url);
			setPlayers(response.data);
		};
		fetchPlayers();
	}, []);

	const handleNewPlayerDataChange = (event: any) => {
		const { name, value } = event.target;
		setEditedPlayerData({ ...editedPlayerData, [name]: value });
	};

	const handleAddOrUpdatePlayer = async (event: any) => {
		event.preventDefault();
		if (editedPlayerData.id) {
			await axios.put(
				`http://localhost:3000/player/${editedPlayerData.id}`,
				editedPlayerData
			);
			setPlayers((prevPlayers) => {
				const updatedPlayers = [...prevPlayers];
				const editedPlayerIndex = updatedPlayers.findIndex(
					(player) => player.id === editedPlayerData.id
				);
				updatedPlayers[editedPlayerIndex] = editedPlayerData;
				return updatedPlayers;
			});
		} else {
			const response = await axios.post("http://localhost:3000/player", {
				name: editedPlayerData.name,
				surname: editedPlayerData.surname,
				age: editedPlayerData.age,
				number: editedPlayerData.number,
				isStarter: editedPlayerData.isStarter,
				team: currentTeam,
			});
			setPlayers((prevPlayers) => [...prevPlayers, response.data]);
		}
		setEditedPlayerData({
			id: 0,
			name: "",
			surname: "",
			age: 0,
			number: 0,
			isStarter: false,
			team: 0,
		});
		setIsEditing(false);
	};

	const handleEditPlayer = (player: PlayerProps) => {
		setEditedPlayerData(player);
		setIsEditing(true);
	};

	const handleDeletePlayer = async (player: PlayerProps) => {
		await axios.delete(`http://localhost:3000/player/${player.id}`);
		setPlayers((prevPlayers) => {
			return prevPlayers.filter((p) => p.id !== player.id);
		});
	};

	const handleCancelEdit = () => {
		setIsEditing(false);
		setEditedPlayerData({
			id: 0,
			name: "",
			surname: "",
			age: 0,
			number: 0,
			isStarter: false,
			team: 0,
		});
	};

	return (
		<div>
			<h1>Players</h1>
			<Button onClick={() => setIsEditing(true)}>Add Player</Button>
			<Button onClick={() => setCurrentTeam(0)}>Back</Button>
			<Table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Surname</th>
						<th>Age</th>
						<th>Number</th>
						<th>Is Starter</th>
						<th>Team</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{players.map((player) => (
						<tr key={player.id}>
							<td>{player.name}</td>
							<td>{player.surname}</td>
							<td>{player.age}</td>
							<td>{player.number}</td>
							<td>{player.isStarter ? "Yes" : "No"}</td>
							<td>{player.team}</td>
							<td>
								<Button onClick={() => handleEditPlayer(player)}>Edit</Button>
								<Button onClick={() => handleDeletePlayer(player)}>
									Delete
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Modal show={isEditing} onHide={() => setIsEditing(false)}>
				<Modal.Header closeButton>
					<Modal.Title>
						{editedPlayerData.id ? "Edit" : "Add"} Player
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleAddOrUpdatePlayer}>
						<Form.Group controlId="formPlayerName">
							<Form.Label htmlFor="name">Name</Form.Label>
							<Form.Control
								type="text"
								name="name"
								value={editedPlayerData.name}
								onChange={handleNewPlayerDataChange}
								required
							/>
						</Form.Group>
						<Form.Group controlId="formPlayerSurname">
							<Form.Label htmlFor="surname">Surname</Form.Label>
							<Form.Control
								type="text"
								name="surname"
								value={editedPlayerData.surname}
								onChange={handleNewPlayerDataChange}
								required
							/>
						</Form.Group>
						<Form.Group controlId="formPlayerAge">
							<Form.Label htmlFor="age">Age</Form.Label>
							<Form.Control
								type="number"
								name="age"
								value={editedPlayerData.age}
								onChange={handleNewPlayerDataChange}
							/>
						</Form.Group>
						<Form.Group controlId="formPlayerNumber">
							<Form.Label htmlFor="number">Number</Form.Label>
							<Form.Control
								type="number"
								name="number"
								value={editedPlayerData.number}
								onChange={handleNewPlayerDataChange}
								required
							/>
						</Form.Group>
						<Form.Group controlId="formPlayerIsStarter">
							<Form.Label htmlFor="isStarter">Is Starter</Form.Label>
							<Form.Check
								type="checkbox"
								name="isStarter"
								checked={editedPlayerData.isStarter}
								onChange={(event) =>
									setEditedPlayerData({
										...editedPlayerData,
										isStarter: event.target.checked,
									})
								}
							/>
						</Form.Group>
						<Modal.Footer>
							<Button type="submit">{isEditing ? "Update" : "Add"}</Button>
							<Button onClick={() => handleCancelEdit()}>Cancel</Button>
						</Modal.Footer>
					</Form>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default PlayersList;
