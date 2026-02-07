import type { SpeakerState } from "./dialogue";

export interface CharacterPortraitRef {
	updatePortrait: (state: SpeakerState) => void;
}
