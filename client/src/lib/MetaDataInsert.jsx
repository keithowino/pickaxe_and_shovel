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
      <meta
        name="description"
        content={`${metadata.title} - Learn as i build template.`}
      />
      <meta
        name="keywords"
        content="coding, website design, freelancing, software development, ai, llm"
      />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content="Self made template." />
    </Helmet>
  );
};

export default MetaDataInsert;
