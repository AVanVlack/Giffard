// Make an object of usable items
const getOptionalItems = (body, ...props) => {
	const newObject = {};

	const requestKeys = Object.keys(body);

	requestKeys.forEach((key) => {
		if (props.includes(key)) {
			newObject[key] = body[key];
		}
	});

	return newObject;
};

module.exports = getOptionalItems;
