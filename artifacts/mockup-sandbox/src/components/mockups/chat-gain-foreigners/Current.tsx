import { useEffect, useState } from "react";
import { ArrowRight, MessageSquare, X } from "lucide-react";
import "./_group.css";

type Person = {
  id: number;
  name: string;
  age: number;
  country: string;
  flag: string;
  photo: string;
};

const people: Person[] = [
  { id: 1, name: "Margaret W.", age: 58, country: "USA", flag: "🇺🇸", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=180&q=85" },
  { id: 2, name: "Robert H.", age: 62, country: "UK", flag: "🇬🇧", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=180&q=85" },
  { id: 3, name: "Helga S.", age: 55, country: "GERMANY", flag: "🇩🇪", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=180&q=85" },
  { id: 4, name: "James M.", age: 60, country: "CANADA", flag: "🇨🇦", photo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=180&q=85" },
  { id: 5, name: "Karen P.", age: 51, country: "AUSTRALIA", flag: "🇦🇺", photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=180&q=85" },
  { id: 6, name: "Lars E.", age: 60, country: "SWEDEN", flag: "🇸🇪", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=180&q=85" },
  { id: 7, name: "Mina R.", age: 57, country: "FRANCE", flag: "🇫🇷", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=180&q=85" },
  { id: 8, name: "Peter K.", age: 64, country: "NORWAY", flag: "🇳🇴", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=180&q=85" },
  { id: 9, name: "Nadia T.", age: 54, country: "ITALY", flag: "🇮🇹", photo: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=180&q=85" },
  { id: 10, name: "Sofia J.", age: 59, country: "IRELAND", flag: "🇮🇪", photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=180&q=85" },
];

function ProfileCard({ person, isTyping, onWatch }: {
  person: Person;
  isTyping: boolean;
  onWatch: (person: Person) => void;
}) {
  return (
    <article className="current-profile">
      <div className="current-profile__head">
        <div className="current-profile__avatar"><img src={person.photo} alt="" /><i /></div>
        <div className="current-profile__name">
          <h3>{person.name} <small>{person.age}y</small></h3>
          <p>{person.flag}<span>{person.country}</span></p>
        </div>
      </div>
      <div className="current-profile__meta">
        <span className={isTyping ? "current-profile__typing" : ""}>
          {isTyping ? <><i /><i /><i /> TYPING...</> : <><i /> LOOKING TO TALK</>}
        </span>
        <b>ACTIVE NOW</b>
      </div>
      <div className="current-profile__actions">
        <button className="current-profile__chat" type="button">CHAT NOW</button>
        <button className="current-profile__watch" type="button" aria-label={`Open ${person.name}'s profile`} onClick={() => onWatch(person)}>
          <MessageSquare size={16} />
        </button>
      </div>
    </article>
  );
}

export function Current() {
  const [selected, setSelected] = useState<Person | null>(null);
  const [typingIds, setTypingIds] = useState<number[]>([]);

  useEffect(() => {
    let timer: number;
    const cycle = () => {
      timer = window.setTimeout(() => {
        setTypingIds([...people].sort(() => Math.random() - 0.5).slice(0, 4).map((person) => person.id));
        timer = window.setTimeout(() => {
          setTypingIds([]);
          cycle();
        }, 2200);
      }, 4000);
    };
    cycle();
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="current-voices">
      <div className="current-voices__container">
        <div className="current-voices__heading">
          <h2><i /> LIVE FOREIGNERS ONLINE</h2>
          <p>TAP ANY PROFILE TO START A PAID CHAT NOW</p>
        </div>
        <div className="current-voices__grid">
          {people.slice(0, 6).map((person) => (
            <ProfileCard key={person.id} person={person} isTyping={typingIds.includes(person.id)} onWatch={setSelected} />
          ))}
          <article className="current-support">
            <span>CHAT SUPPORT</span>
            <h3>JOIN TRAINING CHANNEL</h3>
            <p>Get training, updates &amp; connect with other earners.</p>
            <button type="button">OPEN SUPPORT CHAT</button>
          </article>
        </div>
        <div className="current-voices__grid current-voices__grid--lower">
          {people.slice(6).map((person) => (
            <ProfileCard key={person.id} person={person} isTyping={typingIds.includes(person.id)} onWatch={setSelected} />
          ))}
        </div>
        <button className="current-voices__more" type="button">SHOW MORE <ArrowRight size={14} /></button>
      </div>
      {selected && (
        <div className="current-voices__modal" onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}>
          <div className="current-voices__dialog" role="dialog" aria-modal="true">
            <button type="button" aria-label="Close profile" onClick={() => setSelected(null)}><X size={17} /></button>
            <img src={selected.photo} alt="" />
            <h3>Start a chat with {selected.name}</h3>
            <p>{selected.name} is ready to talk. Start a friendly conversation and make the time count.</p>
            <button className="current-profile__chat" type="button">CHAT NOW <ArrowRight size={14} /></button>
          </div>
        </div>
      )}
    </section>
  );
}
