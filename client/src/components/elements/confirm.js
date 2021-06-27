import { useState } from "react";

// Button that requires confirmation before calling action
export default function ConfirmButton({ title, icon, action }) {
	const [confirm, setConfirm] = useState(false);

	const handleDelete = () => {
		setConfirm(true);
	};

	const handleConfirm = () => {
		action();
	};

	const handleCancel = () => {
		setConfirm(false);
	};
	return (
		<div>
			{confirm ? (
				<div>
					<button class="button secondary" onClick={handleCancel}>
						<i class="fa fa-ban" aria-hidden="true"></i> Cancel
					</button>
					<button type="button" class="button alert" onClick={handleConfirm}>
						<i class={`fa ${icon}`}></i> Confirm
					</button>
				</div>
			) : (
				<button type="button" class="button alert" onClick={handleDelete}>
					<i class={`fa ${icon}`}></i> {title}
				</button>
			)}
		</div>
	);
}
