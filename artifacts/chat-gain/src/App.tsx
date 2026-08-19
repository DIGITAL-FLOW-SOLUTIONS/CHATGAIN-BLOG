import { useEffect, useState, type FormEvent } from 'react';
import { ArrowRight, Check, ChevronDown, MessageSquare, Moon, Sun, X } from 'lucide-react';

type Person = {
  id: number;
  name: string;
  age: number;
  country: string;
  flag: string;
  photo: string;
};

type InvestmentPlan = {
  id: number;
  name: string;
  image: string;
  deposit: string;
  dailyProfit: string;
  totalDays: string;
  totalProfit: string;
};

const people: Person[] = [
  { id: 1, name: 'Margaret W.', age: 58, country: 'USA', flag: '🇺🇸', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=180&q=85' },
  { id: 2, name: 'Robert H.', age: 62, country: 'UK', flag: '🇬🇧', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=180&q=85' },
  { id: 3, name: 'Helga S.', age: 55, country: 'GERMANY', flag: '🇩🇪', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=180&q=85' },
  { id: 4, name: 'James M.', age: 60, country: 'CANADA', flag: '🇨🇦', photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=180&q=85' },
  { id: 5, name: 'Karen P.', age: 51, country: 'AUSTRALIA', flag: '🇦🇺', photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=180&q=85' },
  { id: 6, name: 'Lars E.', age: 60, country: 'SWEDEN', flag: '🇸🇪', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=180&q=85' },
  { id: 7, name: 'Mina R.', age: 57, country: 'FRANCE', flag: '🇫🇷', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=180&q=85' },
  { id: 8, name: 'Peter K.', age: 64, country: 'NORWAY', flag: '🇳🇴', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=180&q=85' },
  { id: 9, name: 'Nadia T.', age: 54, country: 'ITALY', flag: '🇮🇹', photo: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=180&q=85' },
  { id: 10, name: 'Sofia J.', age: 59, country: 'IRELAND', flag: '🇮🇪', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=180&q=85' },
];

const payouts = ['LINDA W. UGX 25,000 (just now)', 'NAOMI S. UGX 72,000 (30s ago)', 'NAOMI S. UGX 105,000 (just now)', 'CYNTHIA R. UGX 72,000 (just now)', 'SARAH M. UGX 55,000 (30s ago)', 'LINDA W. UGX 210,000 (5m ago)', 'SARAH M. UGX 110,000 (just now)'];

const investmentPlans: InvestmentPlan[] = [
  { id: 1, name: 'DUROMAX GENERATOR', image: '/investments/generator1.jpeg', deposit: 'UGX 40,000', dailyProfit: 'UGX 12,000', totalDays: '30', totalProfit: 'UGX 360,000' },
  { id: 2, name: 'HONDA INVERTER', image: '/investments/generator2.jpeg', deposit: 'UGX 55,000', dailyProfit: 'UGX 20,000', totalDays: '30', totalProfit: 'UGX 600,000' },
  { id: 3, name: 'NINJABATT POWER STATION', image: '/investments/generator3.jpeg', deposit: 'UGX 80,000', dailyProfit: 'UGX 30,000', totalDays: '60', totalProfit: 'UGX 1,800,000' },
  { id: 4, name: 'DEWALT COMPRESSOR', image: '/investments/generator4.jpeg', deposit: 'UGX 150,000', dailyProfit: 'UGX 45,000', totalDays: '60', totalProfit: 'UGX 2,700,000' },
  { id: 5, name: 'POWER GENERATOR', image: '/investments/generator1.jpeg', deposit: 'UGX 250,000', dailyProfit: 'UGX 55,000', totalDays: '120', totalProfit: 'UGX 6,600,000' },
];

const faqs = [
  ['WHAT IS CHAT GAIN?', 'CHAT GAIN helps you earn by chatting with foreigners. Choose the conversations you enjoy, spend time with people around the world, and get paid for your approved chat time.'],
  ['HOW DO I EARN MONEY?', 'Browse the live room, choose a shared interest, and tap Start paid chat. You can meet people from other countries while earning from the time you spend talking.'],
  ['IS THERE A REGISTRATION FEE?', 'No. Creating your profile and joining is free. Once you are approved, you can earn when foreigners book and complete chats with you.'],
  ['HOW DO I GET PAID?', 'Payouts are processed through mobile money and other verified gateways. You can track the time you spend and your earnings inside the platform.'],
  ['IS CHAT GAIN LEGITIMATE?', 'You stay in control at every step. Use our report tools, protect your personal information, and leave any conversation that does not feel right.'],
  ['WHEN CAN I WITHDRAW MY EARNINGS?', 'Create your profile, choose your languages and topics, set when you are available, and start accepting paid chats with foreigners who want to connect.'],
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.08 });
    document.querySelectorAll<HTMLElement>('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function RegisterButton({ className = '' }: { className?: string }) {
  return <button className={`reference-button ${className}`} type="button" onClick={() => scrollToId('join')} data-testid="button-register">{'REGISTER NOW'} <ArrowRight size={14} /></button>;
}

function Header({ dark, onTheme, swahili, onLanguage }: { dark: boolean; onTheme: () => void; swahili: boolean; onLanguage: () => void }) {
  return <header>
    <nav className="reference-nav">
      <div className="reference-nav-inner">
        <button className="reference-brand" type="button" onClick={() => scrollToId('top')} data-testid="button-brand"><span className="reference-mark">c</span><strong>CHAT GAIN</strong></button>
        <div className="reference-links">
          <a href="#top">HOME</a><a href="#voices">EARNINGS</a><a href="#investments">INVESTMENTS</a><a href="#how-it-works">GUIDE</a>
        </div>
        <div className="reference-actions">
          <button className="language-button" type="button" onClick={onLanguage} data-testid="button-language">{swahili ? 'EN' : 'SW'}</button>
          <button className="round-button" type="button" onClick={onTheme} aria-label="Toggle dark mode" data-testid="button-theme">{dark ? <Sun size={16} /> : <Moon size={16} />}</button>
          <RegisterButton />
        </div>
      </div>
    </nav>
    <div className="payout-strip" aria-label="Recent payout activity">
      <span className="payout-lead"><i /> LIVE PAYOUTS</span>
      <div className="payout-track">{[...payouts, ...payouts].map((payout, index) => <span key={`${payout}-${index}`}>{payout}</span>)}</div>
    </div>
  </header>;
}

function Hero() {
  return <section className="reference-hero" id="top">
    <div className="hero-shape hero-shape-one" /><div className="hero-shape hero-shape-two" />
    <div className="reference-container hero-content reveal">
      <h1>Chat with foreigners.<br /><span>Earn as you talk.</span></h1>
      <p>CHAT GAIN lets you earn by chatting with foreigners who want to connect, practice, and share a little time. Turn your conversation skills into flexible income.</p>
      <div className="hero-buttons"><button className="reference-button" type="button" onClick={() => scrollToId('voices')} data-testid="button-hero-chat">CHAT NOW</button><RegisterButton /></div>
    </div>
  </section>;
}

function ProfileModal({ person, onClose }: { person: Person; onClose: () => void }) {
  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <div className="chat-modal" role="dialog" aria-modal="true" aria-labelledby="chat-modal-title">
      <button className="modal-close" type="button" onClick={onClose} aria-label="Close profile"><X size={17} /></button>
      <img src={person.photo} alt="" />
      <span className="modal-kicker">ACTIVE NOW · {person.country}</span>
      <h2 id="chat-modal-title">Start a chat with {person.name}</h2>
      <p>{person.name} is ready to talk. Start a friendly conversation and make the time count.</p>
      <button className="reference-button" type="button" onClick={onClose} data-testid="button-modal-chat">CHAT NOW <ArrowRight size={14} /></button>
    </div>
  </div>;
}

function PersonCard({ person, onSelect, isTyping }: { person: Person; onSelect: (person: Person) => void; isTyping: boolean }) {
  return <article className="reference-person-card reveal">
    <div className="profile-head"><div className="profile-image-wrap"><img src={person.photo} alt="" /><i /></div><div className="profile-name"><h3>{person.name} <small>{person.age}y</small></h3><p>{person.flag} <span>{person.country}</span></p></div></div>
    <div className="profile-meta"><span className={isTyping ? 'typing-status' : ''} aria-label={isTyping ? 'Typing' : 'Looking to talk'}>{isTyping ? <><i /><i /><i /> TYPING...</> : <><i /> LOOKING TO TALK</>}</span><b>ACTIVE NOW</b></div>
    <div className="profile-actions"><button className="card-chat" type="button" onClick={() => onSelect(person)} data-testid={`button-chat-${person.id}`}>CHAT NOW</button><button className="icon-chat" type="button" aria-label={`Message ${person.name}`} onClick={() => onSelect(person)}><MessageSquare size={16} /></button></div>
  </article>;
}

function Voices() {
  const [selected, setSelected] = useState<Person | null>(null);
  const [typingId, setTypingId] = useState<number | null>(null);
  useEffect(() => {
    let typingTimer: number;
    const showNextTyping = () => {
      typingTimer = window.setTimeout(() => {
        const nextPerson = people[Math.floor(Math.random() * people.length)];
        setTypingId(nextPerson.id);
        typingTimer = window.setTimeout(() => {
          setTypingId(null);
          showNextTyping();
        }, 1800 + Math.random() * 2200);
      }, 3200 + Math.random() * 4800);
    };
    showNextTyping();
    return () => window.clearTimeout(typingTimer);
  }, []);
  return <section className="voices-reference" id="voices"><div className="reference-container">
    <div className="live-heading reveal"><div><h2><i /> LIVE FOREIGNERS ONLINE</h2><p>TAP ANY PROFILE TO START A PAID CHAT NOW</p></div></div>
    <div className="reference-grid">{people.slice(0, 6).map((person, index) => index === 6 ? null : <PersonCard key={person.id} person={person} isTyping={typingId === person.id} onSelect={setSelected} />)}<SupportCard /></div>
    <div className="reference-grid reference-grid-lower">{people.slice(6).map((person) => <PersonCard key={person.id} person={person} isTyping={typingId === person.id} onSelect={setSelected} />)}</div>
    <button className="more-button reveal" type="button" onClick={() => scrollToId('join')} data-testid="button-more-chats">SHOW MORE <ArrowRight size={14} /></button>
  </div>{selected && <ProfileModal person={selected} onClose={() => setSelected(null)} />}</section>;
}

function InvestmentCard({ plan }: { plan: InvestmentPlan }) {
  return <article className="investment-card reveal">
    <div className="investment-image-wrap"><img src={plan.image} alt={plan.name} /></div>
    <div className="investment-card-content">
      <div className="investment-card-heading"><div><span className="investment-kicker">CHAT GAIN PLAN {String(plan.id).padStart(2, '0')}</span><h3>{plan.name}</h3></div><span className="investment-status"><i /> OPEN NOW</span></div>
      <div className="investment-details">
        <div><span>DEPOSIT</span><strong>{plan.deposit}</strong></div>
        <div><span>DAILY PROFIT</span><strong className="profit-value">{plan.dailyProfit}</strong></div>
        <div><span>TOTAL DAYS</span><strong>{plan.totalDays}</strong></div>
        <div><span>TOTAL PROFIT</span><strong className="profit-value">{plan.totalProfit}</strong></div>
      </div>
      <button className="investment-action" type="button" onClick={() => scrollToId('join')} data-testid={`button-invest-${plan.id}`}>INVEST NOW <ArrowRight size={14} /></button>
    </div>
  </article>;
}

function Investments() {
  return <section className="investments-reference" id="investments"><div className="reference-container">
    <div className="investment-heading reveal"><div><span className="section-label">POWER YOUR NEXT MOVE</span><h2>INVESTMENT <span>PLANS</span></h2><p>Choose a plan, grow your balance, and make your time online work harder for you.</p></div><span className="investment-note">UGX PLANS · CLEAR RETURNS</span></div>
    <div className="investment-grid">{investmentPlans.map((plan) => <InvestmentCard key={plan.id} plan={plan} />)}</div>
    <div className="investment-actions reveal"><button className="investment-secondary" type="button" onClick={() => scrollToId('voices')} data-testid="button-invest-chat">CHAT NOW</button><button className="reference-button investment-primary" type="button" onClick={() => scrollToId('join')} data-testid="button-invest-now">INVEST NOW <ArrowRight size={14} /></button><RegisterButton className="investment-register" /><button className="investment-secondary investment-join" type="button" onClick={() => scrollToId('join')} data-testid="button-invest-join">JOIN NOW</button></div>
  </div></section>;
}

function SupportCard() {
  return <article className="support-card reveal"><span>CHAT SUPPORT</span><h3>JOIN TRAINING CHANNEL</h3><p>Get training, updates &amp; connect with other earners.</p><button type="button" onClick={() => scrollToId('join')} data-testid="button-support">OPEN SUPPORT CHAT</button></article>;
}

function Metrics() {
  return <section className="metrics-reference"><div className="reference-container metrics-row"><div><strong>80,443</strong><span>PAID CHATS</span></div><div><strong>UGX 1,285,368</strong><span>TOTAL PAID OUT</span></div><div className="metric-highlight"><strong>1,782</strong><span>ACTIVE HOSTS</span></div><div><strong>4.9<em>★</em></strong><span>AVERAGE RATING</span></div></div></section>;
}

function HowItWorks() {
  const features = [['PRIVATE CHATS', 'Chat with foreigners ready to chat and pay per session.'], ['EARN PER CHAT', 'Get paid on a daily basis for every private conversation you have.'], ['GLOBAL USERS', 'Chat with people worldwide. All they need is positive and encouraging words.'], ['SAFE & SECURE', 'No dating, no sex talks, no sharing photos or videos.']];
  return <section className="features-reference" id="how-it-works"><div className="reference-container">
    <div className="section-title centered reveal"><h2>HOW IT <span>WORKS</span></h2><p>Choose a chat, help someone connect across cultures, and get paid for your time.</p></div>
    <div className="features-layout"><div className="feature-intro reveal"><span>MONETIZATION PROTOCOL</span><h3>Make every<br /><em>conversation</em><br />count.</h3><RegisterButton /></div><div className="feature-cards">{features.map(([title, copy], index) => <article className="feature-card reveal" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div>
  </div></section>;
}

function Join() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (email.trim()) setSubmitted(true); };
  return <section className="join-reference" id="join"><div className="reference-container"><div className="join-panel reveal"><div><span className="section-label">ACTIVATION PROTOCOL</span><h2>HOW TO <span>JOIN</span></h2><p>Follow these steps on the registration page to initialize your account.</p></div><div className="join-steps"><b><i>1</i> Create your account</b><b><i>2</i> Choose your profile</b><b><i>3</i> Start chatting</b></div><div className="join-buttons"><RegisterButton /><button className="reference-button button-green" type="button" onClick={() => scrollToId('voices')} data-testid="button-join-chat">CHAT NOW</button></div></div><form className="join-email reveal" onSubmit={submit}><label htmlFor="join-email-input">Get earning tips and new paid-chat opportunities</label><div><input id="join-email-input" type="email" placeholder="your@email.com" value={email} onChange={(event) => setEmail(event.target.value)} required /><button type="submit" aria-label="Join the earning tips list"><ArrowRight size={16} /></button></div>{submitted && <p className="form-success"><Check size={14} /> You are on the list.</p>}</form></div></section>;
}

function Stories() {
  const stories = [['ALICE · UK', '“I started chatting with foreigners for the connection, then realized my time could earn too.”'], ['DANIEL · MEXICO', '“I enjoy helping people practice English, and the time makes a real difference.”'], ['MARIE · FRANCE', '“A small hello became a steady way to earn online. I meet people from everywhere.”']];
  return <section className="stories-reference" id="stories"><div className="reference-container"><div className="section-title centered reveal"><h2>SUCCESS <span>STORIES</span></h2><p>Real people using friendly conversations to connect with foreigners and earn from their time.</p></div><div className="story-grid">{stories.map(([name, quote], index) => <article className="story-card reveal" key={name}><div className={`story-photo story-photo-${index}`} /><b>{name}</b><span>✓ VERIFIED HOST</span><p>{quote}</p><small>UGX {index === 0 ? '8,400' : index === 1 ? '12,500' : '6,800'} PAYOUT</small></article>)}</div><RegisterButton /></div></section>;
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return <section className="faq-reference" id="faq"><div className="reference-container faq-layout"><div className="section-title reveal"><h2>FREQUENTLY <span>ASKED</span></h2><p>Learn how paid chats work, how you earn, and how we keep conversations safe.</p></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item reveal ${open === index ? 'open' : ''}`} key={question}><button type="button" onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index} data-testid={`button-faq-${index}`}><span>{question}</span><ChevronDown size={15} /></button>{open === index && <p>{answer}</p>}</div>)}</div></div></section>;
}

function Footer() {
  return <footer className="reference-footer"><div className="reference-container footer-layout"><div className="footer-brand"><button className="reference-brand" type="button" onClick={() => scrollToId('top')}><span className="reference-mark">c</span><strong>CHAT GAIN</strong></button><p>Good conversations can make<br />the world feel bigger—and put extra income in your pocket.</p><span>● GLOBAL HOSTING INFRASTRUCTURE</span></div><div className="footer-cta"><span>GLOBAL HOSTING INFRASTRUCTURE</span><h2>There is always<br /><em>a paid chat</em><br />to start.</h2><RegisterButton /></div></div><div className="reference-container footer-bottom"><span>© 2026 CHAT GAIN</span><div><a href="#faq">PRIVACY</a><a href="#faq">TERMS</a><a href="#top">BACK TO TOP</a></div></div></footer>;
}

function App() {
  const [dark, setDark] = useState(false);
  const [swahili, setSwahili] = useState(false);
  useReveal();
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); }, [dark]);
  return <div className="site-reference"><Header dark={dark} onTheme={() => setDark((value) => !value)} swahili={swahili} onLanguage={() => setSwahili((value) => !value)} /><main><Hero /><Voices /><Investments /><Metrics /><HowItWorks /><Join /><Stories /><FAQ /></main><Footer /></div>;
}

export default App;