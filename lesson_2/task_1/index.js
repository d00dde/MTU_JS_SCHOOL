const validSymbols = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
const maxNumber = 3999;
const maxLength = 15;
const values = {
	I: 1,
	V: 5,
	X: 10,
	L: 50,
	C: 100,
	D: 500,
	M: 1000,
}

function isDecrement( symbol, nextSymbol ) {
	if(!nextSymbol) {
		return false;
	}
	if(symbol === 'I' && (nextSymbol === 'V' || nextSymbol === 'X')) {
		return true;
	}
	if(symbol === 'X' && (nextSymbol === 'L' || nextSymbol === 'C')) {
		return true;
	}
	if(symbol === 'C' && (nextSymbol === 'D' || nextSymbol === 'M')) {
		return true;
	}
	return false;
}

function validateInput ( symbols ) {
	if(symbols.length < 1 || symbols.length > maxLength) {
		return false;
	}
	for(let i = 0; i < symbols.length; i++) {
		if(!validSymbols.includes(symbols[i])){
			return false;
		}
	}
	return true;
}

module.exports = ( romanNumber ) => {
	const symbols = romanNumber.split('');
	if(!validateInput(symbols)) {
		return -1;
	}
	let total = 0;
	let skipNext = false;
	symbols.forEach((symbol, index) => {
		if(skipNext) {
			skipNext = false;
			return;
		}
		const nextSymbol = symbols[index + 1];
		if(isDecrement(symbol, nextSymbol)) {
			skipNext = true;
			total = total + values[nextSymbol] - values[symbol];
		} else {
			total += values[symbol];
		}
	});
	if( total > maxNumber) {
		return -1;
	}
	return total;
}
