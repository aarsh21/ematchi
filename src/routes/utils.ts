export function shuffle<T>(array: T[]) {
	let i = array.length;

	// Fisher-Yates shuffle algorith
	while (i--) {
		const j = Math.floor(Math.random() * i + 1);
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}

	return array;
}