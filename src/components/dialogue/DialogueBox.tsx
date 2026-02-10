import {
	forwardRef,
	type Ref,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import { RxDoubleArrowRight } from "react-icons/rx";
import { useUser } from "../../contexts/UserContext";
import type { DialogueBoxRef, TypewriterRef } from "../../types/refs";
import { parseDynamicDialogue } from "../../util/dialogue";
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
		const typewriterRef = useRef<TypewriterRef>(null);
		const [nameTopOffset, setNameTopOffset] = useState<number>(0);
		const [currDialogueIndex, setCurrDialogueIndex] = useState<number>(0);
		const currUser = useUser();
		const currDialogue = parseDynamicDialogue(
			dialogue[currDialogueIndex],
			currUser.user,
		);
		/**
		 * Progresses dialogue to next section, or progresses conversation if at end of dialogue section
		 */
		const progressDialogue = () => {
			if (!typewriterRef.current?.isAnimationFinished()) {
				typewriterRef.current?.finishAnimation();
				return;
			}
			const nextIndex = currDialogueIndex + 1;
			typewriterRef.current?.hideText();
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
		/**
		 * DialogueBoxRef Setup
		 */
		useImperativeHandle(ref, () => ({
			updateDialogueIndex: updateDialogueIndex,
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
				<Typewriter text={currDialogue} ref={typewriterRef} />
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
