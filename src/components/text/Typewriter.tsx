import {
	Fragment,
	forwardRef,
	type Ref,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import useActiveProcess from "../../hooks/useActiveProcess";
import type { TypewriterRef } from "../../types/refs";
import "./index.css";

interface Props {
	text: string;
	delay?: number;
}

/**
 * Typewriter component that renders text being typed out.
 * Characters are fully typed out and invisible to prevent autowrap
 * snapping characters to different lines.
 */
const Typewriter = forwardRef(
	({ text, delay = 100 }: Props, ref: Ref<TypewriterRef>) => {
		const [visibleCharacters, setVisibleCharacters] = useState<number>(-1); // # of visible characters from start; -1 = show none
		const stateRef = useRef<"idle" | "typing" | "hidden">("idle");
		const { appendProcess, clearProcesses } = useActiveProcess();
		const words = text.split(" ");
		/**
		 * Starts typing out current text in typewriter to be fully visible
		 */
		const typeAnim = useCallback(() => {
			setVisibleCharacters(-1);
			let index = 0;
			stateRef.current = "typing";
			const interval = setInterval(() => {
				if (index >= text.length) {
					clearInterval(interval);
					clearProcesses();
					stateRef.current = "idle";
				}
				setVisibleCharacters(index);
				index++;
			}, delay);
			appendProcess(interval);
		}, [appendProcess, clearProcesses, delay, text.length]);
		/**
		 * Stops all typing animation(s) and reveals the entire text
		 */
		const finishAnimation = () => {
			stateRef.current = "idle";
			clearProcesses();
			setVisibleCharacters(text.length - 1);
		};
		/**
		 * Hides text
		 */
		const hideText = () => {
			setVisibleCharacters(-1);
			stateRef.current = "hidden";
		};
		/**
		 * Checks if any typing animation is playing (i.e. if word is fully visible or not)
		 */
		const isAnimationFinished = (): boolean => {
			return stateRef.current === "idle";
		};
		/**
		 * Begin typing on-mount
		 */
		useEffect(() => {
			typeAnim();
		}, [typeAnim]);
		/**
		 * Typewriter Ref Setup
		 */
		useImperativeHandle(ref, () => ({
			typeAnim: typeAnim,
			finishAnimation: finishAnimation,
			isAnimationFinished: isAnimationFinished,
			hideText: hideText,
		}));
		return (
			<div className="dialogue-text">
				{words.map((word, wordIndex) => {
					const wordKey = `word-${wordIndex}`;
					const letters = word.split("");
					// Calculate index of individual letters
					let startingWordIndex = 0;
					for (let i = 0; i < wordIndex; i++) {
						startingWordIndex += words[i].length;
					}
					return (
						<Fragment key={wordKey}>
							<span
								style={{
									display: "inline-block",
								}}
							>
								{letters.map((letter, letterIndex) => {
									const letterKey = `letter-${letterIndex}`;
									const isVisible =
										visibleCharacters > startingWordIndex + letterIndex;
									return (
										<span
											key={letterKey}
											style={{
												visibility:
													isVisible && stateRef.current !== "hidden"
														? "visible"
														: "hidden",
											}}
										>
											{letter}
										</span>
									);
								})}
							</span>
							{wordIndex < words.length - 1 && <span>&nbsp;</span>}
						</Fragment>
					);
				})}
			</div>
		);
	},
);

export default Typewriter;
