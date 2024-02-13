interface HeaderProps {
  title: string;
  description: string;
}

export const Header = ({ description, title }: HeaderProps) => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
