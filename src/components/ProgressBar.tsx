import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export const ProgressBar = ({ progress, className }: ProgressBarProps) => {
  return (
    <div className={cn("w-full bg-progress-bg rounded-full h-2", className)}>
      <div
        className="h-2 bg-progress-fill rounded-full transition-all duration-300 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
};