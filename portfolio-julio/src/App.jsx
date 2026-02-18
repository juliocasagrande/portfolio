import { useState, useEffect, useRef } from "react";

// ─── Partículas flutuantes ────────────────────────────────────────────────────
function FlowParticles() {
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 3 + 1, speed: Math.random() * 20 + 10,
    delay: Math.random() * 8, opacity: Math.random() * 0.4 + 0.1, type: i % 3,
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {particles.map((p) => (
        <div key={p.id} style={{
          position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
          width: p.size, height: p.size, borderRadius: p.type === 1 ? "2px" : "50%",
          background: p.type === 1 ? `rgba(34,211,238,${p.opacity})` : `rgba(56,189,248,${p.opacity})`,
          animation: `floatDown ${p.speed}s ${p.delay}s linear infinite`,
          boxShadow: `0 0 ${p.size * 3}px rgba(34,211,238,${p.opacity * 0.5})`,
        }} />
      ))}
    </div>
  );
}

// ─── Turbina SVG (hero) ───────────────────────────────────────────────────────
function Turbine({ size = 120, speed = "8s" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" style={{ filter: "drop-shadow(0 0 20px rgba(34,211,238,0.4))" }}>
      <circle cx="60" cy="60" r="12" fill="none" stroke="#22d3ee" strokeWidth="2" />
      <circle cx="60" cy="60" r="5" fill="#22d3ee" />
      <g style={{ transformOrigin: "60px 60px", animation: `spin ${speed} linear infinite` }}>
        {[0, 120, 240].map((angle) => (
          <g key={angle} style={{ transformOrigin: "60px 60px", transform: `rotate(${angle}deg)` }}>
            <path d="M60 48 C54 36, 42 24, 50 18 C58 12, 68 30, 60 48Z"
              fill="rgba(34,211,238,0.2)" stroke="#22d3ee" strokeWidth="1.5" />
          </g>
        ))}
      </g>
      <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(34,211,238,0.12)" strokeWidth="1" strokeDasharray="4 4"
        style={{ animation: `spin 20s linear infinite reverse`, transformOrigin: "60px 60px" }} />
    </svg>
  );
}

// ─── SKILL CARD: Turbina Hidrelétrica (Automação) ────────────────────────────
function TurbineSkillCard({ visible }) {
  const bladeAngle = visible ? 360 : 0;
  return (
    <svg viewBox="0 0 300 260" width="100%" style={{ maxWidth: 300, display: "block", margin: "0 auto" }}>
      {/* Water flow lines at bottom */}
      {[0,1,2,3].map(i => (
        <line key={i}
          x1={40 + i*60} y1="240" x2={40 + i*60} y2="255"
          stroke="#22d3ee" strokeWidth="2" strokeOpacity="0.3"
          style={{ animation: visible ? `waveFlow ${1+i*0.2}s ${i*0.15}s ease-in-out infinite alternate` : "none" }}
        />
      ))}
      {/* Penstock pipe */}
      <rect x="115" y="20" width="30" height="90" rx="4"
        fill="none" stroke="rgba(34,211,238,0.3)" strokeWidth="1.5"
        style={{ transition: "stroke-opacity 1s", strokeOpacity: visible ? 1 : 0 }} />
      {/* Water flow inside pipe */}
      {visible && [0,1,2].map(i => (
        <rect key={i} x="121" y="30" width="8" height="16" rx="4"
          fill="rgba(34,211,238,0.5)"
          style={{ animation: `pipeFlow 1.2s ${i*0.4}s linear infinite` }} />
      ))}
      {/* Generator housing */}
      <ellipse cx="150" cy="145" rx="65" ry="65"
        fill="rgba(8,145,178,0.06)" stroke="rgba(34,211,238,0.2)" strokeWidth="1.5"
        style={{ transition: "all 1s", opacity: visible ? 1 : 0 }} />
      <ellipse cx="150" cy="145" rx="50" ry="50"
        fill="rgba(8,145,178,0.08)" stroke="rgba(34,211,238,0.15)" strokeWidth="1"
        style={{ transition: "all 1.2s 0.1s", opacity: visible ? 1 : 0 }} />
      {/* Spinning turbine blades */}
      <g style={{ transformOrigin: "150px 145px", animation: visible ? "spin 3s linear infinite" : "none" }}>
        {[0,60,120,180,240,300].map((angle, i) => (
          <g key={angle} style={{ transformOrigin: "150px 145px", transform: `rotate(${angle}deg)` }}>
            <path d="M150 145 C144 120, 136 108, 143 100 C150 93, 160 110, 150 145Z"
              fill={`rgba(34,211,238,${0.15 + i*0.03})`} stroke="#22d3ee" strokeWidth="1.2" />
          </g>
        ))}
      </g>
      {/* Hub */}
      <circle cx="150" cy="145" r="10" fill="rgba(34,211,238,0.25)" stroke="#22d3ee" strokeWidth="2" />
      <circle cx="150" cy="145" r="4" fill="#22d3ee" />
      {/* Outer ring dashed */}
      <circle cx="150" cy="145" r="63" fill="none" stroke="rgba(34,211,238,0.1)"
        strokeWidth="1" strokeDasharray="6 6"
        style={{ animation: visible ? "spin 20s linear infinite reverse" : "none", transformOrigin: "150px 145px" }} />
      {/* Draft tube */}
      <path d="M118 195 L100 240 L200 240 L182 195Z"
        fill="rgba(8,145,178,0.08)" stroke="rgba(34,211,238,0.2)" strokeWidth="1.5"
        style={{ transition: "opacity 1s 0.3s", opacity: visible ? 1 : 0 }} />
      {/* Glow center */}
      {visible && <circle cx="150" cy="145" r="20" fill="none" stroke="rgba(34,211,238,0.3)" strokeWidth="1"
        style={{ animation: "pulseRing 2s ease-in-out infinite" }} />}
    </svg>
  );
}

// ─── SKILL CARD: Rio de Dados (Engenharia de Dados) ──────────────────────────
function DataRiverCard({ visible }) {
  const nodes = [
    { x: 30, y: 80, label: "Python" },
    { x: 100, y: 40, label: "Cloud" },
    { x: 170, y: 90, label: "ML/IA" },
    { x: 240, y: 45, label: "ETL" },
    { x: 270, y: 120, label: "API" },
  ];
  const streams = [
    "M20,130 C60,110 80,150 120,120 C160,90 180,140 220,115 C250,95 265,130 290,110",
    "M20,155 C50,140 90,170 130,148 C170,126 200,158 240,138 C260,128 278,148 295,135",
    "M20,175 C55,165 85,185 125,170 C165,155 195,178 235,162 C258,153 276,168 295,158",
  ];
  return (
    <svg viewBox="0 0 300 240" width="100%" style={{ maxWidth: 300, display: "block", margin: "0 auto", overflow: "visible" }}>
      {/* River streams */}
      {streams.map((d, i) => (
        <g key={i}>
          <path d={d} fill="none" stroke={`rgba(34,211,238,${0.08 + i*0.04})`} strokeWidth={14 - i*3} />
          <path d={d} fill="none" stroke={`rgba(34,211,238,${0.25 + i*0.1})`} strokeWidth="1.5"
            strokeDasharray="8 6"
            style={{ animation: visible ? `dashFlow ${2+i*0.4}s ${i*0.3}s linear infinite` : "none" }} />
          {/* Data packets flowing */}
          {visible && [0,1,2].map(j => (
            <circle key={j} r="3" fill="#22d3ee" fillOpacity="0.8">
              <animateMotion dur={`${2.5+i*0.5}s`} begin={`${j*0.8+i*0.2}s`} repeatCount="indefinite">
                <mpath href={`#stream${i}`} />
              </animateMotion>
            </circle>
          ))}
          <path id={`stream${i}`} d={d} fill="none" style={{ display: "none" }} />
        </g>
      ))}
      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={i} style={{ transition: `all 0.6s ${i*0.12}s`, opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0)" }}>
          <circle cx={n.x} cy={n.y} r="18" fill="rgba(8,145,178,0.15)" stroke="rgba(34,211,238,0.4)" strokeWidth="1.5" />
          <circle cx={n.x} cy={n.y} r="18" fill="none" stroke="rgba(34,211,238,0.2)" strokeWidth="8"
            style={{ animation: visible ? `pulseRing 2s ${i*0.3}s ease-in-out infinite` : "none" }} />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="7.5" fill="#67e8f9" fontWeight="700" fontFamily="Space Grotesk, sans-serif">{n.label}</text>
        </g>
      ))}
      {/* Binary / data rain */}
      {visible && ["01","10","11","00","01"].map((bit, i) => (
        <text key={i} x={20 + i * 60} y="220" fontSize="9" fill="rgba(34,211,238,0.35)" fontFamily="monospace"
          style={{ animation: `bitsRain ${2+i*0.3}s ${i*0.2}s ease-in-out infinite alternate` }}>
          {bit}
        </text>
      ))}
      {/* Connecting lines between nodes */}
      {nodes.slice(0,-1).map((n,i) => (
        <line key={i} x1={n.x} y1={n.y} x2={nodes[i+1].x} y2={nodes[i+1].y}
          stroke="rgba(34,211,238,0.2)" strokeWidth="1" strokeDasharray="4 3"
          style={{ transition: `opacity 0.8s ${i*0.15}s`, opacity: visible ? 1 : 0 }} />
      ))}
    </svg>
  );
}

// ─── SKILL CARD: Portfólio de Engenharia (Gestão) ────────────────────────────
function EngineeringDashCard({ visible }) {
  const bars = [75, 90, 60, 85, 70];
  const labels = ["CAPEX","Prazo","Escopo","Risco","Time"];
  return (
    <svg viewBox="0 0 300 240" width="100%" style={{ maxWidth: 300, display: "block", margin: "0 auto" }}>
      {/* Dashboard frame */}
      <rect x="10" y="10" width="280" height="220" rx="12"
        fill="rgba(2,18,32,0.6)" stroke="rgba(34,211,238,0.2)" strokeWidth="1.5"
        style={{ transition: "opacity 0.8s", opacity: visible ? 1 : 0 }} />
      {/* Top bar */}
      <rect x="10" y="10" width="280" height="28" rx="12" fill="rgba(8,145,178,0.12)" />
      <rect x="10" y="26" width="280" height="12" fill="rgba(8,145,178,0.12)" />
      {/* Dots */}
      {[30,46,62].map((cx,i) => (
        <circle key={i} cx={cx} cy="24" r="5"
          fill={["rgba(34,211,238,0.6)","rgba(8,145,178,0.6)","rgba(34,211,238,0.3)"][i]}
          style={{ transition: `opacity 0.5s ${i*0.1}s`, opacity: visible ? 1 : 0 }} />
      ))}
      <text x="155" y="28" textAnchor="middle" fontSize="8" fill="rgba(34,211,238,0.5)" fontFamily="Space Grotesk,sans-serif" fontWeight="700">
        PAINEL DE CONTROLE
      </text>
      {/* Gauge / donut chart */}
      <circle cx="80" cy="110" r="38" fill="none" stroke="rgba(34,211,238,0.07)" strokeWidth="10" />
      <circle cx="80" cy="110" r="38" fill="none" stroke="#22d3ee" strokeWidth="10"
        strokeDasharray={`${visible ? 200 : 0} 240`} strokeLinecap="round"
        style={{ transition: "stroke-dasharray 1.4s 0.3s ease", transformOrigin: "80px 110px", transform: "rotate(-90deg)" }} />
      <text x="80" y="106" textAnchor="middle" fontSize="14" fill="#22d3ee" fontWeight="800" fontFamily="Space Grotesk,sans-serif">83%</text>
      <text x="80" y="120" textAnchor="middle" fontSize="7" fill="rgba(34,211,238,0.5)" fontFamily="Space Grotesk,sans-serif">CONCLUÍDO</text>
      {/* Bar chart */}
      {bars.map((h, i) => (
        <g key={i}>
          <rect x={170 + i*22} y={175} width="14" height={`-${visible ? h*0.65 : 0}`}
            fill="rgba(34,211,238,0.12)" rx="3"
            style={{ transition: `height 0.8s ${0.3+i*0.1}s, y 0.8s ${0.3+i*0.1}s` }} />
          <rect x={170 + i*22} y={visible ? 175 - h*0.65 : 175} width="14" height={visible ? h*0.65 : 0}
            fill="rgba(34,211,238,0.12)" rx="3"
            style={{ transition: `height 0.8s ${0.3+i*0.1}s, y 0.8s ${0.3+i*0.1}s` }} />
          <rect x={170 + i*22} y={visible ? 175 - h*0.65 : 175} width="14" height={visible ? h*0.65 : 0}
            fill={`rgba(34,211,238,${0.4+i*0.08})`} rx="3"
            style={{ transition: `height 0.8s ${0.3+i*0.1}s, y 0.8s ${0.3+i*0.1}s` }} />
          <text x={177 + i*22} y="185" textAnchor="middle" fontSize="5.5" fill="rgba(34,211,238,0.4)" fontFamily="Space Grotesk,sans-serif">{labels[i]}</text>
        </g>
      ))}
      {/* KPI rows */}
      {[["Usinas Modernizadas","12+"],["CAPEX Gerenciado","R$ MM"],["Projetos Entregues","8+"]].map(([label,val],i) => (
        <g key={i} style={{ transition: `opacity 0.6s ${0.4+i*0.15}s`, opacity: visible ? 1 : 0 }}>
          <rect x="20" y={148+i*20} width="120" height="16" rx="4" fill="rgba(34,211,238,0.05)" stroke="rgba(34,211,238,0.1)" strokeWidth="1" />
          <text x="28" y={159+i*20} fontSize="7" fill="rgba(148,218,238,0.6)" fontFamily="Space Grotesk,sans-serif">{label}</text>
          <text x="128" y={159+i*20} textAnchor="end" fontSize="7" fill="#22d3ee" fontWeight="700" fontFamily="Space Grotesk,sans-serif">{val}</text>
        </g>
      ))}
      {/* Bottom grid lines */}
      {[0,1,2].map(i => (
        <line key={i} x1="165" y1={120+i*18} x2="285" y2={120+i*18}
          stroke="rgba(34,211,238,0.06)" strokeWidth="1"
          style={{ transition: `opacity 0.5s ${i*0.1}s`, opacity: visible ? 1 : 0 }} />
      ))}
    </svg>
  );
}

// ─── FadeIn on scroll ─────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transition: `opacity 0.9s ${delay}s, transform 0.9s ${delay}s`, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(36px)" }}>
      {children}
    </div>
  );
}

// ─── Scroll-triggered visibility ─────────────────────────────────────────────
function useVisible(threshold = 0.3) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ to }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; obs.disconnect();
      const start = performance.now();
      const tick = (now) => { const p = Math.min((now - start) / 1400, 1); setVal(Math.floor(p * to)); if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}</span>;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const timeline = [
  { year: "2018", company: "Norte Energia", icon: "⚡", role: "Engenheiro de Operação e Manutenção", desc: "Comissionamento do sistema de regulação de velocidade das unidades geradoras de 611 MW na UHE Belo Monte. Melhorias no sistema supervisório Hycon 400 (Voith)." },
  { year: "2018", company: "CEi", icon: "🔧", role: "Analista de Operação e Manutenção", desc: "Operação e manutenção de usinas hidrelétricas, participação em comissionamentos e análises operacionais." },
  { year: "2019–2023", company: "Tractebel Engie", icon: "📐", role: "Engenheiro de Controle, Automação e Orçamento", desc: "Projetos executivos de modernização das UHEs Jupiá, Ilha Solteira, Marimbondo, Funil, Porto Colômbia e São Simão. Planejamento de CAPEX e interface com fornecedores." },
  { year: "2023–Atual", company: "CTG Brasil", icon: "🏆", role: "Engenheiro de Manutenção Elétrica e CAPEX", desc: "Modernização de CLPs Siemens e Schneider, sistemas supervisórios Elipse e Spectrum Power, ION 8600/8650. Modelos de IA para predição de falhas. 🏆 Campeão do Projeto de Inovação 2025." },
];

const projects = [
  { icon: "🌊", tag: "Modernização", name: "UHE Jupiá & Ilha Solteira", desc: "Modernização dos Lotes 2 e 3 — novos CLPs, lógica de controle, sistemas supervisórios e telecomando pelo COG remoto.", metrics: ["2 usinas", "Lotes 2 e 3"] },
  { icon: "🤖", tag: "Inteligência Artificial", name: "IA para Tomada D'Água", desc: "Modelo de IA premiado em 1º lugar (CTG Brasil 2025) para prevenir engolimento de grades — um dos maiores riscos operacionais em usinas hidrelétricas.", metrics: ["1º Lugar", "CTG Brasil 2025"] },
  { icon: "⚙️", tag: "Migração de Sistema", name: "UHE Garibaldi", desc: "Migração completa dos sistemas de controle com nova arquitetura SCADA e integração de novos protocolos de comunicação.", metrics: ["SCADA", "CLP Schneider", "Quantum","M580"] },
  { icon: "⚡", tag: "Comissionamento", name: "UHE Belo Monte", desc: "Regulação de velocidade de unidades geradoras de grande porte — validações, testes operacionais e ajustes de malha de controle.", metrics: ["Sistemas de Controle", "Hycon 400"] },
];

const skillSections = [
  {
    title: "Automação Industrial", icon: "⚙️",
    desc: "Sistemas de controle, supervisório e comissionamento de usinas hidrelétricas.",
    items: ["CLP Siemens", "CLP Schneider", "CLP Rockwell", "SCADA Elipse", "Spectrum Power", "Comissionamento", "ION 8600/8650"],
    visual: "turbine",
  },
  {
    title: "Engenharia de Dados & IA", icon: "🧠",
    desc: "Fluxo inteligente de dados — da usina à nuvem, com modelos preditivos e dashboards.",
    items: ["Python", "Modelos de Predição", "Dashboards Analíticos", "Data Engineering Cloud", "IA em Confiabilidade", "Análise de Falhas"],
    visual: "river",
  },
  {
    title: "Gestão de Projetos", icon: "📋",
    desc: "Planejamento e controle de grandes projetos de modernização com foco em resultado.",
    items: ["CAPEX", "Projetos Executivos", "Planejamento Físico-Financeiro", "Documentação Técnica", "Interface Multidisciplinar"],
    visual: "dashboard",
  },
];

// ─── Animated Skill Section ───────────────────────────────────────────────────
function SkillSection({ skill, index }) {
  const [ref, vis] = useVisible(0.25);
  const isEven = index % 2 === 0;
  return (
    <div ref={ref} style={{
      display: "flex", flexDirection: isEven ? "row" : "row-reverse",
      gap: 48, alignItems: "center", marginBottom: 80,
      flexWrap: "wrap",
      transition: `opacity 1s ${index*0.1}s, transform 1s ${index*0.1}s`,
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(50px)",
    }}>
      {/* Visual */}
      <div style={{
        flex: "1 1 280px", maxWidth: 320,
        background: "rgba(2,18,32,0.7)", border: "1px solid rgba(34,211,238,0.12)",
        borderRadius: 24, padding: "32px 24px", backdropFilter: "blur(16px)",
        transition: "border-color 0.5s, box-shadow 0.5s",
        borderColor: vis ? "rgba(34,211,238,0.3)" : "rgba(34,211,238,0.08)",
        boxShadow: vis ? "0 0 60px rgba(34,211,238,0.06)" : "none",
      }}>
        {skill.visual === "turbine" && <TurbineSkillCard visible={vis} />}
        {skill.visual === "river"   && <DataRiverCard visible={vis} />}
        {skill.visual === "dashboard" && <EngineeringDashCard visible={vis} />}
      </div>
      {/* Text */}
      <div style={{ flex: "1 1 280px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <span style={{ fontSize: 28 }}>{skill.icon}</span>
          <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: 22, color: "#22d3ee", margin: 0 }}>{skill.title}</h3>
        </div>
        <p style={{ color: "rgba(148,218,238,0.5)", fontSize: 14, lineHeight: 1.8, marginBottom: 22 }}>{skill.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {skill.items.map((item, i) => (
            <span key={item} style={{
              background: "rgba(8,145,178,0.09)", border: "1px solid rgba(34,211,238,0.14)",
              borderRadius: 8, padding: "7px 14px", fontSize: 13, color: "#94daee",
              transition: `opacity 0.5s ${vis ? 0.4 + i*0.07 : 0}s, transform 0.5s ${vis ? 0.4 + i*0.07 : 0}s`,
              opacity: vis ? 1 : 0, transform: vis ? "scale(1)" : "scale(0.85)",
              cursor: "default",
            }}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Skills Section ───────────────────────────────────────────────────────────
const skillSystems = [
  {
    id:"SYS-01", title:"Automação Industrial", icon:"⚙️",
    items:["CLP Siemens","CLP Schneider","CLP Rockwell","SCADA Elipse","Spectrum Power","Comissionamento","ION 8600/8650"],
  },
  {
    id:"SYS-02", title:"Engenharia de Dados & IA", icon:"🧠",
    items:["Python","Modelos de Predição","Dashboards Analíticos","Data Engineering Cloud","IA em Confiabilidade","Análise de Falhas"],
  },
  {
    id:"SYS-03", title:"Gestão de Projetos", icon:"📋",
    items:["CAPEX","Projetos Executivos","Planejamento Físico-Financeiro","Documentação Técnica","Interface Multidisciplinar"],
  },
];

function PulsingDot() {
  return (
    <div style={{ position:"relative", width:10, height:10, flexShrink:0 }}>
      <div style={{
        position:"absolute", inset:0, borderRadius:"50%",
        background:"#22d3ee", opacity:0.3,
        animation:"pingOut 1.8s ease-out infinite",
      }} />
      <div style={{
        position:"absolute", inset:2, borderRadius:"50%",
        background:"#22d3ee",
        boxShadow:"0 0 6px #22d3ee",
      }} />
    </div>
  );
}

function SkillsSection() {
  const [open, setOpen] = useState({});
  const toggle = (id) => setOpen(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <section id="skills" style={{ padding:"100px 6% 40px", position:"relative", zIndex:2 }}>
      <style>{`
        @keyframes pingOut {
          0%   { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        .sys-card { cursor:pointer; transition: border-color 0.3s, box-shadow 0.3s; }
        .sys-card:hover { border-color: rgba(34,211,238,0.3) !important; box-shadow: 0 8px 40px rgba(34,211,238,0.06); }
        .sys-row { transition: background 0.2s; }
        .sys-row:hover { background: rgba(34,211,238,0.04) !important; }
        .collapse-body {
          overflow: hidden;
          transition: max-height 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease;
        }
        .chevron { transition: transform 0.35s ease; display:inline-block; }
      `}</style>

      <FadeIn>
        <div style={{ textAlign:"center", marginBottom:68 }}>
          <span className="section-label">Arsenal Técnico</span>
          <h2 className="section-title">Competências</h2>
          <p style={{ color:"rgba(148,218,238,0.35)", marginTop:12, fontSize:14 }}>
            Clique em cada sistema para expandir as habilidades
          </p>
        </div>
      </FadeIn>

      <div style={{ maxWidth:1000, margin:"0 auto", display:"flex", flexDirection:"column", gap:12 }}>
        {skillSystems.map((sys) => {
          const isOpen = !!open[sys.id];
          return (
            <div
              key={sys.id}
              className="sys-card"
              onClick={() => toggle(sys.id)}
              style={{
                background:"rgba(2,14,26,0.92)",
                border:`1px solid rgba(34,211,238,${isOpen ? 0.28 : 0.1})`,
                borderRadius:16,
                overflow:"hidden",
                backdropFilter:"blur(16px)",
                boxShadow: isOpen ? "0 8px 40px rgba(34,211,238,0.07)" : "none",
              }}
            >
              <div style={{
                background: isOpen ? "rgba(8,145,178,0.1)" : "rgba(8,145,178,0.05)",
                borderBottom: isOpen ? "1px solid rgba(34,211,238,0.1)" : "1px solid transparent",
                padding:"18px 24px",
                display:"flex", justifyContent:"space-between", alignItems:"center",
                transition:"background 0.3s, border-color 0.3s",
              }}>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <PulsingDot />
                  <span style={{ fontFamily:"monospace", fontSize:11, color:"rgba(34,211,238,0.4)", letterSpacing:"0.12em" }}>{sys.id}</span>
                  <span style={{ fontSize:18 }}>{sys.icon}</span>
                  <span style={{ fontFamily:"'Space Grotesk'", fontWeight:700, fontSize:15, color:"#e0f7ff" }}>{sys.title}</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                  <span style={{ fontFamily:"monospace", fontSize:10, color:"#22d3ee", letterSpacing:"0.15em" }}>OPERANDO</span>
                  <span className="chevron" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", color:"rgba(34,211,238,0.5)", fontSize:12 }}>▼</span>
                </div>
              </div>

              <div
                className="collapse-body"
                style={{
                  maxHeight: isOpen ? `${sys.items.length * 52}px` : "0px",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                {sys.items.map((name, i) => (
                  <div
                    key={i}
                    className="sys-row"
                    style={{
                      display:"flex", justifyContent:"space-between", alignItems:"center",
                      padding:"13px 24px",
                      borderBottom: i < sys.items.length - 1 ? "1px solid rgba(34,211,238,0.05)" : "none",
                      background: i % 2 === 0 ? "rgba(34,211,238,0.018)" : "transparent",
                    }}
                  >
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <span style={{ fontFamily:"monospace", fontSize:10, color:"rgba(34,211,238,0.22)", minWidth:26 }}>
                        {String(i + 1).padStart(2,"0")}
                      </span>
                      <span style={{ fontSize:14, color:"#94daee" }}>{name}</span>
                    </div>
                    <span style={{ fontFamily:"monospace", fontSize:10, color:"rgba(34,211,238,0.45)", letterSpacing:"0.1em" }}>● ATIVO</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function IdiomasSection() {
  return (
    <section style={{ padding:"0 6% 100px", position:"relative", zIndex:2 }}>
      <FadeIn>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <span className="section-label">Comunicação</span>
          <h2 className="section-title">Idiomas</h2>
        </div>
      </FadeIn>
      <div style={{ maxWidth:1000, margin:"0 auto" }}>
        <div style={{
          background:"rgba(2,14,26,0.92)", border:"1px solid rgba(34,211,238,0.1)",
          borderRadius:16, padding:"32px 36px", backdropFilter:"blur(16px)",
        }}>
          <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
            {[
              ["🇧🇷","Português",100,"Nativo"],
              ["🇺🇸","Inglês",90,"Avançado / Fluente"],
              ["🇪🇸","Espanhol",60,"Intermediário"],
              ["🇫🇷","Francês",30,"Básico"],
            ].map(([flag, lang, pct, level]) => (
              <div key={lang}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ fontSize:22 }}>{flag}</span>
                    <span style={{ fontSize:14, color:"#94daee", fontWeight:500 }}>{lang}</span>
                  </div>
                  <span style={{ fontSize:12, color:"rgba(103,232,249,0.45)" }}>{level}</span>
                </div>
                <div style={{ height:3, background:"rgba(34,211,238,0.07)", borderRadius:2, overflow:"hidden" }}>
                  <div style={{ width:`${pct}%`, height:"100%", background:"linear-gradient(90deg,#0891b2,#22d3ee)", borderRadius:2, boxShadow:"0 0 10px rgba(34,211,238,0.35)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Formação Section ─────────────────────────────────────────────────────────
function FormacaoSection() {
  return (
    <section style={{ padding:"80px 6%", position:"relative", zIndex:2 }}>
      <FadeIn>
        <div style={{ textAlign:"center", marginBottom:56 }}>
          <span className="section-label">Educação</span>
          <h2 className="section-title">Formação Acadêmica</h2>
        </div>
      </FadeIn>
      <div style={{ maxWidth:1000, margin:"0 auto", display:"flex", flexDirection:"column", gap:12 }}>
        {[
          { id:"EDU-01", icon:"🎓", title:"Engenheiro de Controle e Automação", school:"UNIFEI — Universidade Federal de Itajubá", year:"2018", status:"CONCLUÍDO" },
          { id:"EDU-02", icon:"📊", title:"Ciência de Dados", school:"XP Educação", year:"2023–2027", status:"EM ANDAMENTO" },
          { id:"EDU-03", icon:"📋", title:"MBA em Gestão de Projetos", school:"USP / Esalq", year:"2021–2023", status:"CONCLUÍDO" },
        ].map((edu, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <div
              className="card"
              style={{ padding:"0", overflow:"hidden" }}
            >
              {/* Header stripe */}
              <div style={{
                background:"rgba(8,145,178,0.06)",
                borderBottom:"1px solid rgba(34,211,238,0.08)",
                padding:"14px 24px",
                display:"flex", justifyContent:"space-between", alignItems:"center",
              }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontFamily:"monospace", fontSize:11, color:"rgba(34,211,238,0.4)", letterSpacing:"0.12em" }}>{edu.id}</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <div style={{
                    width:6, height:6, borderRadius:"50%",
                    background: edu.status === "EM ANDAMENTO" ? "#facc15" : "#22d3ee",
                    boxShadow: edu.status === "EM ANDAMENTO" ? "0 0 8px #facc15" : "0 0 8px #22d3ee",
                  }} />
                  <span style={{ fontFamily:"monospace", fontSize:10, letterSpacing:"0.15em",
                    color: edu.status === "EM ANDAMENTO" ? "#facc15" : "#22d3ee",
                  }}>{edu.status}</span>
                </div>
              </div>
              {/* Body */}
              <div style={{ padding:"24px 28px", display:"flex", alignItems:"center", gap:20 }}>
                <div style={{
                  width:52, height:52, borderRadius:14, flexShrink:0,
                  background:"rgba(34,211,238,0.07)", border:"1px solid rgba(34,211,238,0.15)",
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:24,
                }}>
                  {edu.icon}
                </div>
                <div style={{ flex:1 }}>
                  <h3 style={{ fontFamily:"'Space Grotesk'", fontWeight:700, fontSize:17, color:"#e0f7ff", margin:"0 0 4px" }}>{edu.title}</h3>
                  <p style={{ color:"rgba(148,218,238,0.45)", fontSize:13, margin:0 }}>{edu.school}</p>
                </div>
                <span className="tag" style={{ flexShrink:0 }}>{edu.year}</span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ fontFamily: "'DM Sans','Space Grotesk',sans-serif", background: "#020c14", color: "#d0eef8", minHeight: "100vh", overflowX: "hidden", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes floatDown { 0%{transform:translateY(-10vh) translateX(0);opacity:0} 10%{opacity:1} 90%{opacity:0.5} 100%{transform:translateY(110vh) translateX(15px);opacity:0} }
        @keyframes rippleOut { 0%{transform:scale(0.8);opacity:0.5} 100%{transform:scale(3.5);opacity:0} }
        @keyframes pulseGlow { 0%,100%{box-shadow:0 0 12px rgba(34,211,238,0.4)} 50%{box-shadow:0 0 40px rgba(34,211,238,0.8),0 0 70px rgba(34,211,238,0.2)} }
        @keyframes pulseRing { 0%{r:20;opacity:0.5} 100%{r:38;opacity:0} }
        @keyframes borderFlow { 0%,100%{border-color:rgba(34,211,238,0.15)} 50%{border-color:rgba(34,211,238,0.5)} }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes pipeFlow { 0%{transform:translateY(0);opacity:0} 10%{opacity:1} 90%{opacity:0.8} 100%{transform:translateY(60px);opacity:0} }
        @keyframes waveFlow { 0%{transform:scaleY(1)} 100%{transform:scaleY(2.5)} }
        @keyframes dashFlow { 0%{stroke-dashoffset:100} 100%{stroke-dashoffset:0} }
        @keyframes bitsRain { 0%{opacity:0.1;transform:translateY(0)} 100%{opacity:0.5;transform:translateY(-8px)} }

        html { scroll-behavior: smooth; }

        .nav-link { font-size:12px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(148,218,238,0.45);cursor:pointer;transition:color 0.2s; }
        .nav-link:hover { color:#22d3ee; }
        .glow-btn { background:linear-gradient(135deg,#0891b2,#22d3ee);border:none;color:#020c14;font-weight:700;border-radius:40px;cursor:pointer;transition:all 0.3s;letter-spacing:0.05em;font-family:'Space Grotesk',sans-serif; }
        .glow-btn:hover { box-shadow:0 0 50px rgba(34,211,238,0.6);transform:scale(1.05); }
        .ghost-btn { background:transparent;border:1px solid rgba(34,211,238,0.25);color:#94daee;border-radius:40px;cursor:pointer;transition:all 0.3s;font-family:'DM Sans',sans-serif;font-weight:500; }
        .ghost-btn:hover { border-color:#22d3ee;color:#22d3ee;background:rgba(34,211,238,0.05); }
        .card { background:rgba(2,18,32,0.85);border:1px solid rgba(34,211,238,0.08);border-radius:20px;backdrop-filter:blur(16px);transition:transform 0.35s,border-color 0.35s,box-shadow 0.35s; }
        .card:hover { transform:translateY(-7px);border-color:rgba(34,211,238,0.3);box-shadow:0 20px 60px rgba(34,211,238,0.07); }
        .section-label { font-size:11px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:#22d3ee;margin-bottom:12px;display:block; }
        .section-title { font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:clamp(2rem,5vw,3.5rem);line-height:1.1;background:linear-gradient(135deg,#e0f7ff 20%,#22d3ee 60%,#0891b2);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .tag { display:inline-block;background:rgba(34,211,238,0.08);border:1px solid rgba(34,211,238,0.22);color:#67e8f9;border-radius:20px;padding:3px 14px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase; }
        .timeline-dot { width:14px;height:14px;border-radius:50%;background:#22d3ee;box-shadow:0 0 0 4px rgba(34,211,238,0.12),0 0 20px rgba(34,211,238,0.6);flex-shrink:0;margin-top:5px;animation:pulseGlow 2.5s ease-in-out infinite; }
        .metric-pill { font-size:11px;font-weight:600;background:rgba(34,211,238,0.07);border:1px solid rgba(34,211,238,0.18);border-radius:12px;padding:3px 10px;color:#67e8f9; }
        .contact-link { display:flex;align-items:center;gap:16px;background:rgba(2,18,32,0.85);border:1px solid rgba(34,211,238,0.1);border-radius:50px;padding:16px 28px;color:#94daee;text-decoration:none;font-size:14px;transition:all 0.3s;width:100%;max-width:420px;backdrop-filter:blur(10px); }
        .contact-link:hover { border-color:rgba(34,211,238,0.45);color:#22d3ee;background:rgba(34,211,238,0.04);transform:scale(1.02); }
        .wa-btn { display:flex;align-items:center;gap:14px;background:rgba(37,211,102,0.08);border:1px solid rgba(37,211,102,0.25);border-radius:50px;padding:16px 28px;color:#4ade80;text-decoration:none;font-size:14px;transition:all 0.3s;width:100%;max-width:420px;backdrop-filter:blur(10px); }
        .wa-btn:hover { border-color:rgba(37,211,102,0.6);color:#22c55e;background:rgba(37,211,102,0.12);transform:scale(1.02);box-shadow:0 0 30px rgba(37,211,102,0.15); }
      `}</style>

      {/* ── Backgrounds ── */}
      <FlowParticles />
      <div style={{ position:"fixed",inset:0,zIndex:0,pointerEvents:"none",background:"radial-gradient(ellipse 90% 60% at 50% 0%,rgba(8,90,130,0.22) 0%,transparent 70%),radial-gradient(ellipse 60% 40% at 80% 90%,rgba(6,60,100,0.18) 0%,transparent 60%)" }} />
      <div style={{ position:"fixed",inset:0,zIndex:0,pointerEvents:"none",backgroundImage:"linear-gradient(rgba(34,211,238,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,0.03) 1px,transparent 1px)",backgroundSize:"64px 64px" }} />
      <div style={{ position:"fixed",inset:0,zIndex:1,pointerEvents:"none",background:"linear-gradient(to bottom,transparent 50%,rgba(34,211,238,0.012) 50%)",backgroundSize:"100% 4px" }} />

      {/* ── NAV ── */}
      <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:50,backdropFilter:"blur(20px)",background:"rgba(2,10,18,0.88)",borderBottom:"1px solid rgba(34,211,238,0.07)",padding:"0 6%" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",height:66 }}>
          <div style={{ fontFamily:"'Space Grotesk'",fontWeight:800,fontSize:20,display:"flex",alignItems:"center",gap:10 }}>
            <span style={{ color:"#22d3ee",filter:"drop-shadow(0 0 8px #22d3ee88)" }}>JLC</span>
            <span style={{ width:6,height:6,borderRadius:"50%",background:"#22d3ee",animation:"pulseGlow 2s ease-in-out infinite",display:"inline-block" }} />
          </div>
          {/* Nav links com gap adequado */}
          <div style={{ display:"flex",gap:36,alignItems:"center",flexWrap:"wrap" }}>
            {[["Sobre","sobre"],["Carreira","carreira"],["Projetos","projetos"],["Skills","skills"],["Contato","contato"]].map(([label,id]) => (
              <span key={id} className="nav-link" onClick={() => scrollTo(id)}>{label}</span>
            ))}
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="sobre" style={{ minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",zIndex:2,padding:"100px 6% 60px" }}>
        <div style={{ display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",gap:28,maxWidth:740 }}>
          <div style={{ position:"relative",width:200,height:200,display:"flex",alignItems:"center",justifyContent:"center",animation:"floatY 5s ease-in-out infinite" }}>
            {[0,1.4,2.8].map((d,i) => (
              <div key={i} style={{ position:"absolute",borderRadius:"50%",border:"1px solid rgba(34,211,238,0.18)",width:160,height:160,top:"50%",left:"50%",transform:"translate(-50%,-50%)",animation:`rippleOut 4s ${d}s ease-out infinite` }} />
            ))}
            <Turbine size={110} speed="7s" />
          </div>

          <div>
            <p className="section-label">Engenheiro de Controle, Automação e Dados</p>
            <h1 style={{ fontFamily:"'Space Grotesk'",fontWeight:800,fontSize:"clamp(3rem,9vw,5.5rem)",lineHeight:1.0,margin:"8px 0" }}>
              <span style={{ background:"linear-gradient(135deg,#e0f7ff,#67e8f9)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>Júlio</span>
              <br />
              <span style={{ background:"linear-gradient(135deg,#22d3ee,#0891b2)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>Casagrande</span>
            </h1>
          </div>

          <div style={{ display:"flex",alignItems:"center",gap:10,background:"rgba(34,211,238,0.06)",border:"1px solid rgba(34,211,238,0.2)",borderRadius:30,padding:"10px 22px",animation:"borderFlow 3s ease-in-out infinite" }}>
            <div style={{ width:8,height:8,borderRadius:"50%",background:"#22d3ee",boxShadow:"0 0 12px #22d3ee",animation:"pulseGlow 1.5s ease-in-out infinite" }} />
            <span style={{ fontSize:14,fontWeight:500,color:"#94daee" }}>Modernizando usinas hidrelétricas com dados e IA</span>
          </div>

          <p style={{ color:"rgba(148,218,238,0.5)",lineHeight:1.85,maxWidth:520,fontSize:15 }}>
            Das turbinas do Pará às salas de controle mais avançadas do Brasil — transformando energia hídrica em inteligência operacional com automação, código e dados.
          </p>

          <div style={{ display:"inline-flex",alignItems:"center",gap:10,background:"linear-gradient(135deg,rgba(34,211,238,0.09),rgba(8,145,178,0.14))",border:"1px solid rgba(34,211,238,0.35)",borderRadius:30,padding:"11px 26px",fontSize:13,fontWeight:700,color:"#22d3ee" }}>
            🏆 Campeão do Projeto de Inovação — CTG Brasil 2025
          </div>

          <div style={{ display:"flex",gap:14,flexWrap:"wrap",justifyContent:"center" }}>
            <button className="glow-btn" style={{ padding:"15px 34px",fontSize:14 }} onClick={() => scrollTo("carreira")}>⚡ Ver Trajetória</button>
            <button className="ghost-btn" style={{ padding:"15px 34px",fontSize:14 }} onClick={() => scrollTo("contato")}>Contato</button>
          </div>

          <div style={{ display:"flex",flexWrap:"wrap",justifyContent:"center",gap:0,marginTop:8,background:"rgba(2,18,32,0.75)",border:"1px solid rgba(34,211,238,0.07)",borderRadius:20,overflow:"hidden",backdropFilter:"blur(10px)" }}>
            {[["8+","Anos","de exp."],["29+","Usinas","atendidas"],["1450","MW","comissionados"],["1°","Lugar","CTG 2025"]].map(([big,mid,small],i) => (
              <div key={i} style={{ padding:"20px 26px",textAlign:"center",borderRight:i<3?"1px solid rgba(34,211,238,0.07)":"none" }}>
                <div style={{ fontFamily:"'Space Grotesk'",fontWeight:800,fontSize:26,color:"#22d3ee",lineHeight:1 }}>
                  {big.includes("+") ? <><Counter to={parseInt(big)} />+</> : big}
                </div>
                <div style={{ fontSize:11,color:"rgba(34,211,238,0.5)",fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",marginTop:4 }}>{mid}</div>
                <div style={{ fontSize:10,color:"rgba(148,218,238,0.3)",letterSpacing:"0.05em",textTransform:"uppercase" }}>{small}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CARREIRA ── */}
      <section id="carreira" style={{ padding:"120px 6%",position:"relative",zIndex:2 }}>
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent,rgba(8,50,80,0.12),transparent)",pointerEvents:"none" }} />
        <FadeIn>
          <div style={{ textAlign:"center",marginBottom:72 }}>
            <span className="section-label">Rota de Voo</span>
            <h2 className="section-title">Minha Trajetória</h2>
            <p style={{ color:"rgba(148,218,238,0.35)",marginTop:14,fontSize:15 }}>Uma jornada pelos rios e turbinas do Brasil</p>
          </div>
        </FadeIn>
        <div style={{ maxWidth:800,margin:"0 auto",position:"relative" }}>
          <div style={{ position:"absolute",left:21,top:0,bottom:0,width:1,background:"linear-gradient(to bottom,transparent,rgba(34,211,238,0.4) 15%,rgba(34,211,238,0.4) 85%,transparent)" }} />
          {timeline.map((item,i) => (
            <FadeIn key={i} delay={i*0.1}>
              <div style={{ display:"flex",gap:28,marginBottom:48,paddingLeft:12 }}>
                <div style={{ paddingTop:4 }}><div className="timeline-dot" /></div>
                <div className="card" style={{ padding:"28px 30px",flex:1 }}>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8,marginBottom:10 }}>
                    <span className="tag">{item.year}</span>
                    <span style={{ color:"#22d3ee",fontWeight:700,fontSize:13,letterSpacing:"0.04em" }}>{item.icon} {item.company}</span>
                  </div>
                  <h3 style={{ fontFamily:"'Space Grotesk'",fontWeight:700,fontSize:18,color:"#e0f7ff",margin:"8px 0 12px" }}>{item.role}</h3>
                  <p style={{ color:"rgba(148,218,238,0.48)",fontSize:14,lineHeight:1.8,margin:0 }}>{item.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── PROJETOS ── */}
      <section id="projetos" style={{ padding:"100px 4% 100px",position:"relative",zIndex:2 }}>
        <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse 70% 50% at 50% 50%,rgba(8,80,120,0.1),transparent)",pointerEvents:"none" }} />
        <FadeIn>
          <div style={{ textAlign:"center",marginBottom:68 }}>
            <span className="section-label">Portfólio</span>
            <h2 className="section-title">Projetos em Destaque</h2>
          </div>
        </FadeIn>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20,width:"100%",maxWidth:1100,margin:"0 auto",padding:"0 4px" }}>
          {projects.map((p,i) => (
            <FadeIn key={i} delay={i*0.08}>
              <div className="card" style={{ padding:"30px 28px",height:"100%",display:"flex",flexDirection:"column",position:"relative",overflow:"hidden" }}>
                <div style={{ position:"absolute",top:-30,right:-30,width:120,height:120,borderRadius:"50%",background:"radial-gradient(circle,rgba(34,211,238,0.05),transparent)" }} />
                <div style={{ fontSize:28,marginBottom:14 }}>{p.icon}</div>
                <span className="tag" style={{ display:"inline-block",marginBottom:14 }}>{p.tag}</span>
                <h3 style={{ fontFamily:"'Space Grotesk'",fontWeight:700,fontSize:18,color:"#e0f7ff",margin:"10px 0" }}>{p.name}</h3>
                <p style={{ color:"rgba(148,218,238,0.48)",fontSize:14,lineHeight:1.8,marginBottom:20,flex:1 }}>{p.desc}</p>
                <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
                  {p.metrics.map((m) => <span key={m} className="metric-pill">{m}</span>)}
                </div>
                <div style={{ marginTop:20,height:2,background:"linear-gradient(90deg,#0891b2,#22d3ee,transparent)",borderRadius:2 }} />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── FORMAÇÃO ── */}
      <FormacaoSection />

      {/* ── SKILLS ── */}
      <SkillsSection />

      {/* ── IDIOMAS ── */}
      <IdiomasSection />

      {/* ── CONTATO ── */}
      <section id="contato" style={{ padding:"100px 6% 120px",position:"relative",zIndex:2,textAlign:"center" }}>
        <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse 60% 60% at 50% 50%,rgba(8,80,120,0.14),transparent)",pointerEvents:"none" }} />
        <FadeIn>
          <div style={{ maxWidth:540,margin:"0 auto",position:"relative",zIndex:1 }}>
            <span className="section-label">Vamos conversar</span>
            <h2 className="section-title" style={{ marginBottom:16 }}>Entre em Contato</h2>
            <p style={{ color:"rgba(148,218,238,0.38)",lineHeight:1.85,marginBottom:48,fontSize:15 }}>
              Aberto a discutir projetos de automação, engenharia de dados e oportunidades de inovação na geração de energia.
            </p>
            <div style={{ display:"flex",justifyContent:"center",gap:24 }}>

              {/* WhatsApp */}
              <a href="https://wa.me/5532988513212" target="_blank" rel="noopener noreferrer"
                style={{ display:"flex",alignItems:"center",justifyContent:"center",width:64,height:64,borderRadius:"50%",background:"rgba(2,14,26,0.92)",border:"1px solid rgba(34,211,238,0.12)",backdropFilter:"blur(12px)",transition:"transform 0.25s,border-color 0.25s,box-shadow 0.25s" }}
                onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.12)";e.currentTarget.style.borderColor="rgba(37,211,102,0.6)";e.currentTarget.style.boxShadow="0 0 24px rgba(37,211,102,0.25)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.borderColor="rgba(34,211,238,0.12)";e.currentTarget.style.boxShadow="none";}}>
                <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="16" fill="#25d366"/>
                  <path d="M23.5 8.5A10.44 10.44 0 0016 6C10.48 6 6 10.48 6 16c0 1.76.46 3.48 1.34 5L6 26l5.18-1.36A10 10 0 0016 26c5.52 0 10-4.48 10-10a9.94 9.94 0 00-2.5-7.5zm-7.5 15.38a8.3 8.3 0 01-4.23-1.16l-.3-.18-3.08.8.82-3-.2-.31A8.33 8.33 0 117.66 16a8.35 8.35 0 008.34 7.88zm4.58-6.23c-.25-.12-1.47-.73-1.7-.81-.23-.08-.4-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.1-.5.12-.12.25-.31.38-.46.13-.16.17-.27.25-.44.08-.17.04-.32-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.57c.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.28z" fill="white"/>
                </svg>
              </a>

              {/* Email */}
              <a href="mailto:juliocasagrande27@gmail.com"
                style={{ display:"flex",alignItems:"center",justifyContent:"center",width:64,height:64,borderRadius:"50%",background:"rgba(2,14,26,0.92)",border:"1px solid rgba(34,211,238,0.12)",backdropFilter:"blur(12px)",transition:"transform 0.25s,border-color 0.25s,box-shadow 0.25s" }}
                onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.12)";e.currentTarget.style.borderColor="rgba(34,211,238,0.5)";e.currentTarget.style.boxShadow="0 0 24px rgba(34,211,238,0.2)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.borderColor="rgba(34,211,238,0.12)";e.currentTarget.style.boxShadow="none";}}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="4" width="20" height="16" rx="3" stroke="#22d3ee" strokeWidth="1.5" fill="none"/>
                  <path d="M2 7l10 7 10-7" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="https://linkedin.com/in/julio-casagrande" target="_blank" rel="noopener noreferrer"
                style={{ display:"flex",alignItems:"center",justifyContent:"center",width:64,height:64,borderRadius:"50%",background:"rgba(2,14,26,0.92)",border:"1px solid rgba(34,211,238,0.12)",backdropFilter:"blur(12px)",transition:"transform 0.25s,border-color 0.25s,box-shadow 0.25s" }}
                onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.12)";e.currentTarget.style.borderColor="rgba(10,102,194,0.7)";e.currentTarget.style.boxShadow="0 0 24px rgba(10,102,194,0.35)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.borderColor="rgba(34,211,238,0.12)";e.currentTarget.style.boxShadow="none";}}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="4" fill="#0a66c2"/>
                  <path d="M7 10v7M7 7v.5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M11 17v-4c0-1.1.9-2 2-2s2 .9 2 2v4" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M11 10v7" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </a>

            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:"1px solid rgba(34,211,238,0.06)",padding:"24px 6%",textAlign:"center",color:"rgba(34,211,238,0.2)",fontSize:13,position:"relative",zIndex:2,display:"flex",justifyContent:"center",gap:10,alignItems:"center" }}>
        <Turbine size={16} speed="4s" />
        <span style={{ fontFamily:"'Space Grotesk'",fontWeight:700,color:"rgba(34,211,238,0.28)" }}>JLC</span>
        <span>· Júlio Casagrande © 2025 · Engenheiro de Controle, Automação e Dados</span>
      </footer>
    </div>
  );
}