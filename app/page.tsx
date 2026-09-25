"use client";

import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import {
  Download,
  Upload,
  X,
  User,
  Calendar,
  MapPin,
  ExternalLink,
  RefreshCw,
  Zap,
  Star,
  Award,
  ChevronRight,
  Cpu,
  Share2,
  Quote,
} from "lucide-react";
import { toPng } from "html-to-image";

/* === CONSTANTS === */
const EVENT = {
  name: "PROMPTOTHON",
  edition: "AI EDITION",
  tagline: "BUILD. PROMPT. SHIP.",
  attending: "I AM ATTENDING!",
  dates: "26-27 SEPTEMBER 2026",
  venue: "AVN INSTITUTE OF ENGG & TECH",
  venueShort: "AVNIET",
  city: "HYDERABAD",
  hashtag: "#Promptothon2026",
};

const AI_QUOTES = [
  { text: "The best prompt is the one that makes the machine think.", author: "AI WISDOM" },
  { text: "Code less. Prompt more. Ship faster.", author: "BUILDER MANTRA" },
  { text: "Every great AI product started with a single great prompt.", author: "PROMPTOTHON" },
  { text: "You don't learn to prompt. You learn to think precisely.", author: "HACKER TRUTH" },
  { text: "LLMs are the new compilers. Prompts are the new code.", author: "AI BUILDER" },
  { text: "Ship it before you perfect it. Learn faster than you build.", author: "HACKATHON LAW" },
  { text: "The future belongs to those who prompt it into existence.", author: "BUILD GANG" },
  { text: "AI is not replacing you. A prompter is.", author: "2026 REALITY" },
];

/* === THEMES === */
const COLOR_THEMES = [
  { id: "blue", name: "Electric Blue", hex: "var(--theme-primary)", light: "var(--theme-light)" },
  { id: "red", name: "Cyber Red", hex: "#E11D48", light: "#FFE4E6" },
  { id: "orange", name: "Blaze Orange", hex: "#EA580C", light: "#FFEDD5" },
  { id: "green", name: "Matrix Green", hex: "#16A34A", light: "#DCFCE7" },
  { id: "pink", name: "Neon Pink", hex: "#DB2777", light: "#FCE7F3" },
  { id: "violet", name: "Deep Violet", hex: "#7C3AED", light: "#EDE9FE" },
];

/* === Default Avatar SVG === */
function DefaultAvatar() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <rect width="200" height="200" fill="#DBEAFE" />
      {[0,1,2,3,4,5,6,7].map(i => (
        <line key={`v${i}`} x1={i*28} y1="0" x2={i*28} y2="200" stroke="#BFDBFE" strokeWidth="1" />
      ))}
      {[0,1,2,3,4,5,6,7].map(i => (
        <line key={`h${i}`} x1="0" y1={i*28} x2="200" y2={i*28} stroke="#BFDBFE" strokeWidth="1" />
      ))}
      <circle cx="100" cy="72" r="38" fill="var(--theme-primary)" stroke="#000" strokeWidth="5" />
      <path d="M20 192 C20 148 180 148 180 192" fill="#38BDF8" stroke="#000" strokeWidth="5" strokeLinecap="round" />
      <rect x="83" y="57" width="34" height="34" rx="6" fill="#fff" stroke="#000" strokeWidth="3" />
      <rect x="90" y="64" width="20" height="20" rx="3" fill="var(--theme-primary)" />
      <line x1="95" y1="69" x2="95" y2="79" stroke="#fff" strokeWidth="2" />
      <line x1="90" y1="74" x2="100" y2="74" stroke="#fff" strokeWidth="2" />
      <circle cx="100" cy="30" r="5" fill="#FACC15" stroke="#000" strokeWidth="2.5" />
      <line x1="100" y1="35" x2="100" y2="44" stroke="#000" strokeWidth="2.5" />
      <circle cx="60" cy="35" r="4" fill="#A3E635" stroke="#000" strokeWidth="2" />
      <circle cx="140" cy="40" r="3" fill="#FACC15" stroke="#000" strokeWidth="2" />
      <text x="18" y="140" fontSize="20" fill="#FACC15" opacity="0.8">&#10022;</text>
      <text x="162" y="130" fontSize="15" fill="#A3E635" opacity="0.8">&#9670;</text>
      <text x="155" y="170" fontSize="12" fill="#38BDF8" opacity="0.6">&#9670;</text>
      <text x="25" y="175" fontSize="10" fill="var(--theme-primary)" opacity="0.6">&#9670;</text>
    </svg>
  );
}

/* === BADGE CARD COMPONENT === */
interface BadgeCardProps {
  name: string;
  college: string;
  imagePreview: string | null;
  quoteIndex: number;
  forExport?: boolean;
}

function BadgeCard({ name, college, imagePreview, quoteIndex, forExport = false }: BadgeCardProps) {
  const displayName = name.trim() || "YOUR NAME";
  const displayCollege = college.trim() || "AVN Institute of Engineering and Technology";
  const quote = AI_QUOTES[quoteIndex % AI_QUOTES.length];

  const tickerContent = (
    <>
      <span style={{ color: "#38BDF8", marginRight: 10 }}>&#9889; 24 HRS HACK</span>
      <span style={{ color: "#FACC15", marginRight: 10 }}>&#x2022;</span>
      <span style={{ color: "#fff", marginRight: 10 }}>OFFICIAL PASS</span>
      <span style={{ color: "#FACC15", marginRight: 10 }}>&#x2022;</span>
      <span style={{ color: "#A3E635", marginRight: 10 }}>{EVENT.hashtag}</span>
      <span style={{ color: "#FACC15", marginRight: 10 }}>&#x2022;</span>
      <span style={{ color: "#38BDF8", marginRight: 10 }}>AI EDITION 2026</span>
      <span style={{ color: "#FACC15", marginRight: 10 }}>&#x2022;</span>
      <span style={{ color: "#fff", marginRight: 10 }}>AVNIET, HYDERABAD</span>
      <span style={{ color: "#FACC15", marginRight: 24 }}>&#x2022;</span>
    </>
  );

  return (
    <div
      id="badge-card"
      style={{
        width: "600px",
        height: "600px",
        zoom: forExport ? 1 : "min(1, calc((100vw - 3rem) / 600))",
        fontFamily: "'Space Grotesk', sans-serif",
        backgroundColor: "#F0F6FF",
        backgroundImage: "radial-gradient(var(--theme-primary) 1.5px, transparent 1.5px)",
        backgroundSize: "24px 24px",
        border: "8px solid #000",
        boxShadow: forExport ? "none" : "12px 12px 0px 0px #000",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER BAR */}
      <div style={{
        background: "var(--theme-primary)", borderBottom: "4px solid #000",
        padding: "7px 12px", display: "flex", alignItems: "center",
        justifyContent: "space-between", flexShrink: 0,
      }}>
        <div style={{ display: "flex", gap: "7px", alignItems: "center" }}>
          {["AVNIET", "AI TRACK", "2026"].map((chip) => (
            <span key={chip} style={{
              background: "#fff", border: "2px solid #000",
              padding: "2px 9px", fontSize: "9px", fontWeight: 900,
              textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "#000",
            }}>{chip}</span>
          ))}
        </div>
        <span style={{
          background: "#FACC15", border: "2px solid #000",
          padding: "2px 9px", fontSize: "9px", fontWeight: 900,
          color: "#000", letterSpacing: "0.08em",
        }}>OFFICIAL PASS</span>
      </div>

      {/* MAIN BODY */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        padding: "4px 12px", gap: "10px", minHeight: 0,
      }}>

        {/* ROW 1: Title + Photo side by side */}
        <div style={{ display: "flex", gap: "10px", alignItems: "stretch" }}>

          {/* LEFT: Branding stack */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "5px", minWidth: 0 }}>
            {/* Attending pill */}
            <span style={{
              background: "#A3E635", border: "3px solid #000",
              borderRadius: "999px", padding: "3px 13px",
              fontSize: "10px", fontWeight: 900, color: "#000",
              letterSpacing: "0.08em", boxShadow: "3px 3px 0px #000",
              transform: "rotate(-1deg)", display: "inline-block", alignSelf: "flex-start",
            }}>{EVENT.attending}</span>

            {/* Event name */}
            <h2 style={{
              fontSize: "clamp(20px, 5.5vw, 32px)", fontWeight: 900,
              letterSpacing: "-0.04em", lineHeight: 0.88, color: "#000",
              margin: 0, textTransform: "uppercase" as const,
            }}>{EVENT.name}</h2>

            <div style={{
              display: "inline-block", background: "var(--theme-primary)", color: "#fff",
              padding: "3px 9px", fontSize: "11px", fontWeight: 900,
              border: "2px solid #000", transform: "rotate(0.8deg)",
              letterSpacing: "0.05em", alignSelf: "flex-start",
            }}>{EVENT.edition}</div>

            <p style={{
              fontFamily: "'Space Mono', monospace", fontSize: "9px",
              fontWeight: 700, color: "var(--theme-primary)", letterSpacing: "0.15em",
              margin: 0, textTransform: "uppercase" as const,
            }}>{EVENT.tagline}</p>

            {/* Compact name card */}
            <div style={{
              background: "#fff", border: "3px solid #000",
              padding: "7px 10px", boxShadow: "3px 3px 0px #000",
              marginTop: "3px",
              width: "55%",
              alignSelf: "flex-start",
            }}>
              <p style={{
                fontSize: "8px", fontWeight: 700, letterSpacing: "0.18em",
                color: "var(--theme-primary)", margin: "0 0 1px", textTransform: "uppercase" as const,
              }}>ATTENDEE</p>
              <p style={{
                fontSize: "clamp(13px, 3vw, 19px)", fontWeight: 900,
                letterSpacing: "-0.02em", color: "#000", margin: 0,
                textTransform: "uppercase" as const, overflow: "hidden",
                textOverflow: "ellipsis", whiteSpace: "nowrap" as const, lineHeight: 1.1,
              }}>{displayName}</p>
              <p style={{
                fontSize: "9px", fontWeight: 600, color: "#555",
                margin: "2px 0 0", overflow: "hidden",
                textOverflow: "ellipsis", whiteSpace: "nowrap" as const,
              }}>{displayCollege}</p>
            </div>

            {/* READY sticker */}
            <div style={{
              background: "#38BDF8", border: "3px solid #000",
              padding: "4px 9px", fontSize: "8px", fontWeight: 900,
              textTransform: "uppercase" as const, letterSpacing: "0.1em",
              boxShadow: "3px 3px 0px #000", transform: "rotate(-1.5deg)",
              display: "inline-block", alignSelf: "flex-start", color: "#000",
            }}>&#9889; READY TO PROMPT &amp; BUILD</div>
          </div>

          {/* RIGHT: BIG Photo + badges */}
          <div style={{
            width: "220px", flexShrink: 0, display: "flex",
            flexDirection: "column", alignItems: "center", gap: "5px",
          }}>
            {/* Large photo */}
            <div style={{
              width: "210px", height: "210px",
              border: "5px solid #000",
              outline: "4px solid var(--theme-primary)",
              outlineOffset: "3px",
              boxShadow: "6px 6px 0px #000",
              overflow: "hidden",
              background: "var(--theme-light)",
              flexShrink: 0,
            }}>
              {imagePreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imagePreview} alt="Attendee" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <DefaultAvatar />
              )}
            </div>

            {/* Badge chips */}
            <span style={{
              background: "#FACC15", border: "2px solid #000",
              padding: "3px 7px", fontSize: "7px", fontWeight: 900,
              textTransform: "uppercase" as const, letterSpacing: "0.06em",
              boxShadow: "2px 2px 0px #000", transform: "rotate(1.5deg)",
              textAlign: "center" as const, lineHeight: 1.3, color: "#000", width: "100%",
            }}>OFFICIAL PARTICIPANT</span>

            <span style={{
              background: "#A3E635", border: "2px solid #000",
              padding: "3px 7px", fontSize: "7px", fontWeight: 900,
              textTransform: "uppercase" as const, letterSpacing: "0.06em",
              boxShadow: "2px 2px 0px #000", transform: "rotate(-1deg)",
              textAlign: "center" as const, lineHeight: 1.3, color: "#000", width: "100%",
            }}>AI BUILDER</span>
          </div>
        </div>

        {/* ROW 2: QUOTE BOX — compact & light */}
        <div style={{
          background: "#fff",
          border: "3px solid #000",
          padding: "8px 12px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "4px",
          position: "relative",
          overflow: "hidden",
          boxShadow: "4px 4px 0px var(--theme-primary)",
        }}>
          {/* Side stripes */}
          <div style={{
            position: "absolute", right: 0, top: 0, bottom: 0,
            width: "5px", background: "#38BDF8",
          }} />
          <div style={{
            position: "absolute", left: 0, top: 0, bottom: 0,
            width: "5px", background: "#FACC15",
          }} />

          <div style={{ display: "flex", gap: "8px", alignItems: "flex-start", padding: "0 10px" }}>
            <span style={{
              fontSize: "20px", color: "var(--theme-primary)", lineHeight: 1, flexShrink: 0, marginTop: "2px", fontWeight: 900
            }}>&ldquo;</span>
            <div>
              <p style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "clamp(8px, 1.6vw, 10px)",
                fontWeight: 700,
                color: "#000",
                margin: 0,
                lineHeight: 1.4,
                letterSpacing: "0.01em",
              }}>{quote.text}</p>
              <p style={{
                fontSize: "7.5px", fontWeight: 900, color: "var(--theme-primary)",
                letterSpacing: "0.15em", textTransform: "uppercase" as const,
                margin: "4px 0 0",
              }}>&#x2014; {quote.author}</p>
            </div>
          </div>

          {/* Small decorative dots row */}
          <div style={{
            display: "flex", gap: "4px", justifyContent: "flex-end",
            padding: "0 12px", marginTop: "2px"
          }}>
            {["#38BDF8", "#FACC15", "#A3E635", "var(--theme-primary)"].map((c, i) => (
              <div key={i} style={{ width: "5px", height: "5px", background: c, border: "1px solid #000" }} />
            ))}
          </div>
        </div>

        {/* ROW 3: EVENT DETAILS (2x2 Grid) */}
        <div style={{
          background: "#fff", border: "3px solid #000",
          boxShadow: "5px 5px 0px #000", overflow: "hidden",
          display: "flex", flexDirection: "column",
          flex: 1
        }}>
          <div style={{
            background: "#000", color: "#fff", padding: "4px 10px",
            fontSize: "10px", fontWeight: 900, textTransform: "uppercase" as const,
            letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: "6px"
          }}>
            <span style={{ color: "#FACC15", fontSize: "12px" }}>&#9889;</span> EVENT DETAILS
          </div>
          <div style={{
            padding: "4px 8px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", flex: 1, alignItems: "stretch"
          }}>
            {[
              { icon: "&#128197;", bg: "var(--theme-primary)", iconColor: "#fff", label: "DATES", value: "26 & 27 SEPTEMBER 2026", sub: "24-hour AI Hackathon" },
              { icon: "&#128205;", bg: "#FACC15", iconColor: "#000", label: "VENUE", value: "AVN INSTITUTE OF ENGG & TECH", sub: "Hyderabad, Telangana" },
              { icon: "&#128421;", bg: "#A3E635", iconColor: "#000", label: "TRACK", value: "PROMPT ENGINEERING", sub: "AI Builder \u00B7 LLM Projects" },
              { icon: "&#11088;", bg: "#38BDF8", iconColor: "#000", label: "HASHTAG", value: EVENT.hashtag, sub: "#AI #PromptEngineering" },
            ].map(({ icon, bg, label, value, sub }) => (
              <div key={label} style={{
                display: "flex", gap: "6px", alignItems: "flex-start",
                border: "2px solid #000", padding: "4px",
                background: "#F8FAFC", boxShadow: "2px 2px 0px #000"
              }}>
                <div style={{
                  width: "28px", height: "28px", border: "2px solid #000",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, backgroundColor: bg,
                  fontSize: "14px", boxShadow: "2px 2px 0px rgba(0,0,0,0.2)"
                }} dangerouslySetInnerHTML={{ __html: icon }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "9px", fontWeight: 900, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "var(--theme-primary)", margin: 0 }}>{label}</p>
                  <p style={{ fontSize: "12px", fontWeight: 900, color: "#000", margin: "2px 0 0", lineHeight: 1.1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</p>
                  <p style={{ fontSize: "8.5px", fontFamily: "'Space Mono', monospace", color: "#555", margin: "3px 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER TICKER */}
      <div style={{
        background: "#000", color: "#fff",
        borderTop: "4px solid #000", padding: "5px 0",
        overflow: "hidden", flexShrink: 0,
      }}>
        {forExport ? (
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: "9px", fontWeight: 700,
            textTransform: "uppercase" as const, letterSpacing: "0.08em",
            padding: "0 12px", display: "flex", justifyContent: "space-between",
          }}>
            <span style={{ color: "#38BDF8" }}>&#9889; 24 HRS HACK</span>
            <span style={{ color: "#FACC15" }}>OFFICIAL PASS</span>
            <span style={{ color: "#A3E635" }}>{EVENT.hashtag}</span>
            <span style={{ color: "#38BDF8" }}>AI EDITION 2026</span>
          </div>
        ) : (
          <div className="animate-marquee" style={{
            fontFamily: "'Space Mono', monospace", fontSize: "9px",
            fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em",
          }}>
            {tickerContent}{tickerContent}{tickerContent}
          </div>
        )}
      </div>
    </div>
  );
}

/* === MAIN PAGE === */
export default function PromptothonBadgePage() {
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadDone, setDownloadDone] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [activeThemeId, setActiveThemeId] = useState("blue");

  const activeTheme = COLOR_THEMES.find(t => t.id === activeThemeId) || COLOR_THEMES[0];

  const fileInputRef = useRef<HTMLInputElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    // Cycle quotes every 5 seconds
    const interval = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % AI_QUOTES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  /* Image handling */
  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  /* Download */
  const handleDownload = async () => {
    if (!exportRef.current) return;
    setIsDownloading(true);
    try {
      await new Promise((r) => setTimeout(r, 300));
      const dataUrl = await toPng(exportRef.current, { pixelRatio: 2.5, cacheBust: true });
      const link = document.createElement("a");
      const safeName = (name.trim() || "attendee").toLowerCase().replace(/\s+/g, "-");
      link.download = `promptothon-badge-${safeName}.png`;
      link.href = dataUrl;
      link.click();
      setDownloadDone(true);
      setTimeout(() => setDownloadDone(false), 3000);
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  /* Share */
  const shareText = encodeURIComponent(`I am attending PROMPTOTHON AI EDITION on 26-27 September 2026 at AVNIET, Hyderabad!\n\nBUILD. PROMPT. SHIP.\n\n${EVENT.hashtag} #AI #PromptEngineering`);
  const xShareUrl = `https://twitter.com/intent/tweet?text=${shareText}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://promptothon.in")}&summary=${shareText}`;

  return (
    <>
      {/* Hidden export node */}
      <div style={{ position: "fixed", top: "-9999px", left: "-9999px", width: "600px", height: "600px", zIndex: -1 }}>
        <div ref={exportRef} style={{ width: "600px", height: "600px" }}>
          <BadgeCard name={name} college={college} imagePreview={imagePreview} quoteIndex={quoteIndex} forExport={true} />
        </div>
      </div>

      <main className="min-h-screen py-8 px-4">

        {/* HERO HEADER */}
        <header className="max-w-7xl mx-auto mb-8">
          <div className="bg-black text-white border-4 border-black p-4 md:p-6 shadow-[8px_8px_0px_0px_var(--theme-primary)] relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#38BDF8 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="bg-[var(--theme-primary)] text-white text-xs font-black uppercase tracking-widest px-3 py-1 border-2 border-white">LIVE NOW</span>
                  <span className="bg-[#FACC15] text-black text-xs font-black uppercase tracking-widest px-3 py-1 border-2 border-white">SEPT 26-27, 2026</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-none">
                  PROMPTOTHON<span className="text-[#38BDF8]"> AI</span><span className="text-[#FACC15]"> EDITION</span>
                </h1>
                <p className="text-[#38BDF8] font-mono text-xs md:text-sm font-bold tracking-widest mt-1 uppercase">BUILD &middot; PROMPT &middot; SHIP</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2 text-xs font-mono text-gray-300"><MapPin size={12} /><span>AVNIET, HYDERABAD</span></div>
                <div className="flex gap-2">
                  <Cpu className="text-[#38BDF8]" size={20} />
                  <Zap className="text-[#FACC15]" size={20} />
                  <Star className="text-[#A3E635]" size={20} />
                  <Award className="text-[var(--theme-primary)]" size={20} />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* GLOBAL THEME INJECTION */}
        <style dangerouslySetInnerHTML={{__html: `
          :root {
            --theme-primary: ${activeTheme.hex};
            --theme-light: ${activeTheme.light};
          }
        `}} />

        {/* 2-COLUMN LAYOUT */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT COLUMN — Form (5 cols) */}
          <aside className="lg:col-span-5">
            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000] sticky top-8">

              <div className="mb-6">
                <div className="inline-block bg-[var(--theme-primary)] text-white px-3 py-1 border-2 border-black font-black text-xs uppercase tracking-widest -rotate-1 shadow-[3px_3px_0px_0px_#000] mb-3">
                  PROMPTOTHON &apos;26
                </div>
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-black leading-tight">
                  CLAIM YOUR<br /><span className="text-[var(--theme-primary)]">ATTENDEE BADGE</span>
                </h2>
                <p className="text-sm font-mono text-gray-600 mt-1">Fill in your details and download your personalized badge.</p>
              </div>

              {/* Theme Picker */}
              <div className="mb-6">
                <label className="block text-xs font-black uppercase tracking-widest text-black mb-3">
                  <span className="flex items-center gap-1">1. CHOOSE THEME</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {COLOR_THEMES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setActiveThemeId(t.id)}
                      title={t.name}
                      style={{ backgroundColor: t.hex }}
                      className={`w-8 h-8 rounded-full border-2 border-black transition-all shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] ${activeThemeId === t.id ? 'ring-2 ring-offset-2 ring-black scale-110' : ''}`}
                    />
                  ))}
                </div>
              </div>

              {/* Form Label */}
              <label className="block text-xs font-black uppercase tracking-widest text-black mb-4">
                <span className="flex items-center gap-1">2. ATTENDEE DETAILS</span>
              </label>

              {/* Name */}
              <div className="mb-5">
                <label htmlFor="attendee-name" className="block text-xs font-black uppercase tracking-widest text-black mb-2">
                  <span className="flex items-center gap-1"><User size={12} />FULL NAME <span className="text-[var(--theme-primary)]">*</span></span>
                </label>
                <input
                  id="attendee-name" type="text" value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. RIYA SHARMA" maxLength={40}
                  className="w-full border-4 border-black font-bold text-lg p-3 bg-white uppercase placeholder:normal-case placeholder:text-gray-400 placeholder:font-normal transition-all duration-100"
                  style={{ outline: "none" }}
                  onFocus={(e) => { e.target.style.boxShadow = "4px 4px 0px 0px #000"; e.target.style.backgroundColor = "var(--theme-light)"; e.target.style.borderColor = "var(--theme-primary)"; }}
                  onBlur={(e) => { e.target.style.boxShadow = "none"; e.target.style.backgroundColor = "#fff"; e.target.style.borderColor = "#000"; }}
                />
                <p className="text-xs text-gray-400 font-mono mt-1">{name.length}/40</p>
              </div>

              {/* College */}
              <div className="mb-5">
                <label htmlFor="attendee-college" className="block text-xs font-black uppercase tracking-widest text-black mb-2">
                  <span className="flex items-center gap-1"><Award size={12} />COLLEGE / ORGANIZATION / ROLE</span>
                </label>
                <input
                  id="attendee-college" type="text" value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="AVN Institute of Engineering and Technology" maxLength={60}
                  className="w-full border-4 border-black font-semibold text-base p-3 bg-white placeholder:text-gray-400 placeholder:font-normal transition-all duration-100"
                  style={{ outline: "none" }}
                  onFocus={(e) => { e.target.style.boxShadow = "4px 4px 0px 0px #000"; e.target.style.backgroundColor = "var(--theme-light)"; e.target.style.borderColor = "var(--theme-primary)"; }}
                  onBlur={(e) => { e.target.style.boxShadow = "none"; e.target.style.backgroundColor = "#fff"; e.target.style.borderColor = "#000"; }}
                />
                <p className="text-xs text-gray-400 font-mono mt-1">{college.length}/60</p>
              </div>

              {/* Photo Upload */}
              <div className="mb-6">
                <label className="block text-xs font-black uppercase tracking-widest text-black mb-2">
                  <span className="flex items-center gap-1"><Upload size={12} />PROFILE PHOTO</span>
                </label>
                {imagePreview ? (
                  <div className="border-4 border-black p-3 bg-[#F0F6FF] shadow-[4px_4px_0px_0px_#000]">
                    <div className="flex gap-3 items-center">
                      <div className="w-20 h-20 border-4 border-black overflow-hidden flex-shrink-0 shadow-[3px_3px_0px_0px_var(--theme-primary)]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col gap-2 flex-1">
                        <p className="text-xs font-bold text-green-700 uppercase tracking-wide">Photo uploaded!</p>
                        <button onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-1 text-xs font-black uppercase tracking-wide bg-[var(--theme-primary)] text-white border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 w-fit">
                          <RefreshCw size={11} /> REPLACE
                        </button>
                        <button onClick={() => setImagePreview(null)}
                          className="flex items-center gap-1 text-xs font-black uppercase tracking-wide bg-white text-black border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 w-fit">
                          <X size={11} /> REMOVE
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-4 border-dashed border-black p-6 text-center cursor-pointer transition-all duration-150 ${isDragging ? "bg-[#DBEAFE] border-solid border-[var(--theme-primary)] shadow-[4px_4px_0px_0px_var(--theme-primary)]" : "bg-white hover:bg-[#F0F9FF] hover:shadow-[4px_4px_0px_0px_#000]"}`}
                  >
                    <div className={`w-12 h-12 border-4 border-black flex items-center justify-center mx-auto mb-3 ${isDragging ? "bg-[var(--theme-primary)]" : "bg-[var(--theme-light)]"}`}>
                      <Upload size={22} className={isDragging ? "text-white" : "text-[var(--theme-primary)]"} />
                    </div>
                    <p className="font-black text-sm uppercase tracking-wide text-black mb-1">{isDragging ? "DROP IT!" : "DRAG & DROP PHOTO"}</p>
                    <p className="font-mono text-xs text-gray-500">or click to browse &middot; JPG, PNG, WEBP</p>
                  </div>
                )}
                <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png,.webp,image/*" onChange={handleFileChange} className="hidden" id="photo-file-input" />
              </div>

              {/* Download Button */}
              <button
                id="download-badge-btn" onClick={handleDownload} disabled={isDownloading}
                className={`w-full border-4 border-black font-black text-xl py-4 px-6 uppercase tracking-tight transition-all duration-100 flex items-center justify-center gap-3 ${
                  downloadDone ? "bg-[#A3E635] text-black shadow-[6px_6px_0px_0px_#000] hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_#000]"
                  : isDownloading ? "bg-[#38BDF8] text-black cursor-wait"
                  : "bg-[var(--theme-primary)] text-white shadow-[6px_6px_0px_0px_#000] hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                }`}
              >
                {isDownloading ? <><RefreshCw size={22} className="animate-spin" />GENERATING...</>
                  : downloadDone ? <><Star size={22} />BADGE DOWNLOADED!</>
                  : <><Download size={22} />DOWNLOAD BADGE AS PNG</>}
              </button>

              {/* Share Buttons */}
              <div className="mt-4 flex gap-3">
                <a id="share-x-btn" href={xShareUrl} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 border-4 border-black py-2.5 font-black text-xs uppercase tracking-widest bg-black text-white shadow-[4px_4px_0px_0px_#38BDF8] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#38BDF8] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100">
                  <Share2 size={14} />SHARE ON X
                </a>
                <a id="share-linkedin-btn" href={linkedInShareUrl} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 border-4 border-black py-2.5 font-black text-xs uppercase tracking-widest bg-[var(--theme-primary)] text-white shadow-[4px_4px_0px_0px_#000] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100">
                  <ExternalLink size={14} />LINKEDIN
                </a>
              </div>

              {/* Quote cycling hint */}
              <div className="mt-4 border-2 border-[#38BDF8] bg-[#F0F9FF] p-3 flex items-start gap-2">
                <Quote size={14} className="text-[var(--theme-primary)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-mono text-[var(--theme-primary)] font-bold uppercase tracking-wide mb-1">PRO TIPS</p>
                  <ul className="text-xs font-mono text-gray-600 space-y-1">
                    <li className="flex gap-1 items-start"><ChevronRight size={11} className="mt-0.5 flex-shrink-0 text-[var(--theme-primary)]" />Use a square photo for best results</li>
                    <li className="flex gap-1 items-start"><ChevronRight size={11} className="mt-0.5 flex-shrink-0 text-[var(--theme-primary)]" />Quote cycles every 5s &mdash; pick your fav!</li>
                    <li className="flex gap-1 items-start"><ChevronRight size={11} className="mt-0.5 flex-shrink-0 text-[var(--theme-primary)]" />Download = 2.5x crisp HD export</li>
                  </ul>
                </div>
              </div>

              {/* Manual quote switcher */}
              <div className="mt-3 flex items-center gap-2">
                <p className="text-xs font-mono text-gray-500 flex-1">Quote {quoteIndex + 1}/{AI_QUOTES.length}</p>
                <button
                  onClick={() => setQuoteIndex((i) => (i + 1) % AI_QUOTES.length)}
                  className="text-xs font-black uppercase tracking-wide bg-[#FACC15] text-black border-2 border-black px-3 py-1 shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-y-0 active:shadow-none transition-all duration-100 flex items-center gap-1"
                >
                  <RefreshCw size={10} /> NEXT QUOTE
                </button>
              </div>
            </div>
          </aside>

          {/* RIGHT COLUMN — Badge Preview (7 cols) */}
          <section className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[#A3E635] border-2 border-black rounded-full animate-pulse" />
                <h2 className="font-black text-sm uppercase tracking-widest text-black">LIVE PREVIEW</h2>
              </div>
              <span className="font-mono text-xs text-gray-500 border-2 border-black px-2 py-1 bg-white">600 x 600 px</span>
            </div>

            {/* Badge */}
            <div className={mounted ? "badge-float" : ""}>
              <div className="w-full flex justify-center pb-4">
                <BadgeCard name={name} college={college} imagePreview={imagePreview} quoteIndex={quoteIndex} forExport={false} />
              </div>
            </div>

            {/* Stickers row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "OFFICIAL PARTICIPANT", color: "#FACC15", rotate: "-rotate-1" },
                { label: "AI BUILDER", color: "#38BDF8", rotate: "rotate-1" },
                { label: "PROMPT ENGINEERING", color: "#A3E635", rotate: "-rotate-2" },
              ].map(({ label, color, rotate }) => (
                <div key={label} className={`border-4 border-black text-center py-2 px-2 font-black text-xs uppercase tracking-wide shadow-[4px_4px_0px_0px_#000] ${rotate} sticker-hover cursor-default`} style={{ backgroundColor: color }}>
                  {label}
                </div>
              ))}
            </div>

            {/* Quotes carousel strip */}
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden">
              <div className="bg-black text-white px-4 py-2 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                <Quote size={12} className="text-[#38BDF8]" />
                AI BUILDER QUOTES &mdash; <span className="text-[#FACC15]">CYCLES LIVE ON YOUR BADGE</span>
              </div>
              <div className="divide-y-2 divide-black">
                {AI_QUOTES.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setQuoteIndex(i)}
                    className={`w-full text-left p-3 flex items-start gap-3 transition-all duration-150 ${quoteIndex === i ? "bg-[var(--theme-light)] border-l-4 border-[var(--theme-primary)]" : "bg-white hover:bg-[#F0F9FF]"}`}
                  >
                    <span className={`text-lg font-black flex-shrink-0 ${quoteIndex === i ? "text-[var(--theme-primary)]" : "text-gray-300"}`}>&ldquo;</span>
                    <div>
                      <p className="font-mono text-xs text-black leading-snug">{q.text}</p>
                      <p className="text-xs font-black text-[var(--theme-primary)] uppercase tracking-widest mt-1">&#x2014; {q.author}</p>
                    </div>
                    {quoteIndex === i && <span className="ml-auto text-xs font-black text-[var(--theme-primary)] uppercase bg-[#A3E635] border-2 border-black px-2 py-0.5 flex-shrink-0">ACTIVE</span>}
                  </button>
                ))}
              </div>
            </div>

          </section>
        </div>

        {/* FOOTER */}
        <footer className="max-w-7xl mx-auto mt-12 border-t-4 border-black pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-black uppercase tracking-tighter text-black text-lg">PROMPTOTHON <span className="text-[var(--theme-primary)]">AI EDITION</span></p>
              <p className="font-mono text-xs text-gray-500">26-27 September 2026 &middot; AVNIET, Hyderabad</p>
            </div>
            <div className="flex gap-3">
              {[["BUILD", "var(--theme-primary)", "text-white"], ["PROMPT", "#38BDF8", "text-black"], ["SHIP", "#A3E635", "text-black"]].map(([t, bg, tc]) => (
                <span key={t} className={`border-2 border-black px-3 py-1 font-black text-xs uppercase tracking-widest shadow-[2px_2px_0px_0px_#000] ${tc}`} style={{ backgroundColor: bg }}>{t}</span>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
