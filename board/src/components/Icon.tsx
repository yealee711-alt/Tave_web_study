import type { SVGProps } from "react";

type IconName = "grid" | "bookmark" | "plus" | "search" | "note" | "arrow" | "edit" | "trash" | "people";

const paths: Record<IconName, string> = {
  grid: "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z",
  bookmark: "M6 3h12v18l-6-4-6 4z",
  plus: "M12 5v14 M5 12h14",
  search: "M21 21l-5-5 M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
  note: "M14 3H5v18h14V8z M14 3v5h5 M8 12h8 M8 16h5",
  arrow: "M19 12H5 M11 6l-6 6 6 6",
  edit: "M15 5l4 4 M4 20l4-1L20 7a2.8 2.8 0 0 0-4-4L4 15z",
  trash: "M3 6h18 M9 6V3h6v3 M5 6l1 15h12l1-15 M10 10v7 M14 10v7",
  people: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M17 4a4 4 0 0 1 0 7 M22 21v-2a4 4 0 0 0-3-3.9",
};

function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d={paths[name]} />
    </svg>
  );
}

export default Icon;
