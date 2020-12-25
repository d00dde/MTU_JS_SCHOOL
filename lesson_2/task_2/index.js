const min = -1*2**31;
const max = 2**31 - 1;

module.exports = ( number ) => {
	if(!Number.isInteger(number) || number < min || number > max)
		return false;
	const digits = number.toString().split('');
	const halfIndex = Math.floor(digits.length/2);
	for(let i = 0; i < halfIndex; i++ ) {
		if(digits[i] !== digits[digits.length - 1 - i]){
			return false;
		}
	}
	return true;
}
