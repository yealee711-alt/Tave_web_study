interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return <h1 className="text-[48px] font-normal text-center">{title}</h1>;
}