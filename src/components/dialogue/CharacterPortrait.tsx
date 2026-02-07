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
		const [portraitPath, setPortraitPath] = useState<string>(
			portraits.get("idle") ?? "/src/assets/404_page_not_found.png",
		);
		const updatePortrait = (state: SpeakerState) => {
			const newPath = portraits.get(state);
			if (newPath === undefined) {
				console.error(`Attempted to set invalid portrait state: ${state}`);
				return;
			}
			setPortraitPath(portraitPath);
		};
		useImperativeHandle(ref, () => ({
			updatePortrait: updatePortrait,
		}));
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
