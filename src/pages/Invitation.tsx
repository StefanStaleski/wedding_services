import React, { useState } from 'react';

type Phase = 'sealed' | 'opening' | 'revealed';

interface InvitationProps {
    guestName?: string;
    coupleName?: string;
    date?: string;
    ceremonyTime?: string;
    ceremonyPlace?: string;
    receptionTime?: string;
    receptionPlace?: string;
    rsvpDeadline?: string;
    hostNames?: string;
    rsvpHref?: string;
}

const Invitation: React.FC<InvitationProps> = ({
                                                   guestName = 'Ана и Петар',
                                                   coupleName = 'Марија & Никола',
                                                   date = 'Сабота, 21 јуни 2025',
                                                   ceremonyTime = '18:00',
                                                   ceremonyPlace = 'Црква Св. Климент Охридски, Скопје',
                                                   receptionTime = '20:00',
                                                   receptionPlace = 'Хотел Александар Палас, Скопје',
                                                   rsvpDeadline = '1 јуни 2025',
                                                   hostNames = 'Семејство Јовановски & Семејство Петровски',
                                                   rsvpHref = '#',
                                               }) => {
    const [phase, setPhase] = useState<Phase>('sealed');
    const [sealExiting, setSealExiting] = useState(false);
    const [contentVisible, setContentVisible] = useState(false);

    const handleOpen = () => {
        setSealExiting(true);
        setTimeout(() => setPhase('opening'), 600);
        setTimeout(() => setPhase('revealed'), 1500);
        setTimeout(() => setContentVisible(true), 2300);
    };

    // Fade-up helper: applies opacity + translateY transition with staggered delay
    const fi = (delay: number): React.CSSProperties => ({
        opacity: contentVisible ? 1 : 0,
        transform: contentVisible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
    });

    // Seal ring tick marks
    const ticks = Array.from({ length: 36 }, (_, i) => {
        const angle = (i * 10 * Math.PI) / 180;
        const major = i % 3 === 0;
        const r1 = major ? 81 : 84;
        return {
            x1: 100 + r1 * Math.cos(angle),
            y1: 100 + r1 * Math.sin(angle),
            x2: 100 + 89 * Math.cos(angle),
            y2: 100 + 89 * Math.sin(angle),
            major,
        };
    });

    // 8-pointed star lines
    const starLines = Array.from({ length: 8 }, (_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        return {
            x1: 100 + 10 * Math.cos(angle),
            y1: 100 + 10 * Math.sin(angle),
            x2: 100 + 32 * Math.cos(angle),
            y2: 100 + 32 * Math.sin(angle),
        };
    });

    return (
        <div
            style={{
                minHeight: '100vh',
                backgroundColor: phase === 'revealed' ? '#FDFAF5' : '#1F1F1F',
                transition: 'background-color 0.9s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px 24px',
            }}
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');

        @keyframes inv-ring-rotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes inv-seal-pulse {
          0%, 100% { transform: scale(1);    opacity: 0.85; }
          50%       { transform: scale(1.04); opacity: 1;    }
        }
        @keyframes inv-seal-exit {
          0%   { transform: scale(1);   opacity: 1;   }
          40%  { transform: scale(1.2); opacity: 0.7; }
          100% { transform: scale(2.8); opacity: 0;   }
        }
        @keyframes inv-btn-pulse {
          0%, 100% { box-shadow: 0 0 0 0px  rgba(201,168,76,0);    }
          50%       { box-shadow: 0 0 0 10px rgba(201,168,76,0.12); }
        }
        @keyframes inv-shimmer {
          0%   { background-position: -300% center; }
          100% { background-position:  300% center; }
        }

        .inv-ring      { animation: inv-ring-rotate 30s linear infinite; transform-origin: 100px 100px; }
        .inv-seal-idle { animation: inv-seal-pulse  3.5s ease-in-out infinite; }
        .inv-seal-exit { animation: inv-seal-exit   0.65s cubic-bezier(0.4,0,0.2,1) forwards; }
        .inv-btn-pulse { animation: inv-btn-pulse   2.5s ease-in-out infinite; }

        .inv-couple {
          font-family: 'Cormorant Garamond', Georgia, serif;
          background: linear-gradient(90deg, #2C2C2C 35%, #C9A84C 50%, #2C2C2C 65%);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: inv-shimmer 5s linear infinite;
          animation-delay: 4s;
          animation-play-state: paused;
        }
        .inv-couple.inv-shimmer-active {
          animation-play-state: running;
        }

        @media (max-width: 600px) {
          .inv-couple-size { font-size: 36px !important; }
          .inv-guest-size  { font-size: 30px !important; }
        }
      `}</style>

            {/* ─── SEALED / OPENING ─── */}
            {phase !== 'revealed' && (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '36px',
                        textAlign: 'center',
                        opacity: phase === 'opening' ? 0 : 1,
                        transition: 'opacity 0.55s ease',
                    }}
                >
                    {/* Animated seal */}
                    <div className={sealExiting ? 'inv-seal-exit' : 'inv-seal-idle'}>
                        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Rotating tick ring */}
                            <g className="inv-ring">
                                {ticks.map((t, i) => (
                                    <line
                                        key={i}
                                        x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
                                        stroke="#C9A84C"
                                        strokeWidth={t.major ? 2 : 1}
                                        opacity={t.major ? 0.9 : 0.35}
                                    />
                                ))}
                            </g>

                            {/* Concentric circles */}
                            <circle cx="100" cy="100" r="77" stroke="#C9A84C" strokeWidth="0.5" opacity="0.5"/>
                            <circle cx="100" cy="100" r="65" stroke="#C9A84C" strokeWidth="1"   opacity="0.75"/>
                            <circle cx="100" cy="100" r="49" stroke="#C9A84C" strokeWidth="0.5" opacity="0.4"/>

                            {/* 8-pointed star */}
                            {starLines.map((l, i) => (
                                <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                                      stroke="#C9A84C" strokeWidth="0.8" opacity="0.85" strokeLinecap="round"/>
                            ))}

                            {/* Center diamond + dot */}
                            <polygon
                                points="100,90 108,100 100,110 92,100"
                                stroke="#C9A84C" strokeWidth="1" fill="rgba(201,168,76,0.1)" opacity="0.9"
                            />
                            <circle cx="100" cy="100" r="3.5" fill="#C9A84C" opacity="0.9"/>

                            {/* Text arc */}
                            <defs>
                                <path id="inv-arc" d="M100,100 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"/>
                            </defs>
                            <text fontSize="6.5" fill="#C9A84C" opacity="0.65" letterSpacing="5.5" fontFamily="Georgia, serif">
                                <textPath href="#inv-arc" startOffset="8%">М И Г О В И · П О К А Н А ·</textPath>
                            </text>
                        </svg>
                    </div>

                    {/* Intro text */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <p style={{
                            fontFamily: 'sans-serif',
                            fontSize: '9px',
                            letterSpacing: '0.45em',
                            textTransform: 'uppercase',
                            color: 'rgba(201,168,76,0.65)',
                        }}>
                            Имате покана
                        </p>
                        <p style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontSize: '28px',
                            fontWeight: 300,
                            color: 'rgba(255,255,255,0.88)',
                            letterSpacing: '0.12em',
                        }}>
                            {guestName}
                        </p>
                        <p style={{
                            fontFamily: 'sans-serif',
                            fontSize: '10px',
                            color: 'rgba(255,255,255,0.22)',
                            letterSpacing: '0.15em',
                            marginTop: '2px',
                        }}>
                            допрете за да отворите
                        </p>
                    </div>

                    {/* Open button */}
                    <button
                        className="inv-btn-pulse"
                        onClick={handleOpen}
                        style={{
                            background: 'transparent',
                            border: '1px solid rgba(201,168,76,0.45)',
                            color: '#C9A84C',
                            padding: '13px 52px',
                            fontSize: '10px',
                            letterSpacing: '0.38em',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            fontFamily: 'sans-serif',
                            transition: 'background 0.3s ease, color 0.3s ease, border-color 0.3s ease',
                        }}
                        onMouseEnter={e => {
                            const el = e.currentTarget;
                            el.style.background = '#C9A84C';
                            el.style.color = '#1F1F1F';
                            el.style.borderColor = '#C9A84C';
                        }}
                        onMouseLeave={e => {
                            const el = e.currentTarget;
                            el.style.background = 'transparent';
                            el.style.color = '#C9A84C';
                            el.style.borderColor = 'rgba(201,168,76,0.45)';
                        }}
                    >
                        Отвори
                    </button>
                </div>
            )}

            {/* ─── REVEALED ─── */}
            {phase === 'revealed' && (
                <div
                    style={{
                        width: '100%',
                        maxWidth: '540px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                    }}
                >
                    {/* Top ornament */}
                    <div style={fi(0)}>
                        <svg width="260" height="28" viewBox="0 0 260 28" fill="none">
                            <line x1="0" y1="14" x2="108" y2="14" stroke="#C9A84C" strokeWidth="0.5" opacity="0.55"/>
                            <rect x="114" y="7" width="14" height="14" stroke="#C9A84C" strokeWidth="0.8"
                                  fill="none" transform="rotate(45 121 14)" opacity="0.9"/>
                            <line x1="134" y1="14" x2="260" y2="14" stroke="#C9A84C" strokeWidth="0.5" opacity="0.55"/>
                        </svg>
                    </div>

                    <p style={{
                        ...fi(150),
                        fontFamily: 'sans-serif',
                        fontSize: '9px',
                        letterSpacing: '0.42em',
                        textTransform: 'uppercase',
                        color: '#C9A84C',
                        marginTop: '28px',
                    }}>
                        Со голема радост и чест
                    </p>

                    {/* Vertical spacer line */}
                    <div style={{ ...fi(280), width: '1px', height: '44px', background: 'rgba(201,168,76,0.28)', margin: '20px 0' }}/>

                    <p style={{ ...fi(380), fontFamily: 'sans-serif', fontSize: '11px', color: '#aaa', letterSpacing: '0.2em', marginBottom: '8px' }}>
                        почитуван/а
                    </p>

                    <p
                        className="inv-guest-size"
                        style={{
                            ...fi(480),
                            fontSize: '40px',
                            fontWeight: 300,
                            color: '#2C2C2C',
                            letterSpacing: '0.08em',
                            lineHeight: 1.15,
                        }}
                    >
                        {guestName}
                    </p>

                    <p style={{ ...fi(620), fontFamily: 'sans-serif', fontSize: '11px', color: '#aaa', letterSpacing: '0.18em', margin: '26px 0 0' }}>
                        Ве покануваме на
                    </p>

                    {/* Couple / event block */}
                    <div style={{
                        ...fi(760),
                        width: '100%',
                        margin: '20px 0 4px',
                        borderTop: '1px solid rgba(201,168,76,0.22)',
                        borderBottom: '1px solid rgba(201,168,76,0.22)',
                        padding: '24px 0',
                    }}>
                        <p style={{
                            fontFamily: 'sans-serif',
                            fontSize: '8.5px',
                            letterSpacing: '0.5em',
                            textTransform: 'uppercase',
                            color: '#bbb',
                            marginBottom: '10px',
                        }}>
                            Венчавањето на
                        </p>
                        <p
                            className={`inv-couple inv-couple-size ${contentVisible ? 'inv-shimmer-active' : ''}`}
                            style={{ fontSize: '50px', fontWeight: 300, letterSpacing: '0.03em', lineHeight: 1.1 }}
                        >
                            {coupleName}
                        </p>
                    </div>

                    {/* Date */}
                    <p style={{
                        ...fi(960),
                        fontSize: '21px',
                        fontWeight: 300,
                        color: '#2C2C2C',
                        letterSpacing: '0.1em',
                        margin: '28px 0 26px',
                    }}>
                        {date}
                    </p>

                    {/* Timeline rows */}
                    <div style={{ ...fi(1100), width: '100%', display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '32px' }}>
                        {[
                            { time: ceremonyTime, label: 'Свечен чин', place: ceremonyPlace },
                            { time: receptionTime, label: 'Прослава',   place: receptionPlace },
                        ].map(({ time, label, place }) => (
                            <div key={time} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', textAlign: 'left' }}>
                                <div style={{ minWidth: '52px', textAlign: 'right', paddingTop: '1px' }}>
                                    <p style={{ fontSize: '20px', fontWeight: 300, color: '#C9A84C', lineHeight: 1 }}>{time}</p>
                                </div>
                                <div style={{ width: '1px', background: 'rgba(201,168,76,0.25)', alignSelf: 'stretch', flexShrink: 0 }}/>
                                <div>
                                    <p style={{
                                        fontFamily: 'sans-serif',
                                        fontSize: '8.5px',
                                        letterSpacing: '0.3em',
                                        textTransform: 'uppercase',
                                        color: '#bbb',
                                        marginBottom: '4px',
                                    }}>
                                        {label}
                                    </p>
                                    <p style={{ fontSize: '16px', fontWeight: 300, color: '#2C2C2C', letterSpacing: '0.03em' }}>
                                        {place}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ ...fi(1260), width: '100%', height: '1px', background: 'rgba(201,168,76,0.18)', marginBottom: '28px' }}/>

                    <p style={{ ...fi(1360), fontFamily: 'sans-serif', fontSize: '10px', color: '#c0b090', letterSpacing: '0.15em', marginBottom: '6px' }}>
                        Со почит,
                    </p>
                    <p style={{ ...fi(1460), fontSize: '17px', fontWeight: 300, color: '#2C2C2C', letterSpacing: '0.05em', lineHeight: 1.5 }}>
                        {hostNames}
                    </p>

                    {/* RSVP */}
                    <div style={{ ...fi(1640), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', marginTop: '44px' }}>
                        <p style={{
                            fontFamily: 'sans-serif',
                            fontSize: '10px',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: '#aaa',
                        }}>
                            Потврдете го присуството до {rsvpDeadline}
                        </p>
                        <a
                            href={rsvpHref}
                            style={{
                                display: 'inline-block',
                                background: '#2C2C2C',
                                color: '#C9A84C',
                                padding: '14px 52px',
                                fontSize: '10px',
                                letterSpacing: '0.35em',
                                textTransform: 'uppercase',
                                fontFamily: 'sans-serif',
                                textDecoration: 'none',
                                transition: 'background 0.3s ease, color 0.3s ease',
                            }}
                            onMouseEnter={e => {
                                const el = e.currentTarget;
                                el.style.background = '#C9A84C';
                                el.style.color = '#1F1F1F';
                            }}
                            onMouseLeave={e => {
                                const el = e.currentTarget;
                                el.style.background = '#2C2C2C';
                                el.style.color = '#C9A84C';
                            }}
                        >
                            Потврдувам
                        </a>
                    </div>

                    {/* Bottom ornament */}
                    <div style={{ ...fi(1840), marginTop: '52px' }}>
                        <svg width="260" height="28" viewBox="0 0 260 28" fill="none">
                            <line x1="0" y1="14" x2="108" y2="14" stroke="#C9A84C" strokeWidth="0.5" opacity="0.35"/>
                            <rect x="114" y="7" width="14" height="14" stroke="#C9A84C" strokeWidth="0.8"
                                  fill="none" transform="rotate(45 121 14)" opacity="0.55"/>
                            <line x1="134" y1="14" x2="260" y2="14" stroke="#C9A84C" strokeWidth="0.5" opacity="0.35"/>
                        </svg>
                    </div>

                    <p style={{ ...fi(1940), fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.35)', margin: '20px 0 48px' }}>
                        Мигови · Дигитална Покана
                    </p>
                </div>
            )}
        </div>
    );
};

export default Invitation;