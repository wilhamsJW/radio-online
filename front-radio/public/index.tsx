

interface IconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}

export const SkipNext: React.FC<IconProps> = ({ color, size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill={color}
    {...props}
  >
    <path d="M660-240v-480h80v480h-80Zm-440 0v-480l360 240-360 240Zm80-240Zm0 90 136-90-136-90v180Z" />
  </svg>
);

export const SkipPrevious: React.FC<IconProps> = ({ color, size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill={color}
    {...props}
  >
    <path d="M220-240v-480h80v480h-80Zm520 0L380-480l360-240v480Zm-80-240Zm0 90v-180l-136 90 136 90Z" />
  </svg>
);
