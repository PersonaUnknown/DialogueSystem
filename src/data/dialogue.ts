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

/**
 * Basic conversation with singular and multiple lines of dialogue per Event
 */
export const EXAMPLE_CONVERSATION: Conversation = {
	speakerData: KIRUMI_TOJO_CHAR,
	events: [
		{
			speakerState: "idle",
			dialogue: ["Hello world"],
			callback: null,
		},
		{
			speakerState: "smile",
			dialogue: ["This is me smiling", ":) :) :) :) :) :)"],
			callback: null,
		},
	],
};

/**
 * Conversation that tests out callback functions
 */
export const EXAMPLE_CONVERSATION_ROUNDABOUT: Conversation = {
	speakerData: KIRUMI_TOJO_CHAR,
	events: [
		{
			speakerState: "idle",
			dialogue: ["I am talking to you right now."],
			callback: null,
		},
		{
			speakerState: "embarassed",
			dialogue: ["I'm gonna keep talking...", "Blah blah blah blah blah..."],
			callback: ["jump_to", 3],
		},
		{
			speakerState: "stern",
			dialogue: ["I'm done talking to you!", "Good-bye. Peace out!!!"],
			callback: ["end_conversation", null],
		},
		{
			speakerState: "shy",
			dialogue: ['This conversation is gonna "jump" to a different point.'],
			callback: ["jump_to", 2],
		},
	],
};
