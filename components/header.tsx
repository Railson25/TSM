import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  description: string;
  className?: string;
}

export const Header = ({ description, title, className }: HeaderProps) => {
  return (
    <div className={cn("", className)}>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
