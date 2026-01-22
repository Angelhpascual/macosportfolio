import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{ fontWeight: `'wght' ${baseWeight}` }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));
};

const setupTextHover = (container, type) => {
  console.log('=== SETUP DEBUG ===');
  console.log('Container:', container);
  console.log('Type:', type);

  if (!container) {
    console.log('❌ Container is null');
    return;
  }

  const letters = container.querySelectorAll('span');
  console.log('Spans found:', letters.length);
  console.log('Spans:', letters);

  if (letters.length === 0) {
    console.log('❌ No spans found');
    return;
  }

  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateLetter = (letter, weight, duration = 0.25) => {
    console.log(`🎨 Animating letter to weight: ${weight}`);
    return gsap.to(letter, {
      duration,
      ease: 'power2.out',
      fontVariationSettings: `'wght' ${weight}`,
    });
  };

  const handleMouseMove = e => {
    console.log('🖱️ Mouse moved over:', type);
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;
    console.log('Mouse X:', mouseX);

    letters.forEach((letter, index) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 2000);
      const weight = min + (max - min) * intensity;

      console.log(
        `Letter ${index}: distance=${distance.toFixed(2)}, intensity=${intensity.toFixed(3)}, weight=${weight.toFixed(0)}`
      );

      animateLetter(letter, weight);
    });
  };

  container.addEventListener('mousemove', handleMouseMove);
  console.log('✅ Event listener added to:', type);
};

const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    console.log('🚀 useGSAP ejecutándose');
    console.log('titleRef.current:', titleRef.current);
    console.log('subtitleRef.current:', subtitleRef.current);

    setupTextHover(titleRef.current, 'title');
    setupTextHover(subtitleRef.current, 'subtitle');
  }, [titleRef, subtitleRef]);

  return (
    <section id="welcome">
      <p ref={subtitleRef}>
        {renderText(
          "Hey, I'm Ángel Welcome to my",
          'text-3xl font-georama',
          100
        )}
      </p>
      <h1 className="mt-7" ref={titleRef}>
        {renderText('portfolio', 'text-9xl italic font-georama')}
      </h1>
      <div className="small-screen">
        <p>This Portfolio is designed for desktop/tablet screens only </p>
      </div>
    </section>
  );
};

export default Welcome;
