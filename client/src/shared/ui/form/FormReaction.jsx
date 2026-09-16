import { CheckCircle2, AlertCircle } from "lucide-react";

const FormReaction = ({ reaction = { success: null, msg: "" } }) => {
	if (reaction.success === "success") {
		return (
			<span
				role="status"
				className="flex items-center gap-2 text-secondary"
			>
				<CheckCircle2 className="h-4 w-4 shrink-0" />
				{reaction.msg}
			</span>
		);
	}

	if (reaction.success === "error") {
		return (
			<span
				role="alert"
				className="flex items-center gap-2 text-destructive"
			>
				<AlertCircle className="h-4 w-4 shrink-0" />
				{reaction.msg}
			</span>
		);
	}

	return null;
};

export default FormReaction;
