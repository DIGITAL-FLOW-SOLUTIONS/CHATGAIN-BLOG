import { useEffect, useState, type FormEvent } from 'react';
import { ArrowRight, Check, ChevronDown, CircleCheck, Menu, MessageCircle, Moon, Pause, Play, ShieldCheck, Sun, Users, X } from 'lucide-react';

type Person = { id: number; name: string; country: string; topic: string; status: string; initials: string; tone: string };

const people: Person[] = [
  { id: 1, name: 'Lina', country: 'Spain', topic: 'Travel stories', status: 'Online now', initials: 'LI', tone: 'peach' },
  { id: 2, name: 'Marek', country: 'Poland', topic: 'Film & culture', status: 'Online now', initials: 'MA', tone: 'sky' },
  { id: 3, name: 'Sora', country: 'South Korea', topic: 'Language swap', status: 'Active 2m ago', initials: 'SO', tone: 'lilac' },
  { id: 4, name: 'Nadia', country: 'Canada', topic: 'Making friends', status: 'Online now', initials: 'NA', tone: 'mint' },
  { id: 5, name: 'Theo', country: 'France', topic: 'Music & cities', status: 'Online now', initials: 'TH', tone: 'sun' },
  { id: 6, name: 'Mira', country: 'Brazil', topic: 'Everyday chat', status: 'Active 1m ago', initials: 'MI', tone: 'rose' },
  { id: 7, name: 'Owen', country: 'Ireland', topic: 'Travel stories', status: 'Online now', initials: 'OW', tone: 'sand' },
  { id: 8, name: 'Aya', country: 'Japan', topic: 'New perspectives', status: 'Online now', initials: 'AY', tone: 'blue' },
  { id: 9, name: 'Samir', country: 'Morocco', topic: 'Language swap', status: 'Active 3m ago', initials: 'SA', tone: 'coral' },
  { id: 10, name: 'Hana', country: 'Czechia', topic: 'Food & rituals', status: 'Online now', initials: 'HA', tone: 'lime' },
];

const tickerItems = ['Mina earned from a new conversation', 'Oscar started a paid language chat', 'Sofia earned while chatting from Lisbon', '2,480 people are earning by chatting today'];
const faqs = [
  ['What is CHAT GAIN?', 'CHAT GAIN helps you earn by chatting with foreigners. Choose the conversations you enjoy, spend time with people around the world, and get paid for your approved chat time.'],
  ['How do I find someone to chat with?', 'Browse the live room, choose a shared interest, and tap Start paid chat. You can meet people from other countries while earning from the time you spend talking.'],
  ['Is there a registration fee?', 'No. Creating your profile and joining is free. Once you are approved, you can earn when foreigners book and complete chats with you.'],
  ['How do I stay safe?', 'You stay in control at every step. Use our report tools, protect your personal information, and leave any conversation that does not feel right. Payments and chat activity stay inside the platform.'],
  ['What happens after I join?', 'Create your profile, choose your languages and topics, set when you are available, and start accepting paid chats with foreigners who want to connect.'],
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function useReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.1 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function Brand() {
  return <button className="brand" type="button" onClick={() => scrollToId('top')} data-testid="button-brand"><span className="brand-mark">CG</span><span>CHAT GAIN</span></button>;
}

function Header({ dark, onTheme, menuOpen, onMenu, paused, onTicker }: { dark: boolean; onTheme: () => void; menuOpen: boolean; onMenu: () => void; paused: boolean; onTicker: () => void }) {
  return <>
    <div className="topline" aria-label="Community activity">
      <div className="ticker-track" style={{ animationPlayState: paused ? 'paused' : 'running' }}>
        {[...tickerItems, ...tickerItems].map((item, index) => <span className="ticker-item" key={`${item}-${index}`}><i />{item}</span>)}
      </div>
      <button className="ticker-control" type="button" onClick={onTicker} aria-label={paused ? 'Play activity ticker' : 'Pause activity ticker'} data-testid="button-ticker-toggle">{paused ? <Play size={11} /> : <Pause size={11} />}</button>
    </div>
    <header className="nav">
      <div className="container nav-inner">
        <Brand />
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#voices" data-testid="link-nav-voices">Live voices</a>
          <a href="#how-it-works" data-testid="link-nav-how">How it works</a>
          <a href="#stories" data-testid="link-nav-stories">Stories</a>
          <a href="#faq" data-testid="link-nav-faq">FAQ</a>
        </nav>
        <div className="nav-actions">
          <button className="theme-btn" type="button" onClick={onTheme} aria-label="Toggle theme" data-testid="button-theme-toggle">{dark ? <Sun size={15} /> : <Moon size={15} />}</button>
      <button className="button button--coral header-cta" type="button" onClick={() => scrollToId('join')} data-testid="button-header-join">Start earning <ArrowRight size={14} /></button>
          <button className="theme-btn menu-btn" type="button" onClick={onMenu} aria-expanded={menuOpen} aria-label="Toggle navigation" data-testid="button-mobile-menu">{menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
      </div>
      <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`}>
        <a href="#voices" onClick={onMenu} data-testid="link-mobile-voices">Live voices</a>
        <a href="#how-it-works" onClick={onMenu} data-testid="link-mobile-how">How it works</a>
        <a href="#stories" onClick={onMenu} data-testid="link-mobile-stories">Success stories</a>
        <a href="#faq" onClick={onMenu} data-testid="link-mobile-faq">Frequently asked</a>
        <button className="button button--coral" type="button" onClick={() => { onMenu(); scrollToId('join'); }} data-testid="button-mobile-join">Start earning <ArrowRight size={14} /></button>
      </div>
    </header>
  </>;
}

function Hero() {
  return <section className="hero" id="top">
    <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
    <div className="container hero-inner reveal">
      <p className="hero-kicker"><span className="live-dot" /> A simple way to earn from your conversations</p>
      <h1>Chat with foreigners.<br /><span>Earn as you talk.</span></h1>
      <p className="hero-copy">CHAT GAIN lets you earn by chatting with foreigners who want to connect, practice, and share a little time. Turn your conversation skills into flexible income.</p>
      <div className="hero-actions">
        <button className="button button--coral" type="button" onClick={() => scrollToId('voices')} data-testid="button-hero-explore">Start earning <ArrowRight size={15} /></button>
        <button className="button button--outline" type="button" onClick={() => scrollToId('how-it-works')} data-testid="button-hero-how">See how it works</button>
      </div>
      <div className="hero-note"><span className="note-line" /> Paid conversations with people around the world</div>
    </div>
  </section>;
}

function Avatar({ person, small = false }: { person: Person; small?: boolean }) {
  return <span className={`avatar avatar--${person.tone} ${small ? 'avatar--small' : ''}`} aria-label={`${person.name}'s avatar`}>{person.initials}</span>;
}

function ProfileModal({ person, onClose }: { person: Person; onClose: () => void }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="profile-dialog-title">
      <button className="modal-close" type="button" onClick={onClose} aria-label="Close profile" data-testid="button-close-profile"><X size={17} /></button>
      <div className="modal-avatar"><Avatar person={person} /></div>
      <span className="modal-label">CHAT GAIN MEMBER</span>
      <h2 id="profile-dialog-title">Start earning with {person.name}</h2>
      <p>{person.name} is in {person.country} and wants to talk about {person.topic.toLowerCase()}. Start a paid chat, help make the conversation useful, and earn from your time.</p>
      <button className="button button--coral" type="button" onClick={onClose} data-testid="button-modal-start"><MessageCircle size={15} /> Start paid chat</button>
    </div>
  </div>;
}

function PersonCard({ person, onSelect }: { person: Person; onSelect: (person: Person) => void }) {
  return <article className="person-card reveal" data-testid={`card-person-${person.id}`}>
    <div className="person-top"><Avatar person={person} /><div><h3>{person.name}</h3><p>{person.country}</p></div><span className="card-menu">•••</span></div>
    <p className="topic"><span>INTERESTED IN</span>{person.topic}</p>
    <div className="person-status"><i className={person.status === 'Online now' ? 'online' : ''} />{person.status}<span className="language">EN</span></div>
      <div className="person-actions"><button className="small-cta" type="button" onClick={() => onSelect(person)} data-testid={`button-start-chat-${person.id}`}>Start paid chat <ArrowRight size={12} /></button><button className="chat-btn" type="button" onClick={() => onSelect(person)} aria-label={`Message ${person.name}`} data-testid={`button-message-${person.id}`}><MessageCircle size={14} /></button></div>
  </article>;
}

function Voices() {
  const [selected, setSelected] = useState<Person | null>(null);
  return <section className="voices section" id="voices">
      <div className="container">
      <div className="section-heading-row reveal"><div><span className="section-kicker"><Users size={14} /> LIVE PAID CHATS</span><h2>Foreigners are here<br /><span>ready to chat and earn.</span></h2></div><p>Meet people from other countries, start paid conversations, and earn for the time you spend helping them connect.</p></div>
      <div className="people-grid">
        {people.slice(0, 4).map((person) => <PersonCard person={person} onSelect={setSelected} key={person.id} />)}
        <article className="feature-panel reveal"><div className="feature-burst">NEW<br />ROOM</div><div><span className="feature-label">CHAT GAIN EARNINGS</span><h3>Chat with someone<br /><em>earn along the way.</em></h3><p>Join an open room, connect with someone abroad, and get paid for your time.</p></div><button type="button" className="feature-link" onClick={() => scrollToId('join')} data-testid="button-open-room">Explore paid rooms <ArrowRight size={14} /></button></article>
        {people.slice(4).map((person) => <PersonCard person={person} onSelect={setSelected} key={person.id} />)}
      </div>
       <div className="view-all-wrap reveal"><button className="view-all" type="button" onClick={() => scrollToId('join')} data-testid="button-view-all">View all paid chats <ArrowRight size={15} /></button></div>
    </div>
    {selected && <ProfileModal person={selected} onClose={() => setSelected(null)} />}
  </section>;
}

function Metrics() {
  return <section className="metrics section-small"><div className="container metrics-row">
     <div className="metric reveal"><strong>80,443</strong><span>paid chats started</span></div>
     <div className="metric reveal"><strong>1,285,368</strong><span>minutes paid for</span></div>
     <div className="metric metric--accent reveal"><strong>1,782</strong><span>people earning now</span></div>
     <div className="metric reveal"><strong>4.9<span className="star">★</span></strong><span>community rating</span></div>
  </div></section>;
}

function HowItWorks() {
   const steps = [['01', 'Set your topics', 'Choose languages, interests, and the kinds of conversations you enjoy.'], ['02', 'Chat with foreigners', 'Meet people from around the world and make their time worth coming back for.'], ['03', 'Get paid', 'Your approved chat time turns into earnings you can track.']];
   return <section className="how section" id="how-it-works"><div className="container"><div className="section-heading-row reveal"><div><span className="section-kicker">A SIMPLE START TO EARNING</span><h2>How you<br /><span>earn.</span></h2></div><p>Choose a chat, help someone connect across cultures, and get paid for your time.</p></div><div className="how-layout">
    <div className="how-illustration reveal"><span className="illustration-label">THE CHAT LOOP</span><div className="illustration-sun" /><div className="illustration-card illustration-card--one"><Avatar person={people[0]} small /><b>Hi, I'm Lina</b><span>Spain · Travel stories</span></div><div className="illustration-card illustration-card--two"><Avatar person={people[1]} small /><b>Nice to meet you</b><span>Poland · Film & culture</span></div><div className="illustration-pill">A good conversation<br /><strong>starts small.</strong></div><div className="illustration-path" /></div>
    <div className="step-list">{steps.map(([number, title, copy]) => <div className="step reveal" key={number}><span className="step-number">{number}</span><div><h3>{title}</h3><p>{copy}</p></div><CircleCheck size={19} /></div>)}</div>
  </div></div></section>;
}

function Join() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (email.trim()) setSubmitted(true); };
   return <section className="join section" id="join"><div className="container"><div className="join-card reveal"><div className="join-decoration join-decoration--left" /><div className="join-decoration join-decoration--right" /><span className="section-kicker">YOUR NEXT PAID CHAT</span><h2>How to <span>start earning.</span></h2><p>Create a profile, choose your availability, and turn your conversation skills into income.</p><div className="join-actions"><button className="button button--coral" type="button" onClick={() => document.getElementById('join-email')?.focus()} data-testid="button-join-free">Create my profile <ArrowRight size={14} /></button><button className="button button--green" type="button" onClick={() => scrollToId('voices')} data-testid="button-join-browse">Browse paid chats</button></div><form className="join-form" onSubmit={submit}><label htmlFor="join-email">Get earning tips and new paid-chat opportunities</label><div><input id="join-email" type="email" placeholder="your@email.com" value={email} onChange={(event) => setEmail(event.target.value)} required data-testid="input-join-email" /><button type="submit" aria-label="Join the earning tips list" data-testid="button-join-submit"><ArrowRight size={16} /></button></div>{submitted && <p className="form-success" role="status" data-testid="status-join-success"><Check size={14} /> You are on the list. Start earning soon.</p>}</form></div></div></section>;
}

function Stories() {
  const stories = [['ALICE · UK', '“I started chatting with foreigners for the connection, then realized my time could earn too. Now I make room for paid conversations each week.”', 'Earns through weekly chats'], ['DANIEL · MEXICO', '“I enjoy helping people practice English, and CHAT GAIN makes the time worthwhile. The conversations are genuine and the earnings are clear.”', 'Earns from language chats'], ['MARIE · FRANCE', '“A small hello became a steady way to earn online. I meet people from everywhere and get paid for conversations I already love having.”', 'Earns from friendly conversations']];
  return <section className="stories section" id="stories"><div className="container"><div className="stories-heading reveal"><span className="section-kicker">FROM THE ROOM</span><h2>Earners <span>stories.</span></h2><p>Real people using friendly conversations to connect with foreigners and earn from their time.</p></div><div className="story-grid">{stories.map(([name, quote, note], index) => <article className="story-card reveal" key={name}><div className="story-person"><span className={`story-avatar story-avatar--${index}`} /> <b>{name}</b><span className="verified"><ShieldCheck size={12} /> verified</span></div><p>{quote}</p><span className="story-note">{note}</span></article>)}</div><button className="button button--coral stories-cta reveal" type="button" onClick={() => scrollToId('join')} data-testid="button-stories-cta">Start your earning story <ArrowRight size={14} /></button></div></section>;
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return <section className="faq section" id="faq"><div className="container faq-layout"><div className="faq-intro reveal"><span className="section-kicker">QUESTIONS ABOUT EARNING</span><h2>Frequently<br /><span>asked.</span></h2><p>Learn how paid chats work, how you earn, and how we keep conversations safe.</p><a href="mailto:hello@chatgain.co" className="text-link" data-testid="link-faq-email">Ask about earning <ArrowRight size={14} /></a></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item reveal ${open === index ? 'open' : ''}`} key={question}><button type="button" className="faq-question" onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index} data-testid={`button-faq-${index}`}><span>{question}</span><span className="faq-icon"><ChevronDown size={14} /></span></button>{open === index && <div className="faq-answer"><p>{answer}</p></div>}</div>)}</div></div></section>;
}

function Footer() {
  return <footer className="footer"><div className="container"><div className="footer-card reveal"><div className="footer-copy"><Brand /><p>Good conversations can make<br />the world feel bigger—and put extra income in your pocket.</p><span className="footer-live"><i /> 1,782 people earning through chats</span></div><div className="footer-cta"><span className="section-kicker">KEEP THE CONVERSATION GOING</span><h2>There is always<br /><span>a paid chat</span><br />to start.</h2><button className="button button--coral" type="button" onClick={() => scrollToId('join')} data-testid="button-footer-join">Start earning on CHAT GAIN <ArrowRight size={14} /></button></div></div><div className="footer-bottom"><span>© 2025 CHAT GAIN</span><div><a href="#faq" data-testid="link-footer-help">Earning FAQ</a><a href="mailto:hello@chatgain.co" data-testid="link-footer-contact">Contact</a><a href="#top" data-testid="link-footer-top">Back to top</a></div><span>Made for conversations that pay</span></div></div></footer>;
}

function App() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  useReveal();
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); }, [dark]);
  return <div className="site"><Header dark={dark} onTheme={() => setDark((value) => !value)} menuOpen={menuOpen} onMenu={() => setMenuOpen((value) => !value)} paused={paused} onTicker={() => setPaused((value) => !value)} /><main><Hero /><Voices /><Metrics /><HowItWorks /><Join /><Stories /><FAQ /></main><Footer /></div>;
}

export default App;