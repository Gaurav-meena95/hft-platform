import React, { useEffect, useRef } from 'react';
import logo from './assets/orion.png';

const App = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // ---- CURSOR ----
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;
    
    const handleMouseMove = (e) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener('mousemove', handleMouseMove);
    
    let animId;
    const animCursor = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      if (cursor) {
        cursor.style.left = mx + 'px';
        cursor.style.top = my + 'px';
      }
      if (ring) {
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
      }
      animId = requestAnimationFrame(animCursor);
    };
    animCursor();

    const interactables = document.querySelectorAll('a, button, .theme-toggle, .strategy-item');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => { if(ring) { ring.style.width = '60px'; ring.style.height = '60px'; ring.style.opacity = '0.3'; } });
      el.addEventListener('mouseleave', () => { if(ring) { ring.style.width = '36px'; ring.style.height = '36px'; ring.style.opacity = '0.5'; } });
    });

    // ---- THEME TOGGLE ----
    // Removed as per request

    // ---- NAV SCROLL ----
    const nav = document.getElementById('nav');
    const handleScroll = () => {
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
      
      const scroll = window.scrollY;
      const bh = document.querySelector('.hero-blackhole');
      if (bh) {
        const scale = 1 + scroll * 0.0003;
        const opacity = 1 - scroll * 0.0015;
        bh.style.transform = `translate(-50%, -50%) scale(${scale})`;
        bh.style.opacity = Math.max(0, opacity);
      }
      const heroContent = document.querySelector('.hero-content');
      if (heroContent) {
        heroContent.style.transform = `translateY(${scroll * 0.12}px)`;
        heroContent.style.opacity = 1 - scroll * 0.002;
      }
    };
    window.addEventListener('scroll', handleScroll);

    // ---- CANVAS STARS + GRAVITY ----
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, stars = [], mouseXPos = 0.5, mouseYPos = 0.5;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const count = Math.floor(W * H / 2800);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random(), y: Math.random(),
          ox: Math.random(), oy: Math.random(),
          size: Math.random() * 1.8 + 0.2,
          opacity: Math.random() * 0.7 + 0.1,
          twinkle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.002 + 0.0005
        });
      }
    };

    const handleCanvasMouseMove = (e) => {
      mouseXPos = e.clientX / W;
      mouseYPos = e.clientY / H;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleCanvasMouseMove);
    resize();

    let canvasAnimId;
    const drawCanvas = () => {
      ctx.clearRect(0, 0, W, H);
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

      const cx = W * 0.5, cy = H * 0.38;
      const grd1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.45);
      grd1.addColorStop(0, isDark ? 'rgba(74,143,255,0.06)' : 'rgba(26,95,212,0.04)');
      grd1.addColorStop(0.5, isDark ? 'rgba(200,169,110,0.04)' : 'rgba(139,106,46,0.03)');
      grd1.addColorStop(1, 'transparent');
      ctx.fillStyle = grd1;
      ctx.fillRect(0, 0, W, H);

      const nx = W * (0.3 + mouseXPos * 0.4);
      const ny = H * (0.2 + mouseYPos * 0.3);
      const grd2 = ctx.createRadialGradient(nx, ny, 0, nx, ny, W * 0.3);
      grd2.addColorStop(0, isDark ? 'rgba(200,169,110,0.04)' : 'rgba(139,106,46,0.025)');
      grd2.addColorStop(1, 'transparent');
      ctx.fillStyle = grd2;
      ctx.fillRect(0, 0, W, H);

      const scrollPercent = window.scrollY / (document.body.scrollHeight - H);
      stars.forEach(s => {
        s.twinkle += s.speed * 60;
        const tw = Math.sin(s.twinkle) * 0.4 + 0.6;
        const bhY = 0.38 - scrollPercent * 0.2;
        const dx = 0.5 - s.x;
        const dy = bhY - s.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const pull = Math.max(0, 0.04 - dist) * 0.4;
        const px = s.ox + (0.5 - s.ox) * pull + (mouseXPos - 0.5) * 0.015;
        const py = s.oy + (bhY - s.oy) * pull * 2 + (mouseYPos - 0.5) * 0.015;
        s.x += (px - s.x) * 0.005;
        s.y += (py - s.y) * 0.005;

        const alpha = s.opacity * tw * (isDark ? 1 : 0.6);
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${isDark ? '240,237,232' : '26,23,20'},${alpha})`;
        ctx.fill();

        if (s.size > 1.5) {
          ctx.beginPath();
          ctx.arc(s.x * W, s.y * H, s.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${isDark ? '200,169,110' : '139,106,46'},${alpha * 0.15})`;
          ctx.fill();
        }
      });
      canvasAnimId = requestAnimationFrame(drawCanvas);
    };
    drawCanvas();

    // ---- 3D CARD TILT ----
    const card3d = document.getElementById('card3d');
    const handleCardTilt = (e) => {
      const rect = card3d.parentElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
      card3d.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    };
    const resetCardTilt = () => {
      card3d.style.transform = 'rotateY(0) rotateX(0)';
      card3d.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
    };
    const startCardTilt = () => {
      card3d.style.transition = 'transform 0.1s';
    };
    if (card3d) {
      card3d.parentElement.addEventListener('mousemove', handleCardTilt);
      card3d.parentElement.addEventListener('mouseleave', resetCardTilt);
      card3d.parentElement.addEventListener('mouseenter', startCardTilt);
    }

    const stratCard = document.getElementById('stratCard');
    const handleStratCardMove = (e) => {
      const r = stratCard.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width * 100).toFixed(1);
      const y = ((e.clientY - r.top) / r.height * 100).toFixed(1);
      stratCard.style.setProperty('--mx', x + '%');
      stratCard.style.setProperty('--my', y + '%');
    };
    if (stratCard) stratCard.addEventListener('mousemove', handleStratCardMove);

    // ---- SCROLL REVEAL ----
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // ---- COUNTER ANIMATION ----
    const animateCounters = () => {
      document.querySelectorAll('[data-count]').forEach(el => {
        const target = parseFloat(el.getAttribute('data-count'));
        const isFloat = String(target).includes('.');
        const decimals = isFloat ? (String(target).split('.')[1] || '').length : 0;
        let startTs = null;
        const duration = 1800;
        const step = (ts) => {
          if (!startTs) startTs = ts;
          const progress = Math.min((ts - startTs) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const val = (eased * target).toFixed(decimals);
          el.textContent = val;
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = target;
        };
        const obs = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting) { requestAnimationFrame(step); obs.disconnect(); }
        }, { threshold: 0.5 });
        obs.observe(el);
      });
      document.querySelectorAll('[data-text]').forEach(el => {
        const target = el.getAttribute('data-text');
        const obs = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting) {
            setTimeout(() => { el.textContent = target; }, 600);
            obs.disconnect();
          }
        }, { threshold: 0.5 });
        obs.observe(el);
      });
    };
    animateCounters();

    // ---- PERFORMANCE CHART ----
    const drawChart = () => {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      const gridColor = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)';
      document.querySelectorAll('.chart-svg line').forEach(l => l.setAttribute('stroke', gridColor));
      document.querySelectorAll('.chart-svg text').forEach(t =>
        t.setAttribute('fill', isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)')
      );

      const pts = 80;
      const W_chart = 500, H_chart = 180;
      let oqVal = H_chart * 0.88, spVal = H_chart * 0.88;
      const oqPts = [[0, oqVal]], spPts = [[0, spVal]];
      for (let i = 1; i < pts; i++) {
        const t = i / (pts - 1);
        oqVal -= (1.8 + Math.sin(i * 0.3) * 0.3 + Math.random() * 0.5 - 0.1) * (H_chart * 0.7 / pts);
        spVal -= (1.1 + Math.sin(i * 0.5) * 0.8 + Math.random() * 1.5 - 0.6) * (H_chart * 0.5 / pts);
        oqVal = Math.max(8, Math.min(H_chart - 4, oqVal));
        spVal = Math.max(8, Math.min(H_chart - 4, spVal));
        const x = (i / (pts - 1)) * W_chart;
        oqPts.push([x, oqVal]);
        spPts.push([x, spVal]);
      }

      const toPath = pts_arr => pts_arr.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
      const toFill = pts_arr => toPath(pts_arr) + ` L${pts_arr[pts_arr.length-1][0]},${H_chart} L0,${H_chart} Z`;

      const oqLine = document.getElementById('oqLine');
      const spLine = document.getElementById('spLine');
      const oqFill = document.getElementById('oqFill');
      const spFill = document.getElementById('spFill');

      if(oqLine) oqLine.setAttribute('d', toPath(oqPts));
      if(spLine) spLine.setAttribute('d', toPath(spPts));
      if(oqFill) oqFill.setAttribute('d', toFill(oqPts));
      if(spFill) spFill.setAttribute('d', toFill(spPts));

      const svgDefs = document.querySelector('.chart-svg defs');
      if (svgDefs && !svgDefs.querySelector('#lineGradLight')) {
        const lg1 = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        lg1.setAttribute('id', 'lineGradLight');
        lg1.setAttribute('x1', '0'); lg1.setAttribute('y1', '0');
        lg1.setAttribute('x2', '0'); lg1.setAttribute('y2', '1');
        lg1.innerHTML = '<stop offset="0%" stop-color="#8b6a2e" stop-opacity="0.25"/><stop offset="100%" stop-color="#8b6a2e" stop-opacity="0"/>';
        const lg2 = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        lg2.setAttribute('id', 'spGradLight');
        lg2.setAttribute('x1', '0'); lg2.setAttribute('y1', '0');
        lg2.setAttribute('x2', '0'); lg2.setAttribute('y2', '1');
        lg2.innerHTML = '<stop offset="0%" stop-color="#1a5fd4" stop-opacity="0.12"/><stop offset="100%" stop-color="#1a5fd4" stop-opacity="0"/>';
        svgDefs.appendChild(lg1);
        svgDefs.appendChild(lg2);
      }

      if (!isDark) {
        if(oqLine) oqLine.setAttribute('stroke', '#8b6a2e');
        if(spLine) spLine.setAttribute('stroke', '#1a5fd4');
        if(oqFill) oqFill.setAttribute('fill', 'url(#lineGradLight)');
        if(spFill) spFill.setAttribute('fill', 'url(#spGradLight)');
      } else {
        if(oqLine) oqLine.setAttribute('stroke', '#c8a96e');
        if(spLine) spLine.setAttribute('stroke', '#4a8fff');
        if(oqFill) oqFill.setAttribute('fill', 'url(#lineGrad)');
        if(spFill) spFill.setAttribute('fill', 'url(#spGrad)');
      }
    };
    drawChart();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleCanvasMouseMove);
      cancelAnimationFrame(canvasAnimId);
      if (card3d) {
        card3d.parentElement.removeEventListener('mousemove', handleCardTilt);
        card3d.parentElement.removeEventListener('mouseleave', resetCardTilt);
        card3d.parentElement.removeEventListener('mouseenter', startCardTilt);
      }
      if (stratCard) stratCard.removeEventListener('mousemove', handleStratCardMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="app-container">
      <canvas id="bgCanvas" ref={canvasRef}></canvas>
      <div className="cursor" id="cursor"></div>
      <div className="cursor-ring" id="cursorRing"></div>

      {/* NAV */}
      <nav id="nav">
        <a href="#" className="nav-logo flex items-center group">
          <div className="flex items-center w-auto h-auto">
            <img 
              src={logo} 
              alt="Orion Logo" 
              className="h-28 md:h-36 w-auto object-contain filter drop-shadow-[0_0_15px_rgba(200,169,110,0.5)] group-hover:drop-shadow-[0_0_25px_rgba(200,169,110,0.7)] transition-all duration-500 transform group-hover:scale-105" 
            />
          </div>
        </a>
        <ul className="nav-links">
          <li><a href="#strategy">Strategy</a></li>
          <li><a href="#performance">Performance</a></li>
          <li><a href="#philosophy">Philosophy</a></li>
          <li><a href="#team">Team</a></li>
        </ul>
        <div className="nav-right">
          <a href="#contact" className="nav-cta">Investor Relations</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-blackhole">
          <div className="bh-accretion"></div>
          <div className="bh-accretion-2"></div>
          <div className="bh-ring bh-ring-1"></div>
          <div className="bh-ring bh-ring-2"></div>
          <div className="bh-ring bh-ring-3"></div>
          <div className="bh-core"></div>
          <div className="bh-lens"></div>
        </div>
        <div className="hero-content">
          <div className="hero-eyebrow">Quantitative · Systematic · Absolute Return</div>
          <h1 className="hero-title">
            Where <em>Mathematics</em><br />Meets the Universe
          </h1>
          <p className="hero-sub">
            Orion Quant harnesses the gravitational pull of data — bending probability,<br />
            collapsing inefficiency, and generating returns across all market regimes.
          </p>
          <div className="hero-actions">
            <a href="#strategy" className="btn-primary">Explore Strategy</a>
            <a href="#performance" className="btn-ghost">View Performance</a>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* METRICS BAND */}
      <div className="metrics-band">
        <div className="metric reveal">
          <span className="metric-value" data-count="32.4">0</span>
          <span className="metric-label">Annualized Return %</span>
        </div>
        <div className="metric reveal reveal-delay-1">
          <span className="metric-value" data-count="0.94">0</span>
          <span className="metric-label">Sharpe Ratio</span>
        </div>
        <div className="metric reveal reveal-delay-2">
          <span className="metric-value" data-text="$4.2B">$0</span>
          <span className="metric-label">AUM</span>
        </div>
        <div className="metric reveal reveal-delay-3">
          <span className="metric-value" data-count="12">0</span>
          <span className="metric-label">Years of Alpha</span>
        </div>
      </div>

      {/* STRATEGY INTRO */}
      <section className="scroll-section" id="strategy">
        <div className="scroll-section-inner">
          <div className="strategy-grid">
            <div className="strategy-left">
              <span className="section-tag reveal">01 — Our Approach</span>
              <h2 className="section-title reveal reveal-delay-1">
                Gravity-driven<br />quantitative<br />alpha
              </h2>
              <p className="section-body reveal reveal-delay-2">
                Like a black hole bending spacetime, our algorithms bend the fabric of financial markets — finding signal in noise, extracting value from asymmetry, and capturing returns invisible to conventional analysis.
              </p>
              <a href="#" className="btn-ghost reveal reveal-delay-3">Download Fact Sheet</a>
            </div>
            <div className="strategy-right reveal reveal-delay-2">
              <div className="card-3d-container" id="card3d">
                <div className="strategy-card" id="stratCard">
                  <div className="card-orbit">
                    <div className="orbit-ring"></div>
                    <div className="orbit-ring orbit-ring-2"></div>
                    <div className="orbit-ring orbit-ring-3"></div>
                    <div className="orbit-center"></div>
                    <div className="orbit-dot"></div>
                  </div>
                  <h3>Singularity Model™️</h3>
                  <p>Our proprietary multi-factor model identifies gravitational inflection points in price structure — moments where probability density collapses into tradeable opportunity.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STRATEGIES */}
      <section className="strategies-section" id="strategies">
        <div className="strategies-header">
          <span className="section-tag reveal" style={{ display: 'block', textAlign: 'center', fontFamily: "'DM Mono',monospace", fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '20px' }}>02 — Strategy Suite</span>
          <h2 className="section-title reveal reveal-delay-1">Four vectors.<br />One gravitational force.</h2>
        </div>
        <div className="strategies-list">
          <div className="strategy-item reveal">
            <span className="strategy-num">001</span>
            <h3>Statistical Arbitrage</h3>
            <p>Mean-reversion strategies exploiting temporary deviations in correlated assets. Machine learning models trained on 20+ years of cross-asset microstructure data.</p>
          </div>
          <div className="strategy-item reveal reveal-delay-1">
            <span className="strategy-num">002</span>
            <h3>Options Alpha</h3>
            <p>Volatility surface arbitrage and dynamic delta-neutral structures that harvest risk premia across the options term structure.</p>
          </div>
          <div className="strategy-item reveal reveal-delay-2">
            <span className="strategy-num">003</span>
            <h3>Alternative Data</h3>
            <p>Satellite imagery, web scraping, sentiment NLP, and supply chain analytics feed real-time signals into our ensemble alpha engine.</p>
          </div>
          <div className="strategy-item reveal reveal-delay-3">
            <span className="strategy-num">004</span>
            <h3>Crypto Alpha</h3>
            <p>Market-neutral strategies across digital asset ecosystems — funding rate harvesting, on-chain analytics, and cross-exchange arbitrage.</p>
          </div>
        </div>

      </section>

      {/* PERFORMANCE */}
      <section className="perf-section" id="performance">
        <div className="perf-inner">
          <div>
            <span className="section-tag reveal" style={{ fontFamily: "'DM Mono',monospace", fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '20px', display: 'block' }}>03 — Performance</span>
            <h2 className="section-title reveal reveal-delay-1">Numbers<br />that speak<br />across cycles</h2>
            <p className="section-body reveal reveal-delay-2">Consistent outperformance through 2008, 2020, and beyond. Our risk-adjusted returns place us in the top decile of global quantitative managers.</p>
            <div className="perf-stats reveal reveal-delay-3">
              <div className="perf-stat">
                <span className="perf-stat-val">−3.2%</span>
                <span className="perf-stat-key">Max Drawdown</span>
              </div>
              <div className="perf-stat">
                <span className="perf-stat-val">0.94×</span>
                <span className="perf-stat-key">Sharpe Ratio</span>
              </div>
              <div className="perf-stat">
                <span className="perf-stat-val">89%</span>
                <span className="perf-stat-key">Positive Months</span>
              </div>
              <div className="perf-stat">
                <span className="perf-stat-val">2.1×</span>
                <span className="perf-stat-key">Sortino Ratio</span>
              </div>
            </div>
          </div>
          <div className="reveal reveal-delay-2">
            <div className="perf-chart">
              <div className="perf-chart-label">Cumulative Returns — Orion Quant vs S&P 500</div>
              <svg className="chart-svg" viewBox="0 0 500 200" preserveAspectRatio="none" id="chartSvg">
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c8a96e" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#c8a96e" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="spGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4a8fff" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#4a8fff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="50" x2="500" y2="50" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <line x1="0" y1="150" x2="500" y2="150" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <path id="oqFill" fill="url(#lineGrad)" opacity="0.6" d="" />
                <path id="spFill" fill="url(#spGrad)" opacity="0.5" d="" />
                <path id="spLine" fill="none" stroke="#4a8fff" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.6" d="" />
                <path id="oqLine" fill="none" stroke="#c8a96e" strokeWidth="2" d="" />
                <text x="10" y="194" fill="rgba(255,255,255,0.25)" fontSize="9" fontFamily="DM Mono">2013</text>
                <text x="240" y="194" fill="rgba(255,255,255,0.25)" fontSize="9" fontFamily="DM Mono">2019</text>
                <text x="460" y="194" fill="rgba(255,255,255,0.25)" fontSize="9" fontFamily="DM Mono">2025</text>
              </svg>
              <div style={{ display: 'flex', gap: '20px', marginTop: '12px' }}>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '9px', color: 'var(--accent)', letterSpacing: '0.1em' }}>— ORION QUANT</span>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '9px', color: 'var(--blue)', letterSpacing: '0.1em', opacity: 0.7 }}>--- S&amp;P 500</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="philosophy-section" id="philosophy">
        <p className="philosophy-quote reveal">
          <span>"</span>The market is not a random walk —<br />
          it is a <span>curved spacetime</span> where information<br />
          warps probability into opportunity.<span>"</span>
        </p>
        <div className="philosophy-attr reveal reveal-delay-1">
          Dr. Arjun Mehta — Chief Investment Officer, Orion Quant
        </div>
      </section>

      {/* TEAM */}
      <section className="team-section" id="team">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <span className="section-tag reveal" style={{ fontFamily: "'DM Mono',monospace", fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '20px', display: 'block' }}>04 — The Team</span>
          <h2 className="section-title reveal reveal-delay-1">Architects<br />of alpha</h2>
        </div>
        <div className="team-grid">
          <div className="team-card reveal">
            <div className="team-avatar">
              <div className="avatar-initials">AM</div>
              <div className="avatar-ring"></div>
            </div>
            <div className="team-name">Dr. Arjun Mehta</div>
            <div className="team-role">Chief Investment Officer</div>
            <p className="team-bio">PhD Physics, MIT. Former quant at Renaissance Technologies. Pioneered the Singularity Model™️ framework for non-linear alpha extraction.</p>
          </div>
          <div className="team-card reveal reveal-delay-1">
            <div className="team-avatar">
              <div className="avatar-initials">SL</div>
              <div className="avatar-ring"></div>
            </div>
            <div className="team-name">Sofia Liang</div>
            <div className="team-role">Head of Research</div>
            <p className="team-bio">MSc Statistics, Stanford. 12 years developing alternative data pipelines at Two Sigma. Leads our machine learning alpha research division.</p>
          </div>
          <div className="team-card reveal reveal-delay-2">
            <div className="team-avatar">
              <div className="avatar-initials">MK</div>
              <div className="avatar-ring"></div>
            </div>
            <div className="team-name">Marcus Klein</div>
            <div className="team-role">Chief Risk Officer</div>
            <p className="team-bio">Former Head of Quantitative Risk at Goldman Sachs. Designed tail-risk frameworks that protected capital through multiple black swan events.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="contact">
        <div className="cta-glow"></div>
        <div className="cta-inner">
          <h2 className="cta-title reveal">Enter the<br /><em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg,var(--accent),var(--blue))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>event horizon.</em></h2>
          <p className="cta-sub reveal reveal-delay-1">Accredited investors and family offices. Minimum commitment $5M. Quarterly liquidity.</p>
          <div className="cta-actions reveal reveal-delay-2">
            <a href="mailto:ir@orionquant.com" className="btn-primary">Contact IR Team</a>
            <a href="#" className="btn-ghost">Request Deck</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-copy">©️ 2026 Orion Quant LP · All rights reserved · For qualified investors only</div>
          <ul className="footer-links">
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Disclosures</a></li>
            <li><a href="#">Terms</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default App;


