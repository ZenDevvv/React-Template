import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "~/lib/utils";

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	className?: string;
	closeOnOverlay?: boolean;
};

export function Modal({ isOpen, onClose, children, className, closeOnOverlay = true }: ModalProps) {
	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		if (isOpen) {
			document.addEventListener("keydown", handleKey);
			document.body.style.overflow = "hidden";
		}
		return () => {
			document.removeEventListener("keydown", handleKey);
			document.body.style.overflow = "";
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const modal = (
		<div className="fixed inset-0 z-50">
			<div
				className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"
				onClick={() => closeOnOverlay && onClose()}
			/>
			<div className="absolute inset-0 flex items-center justify-center p-4">
				<div
					role="dialog"
					aria-modal="true"
					className={cn(
						"bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-lg max-h-[90vh] overflow-auto",
						className,
					)}>
					{children}
				</div>
			</div>
		</div>
	);

	const root = typeof document !== "undefined" ? document.body : undefined;
	return root ? createPortal(modal, root) : modal;
}

export function ModalHeader({ className, ...props }: React.ComponentProps<"div">) {
	return <div className={cn("px-6 pt-6 pb-3 border-b border-gray-100", className)} {...props} />;
}

export function ModalTitle({ className, ...props }: React.ComponentProps<"h3">) {
	return <h3 className={cn("text-xl font-semibold", className)} {...props} />;
}

export function ModalDescription({ className, ...props }: React.ComponentProps<"p">) {
	return <p className={cn("text-sm text-gray-600", className)} {...props} />;
}

export function ModalBody({ className, ...props }: React.ComponentProps<"div">) {
	return <div className={cn("px-6 py-4", className)} {...props} />;
}

export function ModalFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"px-6 pt-3 pb-6 border-t border-gray-100 flex justify-end gap-2",
				className,
			)}
			{...props}
		/>
	);
}
