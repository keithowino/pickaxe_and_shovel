import { Outlet, useLocation } from "react-router-dom";
import { AppShell } from "../../../shared/index.js";
import { GatewayFooter, GatewayHeader } from "../components/index.js";
import { motion, AnimatePresence } from "framer-motion";

export default function GatewayLayout() {
	const location = useLocation();

	return (
		<AppShell
			// className="bg-slate-50 text-slate-900"
			mainClassName="min-h-0"
			header={<GatewayHeader />}
			footer={<GatewayFooter />}
		>
			<main className="flex-1 pt-16">
				<AnimatePresence mode="wait">
					<motion.div
						key={location.pathname}
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -8 }}
						transition={{ duration: 0.25 }}
					>
						<Outlet />
					</motion.div>
				</AnimatePresence>
			</main>
		</AppShell>
	);
}
