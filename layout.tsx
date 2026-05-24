@import 'tailwindcss';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));

:root {
  --yellow: #f5c200;
  --red: #c0392b;
  --dark: #2c1a0e;
  --brown: #7a4f2e;
  --cream: #fdf6ec;
  
  --background: #fdf6ec;
  --foreground: #2c1a0e;
  --card: #ffffff;
  --card-foreground: #2c1a0e;
  --popover: #ffffff;
  --popover-foreground: #2c1a0e;
  --primary: #f5c200;
  --primary-foreground: #2c1a0e;
  --secondary: #7a4f2e;
  --secondary-foreground: #fdf6ec;
  --muted: rgba(255,255,255,0.72);
  --muted-foreground: rgba(44,26,14,0.65);
  --accent: #c0392b;
  --accent-foreground: #ffffff;
  --destructive: #c0392b;
  --destructive-foreground: #ffffff;
  --border: rgba(0,0,0,0.07);
  --input: rgba(0,0,0,0.06);
  --ring: #f5c200;
  --radius: 0.625rem;
}

@theme inline {
  --font-sans: 'Segoe UI', Arial, sans-serif;
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
  html {
    scroll-behavior: smooth;
  }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 30px rgba(245,194,0,0.4); }
  50% { box-shadow: 0 0 60px rgba(245,194,0,0.7); }
}

@keyframes bounce-arrow {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(8px); }
}

@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.animate-pulse-glow {
  animation: pulse-glow 3s ease-in-out infinite;
}

.animate-bounce-arrow {
  animation: bounce-arrow 2s infinite;
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}

.animate-marquee:hover {
  animation-play-state: paused;
}
