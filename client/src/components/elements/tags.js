import React, { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";

const KeyCodes = {
	comma: 188,
	enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default function Tags({ tags, setTags }) {
	//const [tags, setTags] = useState([]);
	const [suggestions, setSuggestions] = useState([]);

	const handleDelete = (i) => {
		setTags(() => {
			tags.splice(i, 1);
			return tags;
		});
	};

	const handleAddition = (tag) => {
		console.log(tag);
		setTags(() => {
			return [...tags, tag];
		});
	};

	return (
		<div>
			<ReactTags
				tags={tags}
				suggestions={suggestions}
				handleDelete={handleDelete}
				handleAddition={handleAddition}
				delimiters={delimiters}
			/>
		</div>
	);
}
