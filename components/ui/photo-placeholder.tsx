type PhotoPlaceholderProps = {
  subject: string;
  description: string;
  format?: "landscape" | "portrait" | "wide";
};

export function PhotoPlaceholder({
  subject,
  description,
  format = "landscape",
}: PhotoPlaceholderProps) {
  return (
    <figure className={`photo-placeholder photo-placeholder--${format}`}>
      <div className="photo-placeholder-surface">
        <span className="placeholder-cross" aria-hidden="true" />
        <div className="placeholder-copy">
          <span>Placeholder de desenvolvimento</span>
          <p>{subject}</p>
        </div>
      </div>
      <figcaption>{description}</figcaption>
    </figure>
  );
}
