import { Helmet } from "react-helmet-async";
import { platform } from "../shared/config/index.js";

const MetaDataInsert = ({ title = platform.name }) => {
	let pageTitle =
		title === platform.name
			? `${title} - ${platform.author}`
			: `${title} - ${platform.name}`;

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
				content={`${platform.name} ${platform.description}`}
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
