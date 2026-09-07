export const LIVE_FEED_ENDPOINT = 'https://remotive.com/api/remote-jobs';

export function formatStipend(stipend) {
  if (!stipend || stipend.amount == null) return 'stipend not specified';
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: stipend.currency,
    maximumFractionDigits: 0,
  }).format(stipend.amount);
  return `${formatted}/${stipend.period === 'month' ? 'mo' : 'yr'}`;
}

export function stipendTagLabel(stipend) {
  return stipend && stipend.amount != null ? 'Paid' : 'Stipend TBD';
}

export function formatPosted(daysAgo) {
  if (daysAgo == null) return 'Recently posted';
  if (daysAgo <= 0) return 'Posted today';
  if (daysAgo === 1) return 'Posted 1 day ago';
  return `Posted ${daysAgo} days ago`;
}

export function stripHtml(html) {
  return (html || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

const CATEGORY_KEYWORDS = {
  LLMs: /\b(llm|large language model|language model|gpt|nlp|natural language|prompt engineer|chatbot|conversational ai|transformer)\b/i,
  Vision: /\b(computer vision|image recognition|visual recognition|opencv|image segmentation|object detection)\b/i,
  Robotics: /\b(robot|robotics|autonomous vehicle|self[- ]driving|\bros\b|drone)\b/i,
  Research: /\b(research scientist|research engineer|applied scientist|ai safety|alignment)\b/i,
  Systems: /\b(mlops|ml infrastructure|ml platform|distributed training|model deployment|inference optimization|ai infrastructure)\b/i,
};
const AI_RELEVANCE_KEYWORDS = /\b(machine learning|artificial intelligence|\bai\b|deep learning|neural network|data scien|generative ai|\bml\b)\b/i;

export function classifyLiveJob(raw) {
  const text = `${raw.title} ${raw.category || ''} ${stripHtml(raw.description).slice(0, 500)}`;
  for (const name of Object.keys(CATEGORY_KEYWORDS)) {
    if (CATEGORY_KEYWORDS[name].test(text)) return name;
  }
  if (AI_RELEVANCE_KEYWORDS.test(text)) return 'Systems';
  return 'Other';
}

export function formatJobType(rawType) {
  const map = { full_time: 'Full-time', part_time: 'Part-time', contract: 'Contract', freelance: 'Freelance', internship: 'Internship' };
  return map[rawType] || null;
}

export function daysAgoFrom(dateString) {
  if (!dateString) return null;
  const posted = new Date(dateString).getTime();
  if (Number.isNaN(posted)) return null;
  return Math.max(0, Math.floor((Date.now() - posted) / (1000 * 60 * 60 * 24)));
}

export function normalizeLiveJob(raw) {
  const daysAgo = daysAgoFrom(raw.publication_date);
  return {
    id: `remotive-${raw.id}`,
    title: raw.title,
    company: raw.company_name,
    workMode: 'remote',
    locationLabel: raw.candidate_required_location || 'Remote',
    jobType: formatJobType(raw.job_type),
    duration: null,
    category: classifyLiveJob(raw),
    badge: daysAgo !== null && daysAgo <= 1 ? 'NEW' : null,
    requiredSkills: [],
    preferredSkills: [],
    stipend: null,
    salaryText: raw.salary || null,
    postedDaysAgo: daysAgo,
    experienceLevel: null,
    isActive: true,
    sourceUrl: raw.url,
    descriptionSnippet: stripHtml(raw.description).slice(0, 240),
    isLive: true,
  };
}

export async function fetchLiveJobs() {
  const res = await fetch(LIVE_FEED_ENDPOINT);
  if (!res.ok) throw new Error(`Remotive API responded with ${res.status}`);
  const data = await res.json();
  return Array.isArray(data.jobs) ? data.jobs.map(normalizeLiveJob) : [];
}
