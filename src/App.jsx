import { useState } from "react";

/* ─── Colores institucionales (del logo oficial) ─── */
const C = {
  yellow: "#F2C94C",
  orange: "#E8873C",
  red: "#C0392B",
  darkRed: "#8B2A2A",
  blue: "#2B7CB8",
  green: "#2D8F4E",
  dark: "#1A1A2E",
  darkAlt: "#16213E",
  card: "#FFFFFF",
  page: "#F5F6F8",
  text: "#1A1A2E",
  muted: "#6B7280",
  hint: "#9CA3AF",
  border: "#E5E7EB",
  borderHover: "#D1D5DB",
};

/* ─── Datos de ejemplo ─── */
const courses = [
  { id: 1, title: "Liderazgo político territorial", cat: "Liderazgo", mods: 8, dur: "12h", prog: 65, color: C.orange, instructor: "María Paz Córdoba", students: 342, rating: 4.8, desc: "Desarrolla habilidades de liderazgo para transformar tu comunidad desde lo local." },
  { id: 2, title: "Estrategia electoral y campaña", cat: "Campaña", mods: 12, dur: "18h", prog: 30, color: C.green, instructor: "Carlos Andrés Murillo", students: 518, rating: 4.9, desc: "Diseña y ejecuta campañas electorales efectivas con enfoque territorial." },
  { id: 3, title: "Estructuras de campaña", cat: "Organización", mods: 6, dur: "9h", prog: 0, color: C.blue, instructor: "Juliana Rojas Mena", students: 276, rating: 4.7, desc: "Construye equipos sólidos y estructuras organizativas para ganar elecciones." },
  { id: 4, title: "Comunicación política efectiva", cat: "Comunicación", mods: 10, dur: "15h", prog: 85, color: C.red, instructor: "Andrés Felipe Caicedo", students: 410, rating: 4.6, desc: "Domina la narrativa política y conecta con tu comunidad a través del mensaje." },
  { id: 5, title: "Filosofía Ubuntu y acción política", cat: "Formación", mods: 5, dur: "7h", prog: 100, color: C.darkRed, instructor: "Luz Dary Palacios", students: 650, rating: 4.9, desc: "Comprende la filosofía Ubuntu: Soy porque somos. Base ideológica del partido." },
  { id: 6, title: "Marco legal y normatividad electoral", cat: "Jurídico", mods: 8, dur: "11h", prog: 10, color: C.yellow, instructor: "Diego Armando Vega", students: 198, rating: 4.5, desc: "Conoce el marco jurídico colombiano para participar legalmente en elecciones." },
];

const forumTopics = [
  { title: "Estrategias para las elecciones territoriales 2027", replies: 47, author: "M. Córdoba", time: "Hace 2h", hot: true },
  { title: "Cómo fortalecer las JAL en mi municipio", replies: 23, author: "J. Murillo", time: "Hace 5h", hot: false },
  { title: "Experiencias de campaña puerta a puerta", replies: 62, author: "L. Palacios", time: "Hace 1 día", hot: true },
  { title: "Materiales de difusión para redes sociales", replies: 15, author: "A. Caicedo", time: "Hace 2 días", hot: false },
  { title: "Filosofía Ubuntu aplicada a la política local", replies: 38, author: "D. Rentería", time: "Hace 3 días", hot: true },
];

const leaderboard = [
  { name: "Ana María Valencia", pts: 4820, city: "Cali", ini: "AV" },
  { name: "José Luis Mina", pts: 4650, city: "Buenaventura", ini: "JM" },
  { name: "Claudia Mosquera", pts: 4200, city: "Quibdó", ini: "CM" },
  { name: "Diego Rentería", pts: 3980, city: "Tumaco", ini: "DR" },
  { name: "Paola Andrea Grueso", pts: 3750, city: "Cartagena", ini: "PG" },
];

const certs = [
  { course: "Filosofía Ubuntu y acción política", date: "Febrero 2026", code: "CR-2026-0542" },
  { course: "Comunicación política efectiva", date: "Enero 2026", code: "CR-2026-0318" },
];

/* ─── Componentes auxiliares ─── */
function ProgressRing({ progress, size = 44, sw = 4, color }) {
  const r = (size - sw) / 2;
  const circ = 2 * Math.PI * r;
  const off = circ - (progress / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={C.border} strokeWidth={sw} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={sw}
        strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.8s ease" }} />
    </svg>
  );
}

function Ico({ d, size = 20 }) {
  return (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d={d} />
    </svg>
  );
}

/* ─── Sidebar ─── */
const NAV = [
  { id: "home", label: "Inicio", d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { id: "courses", label: "Cursos", d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
  { id: "progress", label: "Mi progreso", d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { id: "forum", label: "Comunidad", d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
  { id: "certs", label: "Certificados", d: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
  { id: "admin", label: "Administración", d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
];

function Sidebar({ active, setActive, col, setCol }) {
  return (
    <div style={{
      width: col ? 68 : 250, minHeight: "100vh", background: C.dark,
      display: "flex", flexDirection: "column", transition: "width 0.3s ease",
      borderRight: "1px solid rgba(255,255,255,0.06)", flexShrink: 0, position: "relative",
    }}>
      {/* Logo */}
      <div style={{
        padding: col ? "16px 8px" : "16px 18px",
        display: "flex", alignItems: "center", gap: 12,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <img
          src="/logo.png"
          alt="Colombia Renaciente"
          style={{
            width: col ? 40 : 48,
            height: "auto",
            objectFit: "contain",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
            transition: "width 0.3s ease",
          }}
        />
        {!col && (
          <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
            <div style={{ color: "#fff", fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em" }}>
              Colombia Renaciente
            </div>
            <div style={{
              color: C.yellow, fontSize: 10, fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase",
            }}>Escuela de formación</div>
          </div>
        )}
      </div>

      {/* Toggle */}
      <button onClick={() => setCol(!col)} style={{
        position: "absolute", right: -12, top: 46, width: 24, height: 24,
        borderRadius: "50%", background: C.dark, border: "1px solid rgba(255,255,255,0.15)",
        color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 12, zIndex: 10,
      }}>{col ? "›" : "‹"}</button>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV.map(n => (
          <button key={n.id} onClick={() => setActive(n.id)} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: col ? "10px 16px" : "10px 14px",
            border: "none", borderRadius: 8, cursor: "pointer", width: "100%", textAlign: "left",
            background: active === n.id ? "rgba(242,201,76,0.12)" : "transparent",
            color: active === n.id ? C.yellow : "rgba(255,255,255,0.5)",
            transition: "all 0.2s", fontSize: 14,
            fontWeight: active === n.id ? 600 : 400,
          }}>
            <Ico d={n.d} />
            {!col && <span>{n.label}</span>}
          </button>
        ))}
      </nav>

      {/* User */}
      {!col && (
        <div style={{ padding: "16px 16px 20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: `linear-gradient(135deg, ${C.orange}, ${C.red})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: 13, fontWeight: 600,
            }}>JM</div>
            <div>
              <div style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>Juan Murillo</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Líder municipal · Yumbo</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Course Card ─── */
function CourseCard({ c, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: C.card, borderRadius: 12, overflow: "hidden", cursor: "pointer",
        border: `1px solid ${C.border}`,
        transform: hov ? "translateY(-3px)" : "none",
        boxShadow: hov ? "0 8px 24px rgba(0,0,0,0.08)" : "0 1px 3px rgba(0,0,0,0.04)",
        transition: "all 0.25s ease",
      }}
    >
      <div style={{ height: 5, background: c.color }} />
      <div style={{ padding: "16px 18px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <span style={{
            fontSize: 11, fontWeight: 600, color: c.color,
            background: c.color + "14", padding: "3px 10px", borderRadius: 20,
          }}>{c.cat}</span>
          {c.prog > 0 && (
            <div style={{ position: "relative" }}>
              <ProgressRing progress={c.prog} size={36} sw={3} color={c.color} />
              <span style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%,-50%)", fontSize: 9, fontWeight: 700, color: c.color,
              }}>{c.prog}%</span>
            </div>
          )}
        </div>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: C.text, margin: "0 0 8px", lineHeight: 1.35 }}>{c.title}</h3>
        <p style={{ fontSize: 13, color: C.muted, margin: "0 0 14px", lineHeight: 1.5 }}>{c.desc}</p>
        <div style={{ display: "flex", gap: 16, fontSize: 12, color: C.hint }}>
          <span>{c.mods} módulos</span>
          <span>{c.dur}</span>
          <span style={{ marginLeft: "auto", color: c.color, fontWeight: 600 }}>
            {c.prog === 100 ? "Completado" : c.prog > 0 ? "En progreso" : "Nuevo"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Home View ─── */
function HomeView({ go }) {
  const stats = [
    { label: "Cursos activos", val: "4", color: C.orange },
    { label: "Horas de estudio", val: "38", color: C.green },
    { label: "Certificados", val: "2", color: C.blue },
    { label: "Posición ranking", val: "#12", color: C.red },
  ];

  return (
    <div>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${C.dark} 0%, ${C.darkAlt} 50%, ${C.dark} 100%)`,
        borderRadius: 16, padding: "32px 36px", marginBottom: 28, position: "relative", overflow: "hidden",
      }}>
        <img src="/logo.png" alt="" style={{
          position: "absolute", right: 24, top: "50%", transform: "translateY(-50%)",
          height: 120, opacity: 0.12, pointerEvents: "none",
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            color: C.yellow, fontSize: 12, fontWeight: 600,
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8,
          }}>Bienvenido de vuelta, Juan</div>
          <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
            Forma líderes, transforma territorios
          </h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, margin: "0 0 20px", maxWidth: 500 }}>
            Soy porque somos — Filosofía Ubuntu. Continúa tu formación y prepárate para las elecciones territoriales.
          </p>
          <button onClick={() => go("courses")} style={{
            background: C.orange, color: "#fff", border: "none",
            padding: "10px 24px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer",
          }}>Continuar aprendiendo</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28 }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            background: C.card, borderRadius: 10, padding: "18px",
            border: `1px solid ${C.border}`, position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: s.color }} />
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: C.text }}>{s.val}</div>
          </div>
        ))}
      </div>

      {/* Content grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: C.text, margin: 0 }}>Continúa donde dejaste</h2>
            <button onClick={() => go("courses")} style={{
              background: "none", border: "none", color: C.orange, fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}>Ver todos →</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {courses.filter(c => c.prog > 0 && c.prog < 100).map(c => (
              <CourseCard key={c.id} c={c} onClick={() => go("courses")} />
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: C.text, margin: "0 0 16px" }}>Ranking de líderes</h2>
          <div style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden" }}>
            {leaderboard.map((l, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
                borderBottom: i < leaderboard.length - 1 ? "1px solid #F3F4F6" : "none",
              }}>
                <div style={{
                  width: 26, height: 26, borderRadius: "50%", display: "flex",
                  alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700,
                  background: i === 0 ? C.yellow : i === 1 ? "#C0C0C0" : i === 2 ? "#CD7F32" : "#F3F4F6",
                  color: i < 3 ? "#fff" : C.muted,
                }}>{i + 1}</div>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${C.green}, ${C.blue})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: 11, fontWeight: 600,
                }}>{l.ini}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{l.name}</div>
                  <div style={{ fontSize: 11, color: C.hint }}>{l.city}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.orange }}>{l.pts.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Courses View ─── */
function CoursesView() {
  const [filter, setFilter] = useState("Todos");
  const [sel, setSel] = useState(null);
  const cats = ["Todos", ...new Set(courses.map(c => c.cat))];
  const list = filter === "Todos" ? courses : courses.filter(c => c.cat === filter);

  if (sel) {
    const c = courses.find(x => x.id === sel);
    const modNames = [
      "Introducción y fundamentos", "Diagnóstico territorial", "Planificación estratégica",
      "Gestión de equipos", "Comunicación y mensaje", "Movilización comunitaria",
      "Día de elecciones", "Evaluación y seguimiento", "Análisis de resultados",
      "Rendición de cuentas", "Fortalecimiento institucional", "Liderazgo transformador",
    ];
    return (
      <div>
        <button onClick={() => setSel(null)} style={{
          background: "none", border: "none", color: C.muted, cursor: "pointer",
          fontSize: 13, marginBottom: 20, display: "flex", alignItems: "center", gap: 6,
        }}>← Volver a cursos</button>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 28 }}>
          <div>
            {/* Course header */}
            <div style={{
              background: c.color + "0A", borderRadius: 14, padding: "28px 32px", marginBottom: 24,
              borderLeft: `4px solid ${c.color}`,
            }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: c.color, letterSpacing: "0.06em", textTransform: "uppercase" }}>{c.cat}</span>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: "8px 0 10px" }}>{c.title}</h1>
              <p style={{ fontSize: 14, color: C.muted, margin: 0, lineHeight: 1.6 }}>{c.desc}</p>
              <div style={{ display: "flex", gap: 20, marginTop: 16, fontSize: 13, color: C.muted }}>
                <span>{c.mods} módulos</span><span>{c.dur}</span>
                <span>{c.students} estudiantes</span><span style={{ color: C.yellow }}>★ {c.rating}</span>
              </div>
            </div>

            {/* Modules */}
            <h2 style={{ fontSize: 17, fontWeight: 600, color: C.text, margin: "0 0 14px" }}>Contenido del curso</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {modNames.slice(0, c.mods).map((m, i) => {
                const done = (i / c.mods) * 100 < c.prog;
                const curr = Math.floor((c.prog / 100) * c.mods) === i;
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
                    background: curr ? c.color + "08" : C.card,
                    border: `1px solid ${curr ? c.color + "30" : C.border}`,
                    borderRadius: 10, cursor: "pointer",
                  }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: done ? c.color : curr ? c.color + "20" : "#F3F4F6",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: done ? "#fff" : curr ? c.color : C.muted,
                      fontSize: 12, fontWeight: 600,
                    }}>{done ? "✓" : i + 1}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: curr ? 600 : 400, color: C.text }}>
                        Módulo {i + 1}: {m}
                      </div>
                      <div style={{ fontSize: 12, color: C.hint }}>3 lecciones · 45 min</div>
                    </div>
                    {curr && (
                      <button style={{
                        background: c.color, color: "#fff", border: "none",
                        padding: "6px 16px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer",
                      }}>Continuar</button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar info */}
          <div>
            <div style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, padding: 20, marginBottom: 16, textAlign: "center" }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 14px", color: C.text }}>Tu progreso</h3>
              <div style={{ position: "relative", display: "inline-block", marginBottom: 14 }}>
                <ProgressRing progress={c.prog} size={100} sw={8} color={c.color} />
                <span style={{
                  position: "absolute", top: "50%", left: "50%",
                  transform: "translate(-50%,-50%)", fontSize: 22, fontWeight: 700, color: c.color,
                }}>{c.prog}%</span>
              </div>
              <div style={{ fontSize: 13, color: C.muted }}>
                {c.prog === 100 ? "¡Curso completado!" : `${Math.ceil(c.mods * (1 - c.prog / 100))} módulos restantes`}
              </div>
            </div>

            <div style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 14px", color: C.text }}>Instructor</h3>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${c.color}, ${C.dark})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: 14, fontWeight: 600,
                }}>{c.instructor.split(" ").map(n => n[0]).join("").slice(0, 2)}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: C.text }}>{c.instructor}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>Formador del partido</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: "0 0 4px" }}>Catálogo de cursos</h1>
        <p style={{ fontSize: 14, color: C.muted, margin: 0 }}>Formación para líderes y militantes de Colombia Renaciente</p>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {cats.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{
            padding: "7px 18px", borderRadius: 20,
            border: `1px solid ${filter === cat ? C.orange : C.border}`,
            background: filter === cat ? C.orange + "12" : C.card,
            color: filter === cat ? C.orange : C.muted,
            fontSize: 13, fontWeight: filter === cat ? 600 : 400, cursor: "pointer",
          }}>{cat}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {list.map(c => <CourseCard key={c.id} c={c} onClick={() => setSel(c.id)} />)}
      </div>
    </div>
  );
}

/* ─── Progress View ─── */
function ProgressView() {
  const week = [
    { d: "Lun", h: 2.5 }, { d: "Mar", h: 1.8 }, { d: "Mié", h: 3.2 },
    { d: "Jue", h: 0.5 }, { d: "Vie", h: 2.0 }, { d: "Sáb", h: 4.0 }, { d: "Dom", h: 1.5 },
  ];
  const mx = Math.max(...week.map(w => w.h));

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: "0 0 24px" }}>Mi progreso</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 28 }}>
        {[
          { label: "Horas totales", val: "38h", color: C.orange },
          { label: "Cursos en progreso", val: "4", color: C.green },
          { label: "Cursos completados", val: "1", color: C.blue },
        ].map((s, i) => (
          <div key={i} style={{ background: C.card, borderRadius: 12, padding: 22, border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: s.color }}>{s.val}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Weekly chart */}
        <div style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, padding: 22 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: C.text, margin: "0 0 20px" }}>Actividad semanal</h2>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 160 }}>
            {week.map((w, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center" }}>
                <div style={{
                  height: `${(w.h / mx) * 120}px`,
                  background: `linear-gradient(to top, ${C.orange}, ${C.yellow})`,
                  borderRadius: "6px 6px 0 0", marginBottom: 8, minHeight: 8,
                }} />
                <div style={{ fontSize: 12, color: C.muted }}>{w.d}</div>
                <div style={{ fontSize: 11, color: C.text, fontWeight: 500 }}>{w.h}h</div>
              </div>
            ))}
          </div>
        </div>

        {/* Per-course progress */}
        <div style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, padding: 22 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: C.text, margin: "0 0 16px" }}>Progreso por curso</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {courses.filter(c => c.prog > 0).map(c => (
              <div key={c.id}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                  <span style={{ color: C.text, fontWeight: 500 }}>{c.title.length > 32 ? c.title.slice(0, 32) + "…" : c.title}</span>
                  <span style={{ color: c.color, fontWeight: 600 }}>{c.prog}%</span>
                </div>
                <div style={{ height: 6, background: "#F3F4F6", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${c.prog}%`, background: c.color, borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Forum View ─── */
function ForumView() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: "0 0 4px" }}>Comunidad</h1>
          <p style={{ fontSize: 14, color: C.muted, margin: 0 }}>Comparte experiencias con otros líderes del partido</p>
        </div>
        <button style={{
          background: C.orange, color: "#fff", border: "none",
          padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
        }}>+ Nuevo tema</button>
      </div>

      <div style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden" }}>
        {forumTopics.map((t, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 16, padding: "16px 20px",
            borderBottom: i < forumTopics.length - 1 ? "1px solid #F3F4F6" : "none",
            cursor: "pointer", transition: "background 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#FAFAFA"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <div style={{
              width: 40, height: 40, borderRadius: 10, flexShrink: 0,
              background: t.hot ? `linear-gradient(135deg, ${C.orange}, ${C.red})` : "#F3F4F6",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: t.hot ? "#fff" : C.muted, fontSize: 16,
            }}>{t.hot ? "🔥" : "💬"}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: C.text, marginBottom: 4 }}>{t.title}</div>
              <div style={{ fontSize: 12, color: C.hint }}>
                Por {t.author} · {t.time} · {t.replies} respuestas
              </div>
            </div>
            {t.hot && (
              <span style={{
                fontSize: 10, fontWeight: 600, color: C.orange,
                background: C.orange + "12", padding: "3px 10px", borderRadius: 20,
                textTransform: "uppercase", letterSpacing: "0.04em",
              }}>Popular</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Certificates View ─── */
function CertsView() {
  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: "0 0 24px" }}>Mis certificados</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {certs.map((cert, i) => (
          <div key={i} style={{
            background: C.card, borderRadius: 14, border: `1px solid ${C.border}`,
            padding: 28, position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: -30, right: -30, width: 120, height: 120,
              borderRadius: "50%", background: C.yellow + "10",
            }} />
            <div style={{ position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <img src="/logo.png" alt="Logo" style={{ height: 32 }} />
                <span style={{
                  fontSize: 11, fontWeight: 600, color: C.orange,
                  letterSpacing: "0.06em", textTransform: "uppercase",
                }}>Colombia Renaciente</span>
              </div>
              <div style={{
                fontSize: 11, color: C.hint, marginBottom: 4,
                textTransform: "uppercase", letterSpacing: "0.08em",
              }}>Certificado de formación</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: C.text, margin: "0 0 4px" }}>{cert.course}</h3>
              <p style={{ fontSize: 13, color: C.muted, margin: "0 0 16px" }}>
                Otorgado a Juan Murillo · {cert.date}
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 11, color: C.hint, fontFamily: "monospace" }}>{cert.code}</span>
                <button style={{
                  background: C.green, color: "#fff", border: "none",
                  padding: "6px 16px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer",
                }}>Descargar PDF</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Admin View ─── */
function AdminView() {
  const adminStats = [
    { label: "Usuarios registrados", val: "2,847" },
    { label: "Cursos publicados", val: "6" },
    { label: "Certificados emitidos", val: "1,234" },
    { label: "Temas en foro", val: "89" },
  ];

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: "0 0 24px" }}>Panel de administración</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28 }}>
        {adminStats.map((s, i) => (
          <div key={i} style={{ background: C.card, borderRadius: 10, padding: 18, border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: C.text }}>{s.val}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Course management */}
        <div style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: C.text, margin: 0 }}>Gestión de cursos</h2>
            <button style={{
              background: C.orange, color: "#fff", border: "none",
              padding: "7px 16px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer",
            }}>+ Nuevo curso</button>
          </div>
          {courses.map((c, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 0", borderBottom: i < courses.length - 1 ? "1px solid #F3F4F6" : "none",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.color }} />
                <span style={{ fontSize: 13, color: C.text }}>{c.title}</span>
              </div>
              <span style={{ fontSize: 12, color: C.hint }}>{c.students} est.</span>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, padding: 22 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: C.text, margin: "0 0 16px" }}>Acciones rápidas</h2>
          {[
            { label: "Crear nuevo curso", desc: "Agrega contenido de formación", color: C.orange },
            { label: "Gestionar usuarios", desc: "Administra militantes y roles", color: C.green },
            { label: "Emitir certificados", desc: "Genera certificados masivos", color: C.blue },
            { label: "Moderar foro", desc: "Revisa publicaciones pendientes", color: C.red },
          ].map((a, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "12px 14px",
              borderRadius: 8, cursor: "pointer", marginBottom: 6, border: `1px solid #F3F4F6`,
              transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#FAFAFA"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <div style={{
                width: 36, height: 36, borderRadius: 8, background: a.color + "12",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: a.color }} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{a.label}</div>
                <div style={{ fontSize: 12, color: C.muted }}>{a.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── App ─── */
export default function App() {
  const [active, setActive] = useState("home");
  const [col, setCol] = useState(false);

  const views = {
    home: <HomeView go={setActive} />,
    courses: <CoursesView />,
    progress: <ProgressView />,
    forum: <ForumView />,
    certs: <CertsView />,
    admin: <AdminView />,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.page }}>
      <Sidebar active={active} setActive={setActive} col={col} setCol={setCol} />
      <main style={{ flex: 1, padding: "28px 36px", minWidth: 0, overflowY: "auto" }}>
        {views[active]}
      </main>
    </div>
  );
}
