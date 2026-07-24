import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../../hooks/useLanguage';
import Container from '../../../components/common/Container';
import RevealImage from '../components/RevealImage';
import { projects } from '../../../data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProjectsSection() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

  const getProjectClasses = (index: number) => {
    switch (index) {
      case 0:
        return 'w-full md:w-[85%] mr-auto mt-12 md:mt-16';
      case 1:
        return 'w-full md:w-[65%] ml-auto mt-24 md:mt-40';
      case 2:
        return 'w-full md:w-[75%] mr-auto mt-24 md:mt-32';
      default:
        return 'w-full md:w-[70%] ml-auto mt-24 md:mt-32';
    }
  };

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[var(--background)] relative z-10">
      <Container>
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10 md:mb-20">
          <div>
            <span className="text-xs font-sans font-medium tracking-[0.2em] text-[var(--primary)] uppercase block mb-4">
              {t.pages.home.projects.label}
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[var(--foreground)] max-w-lg leading-tight">
              {t.pages.home.projects.title}
            </h2>
          </div>
          <p className="text-[var(--foreground-secondary)] max-w-sm md:text-right font-light leading-relaxed">
            {t.pages.home.projects.description}
          </p>
        </div>

        {/* Projects List */}
        <div className="flex flex-col">
          {featuredProjects.map((project, i) => (
            <div key={project.id} className={getProjectClasses(i)}>
              <Link to={`/projeler/${project.slug}`} className="group block cursor-pointer outline-none">
                <RevealImage 
                  src={project.coverImage} 
                  alt={project.title}
                  aspectRatio={i === 1 ? 'aspect-square md:aspect-[4/5]' : 'aspect-[4/3] md:aspect-[16/9]'}
                  parallaxStrength={0.06}
                  className="rounded-sm"
                />
                
                {/* Project Meta */}
                <div className="mt-6 md:mt-8 flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl text-[var(--foreground)] transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] md:group-hover:translate-x-2">
                      {project.title}
                    </h3>
                    <p className="text-[var(--muted)] mt-2 font-light text-sm md:text-base">
                      {project.category} / {project.location} — {project.year}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 overflow-hidden pt-2 md:pt-1">
                    <span className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--foreground)] md:opacity-0 md:-translate-x-4 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] md:group-hover:opacity-100 md:group-hover:translate-x-0">
                      {t.pages.home.projects.viewProject}
                    </span>
                    <span className="text-[var(--foreground)] transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] md:group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        {/* View All CTA */}
        <div className="mt-24 md:mt-40 flex justify-center">
           <button 
             onClick={() => navigate('/projeler')}
             className="group relative inline-flex items-center justify-center w-32 h-32 md:w-44 md:h-44 rounded-full border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors duration-500"
             aria-label={t.common.viewAll}
           >
             <span className="text-xs md:text-sm tracking-widest uppercase font-medium">
               {t.common.viewAll}
             </span>
           </button>
        </div>
      </Container>
    </section>
  );
}
