import React from 'react';
import { Search, TrendingUp, Film, Tv, Star, Zap } from 'lucide-react';

const steps = [
  {
    icon: <Search className="w-8 h-8" />,
    title: 'Search',
    description: 'Enter any movie or TV series title in the search bar. Our intelligent search helps you find exactly what you\'re looking for with real-time suggestions.',
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: 'Discover',
    description: 'Browse through our curated trending section featuring popular and critically acclaimed titles, refreshed regularly with new content.',
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Explore',
    description: 'Click on any title to get comprehensive information including cast, ratings, awards, box office performance, and detailed plot summaries.',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-light-text dark:text-dark-text mb-4">
            How It Works
          </h2>
          <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
            Get started in three simple steps and discover your next favorite movie or TV show
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group p-6 sm:p-8 bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-2xl text-center hover:shadow-2xl dark:hover:shadow-black/50 hover:shadow-black/10 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                {step.icon}
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-light-text dark:text-dark-text mb-3">
                {step.title}
              </h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};