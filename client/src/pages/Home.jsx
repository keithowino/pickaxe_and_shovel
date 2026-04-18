import FeaturedProjects from "../components/home/FeaturedProjects";
import Hero from "../components/home/Hero";
import SkillsMarquee from "../components/home/SkillsMarquee";
import StatsBar from "../components/home/StatsBar";
import { metadata } from "../lib/DynamicData";
import MetaDataInsert from "../lib/MetaDataInsert";

const Home = () => {
  return (
    <>
      <MetaDataInsert title={metadata.title} />
      <Hero />
      <SkillsMarquee />
      <StatsBar />
      <FeaturedProjects />
    </>
  );
};

export default Home;
