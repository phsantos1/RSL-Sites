export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  badge?: string;
  deliverables: string[];
  idealFor: string;
  iconName: string;
  whatsappMessage: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  priceValue?: number;
  period: string;
  badge?: string;
  isPopular?: boolean;
  shortDesc: string;
  deliveryTime: string;
  idealFor: string;
  features: string[];
  notIncluded?: string[];
  whatsappMessage: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: 'local' | 'institutional' | 'landing' | 'catalog' | 'health';
  categoryLabel: string;
  image: string;
  overview: string;
  challenge: string;
  solution: string;
  metric: string;
  metricLabel: string;
  features: string[];
  tags: string[];
  demoUrl?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  segment: string;
  quote: string;
  highlightMetric: string;
  rating: number;
}

export interface DifferentialItem {
  iconName: string;
  title: string;
  description: string;
  benefit: string;
}
