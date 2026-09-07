import { ChevronDown, ExternalLink } from 'lucide-react';
import { CATEGORY_META, PINK } from '../config/constants';
import { formatStipend, stipendTagLabel, formatPosted } from '../utils/apiHelpers';
import { Tag, SkillChip } from './SharedUI';

export default function JobCard({ job, index, isExpanded, onToggle }) {
  const meta = CATEGORY_META[job.category] || CATEGORY_META.Other;
  const avatarCode = job.title.slice(0, 2).toUpperCase();
  const staggerDelay = Math.min(index, 8) * 70;

  const tags = [job.category];
  if (job.duration) tags.push(job.duration);
  else if (job.jobType) tags.push(job.jobType);
  tags.push(job.isLive ? job.salaryText || 'Salary n/a' : stipendTagLabel(job.stipend));

  return (
    <div
      className="card-rise bg-white rounded-2xl border border-slate-200 p-5 cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
      style={{ animationDelay: `${staggerDelay}ms` }}
      onClick={() => onToggle(job.id)}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle(job.id);
        }
      }}
    >
      <div className="flex items-start gap-3">
        <div className={`w-11 h-11 rounded-full flex items-center justify-center font-display font-semibold text-sm shrink-0 ${meta.avatarBg} ${meta.avatarText}`}>
          {avatarCode}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-display font-semibold text-slate-800 leading-snug">{job.title}</h3>
            {job.badge && (
              <span className="text-xs font-semibold tracking-wide uppercase bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                {job.badge}
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 mt-1">
            {job.company} · {job.locationLabel}
            {job.isLive && <span className="text-slate-400"> · via Remotive</span>}
          </p>
        </div>
        <ChevronDown
          size={18}
          className={`text-slate-300 mt-1 shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
        <div className="pt-4 border-t border-slate-100 space-y-3" onClick={(e) => e.stopPropagation()}>
          {job.isLive ? (
            <>
              <p className="text-sm text-slate-600 leading-relaxed">
                {job.descriptionSnippet}
                {job.descriptionSnippet.length >= 240 ? '…' : ''}
              </p>
              <div className="flex items-center justify-between text-sm pt-1 flex-wrap gap-2">
                <span className="text-slate-500">
                  {formatPosted(job.postedDaysAgo)} · via Remotive
                </span>
                <a
                  href={job.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium hover:underline"
                  style={{ color: PINK }}
                >
                  View on Remotive <ExternalLink size={13} />
                </a>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="text-xs font-semibold tracking-wide uppercase text-slate-400 mb-1.5">Required skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {job.requiredSkills.map((s) => (
                    <SkillChip key={s}>{s}</SkillChip>
                  ))}
                </div>
              </div>
              {job.preferredSkills.length > 0 && (
                <div>
                  <p className="text-xs font-semibold tracking-wide uppercase text-slate-400 mb-1.5">Nice to have</p>
                  <div className="flex flex-wrap gap-1.5">
                    {job.preferredSkills.map((s) => (
                      <SkillChip key={s} muted>
                        {s}
                      </SkillChip>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between text-sm pt-1 flex-wrap gap-2">
                <span className="text-slate-500">
                  {formatStipend(job.stipend)} · {formatPosted(job.postedDaysAgo)}
                </span>
                <a
                  href={job.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium hover:underline"
                  style={{ color: PINK }}
                >
                  View listing <ExternalLink size={13} />
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
