import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";

interface TeamProps {
	id: number;
	name: string;
	city: string;
	stadium: string;
	isLocal: boolean;
}

const TeamsList = ({ setCurrentTeam }) => {
	const [teams, setTeams] = useState([] as TeamProps[]);
	const [editedTeamData, setEditedTeamData] = useState({
		id: 0,
		name: "",
		city: "",
		stadium: "",
		isLocal: false,
	} as TeamProps);
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		const fetchTeams = async () => {
			const response = await axios.get("http://localhost:3000/team");
			setTeams(response.data);
		};
		fetchTeams();
	}, []);

	const handleNewTeamDataChange = (event: any) => {
		const { name, value } = event.target;
		setEditedTeamData({ ...editedTeamData, [name]: value });
	};

	const handleAddOrUpdateTeam = async (event: any) => {
		event.preventDefault();
		if (editedTeamData.id) {
			await axios.put(
				`http://localhost:3000/team/${editedTeamData.id}`,
				editedTeamData
			);
			setTeams((prevTeams) => {
				const updatedTeams = [...prevTeams];
				const editedTeamIndex = updatedTeams.findIndex(
					(team) => team.id === editedTeamData.id
				);
				updatedTeams[editedTeamIndex] = editedTeamData;
				return updatedTeams;
			});
		} else {
			const response = await axios.post("http://localhost:3000/team", {
				name: editedTeamData.name,
				city: editedTeamData.city,
				stadium: editedTeamData.stadium,
				isLocal: editedTeamData.isLocal,
			});
			setTeams((prevTeams) => [...prevTeams, response.data]);
		}
		setIsEditing(false);
		setEditedTeamData({
			id: 0,
			name: "",
			city: "",
			stadium: "",
			isLocal: false,
		});
	};

	const handleEditTeam = (team: TeamProps) => {
		setEditedTeamData(team);
		setIsEditing(true);
	};

	const handleDeleteTeam = async (id: number) => {
		console.log(id);
		await axios.delete(`http://localhost:3000/team/${id}`);
		setTeams((prevTeams) => prevTeams.filter((team) => team.id !== id));
	};

	const handleViewPlayers = (id: number) => {
		setCurrentTeam(id);
	};

	const handleCancelEdit = () => {
		setIsEditing(false);
		setEditedTeamData({
			id: 0,
			name: "",
			city: "",
			stadium: "",
			isLocal: false,
		});
	};

	return (
		<div>
			<h2>Teams</h2>
			<Button onClick={() => setIsEditing(true)}>Add Team</Button>
			<Table>
				<thead>
					<tr>
						<th>Name</th>
						<th>City</th>
						<th>Stadium</th>
						<th>Is Local?</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{teams.map((team) => (
						<tr key={team.id}>
							<td>{team.name}</td>
							<td>{team.city}</td>
							<td>{team.stadium}</td>
							<td>{team.isLocal ? "Yes" : "No"}</td>
							<td>
								<Button onClick={() => handleEditTeam(team)}>Edit</Button>
								<Button onClick={() => handleDeleteTeam(team.id)}>
									Delete
								</Button>
								<Button onClick={() => handleViewPlayers(team.id)}>
									View Players
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Modal show={isEditing} onHide={() => setIsEditing(false)}>
				<Modal.Header closeButton>
					<Modal.Title>
						{editedTeamData.id ? "Edit Team" : "Add Team"}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleAddOrUpdateTeam}>
						<Form.Group controlId="formTeamName">
							<Form.Label>Name:</Form.Label>
							<Form.Control
								type="text"
								name="name"
								value={editedTeamData.name}
								onChange={handleNewTeamDataChange}
								required
							/>
						</Form.Group>
						<Form.Group controlId="formTeamCity">
							<Form.Label>City:</Form.Label>
							<Form.Control
								type="text"
								name="city"
								value={editedTeamData.city}
								onChange={handleNewTeamDataChange}
								required
							/>
						</Form.Group>
						<Form.Group controlId="formTeamStadium">
							<Form.Label>Stadium:</Form.Label>
							<Form.Control
								type="text"
								name="stadium"
								value={editedTeamData.stadium}
								onChange={handleNewTeamDataChange}
								required
							/>
						</Form.Group>
						<Form.Group controlId="formTeamIsLocal">
							<Form.Label>Es Local?</Form.Label>
							<Form.Check
								type="checkbox"
								name="isLocal"
								checked={editedTeamData.isLocal}
								onChange={(event) =>
									setEditedTeamData({
										...editedTeamData,
										isLocal: event.target.checked,
									})
								}
							/>
						</Form.Group>
						<Modal.Footer>
							<Button type="submit">
								{editedTeamData.id ? "Update" : "Add"}
							</Button>
							<Button type="Button" onClick={() => handleCancelEdit()}>
								Cancel
							</Button>
						</Modal.Footer>
					</Form>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default TeamsList;
