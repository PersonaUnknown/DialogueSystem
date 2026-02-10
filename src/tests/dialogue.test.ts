import { describe, expect, test } from "vitest";
import type {
	BranchType,
	ConversationEvent,
	User,
	UserBranchCheck,
} from "../types/dialogue";
import { getBranchIndex, parseDynamicDialogue } from "../util/dialogue";

describe("Dialogue Branching Conditions", () => {
	const testUser: User = {
		username: "Bob",
	};
	const testEqualFields: UserBranchCheck = {
		field: "username",
		compare: "Bob",
		branchTo: 1,
	};
	const testLessGreaterFields: UserBranchCheck = {
		field: "username",
		compare: "Bob2",
		branchTo: 1,
	};
	test("Branch Equal", () => {
		const result = getBranchIndex("branch_equal", testUser, testEqualFields);
		expect(result).toBe(1);
	});
	test("Branch Not Equal", () => {
		const result = getBranchIndex(
			"branch_not_equal",
			testUser,
			testEqualFields,
		);
		expect(result).toBe(-1);
	});
	test("Branch Greater", () => {
		const result = getBranchIndex(
			"branch_greater",
			testUser,
			testLessGreaterFields,
		);
		expect(result).toBe(-1);
	});

	test("Branch Greater Equal", () => {
		const result = getBranchIndex(
			"branch_greater_equal",
			testUser,
			testLessGreaterFields,
		);
		expect(result).toBe(-1);
	});

	test("Branch Less Than", () => {
		const result = getBranchIndex(
			"branch_less",
			testUser,
			testLessGreaterFields,
		);
		expect(result).toBe(1);
	});

	test("Branch Less Than Equal", () => {
		const result = getBranchIndex(
			"branch_less_equal",
			testUser,
			testLessGreaterFields,
		);
		expect(result).toBe(1);
	});
});

describe("Dynamic Dialogue", () => {
	const testUser: User = {
		username: "Bob",
	};
	test("Replacing Username From Text", () => {
		const exampleText = "Hi there, {username}. How was your day {username}?";
		const expectedText = "Hi there, Bob. How was your day Bob?";
		const actualText = parseDynamicDialogue(exampleText, testUser);
		expect(actualText).toBe(expectedText);
	});
});
