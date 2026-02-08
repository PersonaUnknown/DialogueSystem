import { useRef, useState } from "react";
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
	const [dialogueFinished, setDialogueFinished] = useState<boolean>(false);
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
	 * Jump to specified index in conversation
	 */
	const jumpToEvent = (index: number) => {
		if (index >= 0 && index < events.length) {
			// Update portrait + dialogue box
			const nextEvent = events[index];
			portraitRef?.current?.updatePortrait(nextEvent.speakerState);
			dialogueBoxRef?.current?.updateDialogueIndex(0);
			setCurrEventIndex(index);
		} else {
			endConversation();
		}
	};
	/**
	 * Ends the conversation
	 */
	const endConversation = () => {
		portraitRef?.current?.updatePortrait("idle");
		setDialogueFinished(true);
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
		const eventFunc = callback?.[0];
		switch (eventFunc) {
			case "end_conversation":
				endConversation();
				break;
			case "multiple_choice":
				// TODO: Show multiple choice responses
				break;
			default:
				// Default is to just 'proceed' or 'jump' to next line (index-wise)
				if (typeof nextIndex !== "number") {
					console.error("Unable to find / calculate valid index");
					return;
				}
				jumpToEvent(nextIndex);
				break;
		}
	};
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
