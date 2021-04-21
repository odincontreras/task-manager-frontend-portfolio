import styled from "styled-components";

export const MainContainer = styled.div`
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-columns: minmax(0, 35%) minmax(0, 65%);
`;

export const LeftContainer = styled.div`
	grid-column: 1 / 1;
	display: grid;
	width: 100%;
	height: 100vh;
	border-right: 1.5px solid lightgray;
	grid-template-rows: 10vh auto 6.5vh;
	background-color: hsl(0, 0%, 98.5%);
	align-items: center;
`;

export const LeftHeaderContainer = styled.div`
	width: 100%;
	height: 100%;
	grid-row: 1 / 1;
	display: flex;
	justify-content: space-between;
	padding: 0 2rem;
	align-items: center;
`

export const HeaderTitle = styled.h1`
	font-family: "Merriweather";
	font-size: 3rem;
`;

export const HeaderAction = styled.p`
	font-family: "Merriweather";
	font-size: 2rem;
	cursor: pointer;
	color: ${({ action }) => (action === "Add" ? "#1a53ff" : "#ff751a")};
	&:hover {
		font-weight: bold;
	}
`;

export const NotesContainer = styled.div`
	grid-row: 2 / 2;
	overflow: auto;
	height: 100%;
	display: grid;
	grid-auto-rows: 13rem;
	width: 100%;
`;

export const LeftNoteContainer = styled.div`
	height: 100%;
	width: 100%;
	display: grid;
	grid-template: 90% 1fr / minmax(0, 90%) minmax(0, 10%);
	padding: 15px 2rem;
	box-shadow: 0px 7px 10px -6px rgba(0, 0, 0, 0.18);
	cursor: pointer;
	font-size: 2rem;
	overflow-wrap: break-word;
	
`;

export const LeftNoteContent = styled.div`
	grid-row: 1 / 2;
	grid-column: 1 / 1;
	padding-top: .5rem;
	font-size: 2rem;
	overflow: hidden;
`

export const DeleteAction = styled.p`
	font-family: "Merriweather";
	grid-row: 1 / span 2;
	grid-column: 2 / 2;
	padding-top: 1rem;
	color: #e60000;
	cursor: pointer;
	align-self: top;
	justify-self: center;
	font-size: 2rem;
	&:hover {
		font-weight: bold;
	}
`;

export const PublishedDate = styled.p`
	font-family: "Merriweather";
	grid-row: 3 / 3;
	grid-column: 1 / span 2;
	align-self: center;
	font-size: 1.7rem;
`;

export const LogOutTitle = styled.p`
	font-family: "Merriweather";
	font-weight: normal;
	background-color: none;
	font-size: 2rem;
	font-weight: bold;
`;

export const LogOutContainer = styled.div`
	grid-row: 3 / 3;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #ff6666;
	cursor: pointer;
	transition: all 0.5s ease-in;
	&:hover {
		background-color: #ff3333;
	}
`;

export const RightContainer = styled.div`
	grid-column: 2 / 2;
	min-width: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
`;

export const SpinnerContainer = styled.div`
	width: 100%;
	height: 80vh;
	display: flex;
	align-items: center;
	justify-content: center;
`
