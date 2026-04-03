export default function Badge({ children, variant }) {
  return (
    <span className={`badge badge--${variant || 'default'}`}>{children}</span>
  );
}
