
export const TASK_TEMPLATES = [
  {
    id: 'email-draft',
    title: 'Draft Marketing Email',
    description: 'Create a compelling email campaign for your product.',
    prompt: 'Write a persuasive marketing email draft for the product [Product Name]. Focus on the benefits of [Main Benefit] and include a strong Call-to-Action.'
  },
  {
    id: 'travel-plan',
    title: 'Plan a Short Trip',
    description: 'Get a structured 3-day itinerary.',
    prompt: 'Plan a 3-day travel itinerary to [Location]. Ensure the schedule includes interesting dining spots, transportation options, and an estimated daily budget.'
  },
  {
    id: 'article-summary',
    title: 'Summarize Article',
    description: 'Extract key points from a link or long text.',
    prompt: 'Summarize the following article in bullet points: [Paste link or text here]. Focus on the main findings and conclusion.'
  },
  {
    id: 'market-research',
    title: 'AI Market Research',
    description: 'Find the latest information on market trends.',
    prompt: 'Search for the 5 best articles about AI Agent trends in 2024 and summarize each one with key bullet points.'
  }
];

export const MOCK_STATS = {
  activeTasks: 2,
  completedTasks: 48,
  creditsRemaining: 850,
  timeSaved: '124 Hours'
};

export const MOCK_HISTORY: any[] = [
  {
    id: '1',
    title: 'SaaS Competitor Analysis',
    status: 'Completed',
    createdAt: Date.now() - 86400000,
    category: 'Research'
  },
  {
    id: '2',
    title: 'AI Blog Post Draft',
    status: 'Completed',
    createdAt: Date.now() - 172800000,
    category: 'Content'
  }
];
