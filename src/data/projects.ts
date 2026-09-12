export interface Project {
  slug: string;
  name: string;
  status: 'Published' | 'TestFlight';
  category: string;
  description: string;
  url: string;
  domain: string;
  images: { src: string; alt: string; className: string; width: number; height: number }[];
}

// Add future released projects here; the collection grows without a new section.
export const projects: Project[] = [
  {
    slug: 'caloriecue', name: 'CalorieCue', status: 'Published',
    category: 'Food & nutrition',
    description: 'Photo-based food logging and daily calorie tracking.',
    url: 'https://caloriecue.app', domain: 'caloriecue.app',
    images: [
      { src: '/images/portfolio/caloriecue-phone.webp', alt: 'CalorieCue daily calorie dashboard and food logging on iPhone', className: 'phone-main', width: 646, height: 1426 },
      { src: '/images/portfolio/caloriecue-phone.webp', alt: '', className: 'phone-detail', width: 646, height: 1426 },
    ],
  },
  {
    slug: 'taqvo', name: 'Taqvo', status: 'TestFlight',
    category: 'Activity & outdoors',
    description: 'GPS activity tracking with live location sharing.',
    url: 'https://taqvo.app', domain: 'taqvo.app',
    images: [
      { src: '/images/portfolio/taqvo-tracker.webp', alt: 'Taqvo workout route, pace, and distance on iPhone', className: 'phone-tracker', width: 700, height: 1740 },
      { src: '/images/portfolio/taqvo-map.webp', alt: 'Taqvo Beacon live location map shared in a browser', className: 'phone-map', width: 700, height: 1740 },
    ],
  },
];
