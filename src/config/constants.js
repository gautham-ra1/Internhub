export const CREAM = '#FDF3E7';
export const NAVY = '#221B3F';
export const PINK = '#EC4899';
export const PAGE_SIZE = 24;

export const ANIMATION_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  .font-display { font-family: 'Fredoka', ui-rounded, 'Segoe UI Rounded', sans-serif; }
  .font-body { font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif; }

  @keyframes blobFloatA { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(16px,-20px) scale(1.06); } }
  @keyframes blobFloatB { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-18px,16px) scale(1.05); } }
  @keyframes blobFloatC { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(10px,14px) scale(0.95); } }
  .blob-a { animation: blobFloatA 10s ease-in-out infinite; }
  .blob-b { animation: blobFloatB 12s ease-in-out infinite; }
  .blob-c { animation: blobFloatC 9s ease-in-out infinite; }

  @keyframes cardRise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
  .card-rise { animation: cardRise 0.5s cubic-bezier(0.22,1,0.36,1) both; }

  @keyframes dropIn { from { opacity: 0; transform: translateY(-6px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
  .drop-in { animation: dropIn 0.16s ease-out both; }

  @keyframes softFade { from { opacity: 0; } to { opacity: 1; } }
  .soft-fade { animation: softFade 0.5s ease both; }
`;

export const CATEGORY_META = {
  LLMs: { avatarBg: 'bg-pink-500', avatarText: 'text-white' },
  Vision: { avatarBg: 'bg-blue-500', avatarText: 'text-white' },
  Robotics: { avatarBg: 'bg-amber-400', avatarText: 'text-slate-900' },
  Systems: { avatarBg: 'bg-violet-500', avatarText: 'text-white' },
  Research: { avatarBg: 'bg-emerald-500', avatarText: 'text-white' },
  Other: { avatarBg: 'bg-slate-400', avatarText: 'text-white' },
};

export const FILTERS = ['All', 'LLMs', 'Vision', 'Robotics', 'Systems', 'Research', 'Other', 'Remote'];

export const CANDIDATE = {
  skills: ['Python', 'PyTorch', 'ML Research'],
  interests: ['LLMs', 'Research'],
  preferredWorkModes: ['remote'],
  preferredJobTypes: ['Internship'],
  experienceLevel: 'intermediate',
};

export const FEATURED_JOB_ID = 'heliodor-ml-research';

export const JOBS = [
  {
    id: 'heliodor-ml-research',
    title: 'ML Research Intern — Post-Training',
    company: 'Heliodor Labs',
    workMode: 'remote',
    locationLabel: 'Remote',
    jobType: 'Internship',
    duration: '3.5 mo',
    category: 'LLMs',
    badge: 'NEW',
    requiredSkills: ['Python', 'PyTorch', 'Transformer Architectures', 'Distributed Training'],
    preferredSkills: ['JAX', 'RLHF', 'Research Publications'],
    stipend: { amount: 5500, currency: 'USD', period: 'month' },
    postedDaysAgo: 1,
    experienceLevel: 'advanced',
    isActive: true,
    sourceUrl: 'https://heliodorlabs.ai/careers/ml-research-post-training',
  },
  {
    id: 'brightpath-vision-engineer',
    title: 'Vision Engineer Intern',
    company: 'Brightpath AI',
    workMode: 'onsite',
    locationLabel: 'San Francisco',
    jobType: 'Internship',
    duration: '4 mo',
    category: 'Vision',
    badge: 'HOT',
    requiredSkills: ['Python', 'Computer Vision', 'PyTorch', 'OpenCV'],
    preferredSkills: ['3D Perception', 'CUDA'],
    stipend: { amount: 6000, currency: 'USD', period: 'month' },
    postedDaysAgo: 3,
    experienceLevel: 'intermediate',
    isActive: true,
    sourceUrl: 'https://brightpath.ai/careers/vision-engineer-intern',
  },
  // ... (You can paste the rest of the original JOBS array here)
];
