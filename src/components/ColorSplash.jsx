import { motion } from 'framer-motion';

const ColorSplash = () => {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 800 600"
      preserveAspectRatio="none"
      style={{ pointerEvents: 'none' }}
    >
      <defs>
        <filter id="roughPaper">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="5" result="noise" />
          <feDiffuseLighting in="noise" lightingColor="white" surfaceScale="1">
            <feDistantLight azimuth="45" elevation="60" />
          </feDiffuseLighting>
        </filter>
        
        <filter id="blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
        </filter>
      </defs>
      
      {/* Main red splash */}
      <motion.path
        d="M0,600 Q150,500 100,400 T50,250 Q100,150 0,100 L0,600"
        fill="#C41E3A"
        fillOpacity="0.7"
        filter="url(#blur)"
        initial={{ 
          d: "M0,600 Q150,500 100,400 T50,250 Q100,150 0,100 L0,600" 
        }}
        animate={{ 
          d: [
            "M0,600 Q150,500 100,400 T50,250 Q100,150 0,100 L0,600",
            "M0,600 Q180,480 120,380 T70,230 Q120,130 0,80 L0,600",
            "M0,600 Q150,500 100,400 T50,250 Q100,150 0,100 L0,600"
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Gold splash overlay */}
      <motion.path
        d="M0,600 Q200,550 150,450 Q100,350 80,250 T0,150 L0,600"
        fill="#FFD700"
        fillOpacity="0.5"
        filter="url(#blur)"
        initial={{ 
          d: "M0,600 Q200,550 150,450 Q100,350 80,250 T0,150 L0,600" 
        }}
        animate={{ 
          d: [
            "M0,600 Q200,550 150,450 Q100,350 80,250 T0,150 L0,600",
            "M0,600 Q180,530 130,430 Q90,340 70,240 T0,130 L0,600",
            "M0,600 Q200,550 150,450 Q100,350 80,250 T0,150 L0,600"
          ]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      {/* Smaller accent splash */}
      <motion.path
        d="M0,600 Q100,580 80,500 Q60,420 40,350 T0,250 L0,600"
        fill="#8B0000"
        fillOpacity="0.4"
        filter="url(#blur)"
        initial={{ 
          d: "M0,600 Q100,580 80,500 Q60,420 40,350 T0,250 L0,600" 
        }}
        animate={{ 
          d: [
            "M0,600 Q100,580 80,500 Q60,420 40,350 T0,250 L0,600",
            "M0,600 Q120,570 90,490 Q70,410 50,340 T0,230 L0,600",
            "M0,600 Q100,580 80,500 Q60,420 40,350 T0,250 L0,600"
          ]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      {/* Paint splatter dots */}
      {[...Array(15)].map((_, i) => (
        <motion.circle
          key={i}
          cx={Math.random() * 300}
          cy={300 + Math.random() * 300}
          r={Math.random() * 8 + 2}
          fill={i % 2 === 0 ? "#C41E3A" : "#FFD700"}
          fillOpacity={Math.random() * 0.6 + 0.2}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            delay: Math.random() * 2,
            duration: 0.5,
            ease: "backOut"
          }}
        />
      ))}
    </svg>
  );
};

export default ColorSplash;