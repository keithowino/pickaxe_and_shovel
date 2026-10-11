import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}
export const MODULE_BOX = "border border-border bg-card/50 p-5 sm:p-6 md:p-8";

export const SELECT_CLASS =
	"flex h-9 w-full bg-background border border-input px-3 py-1 focus:border-primary focus-visible:outline-none transition-colors disabled:opacity-50 md:text-sm";

export const isIframe = window.self !== window.top;
