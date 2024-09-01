const Logo = () => {
  return (
    <svg
      width="50"
      height="50"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {/* Door outline */}
      <rect
        x="6"
        y="4"
        width="12"
        height="16"
        rx="2"
        ry="2"
        fill="none"
        stroke="#4a5568"
        strokeWidth="2"
      />

      {/* Door handle */}
      <circle cx="14" cy="12" r="1" fill="#4a5568" />

      {/* Arrow pointing right, indicating booking/entry */}
      <path
        d="M10 8l4 4-4 4"
        fill="none"
        stroke="#2d3748"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Abstract door open effect */}
      <path
        d="M8 4l8 8-8 8"
        fill="none"
        stroke="#4a5568"
        strokeWidth="2"
        strokeDasharray="4 2"
      />
    </svg>
  );
};

export default Logo;
