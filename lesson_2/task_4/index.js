const MAX_LENGTH = 1000;
const MAX_VALUE = 1000;

function validateInput ( arr1, arr2 ) {
	if( arr1.length < 1 || arr1.length > MAX_LENGTH)
		throw new Error('Длина массива arr1 не соотвествует условиям');
	if( arr2.length < 1 || arr2.length > MAX_LENGTH)
		throw new Error('Длина массива arr2 не соотвествует условиям');
	if(arr1.some((item) => !Number.isInteger(item) || item > MAX_VALUE || item < 0))
		throw new Error('Массив arr1 содержит недопустимые элементы');
	if(arr2.some((item) => !Number.isInteger(item) || item > MAX_VALUE || item < 0))
		throw new Error('Массив arr2 содержит недопустимые элементы');
	if(arr2.some((item) => !arr1.includes(item)))
		throw new Error('Массив arr1 не содержит элементы из массива arr2');

	for (let i = 0; i < arr2.length - 1; i++) {
		for(let j = i + 1; j < arr2.length; j++) {
			if(arr2[i] === arr2[j])
			throw new Error('Элементы массива arr2 не уникальны');
		}
	}
}

module.exports = ( arr1, arr2 ) => {
	const output = [];
	validateInput(arr1, arr2);
	const arr1Сlone = [...arr1]; // избегаем мутации аргументов функции
	arr2.forEach((base) => {
		arr1Сlone.forEach((item, index) => {
			if( item === base) {
				arr1Сlone[index] = null;
				output.push(item);
			}
		});
	});
	const rest = arr1Сlone.filter((i) => i !== null);
	rest.sort((a, b) => a - b);
	return output.concat(rest);
}
