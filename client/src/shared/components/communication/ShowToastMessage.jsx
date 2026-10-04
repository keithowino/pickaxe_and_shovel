import { toast } from "react-toastify";

const ShowToastMessage = (info) => {
	const { msg, type } = info;

	switch (type) {
		case "success":
			toast.success(msg, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});

			break;

		case "warning":
			toast.warn(msg, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});

			break;

		case "error":
			toast.error(msg, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});

			break;

		case "info":
			toast.info(msg, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});

			break;

		default:
			toast(msg, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});

			break;
	}
};

export default ShowToastMessage;
