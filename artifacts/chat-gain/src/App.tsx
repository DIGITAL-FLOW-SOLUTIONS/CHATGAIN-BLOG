import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Eye,
  MessageSquare,
  Moon,
  Sun,
  X,
} from "lucide-react";
import generator1Image from "@assets/generator1_1787062714619.jpeg";
import generator2Image from "@assets/generator2_1787062714620.jpeg";
import generator3Image from "@assets/generator3_1787062714618.jpeg";
import generator4Image from "@assets/generator4_1787062714619.jpeg";

type Person = {
  id: number;
  name: string;
  age: number;
  country: string;
  flag: string;
  photo: string;
  interest: string;
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

type Hotel = {
  name: string;
  location: string;
  image: string;
  description: string;
};

const people: Person[] = [
  {
    id: 1,
    name: "Margaret W.",
    age: 58,
    country: "USA",
    flag: "🇺🇸",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=180&q=85",
    interest: "Travel stories",
  },
  {
    id: 2,
    name: "Robert H.",
    age: 62,
    country: "UK",
    flag: "🇬🇧",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=180&q=85",
    interest: "Music & culture",
  },
  {
    id: 3,
    name: "Helga S.",
    age: 55,
    country: "GERMANY",
    flag: "🇩🇪",
    photo:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=180&q=85",
    interest: "Learning languages",
  },
  {
    id: 4,
    name: "James M.",
    age: 60,
    country: "CANADA",
    flag: "🇨🇦",
    photo:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=180&q=85",
    interest: "Food & cooking",
  },
  {
    id: 5,
    name: "Karen P.",
    age: 51,
    country: "AUSTRALIA",
    flag: "🇦🇺",
    photo:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=180&q=85",
    interest: "Movies & travel",
  },
  {
    id: 6,
    name: "Lars E.",
    age: 60,
    country: "SWEDEN",
    flag: "🇸🇪",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=180&q=85",
    interest: "Sports & outdoors",
  },
  {
    id: 7,
    name: "Mina R.",
    age: 57,
    country: "FRANCE",
    flag: "🇫🇷",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=180&q=85",
    interest: "Art & design",
  },
  {
    id: 8,
    name: "Peter K.",
    age: 64,
    country: "NORWAY",
    flag: "🇳🇴",
    photo:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=180&q=85",
    interest: "Nature & hiking",
  },
  {
    id: 9,
    name: "Nadia T.",
    age: 54,
    country: "ITALY",
    flag: "🇮🇹",
    photo:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=180&q=85",
    interest: "Books & coffee",
  },
  {
    id: 10,
    name: "Sofia J.",
    age: 59,
    country: "IRELAND",
    flag: "🇮🇪",
    photo:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=180&q=85",
    interest: "History & travel",
  },
  {
    id: 11,
    name: "Emilia L.",
    age: 53,
    country: "NETHERLANDS",
    flag: "🇳🇱",
    photo: "https://randomuser.me/api/portraits/women/11.jpg",
    interest: "Art & weekend trips",
  },
  {
    id: 12,
    name: "Patrick M.",
    age: 61,
    country: "IRELAND",
    flag: "🇮🇪",
    photo: "https://randomuser.me/api/portraits/men/11.jpg",
    interest: "Football & music",
  },
  {
    id: 13,
    name: "Aisha R.",
    age: 49,
    country: "MOROCCO",
    flag: "🇲🇦",
    photo: "https://randomuser.me/api/portraits/women/12.jpg",
    interest: "Food & languages",
  },
  {
    id: 14,
    name: "Daniel B.",
    age: 57,
    country: "SPAIN",
    flag: "🇪🇸",
    photo: "https://randomuser.me/api/portraits/men/12.jpg",
    interest: "Travel & photography",
  },
  {
    id: 15,
    name: "Claire D.",
    age: 56,
    country: "FRANCE",
    flag: "🇫🇷",
    photo: "https://randomuser.me/api/portraits/women/13.jpg",
    interest: "Books & cooking",
  },
  {
    id: 16,
    name: "Michael S.",
    age: 64,
    country: "GERMANY",
    flag: "🇩🇪",
    photo: "https://randomuser.me/api/portraits/men/13.jpg",
    interest: "History & cycling",
  },
  {
    id: 17,
    name: "Anna F.",
    age: 52,
    country: "SWEDEN",
    flag: "🇸🇪",
    photo: "https://randomuser.me/api/portraits/women/14.jpg",
    interest: "Nature & wellness",
  },
  {
    id: 18,
    name: "Oliver T.",
    age: 59,
    country: "NEW ZEALAND",
    flag: "🇳🇿",
    photo: "https://randomuser.me/api/portraits/men/14.jpg",
    interest: "Outdoors & films",
  },
  {
    id: 19,
    name: "Grace K.",
    age: 55,
    country: "JAPAN",
    flag: "🇯🇵",
    photo: "https://randomuser.me/api/portraits/women/15.jpg",
    interest: "Gardening & tea",
  },
  {
    id: 20,
    name: "Lucas V.",
    age: 62,
    country: "BRAZIL",
    flag: "🇧🇷",
    photo: "https://randomuser.me/api/portraits/men/15.jpg",
    interest: "Music & football",
  },
  {
    id: 21,
    name: "Nora E.",
    age: 58,
    country: "NORWAY",
    flag: "🇳🇴",
    photo: "https://randomuser.me/api/portraits/women/16.jpg",
    interest: "Travel & nature",
  },
  {
    id: 22,
    name: "Mateo G.",
    age: 51,
    country: "MEXICO",
    flag: "🇲🇽",
    photo: "https://randomuser.me/api/portraits/men/16.jpg",
    interest: "Cooking & movies",
  },
  {
    id: 23,
    name: "Amara J.",
    age: 47,
    country: "SOUTH AFRICA",
    flag: "🇿🇦",
    photo: "https://randomuser.me/api/portraits/women/17.jpg",
    interest: "Dance & culture",
  },
  {
    id: 24,
    name: "Ethan C.",
    age: 65,
    country: "USA",
    flag: "🇺🇸",
    photo: "https://randomuser.me/api/portraits/men/17.jpg",
    interest: "Jazz & history",
  },
  {
    id: 25,
    name: "Lina P.",
    age: 54,
    country: "PORTUGAL",
    flag: "🇵🇹",
    photo: "https://randomuser.me/api/portraits/women/18.jpg",
    interest: "Ocean & travel",
  },
  {
    id: 26,
    name: "Samuel N.",
    age: 60,
    country: "GHANA",
    flag: "🇬🇭",
    photo: "https://randomuser.me/api/portraits/men/18.jpg",
    interest: "Books & conversation",
  },
  {
    id: 27,
    name: "Yuki H.",
    age: 50,
    country: "JAPAN",
    flag: "🇯🇵",
    photo: "https://randomuser.me/api/portraits/women/19.jpg",
    interest: "Food & photography",
  },
  {
    id: 28,
    name: "Adam P.",
    age: 63,
    country: "POLAND",
    flag: "🇵🇱",
    photo: "https://randomuser.me/api/portraits/men/19.jpg",
    interest: "Travel & technology",
  },
  {
    id: 29,
    name: "Sara M.",
    age: 56,
    country: "UNITED ARAB EMIRATES",
    flag: "🇦🇪",
    photo: "https://randomuser.me/api/portraits/women/20.jpg",
    interest: "Design & food",
  },
  {
    id: 30,
    name: "Theo R.",
    age: 58,
    country: "DENMARK",
    flag: "🇩🇰",
    photo: "https://randomuser.me/api/portraits/men/20.jpg",
    interest: "Cycling & travel",
  },
];

const payouts = [
  "LINDA W. KES 25,000 (just now)",
  "NAOMI S. KES 72,000 (30s ago)",
  "NAOMI S. KES 105,000 (just now)",
  "CYNTHIA R. KES 72,000 (just now)",
  "SARAH M. KES 55,000 (30s ago)",
  "LINDA W. KES 210,000 (5m ago)",
  "SARAH M. KES 110,000 (just now)",
];

const onlineCountChanges = [2, 12, 2, 7, -3, 9, -2, 6];

const investmentPlans: InvestmentPlan[] = [
  {
    id: 1,
    name: "DUROMAX GENERATOR",
    image: generator1Image,
    deposit: "KES 1,000",
    dailyProfit: "KES 500",
    totalDays: "7",
    totalProfit: "KES 3,500",
  },
  {
    id: 2,
    name: "HONDA INVERTER",
    image: generator2Image,
    deposit: "KES 1,500",
    dailyProfit: "KES 900",
    totalDays: "7",
    totalProfit: "KES 6,300",
  },
  {
    id: 3,
    name: "NINJABATT POWER STATION",
    image: generator3Image,
    deposit: "KES 2,500",
    dailyProfit: "KES 1,200",
    totalDays: "14",
    totalProfit: "KES 16,800",
  },
  {
    id: 4,
    name: "DEWALT COMPRESSOR",
    image: generator4Image,
    deposit: "KES 3,500",
    dailyProfit: "KES 1,500",
    totalDays: "30",
    totalProfit: "KES 45,000",
  },
  {
    id: 5,
    name: "POWER GENERATOR",
    image: generator1Image,
    deposit: "KES 4,500",
    dailyProfit: "KES 2,000",
    totalDays: "30",
    totalProfit: "KES 60,000",
  },
];

const hotels: Hotel[] = [
  {
    name: "The Z Hotel",
    location: "Nungwi, Zanzibar",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=85",
    description:
      "A beachfront boutique stay with tropical gardens, ocean views and a relaxed island atmosphere.",
  },
  {
    name: "Be Zanzibar",
    location: "Jambiani, Zanzibar",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=85",
    description:
      "A beachfront boutique retreat with direct beach access, tropical surroundings and a calm island feel.",
  },
  {
    name: "Hotel Sapphire",
    location: "Mombasa, Kenya",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=85",
    description:
      "A modern city retreat offering comfortable rooms, dining, wellness facilities and a rooftop pool.",
  },
  {
    name: "Sarova Whitesands",
    location: "Mombasa, Kenya",
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=85",
    description:
      "A coastal resort experience with beach access, leisure facilities and a relaxed tropical setting.",
  },
  {
    name: "PrideInn Paradise",
    location: "Mombasa, Kenya",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=85",
    description:
      "A beachfront resort setting designed for leisure, family stays, events and coastal escapes.",
  },
  {
    name: "Bluebay Beach Resort",
    location: "Matemwe, Zanzibar",
    image:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=900&q=85",
    description:
      "A luxury beachfront resort surrounded by tropical gardens and the Indian Ocean.",
  },
  {
    name: "Sunshine Marine Lodge",
    location: "Zanzibar, Tanzania",
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=900&q=85",
    description:
      "An island resort experience with ocean activities, wellness experiences and tropical surroundings.",
  },
  {
    name: "Amani Boutique Hotel",
    location: "Paje, Zanzibar",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=85",
    description:
      "An intimate beachfront retreat focused on quiet comfort, elegant rooms and a peaceful atmosphere.",
  },
  {
    name: "SBH Monica Zanzibar",
    location: "Paje, Zanzibar",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=85",
    description:
      "A beachfront resort with comfortable rooms, restaurants, leisure facilities and ocean views.",
  },
  {
    name: "The Sands Beach Resort",
    location: "Dongwe, Zanzibar",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=85",
    description:
      "A beachfront escape with villas, tropical gardens, relaxed dining and Indian Ocean views.",
  },
];

const faqs = [
  [
    "WHAT IS CHAT GAIN?",
    "CHAT GAIN helps you earn by chatting with foreigners. Choose the conversations you enjoy, spend time with people around the world, and get paid for your approved chat time.",
  ],
  [
    "HOW DO I EARN MONEY?",
    "Browse the live room, choose a shared interest, and tap Start paid chat. You can meet people from other countries while earning from the time you spend talking.",
  ],
  [
    "IS THERE A REGISTRATION FEE?",
    "No. Creating your profile and joining is free. Once you are approved, you can earn when foreigners book and complete chats with you.",
  ],
  [
    "HOW DO I GET PAID?",
    "Payouts are processed through mobile money and other verified gateways. You can track the time you spend and your earnings inside the platform.",
  ],
  [
    "IS CHAT GAIN LEGITIMATE?",
    "You stay in control at every step. Use our report tools, protect your personal information, and leave any conversation that does not feel right.",
  ],
  [
    "WHEN CAN I WITHDRAW MY EARNINGS?",
    "Create your profile, choose your languages and topics, set when you are available, and start accepting paid chats with foreigners who want to connect.",
  ],
  [
    "HOW DO I SIGN UP FOR MALIGAIN?",
    "Select any REGISTER NOW or JOIN NOW button to open the official MALIGAIN account link, then follow the registration instructions on that page.",
  ],
  [
    "HOW DO I LOG IN TO MALIGAIN?",
    "Open the official MALIGAIN account link and choose the login option if you already have an account. Use only the official destination provided by MALIGAIN.",
  ],
  [
    "WHAT ARE MALIGAIN AGENCIES?",
    "For current MALIGAIN agency, training, and support information, use the official support channel linked on this website.",
  ],
];

function scrollToId(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const redirectLink = import.meta.env.REDIRECT_LINK;
const supportLink = import.meta.env.SUPPORT_LINK;

function redirectToRegistration() {
  window.location.assign(redirectLink);
}

function openSupportChat() {
  window.location.assign(supportLink);
}

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document
      .querySelectorAll<HTMLElement>(".reveal")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function RegisterButton({ className = "" }: { className?: string }) {
  return (
    <button
      className={`reference-button ${className}`}
      type="button"
      onClick={redirectToRegistration}
      data-testid="button-register"
    >
      {"REGISTER NOW"} <ArrowRight size={14} />
    </button>
  );
}

function Header({
  dark,
  onTheme,
  swahili,
  onLanguage,
}: {
  dark: boolean;
  onTheme: () => void;
  swahili: boolean;
  onLanguage: () => void;
}) {
  return (
    <header>
      <nav className="reference-nav">
        <div className="reference-nav-inner">
          <button
            className="reference-brand"
            type="button"
            onClick={() => scrollToId("top")}
            data-testid="button-brand"
          >
            <strong>CHAT GAIN</strong>
          </button>
          <div className="reference-links">
            <a href="#top">HOME</a>
            <a href="#voices">EARNINGS</a>
            <a href="#investments">INVESTMENTS</a>
            <a href="#how-it-works">GUIDE</a>
          </div>
          <div className="reference-actions">
            <button
              className="language-button"
              type="button"
              onClick={onLanguage}
              data-testid="button-language"
            >
              {swahili ? "EN" : "SW"}
            </button>
            <button
              className="round-button"
              type="button"
              onClick={onTheme}
              aria-label="Toggle dark mode"
              data-testid="button-theme"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <RegisterButton />
          </div>
        </div>
      </nav>
      <div className="payout-strip" aria-label="Recent payout activity">
        <div className="payout-track">
          {[...payouts, ...payouts].map((payout, index) => (
            <span key={`${payout}-${index}`}>{payout}</span>
          ))}
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="reference-hero" id="top">
      <div className="hero-shape hero-shape-one" />
      <div className="hero-shape hero-shape-two" />
      <div className="reference-container hero-content reveal">
        <h1>
          Chat with foreigners.
          <br />
          <span>Earn as you talk.</span>
        </h1>
        <p>
          CHAT GAIN lets you earn by chatting with foreigners who want to
          connect, practice, and share a little time. Turn your conversation
          skills into flexible income.
        </p>
        <div className="hero-buttons">
          <button
            className="reference-button"
            type="button"
            onClick={redirectToRegistration}
            data-testid="button-hero-chat"
          >
            CHAT NOW
          </button>
          <RegisterButton />
        </div>
      </div>
    </section>
  );
}

function ProfileModal({
  person,
  onClose,
}: {
  person: Person;
  onClose: () => void;
}) {
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        className="chat-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-modal-title"
      >
        <button
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close profile"
        >
          <X size={17} />
        </button>
        <img src={person.photo} alt="" />
        <span className="modal-kicker">ACTIVE NOW · {person.country}</span>
        <h2 id="chat-modal-title">Start a chat with {person.name}</h2>
        <p>
          {person.name} is ready to talk. Start a friendly conversation and make
          the time count.
        </p>
        <button
          className="reference-button"
          type="button"
          onClick={redirectToRegistration}
          data-testid="button-modal-chat"
        >
          CHAT NOW <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

function PersonCard({
  person,
  onSelect,
  isTyping,
  isOnline,
  typingMessage,
}: {
  person: Person;
  onSelect: (person: Person) => void;
  isTyping: boolean;
  isOnline: boolean;
  typingMessage?: string;
}) {
  return (
    <article className="reference-person-card reveal">
      <div className="profile-head">
        <div className="profile-image-wrap">
          <img
            src={person.photo}
            alt={`${person.name} profile`}
            loading="lazy"
            width="64"
            height="64"
          />
          <i className={isOnline ? "is-online" : "is-away"} />
        </div>
        <div className="profile-name">
          <h3>
            {person.name} <small>{person.age}y</small>
          </h3>
          <p>
            {person.flag} <span>{person.country}</span>
          </p>
          <span className="profile-interest">{person.interest}</span>
        </div>
      </div>
      <div className="profile-meta">
        <span
          className={
            isTyping
              ? "typing-status"
              : isOnline
                ? "presence-online"
                : "presence-away"
          }
          aria-label={
            isTyping
              ? "Typing in activity preview"
              : isOnline
                ? "Online in activity preview"
                : "Away in activity preview"
          }
        >
          {isTyping ? (
            <>
              <i />
              <i />
              <i /> TYPING...
            </>
          ) : isOnline ? (
            <>
              <i /> LOOKING TO TALK
            </>
          ) : (
            <>
              <i /> AWAY
            </>
          )}
        </span>
        <b className={isOnline ? "is-online" : "is-away"}>
          {isOnline ? "ONLINE" : "AWAY"}
        </b>
      </div>
      <div
        className={`profile-message-preview${typingMessage ? " has-message" : " is-idle"}`}
        aria-label={typingMessage ? `${person.name} typed: ${typingMessage}` : undefined}
        aria-hidden={typingMessage ? undefined : true}
      >
        {typingMessage && (
          <>
            <i />
            <span>{typingMessage}</span>
          </>
        )}
      </div>
      <div className="profile-actions">
        <button
          className="card-chat"
          type="button"
          onClick={redirectToRegistration}
          data-testid={`button-start-chat-${person.id}`}
        >
          START <ArrowRight size={13} />
        </button>
        <button
          className="icon-chat"
          type="button"
          aria-label={`Watch ${person.name}'s profile`}
          onClick={() => onSelect(person)}
        >
          <Eye size={14} />
          <span>WATCH</span>
        </button>
      </div>
    </article>
  );
}

function Voices() {
  const [selected, setSelected] = useState<Person | null>(null);
  const [communityOnlineCount, setCommunityOnlineCount] = useState(1459);
  const [onlineIds, setOnlineIds] = useState<number[]>(() =>
    people.slice(0, 26).map((person) => person.id),
  );
  const [typingIds, setTypingIds] = useState<number[]>(() =>
    people.slice(0, 8).map((person) => person.id),
  );
  const [typingMessages, setTypingMessages] = useState<Record<number, string>>({});
  const [recentActivity, setRecentActivity] = useState(
    "A few profiles are starting conversations",
  );
  const [joinToast, setJoinToast] = useState<{ id: number; person: Person } | null>(
    null,
  );
  const onlineIdsRef = useRef(onlineIds);

  const messageSnippets = [
    "Hey!",
    "Hola!",
    "Ola!",
    "How are you?",
    "Hello there!",
    "Nice to meet you",
    "What's up?",
    "Good morning!",
    "Where are you from?",
    "😊",
  ];

  useEffect(() => {
    onlineIdsRef.current = onlineIds;
  }, [onlineIds]);

  useEffect(() => {
    let typingTimer = 0;
    let activityTimer = 0;
    let joinTimer = 0;
    let dismissToastTimer = 0;
    let toastSequence = 0;
    let onlineCountStep = 0;
    let onlineCountTimer = 0;

    const updateTypingActivity = () => {
      const available = people.filter((person) =>
        onlineIdsRef.current.includes(person.id),
      );
      const shuffled = [...available].sort(() => Math.random() - 0.5);
      const typingCount = Math.min(
        available.length,
        6 + Math.floor(Math.random() * 6),
      );
      const nextTypingIds = shuffled
        .slice(0, typingCount)
        .map((person) => person.id);
      const messageCount = Math.min(
        nextTypingIds.length,
        3 + Math.floor(Math.random() * 4),
      );
      const nextMessages: Record<number, string> = {};

      nextTypingIds.slice(0, messageCount).forEach((personId) => {
        nextMessages[personId] =
          messageSnippets[Math.floor(Math.random() * messageSnippets.length)];
      });

      setTypingIds(nextTypingIds);
      setTypingMessages(nextMessages);
    };

    const showJoinToast = () => {
      const person = people[Math.floor(Math.random() * people.length)];
      if (!person) return;

      setOnlineIds((current) =>
        current.includes(person.id) ? current : [...current, person.id],
      );
      setRecentActivity(`${person.name} from ${person.country} just joined`);
      setJoinToast({ id: ++toastSequence, person });
      window.clearTimeout(dismissToastTimer);
      dismissToastTimer = window.setTimeout(() => setJoinToast(null), 4200);

      joinTimer = window.setTimeout(
        showJoinToast,
        5600 + Math.random() * 2600,
      );
    };

    updateTypingActivity();
    typingTimer = window.setInterval(updateTypingActivity, 1250);

    onlineCountTimer = window.setInterval(() => {
      const change =
        onlineCountChanges[onlineCountStep % onlineCountChanges.length];
      onlineCountStep += 1;
      setCommunityOnlineCount((current) => {
        const next = current + change;
        if (next > 1499) return 1499 - (next - 1499);
        if (next < 1450) return 1450 + (1450 - next);
        return next;
      });
    }, 3200);

    activityTimer = window.setInterval(() => {
      const currentlyOnline = onlineIdsRef.current;
      const canGoAway = currentlyOnline.length > 22;
      const candidates = canGoAway
        ? people
        : people.filter((person) => !currentlyOnline.includes(person.id));
      const person = candidates[Math.floor(Math.random() * candidates.length)];
      if (!person) return;

      const isComingOnline = !currentlyOnline.includes(person.id);
      setOnlineIds((current) =>
        isComingOnline
          ? [...new Set([...current, person.id])]
          : current.filter((id) => id !== person.id),
      );
      setRecentActivity(
        `${person.name} ${isComingOnline ? "just came online" : "is away for now"}`,
      );
    }, 7600);

    joinTimer = window.setTimeout(showJoinToast, 1700);

    return () => {
      window.clearInterval(typingTimer);
      window.clearInterval(onlineCountTimer);
      window.clearInterval(activityTimer);
      window.clearTimeout(joinTimer);
      window.clearTimeout(dismissToastTimer);
    };
  }, []);

  return (
    <section className="voices-reference" id="voices">
      <div className="reference-container">
        <div className="live-heading reveal">
          <div className="live-heading-copy">
            <h2>
              <i /> LIVE FOREIGNERS ONLINE
            </h2>
            <p>Choose a profile and start a conversation</p>
            <span className="activity-preview-note">
              30 sample profiles · online count and activity are a visual preview
            </span>
          </div>
          <div className="live-activity-panel">
            <span className="live-count">
              <i />
              <strong>{communityOnlineCount}</strong> ONLINE
            </span>
            <span className="recent-activity" aria-live="polite">
              <MessageSquare size={13} />
              {recentActivity}
            </span>
          </div>
        </div>
        <div className="reference-grid">
          {people.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              isTyping={
                onlineIds.includes(person.id) && typingIds.includes(person.id)
              }
              isOnline={onlineIds.includes(person.id)}
              typingMessage={typingMessages[person.id]}
              onSelect={setSelected}
            />
          ))}
          <SupportCard />
        </div>
        <button
          className="more-button reveal"
          type="button"
          onClick={redirectToRegistration}
          data-testid="button-more-chats"
        >
          START CHATTING <ArrowRight size={14} />
        </button>
      </div>
      {joinToast && (
        <div className="join-toast" key={joinToast.id} role="status" aria-live="polite">
          <span className="join-toast-icon">
            <i />
          </span>
          <span className="join-toast-copy">
            <strong>{joinToast.person.name} just joined</strong>
            <small>
              {joinToast.person.flag} {joinToast.person.country} · ACTIVITY PREVIEW
            </small>
          </span>
          <button
            className="join-toast-dismiss"
            type="button"
            aria-label="Dismiss notification"
            onClick={() => setJoinToast(null)}
          >
            <X size={15} />
          </button>
        </div>
      )}
      {selected && (
        <ProfileModal person={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

function InvestmentCard({ plan }: { plan: InvestmentPlan }) {
  return (
    <article className="investment-card reveal">
      <div className="investment-image-wrap">
        <img src={plan.image} alt={plan.name} />
      </div>
      <div className="investment-card-content">
        <div className="investment-card-heading">
          <div>
            <span className="investment-kicker">
              CHAT GAIN PLAN {String(plan.id).padStart(2, "0")}
            </span>
            <h3>{plan.name}</h3>
          </div>
          <span className="investment-status">
            <i /> OPEN NOW
          </span>
        </div>
        <div className="investment-details">
          <div>
            <span>DEPOSIT</span>
            <strong>{plan.deposit}</strong>
          </div>
          <div>
            <span>DAILY PROFIT</span>
            <strong className="profit-value">{plan.dailyProfit}</strong>
          </div>
          <div>
            <span>TOTAL DAYS</span>
            <strong>{plan.totalDays}</strong>
          </div>
          <div>
            <span>TOTAL PROFIT</span>
            <strong className="profit-value">{plan.totalProfit}</strong>
          </div>
        </div>
        <button
          className="investment-action"
          type="button"
          onClick={redirectToRegistration}
          data-testid={`button-invest-${plan.id}`}
        >
          INVEST NOW <ArrowRight size={14} />
        </button>
      </div>
    </article>
  );
}

function Investments() {
  return (
    <section className="investments-reference" id="investments">
      <div className="reference-container">
        <div className="investment-heading reveal">
          <div>
            <span className="section-label">POWER YOUR NEXT MOVE</span>
            <h2>
              INVESTMENT <span>PLANS</span>
            </h2>
            <p>
              Choose a plan, grow your balance, and make your time online work
              harder for you.
            </p>
          </div>
          <span className="investment-note">KES PLANS · CLEAR RETURNS</span>
        </div>
        <div className="investment-grid">
          {investmentPlans.map((plan) => (
            <InvestmentCard key={plan.id} plan={plan} />
          ))}
        </div>
        <div className="investment-actions reveal">
          <button
            className="investment-secondary"
            type="button"
            onClick={redirectToRegistration}
            data-testid="button-invest-chat"
          >
            CHAT NOW
          </button>
          <button
            className="reference-button investment-primary"
            type="button"
            onClick={redirectToRegistration}
            data-testid="button-invest-now"
          >
            INVEST NOW <ArrowRight size={14} />
          </button>
          <RegisterButton className="investment-register" />
          <button
            className="investment-secondary investment-join"
            type="button"
            onClick={redirectToRegistration}
            data-testid="button-invest-join"
          >
            JOIN NOW
          </button>
        </div>
      </div>
    </section>
  );
}

function ReviewHotels() {
  return (
    <section className="hotels-reference" id="review-hotels">
      <div className="reference-container">
        <div className="section-title centered reveal">
          <span className="section-label">PROPERTY REVIEW OPPORTUNITIES</span>
          <h2>
            REVIEW <span>HOTELS</span>
          </h2>
          <p>
            Explore hotel opportunities, learn about different properties and
            get started with hotel review tasks.
          </p>
        </div>
        <div className="hotel-grid">
          {hotels.map((hotel) => (
            <article className="hotel-card reveal" key={hotel.name}>
              <div className="hotel-image-wrap">
                <img
                  src={hotel.image}
                  alt={`${hotel.name} in ${hotel.location}`}
                  loading="lazy"
                />
              </div>
              <div className="hotel-card-content">
                <span className="hotel-location">{hotel.location}</span>
                <h3>{hotel.name}</h3>
                <p>{hotel.description}</p>
                <button
                  className="hotel-action"
                  type="button"
                  onClick={redirectToRegistration}
                  data-testid={`button-review-hotel-${hotel.name.toLowerCase().replaceAll(" ", "-")}`}
                >
                  REVIEW HOTEL <ArrowRight size={13} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SupportCard() {
  return (
    <article className="support-card reveal">
      <span>CHAT SUPPORT</span>
      <h3>JOIN TRAINING CHANNEL</h3>
      <p>Get training, updates &amp; connect with other earners.</p>
      <button
        type="button"
        onClick={openSupportChat}
        data-testid="button-support"
      >
        OPEN SUPPORT CHAT
      </button>
    </article>
  );
}

function Metrics() {
  return (
    <section className="metrics-reference">
      <div className="reference-container metrics-row">
        <div>
          <strong>80,443</strong>
          <span>PAID CHATS</span>
        </div>
        <div>
          <strong>KES 1,285,368</strong>
          <span>TOTAL PAID OUT</span>
        </div>
        <div className="metric-highlight">
          <strong>1,782</strong>
          <span>ACTIVE HOSTS</span>
        </div>
        <div>
          <strong>
            4.9<em>★</em>
          </strong>
          <span>AVERAGE RATING</span>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const features = [
    [
      "PRIVATE CHATS",
      "Chat with foreigners ready to chat and pay per session.",
    ],
    [
      "EARN PER CHAT",
      "Get paid on a daily basis for every private conversation you have.",
    ],
    [
      "GLOBAL USERS",
      "Chat with people worldwide. All they need is positive and encouraging words.",
    ],
    ["SAFE & SECURE", "No dating, no sex talks, no sharing photos or videos."],
  ];
  return (
    <section className="features-reference" id="how-it-works">
      <div className="reference-container">
        <div className="section-title centered reveal">
          <h2>
            HOW IT <span>WORKS</span>
          </h2>
          <p>
            Choose a chat, help someone connect across cultures, and get paid
            for your time.
          </p>
        </div>
        <div className="features-layout">
          <div className="feature-intro reveal">
            <span>MONETIZATION PROTOCOL</span>
            <h3>
              Make every
              <br />
              <em>conversation</em>
              <br />
              count.
            </h3>
            <RegisterButton />
          </div>
          <div className="feature-cards">
            {features.map(([title, copy], index) => (
              <article className="feature-card reveal" key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Join() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email.trim()) setSubmitted(true);
  };
  return (
    <section className="join-reference" id="join">
      <div className="reference-container">
        <div className="join-panel reveal">
          <div>
            <span className="section-label">ACTIVATION PROTOCOL</span>
            <h2>
              HOW TO <span>JOIN</span>
            </h2>
            <p>
              Follow these steps on the registration page to initialize your
              account.
            </p>
          </div>
          <div className="join-steps">
            <b>
              <i>1</i> Create your account
            </b>
            <b>
              <i>2</i> Choose your profile
            </b>
            <b>
              <i>3</i> Start chatting
            </b>
          </div>
          <div className="join-buttons">
            <RegisterButton />
            <button
              className="reference-button button-green"
              type="button"
              onClick={redirectToRegistration}
              data-testid="button-join-chat"
            >
              CHAT NOW
            </button>
          </div>
        </div>
        <form className="join-email reveal" onSubmit={submit}>
          <label htmlFor="join-email-input">
            Get earning tips and new paid-chat opportunities
          </label>
          <div>
            <input
              id="join-email-input"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <button type="submit" aria-label="Join the earning tips list">
              <ArrowRight size={16} />
            </button>
          </div>
          {submitted && (
            <p className="form-success">
              <Check size={14} /> You are on the list.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Stories() {
  const stories = [
    [
      "ALICE · UK",
      "“I started chatting with foreigners for the connection, then realized my time could earn too.”",
    ],
    [
      "DANIEL · MEXICO",
      "“I enjoy helping people practice English, and the time makes a real difference.”",
    ],
    [
      "MARIE · FRANCE",
      "“A small hello became a steady way to earn online. I meet people from everywhere.”",
    ],
  ];
  return (
    <section className="stories-reference" id="stories">
      <div className="reference-container">
        <div className="section-title centered reveal">
          <h2>
            SUCCESS <span>STORIES</span>
          </h2>
          <p>
            Real people using friendly conversations to connect with foreigners
            and earn from their time.
          </p>
        </div>
        <div className="story-grid">
          {stories.map(([name, quote], index) => (
            <article className="story-card reveal" key={name}>
              <div className={`story-photo story-photo-${index}`} />
              <b>{name}</b>
              <span>✓ VERIFIED HOST</span>
              <p>{quote}</p>
              <small>
                KES {index === 0 ? "8,400" : index === 1 ? "12,500" : "6,800"}{" "}
                PAYOUT
              </small>
            </article>
          ))}
        </div>
        <RegisterButton />
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq-reference" id="faq">
      <div className="reference-container faq-layout">
        <div className="section-title reveal">
          <h2>
            FREQUENTLY <span>ASKED</span>
          </h2>
          <p>
            Learn how paid chats work, how you earn, and how we keep
            conversations safe.
          </p>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <div
              className={`faq-item reveal ${open === index ? "open" : ""}`}
              key={question}
            >
              <button
                type="button"
                onClick={() => setOpen(open === index ? -1 : index)}
                aria-expanded={open === index}
                data-testid={`button-faq-${index}`}
              >
                <span>{question}</span>
                <ChevronDown size={15} />
              </button>
              {open === index && <p>{answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="reference-footer">
      <div className="reference-container footer-layout">
        <div className="footer-brand">
          <button
            className="reference-brand"
            type="button"
            onClick={() => scrollToId("top")}
          >
            <span className="reference-mark">c</span>
            <strong>CHAT GAIN</strong>
          </button>
          <p>
            Good conversations can make
            <br />
            the world feel bigger—and put extra income in your pocket.
          </p>
          <span>● GLOBAL HOSTING INFRASTRUCTURE</span>
        </div>
        <div className="footer-cta">
          <span>GLOBAL HOSTING INFRASTRUCTURE</span>
          <h2>
            There is always
            <br />
            <em>a paid chat</em>
            <br />
            to start.
          </h2>
          <RegisterButton />
        </div>
      </div>
      <div className="reference-container footer-bottom">
        <span>© 2026 CHAT GAIN</span>
        <div>
          <a href="#top">BACK TO TOP</a>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [dark, setDark] = useState(false);
  const [swahili, setSwahili] = useState(false);
  useReveal();
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return (
    <div className="site-reference">
      <Header
        dark={dark}
        onTheme={() => setDark((value) => !value)}
        swahili={swahili}
        onLanguage={() => setSwahili((value) => !value)}
      />
      <main>
        <Hero />
        <Voices />
        <ReviewHotels />
        <Investments />
        <Metrics />
        <HowItWorks />
        <Join />
        <Stories />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
