export function cutExcerpt(excerpt: string, limit: number): string {
	// Count words
	let count = 1;

	// Final string
	let result: string = '';

	for (const char of excerpt) {
		if (char === ' ') {
			count++;
		}
		result = result.concat(char);
		if (count >= limit) {
			result = result.concat('...');
			return result;
		}
	}

	return result;
}
