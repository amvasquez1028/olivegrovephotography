import { BOOKING_URL } from "@/lib/site";

type BookButtonProps = {
  label?: string;
  className?: string;
  /** When omitted, uses the site default from `BOOKING_URL`. */
  href?: string;
};

export const BookButton = ({
  label = "Booking site",
  className = "",
  href,
}: BookButtonProps) => {
  const bookingHref = href?.trim() ? href.trim() : BOOKING_URL;
  return (
    <a
      href={bookingHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-11 items-center justify-center rounded-none bg-sage px-5 text-sm font-semibold tracking-wide text-[color:var(--og-button-fg)] shadow-sm transition hover:bg-sage-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-dark ${className}`}
    >
      {label}
    </a>
  );
};
