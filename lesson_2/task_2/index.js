const MIN = -1*2**31;
const MAX = 2**31 - 1;

function validateInput ( number ) {
	if(!Number.isInteger(number))
		throw new Error('Введено не натуральное число');
	if(number < MIN || number > MAX)
		throw new Error('Число находится вне допустимого диапазона');
}

module.exports = ( number ) => {
	validateInput (number);
	const digits = number.toString().split('');
	const halfIndex = Math.floor(digits.length/2);
	for(let i = 0; i < halfIndex; i++ ) {
		if(digits[i] !== digits[digits.length - 1 - i]){
			return false;
		}
	}
	return true;
}
