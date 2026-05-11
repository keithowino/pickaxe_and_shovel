import { Helmet } from "react-helmet-async";
import { metadata } from "./DynamicData";

const MetaDataInsert = ({ title = metadata.title }) => {
	let pageTitle =
		title === metadata.title
			? `${title} - ${metadata.author}`
			: `${title} - ${metadata.title}`;

	return (
		<Helmet>
			<title>{pageTitle}</title>
			{/* 
      

      <meta property="og:title" content="Pickaxe & Shovel" />
<meta
  property="og:description"
  content="Developer playground and coding tools."
/>
      
      
      */}
			<meta
				name="description"
				content={`${metadata.title} is a developer playground for code execution, experiments, and tooling.`}
			/>
			<meta
				name="keywords"
				content="coding, website design, freelancing, software development, ai, llm"
			/>
			<meta property="og:title" content={pageTitle} />
			<meta
				property="og:description"
				content="Developer playground and coding tools."
			/>
		</Helmet>
	);
};

export default MetaDataInsert;
