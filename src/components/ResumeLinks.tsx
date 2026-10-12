import { Download, FileText } from "lucide-react";

export function ResumeLinks({ className = "" }: { className?: string }) {
  return <div className={`flex flex-wrap items-center gap-3 ${className}`}>
    <a href="/shivam-resume.pdf" target="_blank" rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border bg-card-soft px-4 py-2 text-sm font-semibold text-foreground hover:opacity-75 transition-opacity">
      <FileText size={16} aria-hidden="true" /> View résumé<span className="sr-only"> (PDF, opens in a new tab)</span>
    </a>
    <a href="/shivam-resume.pdf" download="Shivam-Resume.pdf"
      className="inline-flex min-h-11 items-center justify-center gap-2 px-2 py-2 text-sm font-semibold text-foreground hover:opacity-75 transition-opacity">
      <Download size={16} aria-hidden="true" /> Download résumé
    </a>
  </div>;
}
