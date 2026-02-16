export function formatDate(date: string | Date): string {
	const d = new Date(date); // Handle both string and Date input

	const options: Intl.DateTimeFormatOptions = {
		month: 'long', // Full month name (e.g., October)
		year: 'numeric', // Four-digit year
		day: 'numeric' // Numeric day (1, 2, ..., 31)
	};

	// Format the date to something like "October 14, 2024"
	const formattedDate = d.toLocaleDateString('en-US', options);

	// Get the day of the month to add ordinal suffix (st, nd, rd, th)
	const day = d.getDate();
	const suffix = getOrdinalSuffix(day);

	// Insert the suffix after the day
	return formattedDate.replace(/\d+/, `${day}${suffix}`);
}

function getOrdinalSuffix(day: number): string {
	if (day >= 11 && day <= 13) return 'th'; // Special case for 11th-13th
	switch (day % 10) {
		case 1:
			return 'st';
		case 2:
			return 'nd';
		case 3:
			return 'rd';
		default:
			return 'th';
	}
}
