import FeaturedProjects from "../components/home/FeaturedProjects";
import Hero from "../components/home/Hero";
import SkillsMarquee from "../components/home/SkillsMarquee";
import StatsBar from "../components/home/StatsBar";

const Home = () => {
  return (
    <>
      <Hero />
      <SkillsMarquee />
      <StatsBar />
      <FeaturedProjects />
    </>
  );
};

export default Home;
