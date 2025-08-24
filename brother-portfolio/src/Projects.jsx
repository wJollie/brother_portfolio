// src/pages/Projects.jsx
import { useMemo, useState } from "react";
import { projects } from "./data/projects";
// at the top of Projects.jsx
import Logo from "./assets/logo.png";


const IconSearch = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
    <circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IconYt = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M23.5 6.2c-.3-1.2-1.2-2.1-2.4-2.4C19 3.3 12 3.3 12 3.3s-7 0-9.1.5C1.7 4.1.8 5 .5 6.2 0 8.3 0 12 0 12s0 3.7.5 5.8c.3 1.2 1.2 2.1 2.4 2.4C5 20.7 12 20.7 12 20.7s7 0 9.1-.5c1.2-.3 2.1-1.2 2.4-2.4.5-2.1.5-5.8.5-5.8s0-3.7-.5-5.8ZM9.6 15.5V8.5l6.4 3.5-6.4 3.5Z"/>
  </svg>
);
const IconClose = (p) => (<svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" {...p}><path d="M18 6 L6 18 M6 6 L18 18"/></svg>);

const ytThumb = (id) => `https://i.ytimg.com/vi/${encodeURIComponent(id)}/hqdefault.jpg`;
const ytEmbed  = (id) => `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0&modestbranding=1&autoplay=1`;

function Badge({ children }) { return <span className="badge">{children}</span>; }

function ImageCarousel({ images, alt }) {
  if (!images?.length) return null;
  return (
    <div className="carousel" aria-label="Project images">
      <div className="carousel-track">
        {images.map((src, i) => (
          <figure className="slide" key={src}>
            <img loading="lazy" src={src} alt={`${alt} — image ${i+1}`} />
          </figure>
        ))}
      </div>
      <div className="dots" role="tablist" aria-label="Image navigation">
        {images.map((_, i) => (
          <a key={i} className="dot" href="#"
             onClick={(e) => {
               e.preventDefault();
               const track = e.currentTarget.closest(".carousel").querySelector(".carousel-track");
               track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
             }}
             aria-label={`Go to image ${i+1}`} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ title, period, summary, software=[], hardware=[], images=[], links=[], youtubeId }) {
  const pics = images.length ? images : (youtubeId ? [ytThumb(youtubeId)] : []);
  return (
    <article className="project-card">
      <ImageCarousel images={pics} alt={title} />
      <div className="project-body">
        <header className="project-head">
          <h3 className="project-title">{title}</h3>
          {period && <span className="period">{period}</span>}
        </header>
        {summary && <p className="summary">{summary}</p>}
        {(software.length || hardware.length) && (
          <div className="tags">
            {software.map((t) => <Badge key={`sw-${t}`}>{t}</Badge>)}
            {hardware.map((t) => <Badge key={`hw-${t}`}>{t}</Badge>)}
          </div>
        )}
        {!!links.length && (
          <div className="links">
            {links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="link-btn">{l.label}</a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  const [openId, setOpenId] = useState(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter(p => {
      const hay = (p.title + " " + (p.summary ?? "")).toLowerCase();
      return !q || hay.includes(q);
    });
  }, [query]);

  return (
    <>
      <div className="nav">
  <div className="container nav-inner">
    <img
      src={Logo}
      alt="RedLavaRhino logo"
      className="brand-logo"
    />
    <a href="#" className="brand-title">Stop-Motion Portfolio</a>
    <div className="spacer" />
    <a className="btn" href="https://www.youtube.com/" target="_blank" rel="noreferrer">
      <IconYt /> YouTube Channel
    </a>
  </div>
</div>



      <section className="hero container fade-up">
        <h1 className="title-accent">Projects</h1>
        <p className="intro">Homemade stop motion animations</p>
      </section>

      <section className="container fade-up" style={{paddingBottom:24}}>
        <div className="controls-card">
          <div className="row" style={{justifyContent:"space-between"}}>
            <label className="input-icon" style={{flex:"1 1 320px"}}>
              <IconSearch/>
              <input className="input" placeholder="Search projects…" value={query} onChange={(e)=>setQuery(e.target.value)} />
            </label>
          </div>
        </div>
      </section>

      <main className="container">
        <div className="projects-grid">
          {filtered.map((p) => <ProjectCard key={p.id} {...p} />)}
        </div>
      </main>

      {/* Example lightbox if you decide to open videos later */}
      {openId && (
        <div className="lightbox" onClick={()=>setOpenId(null)}>
          <div className="lightbox-frame scale-in" onClick={(e)=>e.stopPropagation()}>
            <iframe className="ratio-16x9" src={ytEmbed(openId)} title="YouTube player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
          </div>
          <div className="lightbox-close">
            <button className="btn-ghost" onClick={()=>setOpenId(null)}><IconClose/> Close</button>
          </div>
        </div>
      )}

      <footer className="footer">© {new Date().getFullYear()} Thomas Jollie — Stop-Motion Portfolio.</footer>
    </>
  );
}
