import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const timelineEvents = [
  {
    title: "That moment felt... different",
    description: "I wasn't expecting anything. But something shifted.",
    year: "The beginning"
  },
  {
    title: "I couldn't explain it",
    description: "There was no logic. No reason. Just... a pull.",
    year: "The realization"
  },
  {
    title: "But something changed",
    description: "The way time moved around you. Slower. Louder.",
    year: "The shift"
  },
  {
    title: "Every detail mattered",
    description: "A glance. A laugh. A silence that said everything.",
    year: "The accumulation"
  },
  {
    title: "I started to notice",
    description: "Patterns I never looked for. Meanings I couldn't ignore.",
    year: "The awareness"
  },
  {
    title: "This wasn't planned",
    description: "It wasn't supposed to happen. But it did.",
    year: "The truth"
  }
]

function App() {
  const lenisRef = useRef<Lenis | null>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const personalRef = useRef<HTMLDivElement>(null)
  const transitionRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const [names, setNames] = useState({ name1: 'Elena', name2: 'Alex' })
  const [startDate] = useState(new Date('2024-02-14'))
  const [daysTogether, setDaysTogether] = useState(0)

  useEffect(() => {
    const now = new Date()
    const diff = now.getTime() - startDate.getTime()
    setDaysTogether(Math.floor(diff / (1000 * 60 * 60 * 24)))
  }, [startDate])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!introRef.current || !timelineRef.current || !personalRef.current || !transitionRef.current) return

      const introTexts = introRef.current.querySelectorAll('.intro-text')
      gsap.fromTo(introTexts, 
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 1.5,
          ease: 'power3.out',
          delay: 0.5
        }
      )

      const tlCards = timelineRef.current.querySelectorAll('.timeline-card')
      tlCards.forEach((card, i) => {
        gsap.fromTo(card,
          { 
            opacity: 0, 
            y: 100, 
            rotateY: -5,
            scale: 0.9,
            filter: 'blur(10px)'
          },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 50%',
              toggleActions: 'play none none reverse'
            },
            delay: i * 0.1
          }
        )
      })

      const timelineLines = timelineRef.current.querySelectorAll('.timeline-line')
      timelineLines.forEach((line, i) => {
        gsap.fromTo(line,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

      const timelineDots = timelineRef.current.querySelectorAll('.timeline-dot')
      gsap.fromTo(timelineDots,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.3,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      if (personalRef.current) {
        const personalElements = personalRef.current.querySelectorAll('.personal-item')
        gsap.fromTo(personalElements,
          { opacity: 0, y: 60, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: personalRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      }

      if (transitionRef.current) {
        gsap.fromTo(transitionRef.current.querySelector('.transition-text'),
          { opacity: 0, filter: 'blur(20px)' },
          {
            opacity: 1,
            filter: 'blur(0px)',
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: transitionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse'
            }
          }
        )

        gsap.fromTo(transitionRef.current.querySelector('.transition-overlay'),
          { opacity: 0 },
          {
            opacity: 1,
            duration: 3,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: transitionRef.current,
              start: 'top 40%',
              end: 'bottom 20%',
              scrub: 1
            }
          }
        )
      }

      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          x: 200,
          y: 150,
          duration: 8,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true
        })
      }

    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="relative min-h-[400vh] bg-dark-900 overflow-hidden">
      <div ref={spotlightRef} className="spotlight" style={{ left: '20%', top: '30%' }} />
      <div className="vignette" />

      <section ref={introRef} className="relative min-h-screen flex flex-col items-center justify-center px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 opacity-80" />
        
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <p className="intro-text font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-8 glow-text">
            Wait...
          </p>
          <p className="intro-text font-sans text-lg md:text-xl text-gray-400 mb-12 tracking-wide">
            Don't scroll too fast...
          </p>
          <p className="intro-text font-serif text-2xl md:text-3xl lg:text-4xl text-gray-300 italic">
            Something is about to happen...
          </p>
        </div>

        <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-gray-500 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      <section ref={timelineRef} className="relative min-h-screen py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800/50 to-dark-900" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-4">
              The Story Unfolds
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto" />
          </div>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-purple-500/20 to-transparent timeline-line origin-top" />
            
            {timelineEvents.map((event, index) => (
              <div 
                key={index}
                className="relative mb-16 md:mb-24"
              >
                <div className={`timeline-dot absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50 z-10 ${index % 2 === 0 ? 'md:-translate-x-1/2' : 'md:-translate-x-1/2'}`} 
                     style={{ top: '2rem' }} />
                
                <div className={`timeline-card glass-card p-8 md:p-10 ${index % 2 === 0 ? 'md:ml-auto md:mr-0 md:pr-16' : 'md:ml-0 md:pl-16'}`}
                     style={{ maxWidth: '480px', marginLeft: '4rem', marginRight: index % 2 === 0 ? 'auto' : '0' }}>
                  <span className="text-xs md:text-sm text-purple-400 tracking-widest uppercase mb-4 block">
                    {event.year}
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl text-white mb-4">
                    {event.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={personalRef} className="relative min-h-screen flex items-center justify-center py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800/30 to-dark-900" />
        
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="glass-card-strong p-12 md:p-16">
            <div className="personal-item mb-12">
              <div className="w-20 h-20 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-heart-beat opacity-80" />
                <div className="absolute inset-2 bg-dark-800 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💜</span>
                </div>
              </div>
            </div>

            <div className="personal-item mb-10">
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Since</p>
              <p className="font-serif text-3xl md:text-4xl text-white">
                {startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            <div className="personal-item mb-10">
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Together for</p>
              <p className="font-serif text-5xl md:text-6xl text-gradient glow-text">
                {daysTogether}
              </p>
              <p className="text-gray-400 mt-2">days</p>
            </div>

            <div className="personal-item">
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Two souls connected</p>
              <div className="flex items-center justify-center gap-4">
                <span className="font-serif text-2xl md:text-3xl text-white">{names.name1}</span>
                <span className="text-purple-400 text-2xl">&</span>
                <span className="font-serif text-2xl md:text-3xl text-white">{names.name2}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={transitionRef} className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-black" />
        
        <div className="transition-overlay absolute inset-0 bg-black/60 backdrop-blur-md" />
        
        <div className="relative z-10 text-center px-6">
          <p className="transition-text font-serif text-3xl md:text-5xl lg:text-6xl text-white glow-text">
            Something is about to happen...
          </p>
          <div className="mt-16">
            <div className="w-px h-20 bg-gradient-to-b from-transparent via-purple-500 to-transparent mx-auto" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
