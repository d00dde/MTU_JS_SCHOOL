const validSymbols = ['(', ')', '{', '}', '[', ']'];
const maxLength = 104;

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

function isOpening ( symbol ) {
	if( symbol === '(' || symbol === '[' || symbol === '{')
		return true;
	return false;
}

function isPair (closing, opening) {
	switch(closing){
		case ")":
			return opening === "(";
		case "]":
			return opening === "[";
		case "}":
			return opening === "{";
	}
}

module.exports = ( input ) => {
	const symbols = input.split('');
	if(!validateInput(symbols))
		return false;
	const openingStack = [];
	for( let i = 0; i < symbols.length; i++) {
		if(isOpening (symbols[i])) {
			openingStack.push(symbols[i]);
		} else {
			if(!isPair(symbols[i], openingStack.pop()))
				return false;
		}
	}
	if(openingStack.length)
		return false;
	return true;
}
