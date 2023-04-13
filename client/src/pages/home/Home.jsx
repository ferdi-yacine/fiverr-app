import React from 'react';
import Featured from '../../components/featured/Featured';
import Slide from '../../components/Slide/Slide';
import TrustBy from '../../components/trustedBy/TrustBy';
import CatCard from "../../components/catCard/CatCard"
import "./Home.scss";
import { cards, projects } from "../../dummyData";
import Features from '../../components/features/Features';
import Explore from '../../components/explore/Explore';
import FeaturesDark from '../../components/featuresDark/FeaturesDark';
import ProjectCard from '../../components/projectCard/ProjectCard';

const Home = () => {
  return (
    <div className="home">
      <Featured />
      <TrustBy />
      <Slide slidesToShow={5}>
        {cards.map(card => (
          <CatCard key={card.id} item={card} />
        ))}
      </Slide>
      <Features />
      <Explore />
      <FeaturesDark />
      <Slide slidesToShow={4}>
        {projects.map(project => (
          <ProjectCard key={project.id} item={project} />
        ))}
      </Slide>
    </div>
  )
}

export default Home