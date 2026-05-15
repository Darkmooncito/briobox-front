import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => !prev);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => navigate('/login'), 1000);
  };

  return (
    <div
      onClick={handleClick}
      className="min-h-screen bg-[#020202] flex items-center justify-center cursor-pointer relative overflow-hidden"
    >
      {/* Fondo base casi negro */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1a0000_0%,_#050000_35%,_#000000_65%)]" />

      {/* Glow que sigue el mouse sutilmente */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none transition-all duration-700"
        style={{
          background: 'radial-gradient(circle, rgba(180,0,0,0.12) 0%, transparent 70%)',
          left: `calc(${mousePos.x}% - 250px)`,
          top: `calc(${mousePos.y}% - 250px)`,
        }}
      />

      {/* Glow central pulsante profundo */}
      <div className={`absolute w-[700px] h-[400px] rounded-full blur-[160px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-[3000ms] pointer-events-none ${pulse ? 'bg-red-950/25' : 'bg-red-950/10'}`} />

      {/* Línea horizontal sutil */}
      <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-red-900/20 to-transparent top-1/2" />

      {/* Contenido central */}
      <div className={`relative z-10 flex flex-col items-center gap-10 transition-all duration-[800ms] ease-in-out ${clicked ? 'opacity-0 scale-105 blur-md' : 'opacity-100 scale-100'}`}>

        {/* Logo */}
        <div className={`relative transition-all duration-[3000ms] ${pulse ? 'drop-shadow-[0_0_40px_rgba(180,0,0,0.5)]' : 'drop-shadow-[0_0_15px_rgba(180,0,0,0.2)]'}`}>
          <img
            src="/src/assets/brioboxlogo.png"
            alt="BrioBox"
            className="w-28 h-28 object-contain opacity-95"
          />
        </div>

        {/* Separador */}
        <div className={`w-16 h-px transition-all duration-[3000ms] ${pulse ? 'bg-red-800/60 w-24' : 'bg-red-900/30 w-16'}`} />

        {/* Click to enter */}
        <div className="relative flex flex-col items-center gap-3">
          {/* Aura del texto */}
          <div className={`absolute rounded-full blur-2xl transition-all duration-[2500ms] pointer-events-none ${pulse ? 'w-52 h-10 bg-red-700/15' : 'w-32 h-6 bg-red-900/8'}`} />

          <p className={`relative text-[11px] tracking-[0.6em] uppercase font-light transition-all duration-[2500ms] ${pulse ? 'text-white/70' : 'text-white/30'}`}>
            click to enter
          </p>

          {/* Indicador pulsante */}
          <div className="flex gap-1.5 items-center">
            <div className={`w-1 h-1 rounded-full transition-all duration-[2500ms] ${pulse ? 'bg-red-500/80' : 'bg-red-900/40'}`} />
            <div className={`w-8 h-px transition-all duration-[2500ms] ${pulse ? 'bg-red-500/40' : 'bg-red-900/20'}`} />
            <div className={`w-1 h-1 rounded-full transition-all duration-[2500ms] ${pulse ? 'bg-red-500/80' : 'bg-red-900/40'}`} />
          </div>
        </div>
      </div>

      {/* Vignette fuerte para oscurecer bordes */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(0,0,0,0.7)_70%,_rgba(0,0,0,0.95)_100%)] pointer-events-none" />

      {/* Esquinas oscuras */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-black/80 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-black/80 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-black/80 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-black/80 to-transparent pointer-events-none" />
    </div>
  );
}