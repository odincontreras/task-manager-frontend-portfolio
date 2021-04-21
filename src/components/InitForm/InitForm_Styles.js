import styled from "styled-components";

export const Container = styled.div`
	width: 70%;
	height: 75%;
	border-radius: 1rem;
	display: grid;
	grid-template-columns: 495px auto;
	margin: 0;
	padding: 0;
	border: 1px solid black;
`;

export const WelcomeMessageContainer = styled.div`
	background-color: hsl(240, 100%, 67%);
	grid-column: 1 / 1;
	height: 100%;
	width: 100%;
	border-radius: 1rem 0 0 1rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const WelcomeMessageTitle = styled.h1`
	color: white;
	text-align: center;
	font-size: 4rem;
	font-family: "Merriweather";
	font-weight: 700;
	padding: 1rem 0;
`;

export const WelcomeMessageText = styled.p`
	color: white;
	font-size: 2.5rem;
	padding: 2rem 2rem;
	font-family: "Roboto", sans-serif;
	font-weight: 300;
`;

export const LogInButton = styled.button`
	background: transparent;
	color: white;
	width: 15rem;
	border-radius: 15px;
	padding: 1rem;
	border: 2px solid white;
	font-family: "Merriweather";
	font-size: 2rem;
	cursor: pointer;
	font-family: "Roboto", sans-serif;
	outline: none;
	transition: all .5s ease-in;
	&:hover {
		background-color: hsl(240, 100%, 63%);
	}
`;

export const SignInFormContainer = styled.div`
	grid-column: 2 / 2;
	background-color: hsl(0, 0%, 98.5%);
	width: 100%;
	height: 100%;
	border-radius: 0 1rem 1rem 0;
`;

export const Form = styled.form`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	font-family: "Roboto", sans-serif;
`;

export const FormTitle = styled.h1`
	font-family: "Merriweather";
	font-size: 4rem;
	color: hsl(240, 100%, 67%);
	text-align: center;
	margin-bottom: 0.5rem;
`;

export const InputTitles = styled.p`
	font-size: 2rem;
	font-weight: 300;
	margin-top: .5rem;
	margin-bottom: 0.5rem;
`;

export const InputFields = styled.input`
	font-family: "Merriweather";
	background-color: #f2f2f2;
	width: 32rem;
	height: 3rem;
	border: 0.1px solid black;
	border-radius: 5px;
	margin-bottom: 0.5rem;
	font-size: 1.6rem;
	font-weight: 300;
	padding-left: 5px;
`;

export const SignInButton = styled(LogInButton)`
	background-color: hsl(240, 100%, 67%);
	margin-top: 0.5rem;
`;
