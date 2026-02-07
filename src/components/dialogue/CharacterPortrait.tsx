import { forwardRef, type Ref, useImperativeHandle, useState } from "react";
import type { SpeakerState } from "../../types/dialogue";
import type { CharacterPortraitRef } from "../../types/refs";

interface Props {
	portraits: Map<SpeakerState, string>;
}

/**
 * Displays a conversation speaker's state at that point in the conversation
 */
const CharacterPortrait = forwardRef(
	({ portraits }: Props, ref: Ref<CharacterPortraitRef>) => {
		const [currSpeakerState, setCurrSpeakerState] =
			useState<SpeakerState>("idle");
		const updatePortrait = (state: SpeakerState) => {
			const newPath = portraits.get(state);
			if (newPath === undefined) {
				console.error(`Attempted to set invalid portrait state: ${state}`);
				return;
			}
			setCurrSpeakerState(state);
		};
		useImperativeHandle(ref, () => ({
			updatePortrait: updatePortrait,
		}));
		const portraitPath =
			portraits.get(currSpeakerState) ?? "/src/assets/404_page_not_found.png";
		return (
			<img
				src={portraitPath}
				draggable={false}
				alt="char-portrait"
				className="char-portrait"
			/>
		);
	},
);

export default CharacterPortrait;
