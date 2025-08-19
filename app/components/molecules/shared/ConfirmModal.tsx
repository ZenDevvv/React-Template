import React from "react";
import {
	Modal,
	ModalHeader,
	ModalTitle,
	ModalDescription,
	ModalBody,
	ModalFooter,
} from "../../ui/modal";

interface ConfirmModalProps {
	isOpen: boolean;
	title: string;
	description?: string;
	confirmText?: string;
	cancelText?: string;
	isDestructive?: boolean;
	onConfirm: () => void;
	onCancel: () => void;
	children?: React.ReactNode;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
	isOpen,
	title,
	description,
	confirmText = "Confirm",
	cancelText = "Cancel",
	isDestructive = false,
	onConfirm,
	onCancel,
	children,
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onCancel}>
			<ModalHeader>
				<ModalTitle>{title}</ModalTitle>
				{description && <ModalDescription>{description}</ModalDescription>}
			</ModalHeader>
			{children && <ModalBody>{children}</ModalBody>}
			<ModalFooter>
				<button
					onClick={onCancel}
					className="px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50">
					{cancelText}
				</button>
				<button
					onClick={onConfirm}
					className={
						isDestructive
							? "px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
							: "px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
					}>
					{confirmText}
				</button>
			</ModalFooter>
		</Modal>
	);
};

export default ConfirmModal;
