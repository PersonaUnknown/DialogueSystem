import {
	forwardRef,
	type Ref,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import { RxDoubleArrowRight } from "react-icons/rx";
import type { DialogueBoxRef } from "../../types/refs";
import Typewriter from "../text/Typewriter";
import "./index.css";

interface Props {
	speakerName: string;
	dialogue: string[];
	progressConversation: () => void;
}

/**
 * Component that renders text in a dialogue box used by the ConversationController
 */
const DialogueBox = forwardRef(
	(
		{ speakerName, dialogue, progressConversation }: Props,
		ref: Ref<DialogueBoxRef>,
	) => {
		// State + Ref
		const nameTagRef = useRef<HTMLDivElement>(null);
		const [nameTopOffset, setNameTopOffset] = useState<number>(0);
		const [currDialogueIndex, setCurrDialogueIndex] = useState<number>(0);
		/**
		 * Progresses dialogue to next section, or progresses conversation if at end of dialogue section
		 */
		const progressDialogue = () => {
			const nextIndex = currDialogueIndex + 1;
			if (nextIndex >= dialogue.length) {
				progressConversation();
			} else {
				setCurrDialogueIndex(nextIndex);
			}
		};
		/**
		 * Updates dialogue index to target value
		 */
		const updateDialogueIndex = (index: number) => {
			if (index < 0 || index > dialogue.length) {
				console.error(`Invalid index provided to dialogue box: ${index}`);
				return;
			}
			setCurrDialogueIndex(index);
		};
		/**
		 * Triggers the TypeWriter component to finish its typing animation
		 */
		const finishAnimation = () => {
			// TODO: Finish implementation
		};
		/**
		 * Calculates where to place name tag section (directly above dialogue box)
		 */
		useEffect(() => {
			const updateTopOffset = () => {
				if (nameTagRef.current) {
					setNameTopOffset(-nameTagRef.current.clientHeight);
				}
			};
			updateTopOffset();
			window.addEventListener("resize", updateTopOffset);
			() => {
				window.removeEventListener("resize", updateTopOffset);
			};
		}, []);
		useImperativeHandle(ref, () => ({
			updateDialogueIndex: updateDialogueIndex,
			finishAnimation: finishAnimation,
		}));
		return (
			<div className="dialogue-box">
				<div
					className="dialogue-name-tag"
					ref={nameTagRef}
					style={{ top: nameTopOffset }}
				>
					{speakerName}
				</div>
				<Typewriter text={dialogue[currDialogueIndex]} />
				<button
					className="next-dialogue-button"
					onClick={progressDialogue}
					type="button"
				>
					<RxDoubleArrowRight color="white" size={45} />
				</button>
			</div>
		);
	},
);

export default DialogueBox;
