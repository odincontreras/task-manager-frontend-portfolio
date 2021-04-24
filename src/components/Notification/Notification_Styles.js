import styled, { keyframes } from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

const popupAnimation = keyframes`
  from {
    transform: scale(0, 0)
  }

  to {
    transform: scale(1, 1)
  }
`;

export const NotificationContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	position: absolute;
	justify-content: center;
	background-color: rgba(41, 41, 44, 0.65);
	animation: ${popupAnimation} 0.5s ease-out;
	z-index: 10;
`;

export const AlertTextContainer = styled.div`
	height: 15%;
	width: 40%;
	display: grid;
	grid-template-columns: 3rem auto 3rem;
	background-color: rgba(41, 41, 44, 0.65);
	/* animation:  0.5s ease-out; */
	border: 1px solid black;
	border-radius: 0px 0px 15px 15px;
`;

export const AlertText = styled.p`
	grid-column: 2 / 2;
	align-self: center;
	justify-self: center;
	font-size: 2rem;
	color: white;
	font-weight: bold;
	font-family: "Merriweather";
`;

export const CloseIcon = styled(AiOutlineClose)`
	grid-column: 3 / 3;
	align-self: flex-start;
	justify-self: start;
	color: white;
	font-size: 3rem;
	cursor: pointer;
	padding-top: 0.5rem;
	padding-right: 0.5rem;
	transition: all 0.5s ease-out;
	&:hover {
		transform: scale(1.2, 1.2)
	}
`;
