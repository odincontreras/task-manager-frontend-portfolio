import React, { useState, useEffect } from "react";
import axios from "axios";
import htmlParser from "html-react-parser";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import {
	MainContainer,
	LeftContainer,
	LeftHeaderContainer,
	RightContainer,
	HeaderTitle,
	HeaderAction,
	LeftNoteContainer,
	LeftNoteContent,
	DeleteAction,
	PublishedDate,
	LogOutContainer,
	LogOutTitle,
	SpinnerContainer,
	NotesContainer,
} from "./Main_Styles";
import HashLoader from "react-spinners/HashLoader";
import { useHistory } from "react-router-dom";
import Notification from "../Notification/Notification";

function Main() {
	const [notes, setNotes] = useState(undefined);
	const [newNote, setNewNote] = useState(false);
	const [quillValue, setQuillValue] = useState("");
	const [changeBgColor, setChangeBgColor] = useState("");
	const [noteAction, setNoteAction] = useState("Add");
	const [selectedNoteId, setSelectedNoteId] = useState(undefined);
	const [loading, setLoading] = useState(false);
	const [showNotification, setShowNotification] = useState(false);
	const [notificationMessage, setNotificationMessage] = useState(undefined);
	const history = useHistory();

	useEffect(() => {
		setLoading(true);
		axios
			.get("https://task-manager-rest-api-mongodb.herokuapp.com/", {
				headers: {
					Authorization: "Bearer " + sessionStorage.getItem("token"),
				},
			})
			.then((response) => {
				console.log(response);
				if (response.status === 204) {
					setLoading(false);
					return setNotes(undefined);
				}
				setNotes(response.data.notes);
				setLoading(false);
			})
			.catch((err) => {
				if (err.response.status === 401) {
					setNotificationMessage("Not authenticated, please login!");
					return setShowNotification(true);
				}
			});
		// eslint-disable-next-line
	}, [newNote]);

	const deleteNote = (noteId) => {
		axios
			.delete("https://task-manager-rest-api-mongodb.herokuapp.com/delete-todo", {
				data: {
					noteId,
				},
				headers: {
					Authorization: "Bearer " + sessionStorage.getItem("token"),
				},
			})
			.then((result) => {
				setNewNote(!newNote);
			})
			.catch((err) => {
				setNotificationMessage("Deleting note failed!");
				return setShowNotification(true);
			});
	};

	const addNote = () => {
		setLoading(true);
		axios
			.post(
				"https://task-manager-rest-api-mongodb.herokuapp.com/addtodo",
				{ noteContent: quillValue.toString() },
				{
					headers: {
						Authorization: "Bearer " + sessionStorage.getItem("token"),
					},
				}
			)
			.then((response) => {
				setQuillValue("");
				setNewNote(!newNote);
				return setLoading(false);
			})
			.catch((err) => {
				setNotificationMessage("Adding note failed!");
				return setShowNotification(true);
			});
	};

	const editNote = (noteId) => {
		axios
			.patch(
				"https://task-manager-rest-api-mongodb.herokuapp.com/update-todo",
				{ noteContent: quillValue.toString(), noteId: noteId },
				{
					headers: {
						Authorization: "Bearer " + sessionStorage.getItem("token"),
					},
				}
			)
			.then((response) => {
				setNewNote(!newNote);
			})
			.catch((err) => {
				setNotificationMessage("Editing note failed!");
				return setShowNotification(true);
			});
	};

	const handleChange = (value) => {
		setQuillValue(value);
	};

	const noteClickHandler = (note) => {
		if (note._id === changeBgColor) {
			setNoteAction("Add");
			setQuillValue("");
			setSelectedNoteId(undefined);
			return setChangeBgColor("");
		}
		setSelectedNoteId(note._id);
		setNoteAction("Edit");
		setChangeBgColor(note._id);
		setQuillValue(note.noteContent);
	};

	const actionClickHandler = (note) => {
		if (note) {
			return editNote(note);
		}
		return addNote();
	};

	const endSession = () => {
		history.push("/");
		sessionStorage.removeItem("token");
	};

	return (
		<MainContainer>
			<LeftContainer>
				<LeftHeaderContainer>
					<HeaderTitle>Notes</HeaderTitle>
					<HeaderAction
						action={noteAction}
						onClick={() => actionClickHandler(selectedNoteId)}
					>
						{noteAction}
					</HeaderAction>
				</LeftHeaderContainer>
				<SimpleBar
					style={{
						height: "100%",
						gridRow: "2 / 2",
						overflow: "auto",
						backgroundColor: "hsl(0, 0%, 98.5%)",
					}}
				>
					{notes && !loading && (
						<NotesContainer>
							{notes.map((note) => {
								return (
									<LeftNoteContainer
										style={{
											backgroundColor:
												note._id === changeBgColor ? "#9999ff" : "",
										}}
										key={note._id}
									>
										<LeftNoteContent onClick={() => noteClickHandler(note)}>
											{htmlParser(note.noteContent)}
										</LeftNoteContent>
										<DeleteAction onClick={() => deleteNote(note._id)}>
											Delete
										</DeleteAction>
										<PublishedDate>
											{note.updatedAt.split("T")[0].replaceAll("-", "/")}
										</PublishedDate>
									</LeftNoteContainer>
								);
							})}
						</NotesContainer>
					)}
					{loading && (
						<SpinnerContainer>
							<HashLoader color="#5757FF" size="70" />
						</SpinnerContainer>
					)}
					{!notes && !loading && (
						<h1 style={{ padding: "0 2rem", fontFamily: "Merriweather" }}>
							No notes yet, please write one.
						</h1>
					)}
				</SimpleBar>
				<LogOutContainer onClick={endSession}>
					<LogOutTitle>Log Out</LogOutTitle>
				</LogOutContainer>
			</LeftContainer>
			<RightContainer>
				<SunEditor
					placeholder="Please write your note here"
					setContents={quillValue}
					onChange={handleChange}
					height="90vh"
					setOptions={{
						buttonList: [
							["undo", "redo"],
							[
								"font",
								"fontSize",
								"formatBlock",
								"bold",
								"underline",
								"italic",
								"fontColor",
								"hiliteColor",
								"align",
								"list",
								"blockquote",
								"table",
								"link",
								"fullScreen",
							],
						],
					}}
				/>
			</RightContainer>
			{showNotification && (<Notification message={notificationMessage} setShowNotification={setShowNotification} />)}
		</MainContainer>
	);
}

export default Main;
