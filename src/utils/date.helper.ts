export function formatDateYMDHM(date: Date) {
	try {
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: 'numeric',
			minute: '2-digit',
		}).format(date);
	} catch(err) {
		return "unkown"
	}
}

export function formatDateHM(date: Date) {
	try {
		return new Intl.DateTimeFormat('en-US', {
			hour: 'numeric',
			minute: '2-digit',
		}).format(date);
	} catch(err) {
		return "unkown"
	}
}