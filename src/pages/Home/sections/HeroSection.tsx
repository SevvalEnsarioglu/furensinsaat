import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useLanguage } from '../../../hooks/useLanguage';
import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';
import heroImage from '../../../assets/hero-abstract.png';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !imageRef.current || !overlayRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const ctx = gsap.context(() => {
      // 1. Initial Image Load Sequence
      const tl = gsap.timeline({
        delay: 0.15, // Let page paint first
      });
      
      if (!prefersReducedMotion) {
        tl.fromTo(
          overlayRef.current,
          { autoAlpha: 1 },
          { autoAlpha: 0, duration: 1.2, ease: 'power2.inOut' }
        )
        .fromTo(
          imageRef.current,
          { scale: 1.08 },
          { scale: 1, duration: 1.8, ease: 'power3.out' },
          '<'
        );
      } else {
        gsap.set(overlayRef.current, { autoAlpha: 0 });
      }

      // 2. Parallax on scroll
      if (!prefersReducedMotion) {
        gsap.to(imageRef.current, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });
      }
    }, heroRef);
    
    return () => ctx.revert();
  }, []);

  // Text Reveal Variants
  const textRevealVariants = {
    hidden: { y: '120%', opacity: 0 },
    visible: (custom: number) => ({
      y: '0%',
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.77, 0, 0.175, 1], // Cinematic custom ease
        delay: custom,
      }
    })
  };

  const fadeUpVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: custom,
      }
    })
  };

  return (
    <section ref={heroRef} className="relative h-[calc(100svh-64px)] lg:h-[calc(100svh-72px)] mt-16 lg:mt-[72px] w-full overflow-hidden bg-[var(--background)]">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          ref={imageRef}
          src={heroImage}
          alt="Furens İnşaat Lüks Mimari"
          className="w-full h-full object-cover origin-center"
          loading="eager"
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        
        {/* Initial loading overlay (fades out) */}
        <div ref={overlayRef} className="absolute inset-0 bg-[var(--background)] z-10" />
      </div>

      {/* Content */}
      <Container className="relative z-20 h-full flex flex-col justify-center lg:justify-end pb-8 lg:pb-32">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            className="overflow-hidden mb-4 md:mb-6"
            initial="hidden"
            animate="visible"
            custom={0.45}
            variants={fadeUpVariants}
          >
            <span className="text-xs md:text-sm font-sans font-medium tracking-[0.3em] uppercase text-white/90">
              {t.pages.home.hero.eyebrow}
            </span>
          </motion.div>

          {/* Title */}
          <h1 className="font-display font-light leading-[1.05] tracking-tight mb-6 md:mb-8">
            <div className="overflow-hidden pb-2">
              <motion.div custom={0.6} variants={textRevealVariants} initial="hidden" animate="visible">
                <span className="block text-[clamp(3rem,8vw,8rem)] text-white">
                  {t.pages.home.hero.titleLine1}
                </span>
              </motion.div>
            </div>
            <div className="overflow-hidden pb-2">
              <motion.div custom={0.72} variants={textRevealVariants} initial="hidden" animate="visible">
                <span className="block text-[clamp(3rem,8vw,8rem)] text-white/90">
                  {t.pages.home.hero.titleLine2}
                </span>
              </motion.div>
            </div>
          </h1>

          {/* Description */}
          <motion.p
            className="text-base md:text-lg lg:text-xl text-white/80 max-w-xl mb-10 md:mb-12 font-sans font-light leading-relaxed"
            initial="hidden"
            animate="visible"
            custom={0.9}
            variants={fadeUpVariants}
          >
            {t.pages.home.hero.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial="hidden"
            animate="visible"
            custom={1.05}
            variants={fadeUpVariants}
          >
            <Button 
              variant="primary" 
              size="lg" 
              className="bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] border-none group"
              onClick={() => navigate('/projeler')}
            >
              {t.pages.home.hero.projectsCTA}
              <span className="ml-2 font-light transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/30 text-white hover:bg-white hover:text-black"
              onClick={() => navigate('/kurumsal')}
            >
              {t.pages.home.hero.aboutCTA}
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
