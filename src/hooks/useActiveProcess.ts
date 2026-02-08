import { useRef } from "react";

/**
 * Keeps track of all active processes in component
 */
const useActiveProcess = () => {
	const ref = useRef<number[]>([]);
	const getProcesses = () => {
		return ref.current;
	};
	const setProcesses = (value: number[]) => {
		ref.current = value;
	};
	const appendProcess = (value: number) => {
		ref.current.push(value);
	};
	const clearProcesses = () => {
		for (const process of ref.current) {
			clearInterval(process);
		}
		ref.current = [];
	};
	return { getProcesses, setProcesses, appendProcess, clearProcesses };
};

export default useActiveProcess;
