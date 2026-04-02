const items = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS',
  'Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'C++',
  'AWS', 'Git', 'Supabase', 'Claude AI', 'Copilot',
];

export default function Marquee() {
  const doubled = [...items, ...items, ...items, ...items];

  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {doubled.map((text, i) => (
          <span key={i} className="marquee-item">
            {text}
            <span className="marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}
