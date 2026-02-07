import { useEffect, useRef, useState } from "react";
import { RxDoubleArrowRight } from "react-icons/rx";
import Typewriter from "../text/Typewriter";
import "./index.css";

/**
 * Component that renders text in a dialogue box used by the ConversationController
 */
const DialogueBox = () => {
	const nameTagRef = useRef<HTMLDivElement>(null);
	const [nameTopOffset, setNameTopOffset] = useState<number>(0);
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
	return (
		<div className="dialogue-box">
			<div
				className="dialogue-name-tag"
				ref={nameTagRef}
				style={{
					top: nameTopOffset,
				}}
			>
				Kirumi Tojo
			</div>
			<Typewriter
				text={
					"Woooooow. this is just aaaawful. It's soooo boring that it's funny! Hello World"
				}
			/>
			<RxDoubleArrowRight
				color="white"
				size={45}
				style={{
					position: "absolute",
					bottom: 10,
					right: 10,
				}}
			/>
		</div>
	);
};

export default DialogueBox;
