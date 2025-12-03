function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      id="logo"
      fill="currentColor"
      width="723"
      height="724"
      viewBox="0 0 723 724"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M552.875 552.765H213.083V595.594H595.576V212.936H552.875V552.765Z" />
      <path d="M42.8289 42.7008H552.875V84.5955H595.576V0H0V595.594H84.7237V552.765H42.8289V42.7008Z" />
      <rect
        x="127"
        y="127"
        width="596"
        height="596"
        fill="#38BDF8"
        fillOpacity="0.4"
      />
      <path d="M595.576 127.424H552.875H127.424V552.765V595.594V723.018H723V127.424H595.576ZM680.299 680.19H170.253V595.594V552.765V170.253H552.893H595.594H680.318L680.299 680.19Z" />
    </svg>
  );
}

export default Logo;
