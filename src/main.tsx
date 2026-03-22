import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

// Console Easter egg
console.log(
  `%c
  ██╗  ██╗███████╗██╗   ██╗
  ██║ ██╔╝╚══███╔╝╚██╗ ██╔╝
  █████╔╝   ███╔╝  ╚████╔╝
  ██╔═██╗  ███╔╝    ╚██╔╝
  ██║  ██╗███████╗   ██║
  ╚═╝  ╚═╝╚══════╝   ╚═╝
  `,
  'color: #60a5fa; font-weight: bold'
);
console.log(
  '%c👋 Hey there, curious developer!',
  'font-size: 14px; font-weight: bold; color: #fafafa; background: #18181b; padding: 4px 8px; border-radius: 4px'
);
console.log(
  '%cBuilt with React + TypeScript + Tailwind CSS + Vite\n%cFeel free to poke around — no secrets here, just clean code.',
  'color: #71717a; font-size: 11px',
  'color: #71717a; font-size: 11px'
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
