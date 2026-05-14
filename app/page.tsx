'use client'

import { SignUpButton, SignInButton } from '@clerk/nextjs'
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation'
const NAV_LINKS = ['Features', 'How It Works', 'Pricing', 'Blog'];

const STATS = [
  { value: '50K+', label: 'Teen Learners' },
  { value: '94%', label: 'Completion Rate' },
  { value: '$2.4M', label: 'Saved by Users' },
  { value: '4.9★', label: 'App Store Rating' },
];

const FEATURES = [
  {
    icon: '🌳',
    tag: 'GROWTH ENGINE',
    title: 'Wealth Tree',
    desc: 'Every smart money decision grows your tree — from sapling to ancient oak. Visual progress that actually means something.',
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.07)',
  },
  {
    icon: '🎯',
    tag: 'REAL SCENARIOS',
    title: 'Teen Challenges',
    desc: 'Concert tickets. Phone plans. First car. Learn with situations you actually face — not boring textbook examples.',
    color: '#eab308',
    bg: 'rgba(234,179,8,0.07)',
  },
  {
    icon: '🏆',
    tag: 'REWARD SYSTEM',
    title: 'Level Up & Win',
    desc: 'Badges, leaderboards, and achievements that make financial education genuinely addictive.',
    color: '#f97316',
    bg: 'rgba(249,115,22,0.07)',
  },
  {
    icon: '🧠',
    tag: 'AI POWERED',
    title: 'Smart Coaching',
    desc: 'Personalized paths that adapt to your goals, pace, and learning style. Your own financial mentor.',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.07)',
  },
  {
    icon: '🎓',
    tag: 'Engaging Lessons',
    title: 'Bite Size Understanding',
    desc: 'Its no longer financial giberish, its real, simple —and most imporantly— understandable.',
    color: '#6e4af6',
    bg: 'rgba(230,92,94,0.07)',
  },
  {
    icon: '💼',
    tag: 'Application',
    title: 'Apply Your Knowlege',
    desc: 'Not only do you learn about money, you learn how to make money thanks to our beginner friendly investment simulator.',
    color: '#3e4ae4',
    bg: 'rgba(150,67,23,0.07)',
  },
];

const STEPS = [
  { n: '01', title: 'Set Your Goals', body: 'Tell us what you\'re saving for — concert, college, car. We build your personalized roadmap.', icon: '🎯' },
  { n: '02', title: 'Take on Challenges', body: 'Bite-sized, real-world scenarios. Learn budgeting, saving, and investing through play.', icon: '📚' },
  { n: '03', title: 'Watch Progress Grow', body: 'Your wealth tree flourishes. Unlock levels, earn badges, build your virtual city.', icon: '🌳' },
  { n: '04', title: 'Win in Real Life', body: 'Translate skills into actual decisions. Build wealth habits that compound over time.', icon: '💰' },
];

function FloatingOrb({ style }) {
  return (
    <div style={{
      position: 'absolute',
      borderRadius: '50%',
      filter: 'blur(80px)',
      pointerEvents: 'none',
      ...style,
    }} />
  );
}

function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const num = parseFloat(target.replace(/[^0-9.]/g, ''));
        const duration = 1600;
        const steps = 60;
        let current = 0;
        const timer = setInterval(() => {
          current++;
          setCount(Math.round((num * current) / steps * 10) / 10);
          if (current >= steps) clearInterval(timer);
        }, duration / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function WealthWise() {
  
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()
  
  // Redirect to dashboard if already signed in
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/dashboard')
    }
  }, [isLoaded, isSignedIn, router])

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: '#0a0f0a', color: '#f0f4f0', overflowX: 'hidden' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,400&family=DM+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .ww-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          transition: all 0.4s ease;
          padding: 24px 40px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .ww-nav.scrolled {
          background: rgba(10,15,10,0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 16px 40px;
        }
        .ww-logo {
          font-family: 'Fraunces', serif;
          font-size: 22px;
          font-weight: 900;
          background: linear-gradient(135deg, #4ade80, #fbbf24);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.5px;
        }
        .ww-nav-links {
          display: flex; gap: 36px; list-style: none;
        }
        .ww-nav-links a {
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          color: rgba(240,244,240,0.55);
          text-decoration: none;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .ww-nav-links a:hover { color: #4ade80; }

        .ww-btn-primary {
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.05em;
          padding: 12px 28px;
          background: linear-gradient(135deg, #22c55e, #eab308);
          color: #0a0f0a;
          border: none;
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.25s;
          text-transform: uppercase;
        }
        .ww-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 40px rgba(34,197,94,0.35);
        }
        .ww-btn-ghost {
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.05em;
          padding: 11px 28px;
          background: transparent;
          color: rgba(240,244,240,0.7);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.25s;
          text-transform: uppercase;
        }
        .ww-btn-ghost:hover {
          border-color: rgba(74,222,128,0.5);
          color: #4ade80;
          transform: translateY(-2px);
        }

        .hero-tag {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #4ade80;
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.25);
          border-radius: 100px;
          padding: 7px 18px;
          display: inline-block;
          margin-bottom: 28px;
        }

        .hero-headline {
          font-family: 'Fraunces', serif;
          font-size: clamp(52px, 8vw, 110px);
          font-weight: 900;
          line-height: 0.92;
          letter-spacing: -3px;
          margin-bottom: 28px;
        }
        .hero-headline .accent {
          font-style: italic;
          font-weight: 300;
          background: linear-gradient(135deg, #4ade80, #fbbf24);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: block;
        }

        .hero-sub {
          font-size: 18px;
          line-height: 1.65;
          color: rgba(240,244,240,0.55);
          max-width: 460px;
          margin-bottom: 44px;
          font-family: 'Georgia', serif;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          opacity: 0.4;
          animation: bounce 2s ease-in-out infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        .scroll-indicator span {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(240,244,240,0.5);
        }

        .stats-bar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .stat-item {
          padding: 36px 20px;
          text-align: center;
          border-right: 1px solid rgba(255,255,255,0.06);
          transition: background 0.3s;
        }
        .stat-item:last-child { border-right: none; }
        .stat-item:hover { background: rgba(255,255,255,0.025); }
        .stat-value {
          font-family: 'Fraunces', serif;
          font-size: 40px;
          font-weight: 900;
          background: linear-gradient(135deg, #4ade80, #fbbf24);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 6px;
        }
        .stat-label {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(240,244,240,0.4);
        }

        .section-tag {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(240,244,240,0.3);
          margin-bottom: 16px;
        }
        .section-title {
          font-family: 'Fraunces', serif;
          font-size: clamp(36px, 5vw, 62px);
          font-weight: 900;
          line-height: 1.0;
          letter-spacing: -2px;
          margin-bottom: 20px;
        }
        .section-sub {
          font-size: 17px;
          color: rgba(240,244,240,0.5);
          line-height: 1.6;
          max-width: 480px;
        }

        .feature-card {
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 36px;
          transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          border-radius: 20px;
          opacity: 0;
          transition: opacity 0.35s;
        }
        .feature-card:hover {
          transform: translateY(-6px);
          border-color: rgba(255,255,255,0.14);
        }
        .feature-card:hover::before { opacity: 1; }

        .feature-tag {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 20px;
          display: inline-block;
          padding: 4px 12px;
          border-radius: 100px;
        }
        .feature-icon {
          font-size: 44px;
          margin-bottom: 20px;
          display: block;
          line-height: 1;
        }
        .feature-title {
          font-family: 'Fraunces', serif;
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }
        .feature-desc {
          font-size: 15px;
          line-height: 1.65;
          color: rgba(240,244,240,0.5);
        }

        .step-number {
          font-family: 'Fraunces', serif;
          font-size: 80px;
          font-weight: 900;
          line-height: 1;
          background: linear-gradient(135deg, rgba(74,222,128,0.15), rgba(251,191,36,0.15));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -4px;
        }
        .step-card {
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 40px 36px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s;
        }
        .step-card:hover {
          border-color: rgba(74,222,128,0.2);
          background: rgba(74,222,128,0.03);
          transform: translateY(-4px);
        }
        .step-title {
          font-family: 'Fraunces', serif;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 10px;
          letter-spacing: -0.5px;
        }
        .step-body {
          font-size: 15px;
          line-height: 1.65;
          color: rgba(240,244,240,0.5);
        }

        .cta-section {
          position: relative;
          overflow: hidden;
          padding: 120px 40px;
          text-align: center;
        }
        .cta-big {
          font-family: 'Fraunces', serif;
          font-size: clamp(44px, 7vw, 90px);
          font-weight: 900;
          line-height: 0.95;
          letter-spacing: -3px;
          margin-bottom: 28px;
        }
        .cta-big .italic {
          font-style: italic;
          font-weight: 300;
        }

        .footer-brand {
          font-family: 'Fraunces', serif;
          font-size: 26px;
          font-weight: 900;
          background: linear-gradient(135deg, #4ade80, #fbbf24);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .footer-link {
          color: rgba(240,244,240,0.35);
          text-decoration: none;
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.05em;
          transition: color 0.2s;
        }
        .footer-link:hover { color: #4ade80; }

        .divider-line {
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,0.06);
        }

        @media (max-width: 768px) {
          .ww-nav { padding: 20px 24px; }
          .ww-nav.scrolled { padding: 14px 24px; }
          .ww-nav-links { display: none; }
          .stats-bar { grid-template-columns: repeat(2, 1fr); }
          .stat-item:nth-child(2) { border-right: none; }
          .stat-item:nth-child(3) { border-right: 1px solid rgba(255,255,255,0.06); }
          .steps-grid { grid-template-columns: 1fr !important; }
          .features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`ww-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="ww-logo">WealthWise</div>
        <ul className="ww-nav-links">
          {NAV_LINKS.map(l => (
            <li key={l}><a href="#">{l}</a></li>
          ))}
        </ul>
        <div style={{ display: 'flex', gap: 12 }}>
          <SignInButton mode="modal">
            <button className="ww-btn-ghost">Log in</button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="ww-btn-primary">Get Started</button>
          </SignUpButton>
        </div>
      </nav>

      {/* HERO */}    
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '120px 40px 80px', overflow: 'hidden' }}>
        <FloatingOrb style={{ width: 600, height: 600, background: 'radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)', top: -100, left: -200 }} />
        <FloatingOrb style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(234,179,8,0.1) 0%, transparent 70%)', top: 100, right: -150 }} />
        <FloatingOrb style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)', bottom: 0, left: '40%' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div className="hero-tag">🌱 Financial Education, Reinvented</div>
            <h1 className="hero-headline">
              Master
              <span className="accent">Money</span>
              Now.
            </h1>
            <p className="hero-sub">
              Interactive challenges designed for teens who want real financial skills — not boring lectures. Build wealth habits that actually stick.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <SignUpButton mode="modal">
                <button className="ww-btn-primary" style={{ fontSize: 14, padding: '14px 32px' }}>Start Learning Free</button>
              </SignUpButton>
              <button className="ww-btn-ghost" style={{ fontSize: 14, padding: '14px 32px' }}>See How It Works</button>
            </div>

            <div style={{ marginTop: 52, display: 'flex', gap: 32 }}>
              {[['50K+', 'learners'], ['4.9★', 'rated'], ['Free', 'to start']].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 900, color: '#4ade80' }}>{v}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(240,244,240,0.35)', marginTop: 3 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              width: 380, height: 380,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 40% 40%, rgba(34,197,94,0.15), rgba(234,179,8,0.08) 60%, transparent)',
              border: '1px solid rgba(74,222,128,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 120,
              position: 'relative',
              animation: 'float 6s ease-in-out infinite',
            }}>
              <style>{`@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }`}</style>
              🌳
              {/* Orbiting badges */}
              {[
                { icon: '💰', label: '+$120 saved', top: '8%', right: '-5%', delay: '0s' },
                { icon: '🏆', label: 'Level 7!', bottom: '15%', right: '-8%', delay: '0.8s' },
                { icon: '🎯', label: 'Goal hit!', bottom: '12%', left: '-8%', delay: '1.6s' },
                { icon: '⚡', label: '5-day streak', top: '20%', left: '-6%', delay: '2.4s' },
              ].map(({ icon, label, delay, ...pos }) => (
                <div key={label} style={{
                  position: 'absolute', ...pos,
                  background: 'rgba(15,20,15,0.9)',
                  border: '1px solid rgba(74,222,128,0.25)',
                  borderRadius: 12,
                  padding: '8px 14px',
                  display: 'flex', alignItems: 'center', gap: 8,
                  backdropFilter: 'blur(12px)',
                  animation: `float 6s ease-in-out infinite`,
                  animationDelay: delay,
                  whiteSpace: 'nowrap',
                  zIndex: 2,
                }}>
                  <span style={{ fontSize: 18 }}>{icon}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: '#4ade80', fontWeight: 500 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <span>Scroll</span>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(74,222,128,0.5), transparent)' }} />
        </div>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        {STATS.map(({ value, label }) => (
          <div className="stat-item" key={label}>
            <div className="stat-value">
              {label === 'App Store Rating' ? '4.9★' : label === 'Completion Rate' ? <><Counter target="94" suffix="%" /></> : label === 'Teen Learners' ? '50K+' : '$2.4M'}
            </div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <section style={{ padding: '120px 40px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start', marginBottom: 64 }}>
          <div>
            <div className="section-tag">/ Why WealthWise</div>
            <h2 className="section-title">Built for<br /><em style={{ fontWeight: 300 }}>real teens.</em></h2>
          </div>
          <div style={{ paddingTop: 16 }}>
            <p className="section-sub">Financial literacy made visceral, interactive, and actually relevant to your life right now.</p>
          </div>
        </div>

        <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {FEATURES.map(({ icon, tag, title, desc, color, bg }) => (
            <div key={title} className="feature-card" style={{ background: bg }}>
              <span className="feature-icon">{icon}</span>
              <span className="feature-tag" style={{ color, background: `${color}15`, border: `1px solid ${color}30` }}>{tag}</span>
              <h3 className="feature-title">{title}</h3>
              <p className="feature-desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider-line" />

      {/* HOW IT WORKS */}
      <section style={{ padding: '120px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div className="section-tag">/ How It Works</div>
            <h2 className="section-title">Four steps to<br /><em style={{ fontWeight: 300 }}>financial freedom.</em></h2>
          </div>

          <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {STEPS.map(({ n, title, body, icon }) => (
              <div key={n} className="step-card">
                <div className="step-number">{n}</div>
                <div style={{ fontSize: 32, margin: '8px 0 16px' }}>{icon}</div>
                <h3 className="step-title">{title}</h3>
                <p className="step-body">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL STRIP */}
      <div style={{ background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.1)', borderLeft: 'none', borderRight: 'none', padding: '60px 40px', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
          {[
            { q: 'Saved $800 in three months using the budgeting challenges. Never thought I\'d enjoy learning about money.', name: 'Maya R., 16', loc: 'Austin, TX' },
            { q: 'The tree growing thing is weirdly satisfying. I check it every day and it keeps me on track.', name: 'Jordan K., 17', loc: 'Chicago, IL' },
            { q: 'My parents were shocked when I knew more about compound interest than they did. WealthWise does that.', name: 'Alex T., 15', loc: 'Seattle, WA' },
          ].map(({ q, name, loc }) => (
            <div key={name}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 72, color: 'rgba(74,222,128,0.2)', lineHeight: 0.8, marginBottom: 16 }}>"</div>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: 'rgba(240,244,240,0.65)', fontStyle: 'italic', marginBottom: 20, fontFamily: "'Georgia', serif" }}>{q}</p>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: '#4ade80' }}>{name}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'rgba(240,244,240,0.3)', marginTop: 4 }}>{loc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA SECTION */}
      <section className="cta-section">
        <FloatingOrb style={{ width: 700, height: 700, background: 'radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 65%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto' }}>
          <div className="section-tag" style={{ textAlign: 'center', marginBottom: 24 }}>/ Start Today</div>
          <h2 className="cta-big">
            Your wealth<br />
            <span className="italic">story starts</span><br />
            right now.
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(240,244,240,0.45)', marginBottom: 44, maxWidth: 460, margin: '0 auto 44px', fontFamily: "'Georgia', serif", lineHeight: 1.65 }}>
            Join 50,000+ teens already building smarter money habits. Free to start. No credit card needed.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <SignUpButton mode="modal">
              <button className="ww-btn-primary" style={{ fontSize: 15, padding: '16px 40px' }}>Start Learning Free →</button>
            </SignUpButton>
            <button className="ww-btn-ghost" style={{ fontSize: 15, padding: '15px 40px' }}>Watch Demo</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '64px 40px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 60, marginBottom: 60 }}>
            <div>
              <div className="footer-brand" style={{ marginBottom: 16 }}>WealthWise</div>
              <p style={{ fontFamily: "'Georgia', serif", fontSize: 14, color: 'rgba(240,244,240,0.35)', lineHeight: 1.75, maxWidth: 280 }}>
                Empowering the next generation with financial wisdom through gamified, real-world learning.
              </p>
              <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
                {['📘', '🐦', '📸'].map(icon => (
                  <a key={icon} href="#" style={{ fontSize: 20, opacity: 0.4, transition: 'opacity 0.2s' }}
                    onMouseEnter={e => e.target.style.opacity = 1}
                    onMouseLeave={e => e.target.style.opacity = 0.4}>
                    {icon}
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: 'Product', links: ['Features', 'How It Works', 'Pricing', 'Roadmap'] },
              { title: 'Company', links: ['About Us', 'Blog', 'Careers', 'Press'] },
              { title: 'Legal', links: ['Help Center', 'Contact', 'Privacy', 'Terms'] },
            ].map(({ title, links }) => (
              <div key={title}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(240,244,240,0.3)', marginBottom: 20 }}>{title}</div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {links.map(l => <li key={l}><a href="#" className="footer-link">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'rgba(240,244,240,0.25)', letterSpacing: '0.05em' }}>
              © 2025 WEALTHWISE · ALL RIGHTS RESERVED
            </p>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'rgba(240,244,240,0.25)', letterSpacing: '0.05em' }}>
              MADE WITH 💚 FOR THE NEXT GENERATION
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}

