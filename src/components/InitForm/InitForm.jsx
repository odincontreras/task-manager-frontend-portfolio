import axios from "axios";
import React, { useState } from "react";
import {
	Container,
	WelcomeMessageContainer,
	WelcomeMessageTitle,
	WelcomeMessageText,
	SignInButton,
	SignInFormContainer,
	Form,
	FormTitle,
	InputTitles,
	InputFields,
	LogInButton,
} from "./InitForm_Styles";
import { useHistory } from "react-router-dom";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import HashLoader from "react-spinners/HashLoader";
import Notification from "../Notification/Notification";

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: "#fff",
	},
	root: {
		width: "100%",
		"& > * + *": {
			marginTop: theme.spacing(2),
		},
	},
}));

function InitForm() {
	const [signInFormInputs, setSignInFormInput] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [logInFormInputs, setLogInFormInputs] = useState({
		email: "",
		password: "",
	});
	const [showLoginForm, setShowLoginForm] = useState(false);
	const [showBackdrop, setShowBackdrop] = useState(false);
	const [showNotification, setShowNotification] = useState(false);
	const [notificationMessage, setNotificationMessage] = useState(undefined);
	const classes = useStyles();
	const history = useHistory();

	const signInHandler = (event) => {
		event.preventDefault();
		if (signInFormInputs.password !== signInFormInputs.confirmPassword) {
			setNotificationMessage("Both passwords needs to be equals.");
			return setShowNotification(true);
		}
		setShowBackdrop(true);
		axios
			.post("https://task-manager-rest-api-mongodb.herokuapp.com/signin", signInFormInputs)
			.then((response) => {
				setShowBackdrop(false);
				setShowLoginForm(true);
				setNotificationMessage("Please Login.");
				setShowNotification(true);
			})
			.catch((err) => {
				setShowBackdrop(false);
				if (err.response.status === 406) {
					setNotificationMessage(err.response.data.message);
					return setShowNotification(true);
				}
				console.log(err.response);
			});
	};

	const logInHandler = (event) => {
		event.preventDefault();
		setShowBackdrop(true);
		axios
			.post("https://task-manager-rest-api-mongodb.herokuapp.com/login", logInFormInputs)
			.then((response) => {
				if (response.status === 200) {
					setShowBackdrop(false);
					sessionStorage.setItem("token", response.data.token);
					history.push({ pathname: "/main" });
				}
			})
			.catch((err) => console.log(err.response.data.message));
	};

	return (
		<>
			<Container>
				<WelcomeMessageContainer>
					{showLoginForm ? (
						<>
							<WelcomeMessageTitle>Hello, Friend!</WelcomeMessageTitle>
							<WelcomeMessageText>
								Enter your personal details and start journey with us.
							</WelcomeMessageText>
							<LogInButton
								onClick={() => {
									setShowLoginForm(false);
									setLogInFormInputs({
										email: "",
										password: "",
									});
								}}
							>
								Sign In
							</LogInButton>
						</>
					) : (
						<>
							<WelcomeMessageTitle>Welcome Back!</WelcomeMessageTitle>
							<WelcomeMessageText>
								To keep connected with us please login with your personal info.
							</WelcomeMessageText>
							<LogInButton
								onClick={() => {
									setShowLoginForm(true);
									setSignInFormInput({
										name: "",
										email: "",
										password: "",
										confirmPassword: "",
									});
								}}
							>
								Log In
							</LogInButton>
						</>
					)}
				</WelcomeMessageContainer>
				<SignInFormContainer>
					<Form onSubmit={showLoginForm ? logInHandler : signInHandler}>
						{showLoginForm ? (
							<>
								<FormTitle>Log In to Notes Manager</FormTitle>
								<InputTitles>Use your email for Log In.</InputTitles>
								<InputTitles>Email</InputTitles>
								<InputFields
									type="email"
									value={logInFormInputs.email}
									onChange={(event) =>
										setLogInFormInputs({
											...logInFormInputs,
											email: event.target.value,
										})
									}
								/>
								<InputTitles>Password</InputTitles>
								<InputFields
									type="password"
									value={logInFormInputs.password}
									onChange={(event) =>
										setLogInFormInputs({
											...logInFormInputs,
											password: event.target.value,
										})
									}
								/>
								<SignInButton type="submit">Log In</SignInButton>
							</>
						) : (
							<>
								<FormTitle>Create a Account</FormTitle>
								<InputTitles>Use your email for registration</InputTitles>
								<InputTitles>Name</InputTitles>
								<InputFields
									type="text"
									value={signInFormInputs.name}
									onChange={(event) =>
										setSignInFormInput({
											...signInFormInputs,
											name: event.target.value,
										})
									}
								/>
								<InputTitles>Email</InputTitles>
								<InputFields
									type="email"
									value={signInFormInputs.email}
									onChange={(event) =>
										setSignInFormInput({
											...signInFormInputs,
											email: event.target.value,
										})
									}
								/>
								<InputTitles>Password</InputTitles>
								<InputFields
									value={signInFormInputs.password}
									type="password"
									onChange={(event) =>
										setSignInFormInput({
											...signInFormInputs,
											password: event.target.value,
										})
									}
								/>
								<InputTitles>Confirm Password</InputTitles>
								<InputFields
									value={signInFormInputs.confirmPassword}
									type="password"
									onChange={(event) =>
										setSignInFormInput({
											...signInFormInputs,
											confirmPassword: event.target.value,
										})
									}
								/>
								<SignInButton type="submit">Sign In</SignInButton>
							</>
						)}
					</Form>
				</SignInFormContainer>
				<Backdrop className={classes.backdrop} open={showBackdrop}>
					<HashLoader color="white" size="70" />
				</Backdrop>
			</Container>
			{showNotification && (
				<Notification
					message={notificationMessage}
					setShowNotification={setShowNotification}
				/>
			)}
		</>
	);
}

export default InitForm;
