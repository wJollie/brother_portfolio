// src/Pages/Projects.jsx
import { projects } from "./data/projects.js";
import "./index.css";

function Badge({ children }) {
  return <span className="badge">{children}</span>;
}



function ImageCarousel({ images, alt }) {
  if (!images?.length) return null;
  return (
    <div className="carousel" aria-label="Project images">
      <div className="carousel-track">
        {images.map((src, i) => (
          <figure className="slide" key={src}>
            <img loading="lazy" src={src} alt={`${alt} — image ${i + 1}`} />
          </figure>
        ))}
      </div>

      {/* Dots */}
      <div className="dots" role="tablist" aria-label="Image navigation">
        {images.map((_, i) => (
          <a
            key={i}
            className="dot"
            href={`#`}
            onClick={(e) => {
              e.preventDefault();
              const track = e.currentTarget
                .closest(".carousel")
                .querySelector(".carousel-track");
              track.scrollTo({
                left: i * track.clientWidth,
                behavior: "smooth",
              });
            }}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({
  title,
  period,
  repo,
  summary,
  software = [],
  hardware = [],
  images = [],
  links = [],
}) {
  return (
    <article className="project-card">
      <ImageCarousel images={images} alt={title} />

      <div className="project-body">
        <header className="project-head">
          <h3 className="project-title">{title}</h3>
          {period && <span className="period">{period}</span>}
        </header>

        <p className="summary">{summary}</p>

        {(software.length > 0 || hardware.length > 0) && (
          <div className="tags">
            {software.map((t) => (
              <Badge key={`sw-${t}`}>{t}</Badge>
            ))}
            {hardware.map((t) => (
              <Badge key={`hw-${t}`}>{t}</Badge>
            ))}
          </div>
        )}

        <div className="links">
          {repo && (
            <a href={repo} target="_blank" rel="noreferrer" className="link-btn">
              <span>GitHub Repo</span>
            </a>
          )}
          {links.map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="link-btn">
              <span>{l.label}</span>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function App() {
  return (
    <main className="home projects-page">
      <section className="hero">
        <div className="container projects-container">
          <h1>Projects</h1>
          <p className="intro">Homemade stop motion animations</p>

          <div className="projects-grid">
            {projects.map((p) => (<ProjectCard key={p.id} {...p} />))}
          </div>
        </div>
      </section>
    </main>
  );
}
