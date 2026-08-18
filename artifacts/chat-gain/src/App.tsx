import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { ArrowDownRight, ArrowRight, Check, ChevronRight, Menu, Moon, Pause, Play, Sun, X } from 'lucide-react';

type Article = {
  id: number;
  category: string;
  title: string;
  summary: string;
  time: string;
  visual: string;
};

const articles: Article[] = [
  { id: 1, category: 'Conversation', title: 'The two-second pause that makes people listen', summary: 'A tiny interruption to your reflexes, and a practical way to make room for better answers.', time: '6 min read', visual: 'PAUSE' },
  { id: 2, category: 'Ideas', title: 'Stop collecting opinions. Start building a point of view.', summary: 'A field guide for turning a messy browser tab pile into one useful, defendable idea.', time: '8 min read', visual: 'STANCE' },
  { id: 3, category: 'Work', title: 'Your next good question is hiding in the obvious one', summary: 'Ask past the polite surface and find the signal that changes the whole room.', time: '5 min read', visual: 'ASK' },
  { id: 4, category: 'Habits', title: 'Make a weekly reset you will actually repeat', summary: 'A low-drama ritual for clearing the noise and choosing the work that earns attention.', time: '4 min read', visual: 'RESET' },
  { id: 5, category: 'Conversation', title: 'How to disagree without shrinking the room', summary: 'The language of a strong counterpoint: direct, generous, and hard to dismiss.', time: '7 min read', visual: 'PUSH BACK' },
  { id: 6, category: 'Ideas', title: 'Borrow this note-taking system from good interviewers', summary: 'Capture the friction, the phrase, and the thing nobody has said yet.', time: '9 min read', visual: 'NOTICE' },
];

const tickerItems = [
  ['MAYA R.', 'saved “The honest opener”'],
  ['DAVID K.', 'finished a 7-day practice'],
  ['NIA T.', 'shared “Ask past the obvious”'],
  ['SAM L.', 'joined the Monday Brief'],
  ['ELI P.', 'highlighted a sharp question'],
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function useReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a className={`brand ${footer ? 'footer-brand' : ''}`} href="#top" data-testid={footer ? 'link-footer-brand' : 'link-brand'} onClick={(event) => { event.preventDefault(); scrollToId('top'); }}>
      <span className="brand-mark">+</span><span>CHAT GAIN</span>
    </a>
  );
}

function Header({ dark, onTheme, menuOpen, onMenu, tickerPaused, onTicker }: { dark: boolean; onTheme: () => void; menuOpen: boolean; onMenu: () => void; tickerPaused: boolean; onTicker: () => void }) {
  return (
    <>
      <div className="topline" aria-label="Recent activity">
        <div className="ticker-track" style={{ animationPlayState: tickerPaused ? 'paused' : 'running' }}>
          {[...tickerItems, ...tickerItems].map(([name, action], index) => (
            <span className="ticker-item" key={`${name}-${index}`}><strong>{name}</strong>&nbsp; {action}</span>
          ))}
        </div>
        <button className="ticker-control" type="button" onClick={onTicker} aria-label={tickerPaused ? 'Play activity ticker' : 'Pause activity ticker'} data-testid="button-ticker-toggle">
          {tickerPaused ? <Play size={11} /> : <Pause size={11} />}
        </button>
      </div>
      <header className="nav">
        <div className="container nav-inner">
          <Brand />
          <nav className="nav-links" aria-label="Main navigation">
            <a href="#latest" data-testid="link-nav-latest">Latest</a>
            <a href="#principles" data-testid="link-nav-principles">The practice</a>
            <a href="#newsletter" data-testid="link-nav-brief">Monday Brief</a>
          </nav>
          <div className="nav-actions">
            <button className="icon-btn" type="button" onClick={onTheme} aria-label="Toggle theme" data-testid="button-theme-toggle">
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button className="button button--acid" type="button" onClick={() => scrollToId('newsletter')} data-testid="button-header-subscribe">Get the brief <ArrowRight size={14} /></button>
            <button className="icon-btn menu-btn" type="button" onClick={onMenu} aria-expanded={menuOpen} aria-label="Open navigation" data-testid="button-mobile-menu">
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
        <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`}>
          <a href="#latest" data-testid="link-mobile-latest" onClick={onMenu}>Latest thinking</a>
          <a href="#principles" data-testid="link-mobile-practice" onClick={onMenu}>The practice</a>
          <a href="#newsletter" data-testid="link-mobile-brief" onClick={onMenu}>Monday Brief</a>
          <button className="button button--acid" type="button" onClick={() => { onMenu(); scrollToId('newsletter'); }} data-testid="button-mobile-subscribe">Get the brief <ArrowRight size={14} /></button>
        </div>
      </header>
    </>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy reveal">
          <span className="eyebrow">Ideas for the in-between moments</span>
          <h1>Say less.<br /><em>Mean</em> more.</h1>
          <p className="hero-intro">CHAT GAIN is your sharp little advantage for conversations, decisions, and the work that happens after a good question.</p>
          <div className="hero-actions">
            <button className="button" type="button" onClick={() => scrollToId('latest')} data-testid="button-hero-explore">Explore the thinking <ArrowDownRight size={15} /></button>
            <button className="button button--ghost" type="button" onClick={() => scrollToId('newsletter')} data-testid="button-hero-brief">Read the brief</button>
          </div>
        </div>
        <div className="hero-meta reveal">
          <strong>Built for the curious<br />and slightly stubborn.</strong>
          No productivity theatre.<br />Just language, leverage, and<br />a better next move.
          <span className="scribble">Keep your edge →</span>
        </div>
      </div>
    </section>
  );
}

function Signal() {
  return (
    <section className="signal reveal" aria-label="CHAT GAIN community activity">
      <div className="container signal-inner">
        <div className="signal-copy"><span>Today in the room</span>People are practicing the pause.</div>
        <div className="signal-stat"><b>4,218</b><small>readers getting sharper this week</small></div>
      </div>
    </section>
  );
}

function Feature() {
  const [open, setOpen] = useState(false);
  return (
    <section className="feature-section" id="featured">
      <div className="container">
        <div className="section-top reveal">
          <div><span className="eyebrow">The lead story</span><h2 className="section-heading">Start here.</h2></div>
          <p>A considered place to land when your brain has too many tabs open and one of them matters.</p>
        </div>
        <article className="feature-card reveal">
          <div className="feature-art" aria-label="Abstract editorial artwork">
            <span className="art-label">Field note / 001</span><div className="art-lines" /><div className="art-quote">THE<br />POWER OF<br />A PAUSE.</div>
          </div>
          <div className="feature-content">
            <div><span className="tag">Conversation · 06 min</span><h3>Before you answer, make a little room.</h3><p>Most people listen while drafting their reply. This is a small, practical reset for staying in the actual conversation — and hearing the useful part.</p></div>
            <button className="read-link" type="button" onClick={() => setOpen(true)} data-testid="button-feature-read">Read the field note <ArrowRight size={16} /></button>
          </div>
        </article>
      </div>
      {open && <ArticleModal article={{ title: 'Before you answer, make a little room.', category: 'Conversation · Field note 001', summary: 'Try this in your next conversation: let the other person finish, breathe once, and repeat the one phrase that changed the temperature of the room. Attention is not passive. It is a move.' }} onClose={() => setOpen(false)} />}
    </section>
  );
}

function ArticleModal({ article, onClose }: { article: Pick<Article, 'title' | 'category' | 'summary'>; onClose: () => void }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="article-modal-title">
      <button className="icon-btn modal-close" type="button" onClick={onClose} aria-label="Close article" data-testid="button-close-article"><X size={17} /></button>
      <span className="tag">{article.category}</span><h2 id="article-modal-title">{article.title}</h2><p>{article.summary}</p>
      <button className="button button--acid" type="button" onClick={onClose} data-testid="button-save-article"><Check size={14} /> Saved to your reading list</button>
    </div>
  </div>;
}

function Latest() {
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState<Article | null>(null);
  const categories = ['All', 'Conversation', 'Ideas', 'Work', 'Habits'];
  const visibleArticles = useMemo(() => category === 'All' ? articles : articles.filter((article) => article.category === category), [category]);
  return (
    <section className="latest" id="latest">
      <div className="container">
        <div className="latest-header reveal"><div><span className="eyebrow">Fresh from the notebook</span><h2 className="section-heading">Make it useful.</h2></div>
          <div className="filter-row" role="tablist" aria-label="Filter stories">{categories.map((item) => <button className={`filter ${category === item ? 'active' : ''}`} type="button" role="tab" aria-selected={category === item} key={item} onClick={() => setCategory(item)} data-testid={`button-filter-${item.toLowerCase()}`}>{item}</button>)}</div>
        </div>
        <div className="card-grid">
          {visibleArticles.map((article, index) => <article className="card reveal" tabIndex={0} key={article.id} onClick={() => setSelected(article)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setSelected(article); }} data-testid={`card-article-${article.id}`}>
            <div className="card-visual"><span className="visual-word">{article.visual}</span></div>
            <div className="card-body"><span className="tag">{article.category}</span><h3 className="card-title">{article.title}</h3><p className="card-copy">{article.summary}</p><div className="card-foot"><span>Read story</span><span>{article.time}</span></div></div>
          </article>)}
          {visibleArticles.length === 0 && <p className="card-copy">No notes in this section yet. Try another lens.</p>}
        </div>
      </div>
      {selected && <ArticleModal article={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

function Principles() {
  const principles = [
    ['01', 'Name the real thing', 'Clarity starts before the sentence. Find what is actually at stake.'],
    ['02', 'Trade certainty for curiosity', 'The better question usually opens a door your first answer closed.'],
    ['03', 'Make the next move small', 'A useful idea should survive contact with Tuesday afternoon.'],
    ['04', 'Leave people with more room', 'Strong communication does not win the room. It improves the room.'],
  ];
  return <section className="principles" id="principles"><div className="container principles-grid">
    <div className="principles-intro reveal"><span className="eyebrow">Our operating system</span><h2 className="section-heading">A few things we believe.</h2><p>For the days when “just be more confident” is not actionable enough.</p><button className="button button--ghost" type="button" onClick={() => scrollToId('newsletter')} data-testid="button-principles-join">Join the practice <ArrowRight size={14} /></button></div>
    <div className="principle-list">{principles.map(([number, title, copy]) => <div className="principle reveal" key={number}><span className="principle-number">{number}</span><div><h3>{title}</h3><p>{copy}</p></div><ChevronRight size={18} /></div>)}</div>
  </div></section>;
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (email.trim()) setSubmitted(true); };
  return <section className="newsletter" id="newsletter"><div className="container newsletter-grid reveal"><div><span className="eyebrow">The Monday Brief</span><h2>Start the week<br />with a <em>better</em><br />question.</h2></div><form className="newsletter-form" onSubmit={submit}><p>One useful idea, one conversation move, and one nudge to make the thinking visible. No inbox wallpaper.</p><div className="form-row"><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@somewhere.good" aria-label="Email address" required data-testid="input-newsletter-email" /><button type="submit" aria-label="Subscribe" data-testid="button-newsletter-submit"><ArrowRight size={17} /></button></div>{submitted && <div className="form-message" role="status" data-testid="status-newsletter-success"><Check size={14} /> You are on the list. See you Monday.</div>}</form></div></section>;
}

function Footer() {
  return <footer className="footer"><div className="container"><div className="footer-top"><div className="footer-brand"><Brand footer /><p>A lively field guide for better conversations and stronger ideas.</p></div><div className="footer-links"><div><h4>Explore</h4><a href="#featured" data-testid="link-footer-lead">The lead story</a><a href="#latest" data-testid="link-footer-latest">Latest thinking</a><a href="#principles" data-testid="link-footer-practice">The practice</a></div><div><h4>Follow</h4><a href="#newsletter" data-testid="link-footer-instagram">Instagram</a><a href="#newsletter" data-testid="link-footer-linkedin">LinkedIn</a><a href="#newsletter" data-testid="link-footer-newsletter">Newsletter</a></div><div><h4>Say hello</h4><a href="mailto:hello@chatgain.co" data-testid="link-footer-email">hello@chatgain.co</a><a href="#top" data-testid="link-footer-top">Back to top</a></div></div></div><div className="footer-bottom"><span>© 2025 CHAT GAIN / Made for the wonderfully unfinished.</span><span>Keep asking better.</span></div></div></footer>;
}

function App() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tickerPaused, setTickerPaused] = useState(false);
  useReveal();
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); }, [dark]);
  return <div className="site"><Header dark={dark} onTheme={() => setDark((value) => !value)} menuOpen={menuOpen} onMenu={() => setMenuOpen((value) => !value)} tickerPaused={tickerPaused} onTicker={() => setTickerPaused((value) => !value)} /><main><Hero /><Signal /><Feature /><Latest /><Principles /><Newsletter /></main><Footer /></div>;
}

export default App;