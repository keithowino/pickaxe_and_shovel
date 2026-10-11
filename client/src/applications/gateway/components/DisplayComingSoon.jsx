import { Heading, Text } from "../../../shared/index.js";

export const DisplayComingSoon = ({ name }) => {
	return (
		<div className="w-full h-full flex flex-col items-center justify-center bg-slate-300">
			<Heading className="italic text-black">{name}</Heading>
			<Text className="!text-black">Coming soon...</Text>
		</div>
	);
};
