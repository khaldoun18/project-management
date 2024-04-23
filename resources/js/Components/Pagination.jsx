import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
  return (
    <nav className="mt-4 text-center">
      {links.map((link, index) => (
        <Link
        preserveScroll
          key={index}
          href={link.url || ""}
          className={
            "px-3 py-2 text-xs text-gray-500 rounded-lg inline-block " +
            (link.active ? "bg-gray-950 " : "") +
            (!link.url ? "!text-gray-500 cursor-not-allowed " : "hover:bg-gray-950 ")
          }
          dangerouslySetInnerHTML={{ __html: link.label }}
        />
      ))}
    </nav>
  );
}
