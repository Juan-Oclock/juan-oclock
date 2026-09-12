import Image from 'next/image';
import { PiArrowUpRight } from 'react-icons/pi';
import { projects } from '@/data/projects';

export default function Projects() {
  return (
    <section id="portfolio" className="portfolio content-width section-space" aria-labelledby="portfolio-title">
      <div className="section-heading" data-reveal-group>
        <h2 id="portfolio-title" data-reveal>The side-project shelf.</h2>
        <p data-reveal>A few ideas that made it past “wouldn’t it be cool if…”</p>
      </div>
      <div className="project-grid">
        {projects.map(project => (
          <article className={`project-card project-${project.slug}`} key={project.slug} data-reveal-group data-project-card>
            <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.name} — opens in a new tab`} aria-describedby={`${project.slug}-status ${project.slug}-description`} className="project-link" data-reveal>
              <div className="project-media"><div className="project-media-hover"><div className="project-artwork" data-media-layer>
                {project.images.map((image, i) => (
                  <Image key={`${project.slug}-${i}`} src={image.src} alt={image.alt} width={image.width} height={image.height} className={image.className} sizes="(max-width: 640px) 65vw, (max-width: 900px) 30vw, 320px" />
                ))}
              </div></div></div>
              <div className="project-details">
                <div className="project-title-row"><h3>{project.name}</h3><span id={`${project.slug}-status`} className={`project-status status-${project.status.toLowerCase()}`}><span aria-hidden="true" />{project.status}</span></div>
                <p className="project-category">iOS <span aria-hidden="true">·</span> {project.category}</p>
                <p id={`${project.slug}-description`} className="project-description">{project.description}</p>
                <div className="project-action"><span>{project.domain}</span><span className="arrow-circle"><PiArrowUpRight aria-hidden="true" /></span></div>
              </div>
            </a>
          </article>
        ))}
      </div>
      <div className="upcoming" data-reveal-group><div className="upcoming-inner" data-reveal>
        <span className="upcoming-dot" aria-hidden="true" />
        <div className="upcoming-copy"><h3>Web app</h3><p>Still in the “wouldn’t it be cool if…” phase.</p></div>
        <div className="upcoming-status"><span>Coming soon</span><p>Still cooking.</p></div>
      </div></div>
      <p className="external-note">Project websites open in a new tab.</p>
    </section>
  );
}
