import { Search, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { NAVY, PINK, FILTERS } from '../config/constants';

export function DecorativeBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      <div className="blob-a absolute -top-16 -left-16 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-60" />
      <div className="blob-b absolute -top-24 -right-20 w-80 h-80 bg-pink-200 rounded-full blur-3xl opacity-50" />
      <div className="blob-c absolute top-40 -right-10 w-40 h-40 bg-amber-200 rounded-full blur-2xl opacity-60" />
    </div>
  );
}

export function BrandMark({ compact }) {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div
        className="flex items-center justify-center rounded-full font-display font-semibold text-white shrink-0"
        style={{ backgroundColor: PINK, width: compact ? 32 : 36, height: compact ? 32 : 36, fontSize: compact ? 14 : 16 }}
      >
        I
      </div>
      <span className="font-display font-semibold text-lg sm:text-xl" style={{ color: NAVY }}>
        InternHub
      </span>
    </div>
  );
}

export function Header({ isNavOpen, onToggleNav, navRef }) {
  const navLinks = ['Browse', 'Labs', 'About', 'Contact'];
  return (
    <header className="flex items-center justify-between mb-10 sm:mb-14">
      <BrandMark />
      <div className="relative" ref={navRef}>
        <button
          type="button"
          onClick={onToggleNav}
          aria-label="Open menu"
          aria-expanded={isNavOpen}
          className="w-10 h-10 rounded-full border border-slate-200 bg-white bg-opacity-40 hover:bg-opacity-80 flex items-center justify-center transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
        >
          {isNavOpen ? <X size={18} style={{ color: NAVY }} /> : <Menu size={18} style={{ color: NAVY }} />}
        </button>
        {isNavOpen && (
          <div className="drop-in absolute right-0 top-12 w-44 bg-white rounded-2xl shadow-lg border border-slate-100 py-2 z-30">
            {navLinks.map((item) => (
              <a
                key={item}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="block px-4 py-2 text-sm font-medium text-slate-600 hover:text-pink-500 hover:bg-pink-50 transition-colors duration-150"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

export function Hero({ liveCount, isLoadingLive }) {
  return (
    <section className="mb-10 sm:mb-12 max-w-3xl">
      <div className="soft-fade inline-flex items-center gap-2 bg-white border border-emerald-200 rounded-full pl-3 pr-4 py-1.5 mb-7">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-sm font-medium text-emerald-700">
          {isLoadingLive ? 'Loading live roles…' : `${liveCount} AI & ML roles live now`}
        </span>
      </div>
      <h1 className="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6" style={{ color: NAVY }}>
        Find your first <span style={{ color: PINK }}>AI internship</span> without the doom-scrolling.
      </h1>
      <p className="font-body text-base sm:text-lg text-slate-500 max-w-xl leading-relaxed">
        One tidy feed of every AI/ML role across labs, startups, and industry. No more tabs, no more spam — just the signal.
      </p>
    </section>
  );
}

export function SearchBar({ query, onQueryChange, onSubmit }) {
  return (
    <div className="mb-6">
      <label htmlFor="listing-search" className="block text-xs font-semibold tracking-widest uppercase text-slate-400 mb-2">
        Search listings
      </label>
      <div className="relative max-w-xl">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          id="listing-search"
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') onSubmit(); }}
          placeholder='Try "transformer", "RL", or "remote"'
          className="w-full bg-white rounded-full border border-slate-200 pl-11 pr-16 py-3.5 text-sm sm:text-base text-slate-700 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition-shadow duration-200"
        />
        <button
          type="button"
          onClick={onSubmit}
          aria-label="Search"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white transition-transform duration-150 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:ring-offset-2"
          style={{ backgroundColor: PINK }}
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

export function FilterChips({ active, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {FILTERS.map((filter) => {
        const isActive = filter === active;
        return (
          <button
            key={filter}
            type="button"
            onClick={() => onSelect(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 ${
              isActive ? 'text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:border-pink-300 hover:text-pink-500'
            }`}
            style={isActive ? { backgroundColor: NAVY } : undefined}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}

export function InternshipToggle({ active, onToggle }) {
  return (
    <div className="mb-10 sm:mb-12">
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={active}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 ${
          active ? 'bg-pink-50 border-pink-300 text-pink-600' : 'bg-white border-slate-200 text-slate-500 hover:border-pink-300'
        }`}
      >
        <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${active ? 'border-pink-500' : 'border-slate-300'}`} style={active ? { backgroundColor: PINK } : undefined}>
          {active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
        </span>
        Internship postings only
      </button>
    </div>
  );
}

export function Tag({ children }) {
  return (
    <span className="text-xs font-medium text-slate-600 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full">
      {children}
    </span>
  );
}

export function SkillChip({ children, muted }) {
  return (
    <span
      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
        muted ? 'bg-slate-50 text-slate-500 border border-slate-100' : 'bg-pink-50 text-pink-600 border border-pink-100'
      }`}
    >
      {children}
    </span>
  );
}

export function EmptyState({ isLoadingLive }) {
  return (
    <div className="text-center py-14 mb-10 bg-white rounded-2xl border border-dashed border-slate-200">
      <p className="font-display font-semibold text-lg mb-1" style={{ color: NAVY }}>
        {isLoadingLive ? 'Loading live listings…' : 'No matching internships yet'}
      </p>
      <p className="text-sm text-slate-500">
        {isLoadingLive ? 'Real roles are streaming in from Remotive.' : 'Try a different keyword, or clear filters to see everything.'}
      </p>
    </div>
  );
}

export function LiveFeedNotice({ error }) {
  if (!error) return null;
  return (
    <div className="mb-6 text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
      Live listings couldn't be reached right now, so you're seeing the curated picks only. ({error})
    </div>
  );
}

export function LoadMoreButton({ onClick, remaining }) {
  return (
    <div className="flex justify-center mb-10">
      <button
        type="button"
        onClick={onClick}
        className="px-6 py-3 rounded-full text-sm font-semibold bg-white border border-slate-200 text-slate-600 hover:border-pink-300 hover:text-pink-500 transition-colors duration-200 shadow-sm"
      >
        Load more ({remaining} more)
      </button>
    </div>
  );
}

export function CTAButton({ onClick, count }) {
  return (
    <div className="flex justify-start mb-4">
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center gap-2 bg-white rounded-full pl-6 pr-5 py-3.5 font-display font-medium shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95 border border-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
        style={{ color: NAVY }}
      >
        See all {count} live roles
        <ArrowUpRight size={18} />
      </button>
    </div>
  );
}

export function Footer() {
  const navLinks = ['Browse', 'Labs', 'About', 'Contact'];
  return (
    <footer className="pt-8 border-t border-slate-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <BrandMark compact />
        <nav className="flex items-center gap-6">
          {navLinks.map((item) => (
            <a
              key={item}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-sm font-medium text-slate-500 hover:text-pink-500 transition-colors duration-150"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
      <p className="text-sm text-slate-400 mt-6">© 2026 InternHub. AI &amp; ML internships, curated daily.</p>
      <p className="text-xs text-slate-400 mt-2">
        Live listings powered by the{' '}
        <a href="https://remotive.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-pink-500">
          Remotive
        </a>{' '}
        API.
      </p>
    </footer>
  );
}
