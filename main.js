const resultField = document.querySelector('[data-result]');
const keypad = document.querySelector('[data-keypad]');

let operation = '';

keypad.addEventListener('click', e => {
	const button = e.target;
	if (button === keypad) return;

	if (button.matches('[data-clear]')) {
		resultField.value = operation = '';
	} else if (button.matches('[data-delete]')) {
		[resultField.value, operation] = [
			resultField.value.slice(0, -1),
			operation.slice(0, -1),
		];
	} else if (button.matches('[data-brackets]')) {
		resultField.value = operation += getNextBracket();
	} else if (button.matches('[data-equals]')) {
		if (!resultField.value) return;

		try {
			resultField.value = operation = String(eval(operation));
		} catch {
			resultField.value = 'Error';
			operation = '';
		}
	} else {
		let nextChar;
		switch (button.innerText) {
			case '÷':
				nextChar = '/';
				break;
			case '×':
				nextChar = '*';
				break;
			case ',':
				nextChar = '.';
				break;
			default:
				nextChar = button.innerText;
		}
		const lastChar = operation.charAt(operation.length - 1);
		if (isOperator(nextChar) && isOperator(lastChar)) return;
		resultField.value === 'Error'
			? (resultField.value = button.innerText)
			: (resultField.value += button.innerText);
		operation += nextChar;
	}
});

function isOperator(char) {
	return ['%', '/', '*', '-', '+', ',', '.'].includes(char);
}

function getNextBracket() {
	const brackets = ['(', ')'];
	let numOfBrackets = 0;
	for (const char of operation) {
		if (brackets.includes(char)) numOfBrackets++;
	}

	return numOfBrackets % 2 ? ')' : '(';
}
