import { useEffect, useState } from "react";
import type { Conversation } from "../../types/dialogue";
import CharacterPortrait from "./CharacterPortrait";
import DialogueBox from "./DialogueBox";
import "./index.css";

interface Props {
	conversation: Conversation;
}

/**
 * Higher-level parent container for displaying and updating a 1-to-1 conversation
 */
const ConversationController = ({ conversation }: Props) => {
	const [displayText, setDisplayText] = useState<string>("");
	const [currEventIndex, setCurrEventIndex] = useState<number>(0);
	const { speakerData, events } = conversation;
	useEffect(() => {}, []);
	return (
		<div
			draggable={false}
			style={{
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
			}}
		>
			<div
				className="container video-container"
				style={{
					backgroundColor: "#ff00ff",
					position: "relative",
				}}
			>
				<CharacterPortrait portraits={speakerData.portraits} />
				<DialogueBox />
			</div>
		</div>
	);
};

export default ConversationController;
