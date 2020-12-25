const maxLength = 1000;
const maxValue = 1000;

function validateInput ( arr1, arr2 ) {
	if( arr1.length < 1 || arr2.length < 1)
		return false;
	if( arr1.length > maxLength || arr2.length > maxLength)
		return false;
	// Проверяем, что каждый член arr1 и arr2 это натуральное число от 0 до maxValue
	for (let i = 0; i < arr1.length; i++) {
		if( !Number.isInteger(arr1[i]) || arr1[i] > maxValue || arr1[i] < 0) {
			return false;
		}
	}
	for (let i = 0; i < arr2.length; i++) {
		if( !Number.isInteger(arr2[i]) || arr2[i] > maxValue || arr2[i] < 0) {
			return false;
		}
	}
	// Проверяем, что все элементы arr2 содержатся в arr1
	for (let i = 0; i < arr2.length; i++) {
		if(!arr1.includes(arr2[i]))
			return false;
	}
	// Проверяем, что элементы arr2 уникальны
	for (let i = 0; i < arr2.length - 1; i++) {
		for(let j = i + 1; j < arr2.length; j++) {
			if(arr2[i] === arr2[j])
				return false;
		}
	}
	return true;
}

module.exports = ( arr1, arr2 ) => {
	const output = [];
	if(!validateInput(arr1, arr2))
		return output;
	const arr1Сlone = [...arr1]; // избегаем мутации аргументов функции
	arr2.forEach((base) => {
		arr1Сlone.forEach((item, index) => {
			if( item === base) {
				arr1Сlone[index] = null;
				output.push(item);
			}
		});
	});
	const rest = arr1Сlone.filter((i) => i);
	rest.sort((a, b) => a - b);
	return output.concat(rest);
}
