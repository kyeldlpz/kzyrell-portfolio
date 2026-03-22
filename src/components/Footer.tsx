export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-3xl mx-auto px-6 py-6 flex items-center justify-center">
        <span className="text-xs text-muted">
          &copy; {new Date().getFullYear()} Kzyrell Dela Paz. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
