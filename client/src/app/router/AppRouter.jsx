import { BrowserRouter } from "react-router-dom";
import RouterConfiguration from "./RouteConfiguration";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function AppRouter() {
	return (
		<BrowserRouter>
			<RouterConfiguration />
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
		</BrowserRouter>
	);
}
