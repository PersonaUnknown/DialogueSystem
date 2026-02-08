import { forwardRef, type Ref, useImperativeHandle, useState } from "react";
import type { MultipleChoiceOverlayRef } from "../../types/refs";
import DialogueButton from "./DialogueButton";

interface Props {
	onMultiChoiceResponseClick: (index: number) => void;
}

/**
 * Overlay that shows a selection of choices that are meant
 * to act as a crossword or where to go next in the Conversation
 */
const MultipleChoiceOverlay = forwardRef(
	(
		{ onMultiChoiceResponseClick }: Props,
		ref: Ref<MultipleChoiceOverlayRef>,
	) => {
		// State + Ref
		const [choices, setChoices] = useState<Map<string, number>>(new Map());
		const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);
		// Methods
		/**
		 * Enables the overlay
		 */
		const showOverlay = () => {
			setIsOverlayVisible(true);
		};
		/**
		 * Hides the overlay
		 */
		const hideOverlay = () => {
			setIsOverlayVisible(false);
		};
		/**
		 * Sets the available choices
		 */
		const updateChoices = (options: Map<string, number>) => {
			const newOptions = new Map(options);
			setChoices(newOptions);
		};
		/**
		 * MultipleChoiceLayoutRef Setup
		 */
		useImperativeHandle(ref, () => ({
			showOverlay: showOverlay,
			hideOverlay: hideOverlay,
			updateChoices: updateChoices,
		}));
		if (!isOverlayVisible) {
			return null;
		}
		return (
			<div
				className="inset-0"
				style={{
					position: "absolute",
				}}
			>
				<div
					className="inset-0"
					style={{
						position: "absolute",
						backgroundColor: "rgba(24, 24, 24, 0.75)",
						zIndex: 10,
					}}
				/>
				<div
					className="absolute-center"
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 10,
						position: "absolute",
						zIndex: 20,
					}}
				>
					{[...choices.keys()].map((key) => {
						// key: multi-choice option, value: index of where to jump to next in conversation
						const value = choices.get(key);
						if (value === undefined) {
							console.error(`Unable to find valid value from ${key}`);
						}
						const targetIndex = value ?? 0;
						return (
							<DialogueButton
								key={key}
								label={key}
								onClick={() => {
									onMultiChoiceResponseClick(targetIndex);
								}}
							/>
						);
					})}
				</div>
			</div>
		);
	},
);

export default MultipleChoiceOverlay;
