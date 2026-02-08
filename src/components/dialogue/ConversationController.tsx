import { useEffect, useRef, useState } from "react";
import type { Conversation } from "../../types/dialogue";
import type { CharacterPortraitRef, DialogueBoxRef } from "../../types/refs";
import CharacterPortrait from "./CharacterPortrait";
import DialogueBox from "./DialogueBox";
import DialogueButton from "./DialogueButton";
import "./index.css";

interface Props {
	conversation: Conversation;
}

/**
 * Higher-level parent container for displaying and updating a 1-to-1 conversation
 */
const ConversationController = ({ conversation }: Props) => {
	// State + Data Parsing
	const [dialogueFinished, setDialogueFinished] = useState<boolean>(true);
	const [currEventIndex, setCurrEventIndex] = useState<number>(0);
	const portraitRef = useRef<CharacterPortraitRef>(null);
	const dialogueBoxRef = useRef<DialogueBoxRef>(null);
	const { speakerData, events } = conversation;
	const currDialogue = events.map((event) => event.dialogue);
	// Methods
	/**
	 * Starts / resets dialogue box process
	 */
	const initConversation = () => {
		if (events.length <= 0) {
			console.error("No conversation data loaded. Cannot init conversation.");
			return;
		}
		setCurrEventIndex(0);
		const initSpeakerState = events[0].speakerState;
		portraitRef?.current?.updatePortrait(initSpeakerState);
		dialogueBoxRef?.current?.updateDialogueIndex(0);
		setDialogueFinished(false);
	};
	/**
	 * Checks current dialogue section and progresses based on its callback.
	 */
	const progressConversation = () => {
		const currEvent = events[currEventIndex];
		const { callback } = currEvent;
		const nextIndex =
			callback === null || callback[0] === "proceed"
				? currEventIndex + 1
				: callback[1];
		if (typeof nextIndex !== "number") {
			console.error("Unable to find / calculate valid index");
			return;
		}
		if (nextIndex >= 0 && nextIndex < events.length) {
			// Update portrait + dialogue box
			const nextEvent = events[nextIndex];
			portraitRef?.current?.updatePortrait(nextEvent.speakerState);
			dialogueBoxRef?.current?.updateDialogueIndex(0);
			setCurrEventIndex(nextIndex);
		} else {
			// Reset portrait and end conversation
			portraitRef?.current?.updatePortrait("idle");
			setDialogueFinished(true);
		}
		// TODO: Add switch statement parsing EventFunc possibilities
	};
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
				<CharacterPortrait
					portraits={speakerData.portraits}
					ref={portraitRef}
				/>
				{dialogueFinished ? (
					<DialogueButton
						className="absolute-center"
						onClick={initConversation}
					/>
				) : (
					<DialogueBox
						dialogue={currDialogue[currEventIndex]}
						progressConversation={progressConversation}
						ref={dialogueBoxRef}
						speakerName={speakerData.displayName}
					/>
				)}
			</div>
		</div>
	);
};

export default ConversationController;
