import type { Conversation, Speaker, SpeakerState } from "../types/dialogue";

export const KIRUMI_TOJO_PORTRAITS: Map<SpeakerState, string> = new Map([
	["idle", "/src/assets/portraits/tojo/idle.png"],
	["smile", "/src/assets/portraits/tojo/smile.png"],
	["embarassed", "/src/assets/portraits/tojo/embarassed.png"],
	["point", "/src/assets/portraits/tojo/point.png"],
	["shy", "/src/assets/portraits/tojo/shy.png"],
	["thinking", "/src/assets/portraits/tojo/thinking.png"],
	["stern", "/src/assets/portraits/tojo/stern.png"],
]);

export const KIRUMI_TOJO_CHAR: Speaker = {
	portraits: KIRUMI_TOJO_PORTRAITS,
	displayName: "Kirumi Tojo",
};

export const EXAMPLE_CONVERSATION: Conversation = {
	speakerData: KIRUMI_TOJO_CHAR,
	events: [
		{
			speakerState: "idle",
			dialogue: ["Hello world"],
			callback: null,
		},
	],
};
