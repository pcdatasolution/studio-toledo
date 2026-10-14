type PendingContactProps = {
  descriptionId: string;
  label?: string;
};

export function PendingContact({
  descriptionId,
  label = "Conversar pelo WhatsApp",
}: PendingContactProps) {
  return (
    <div className="pending-contact">
      <button className="button button--pending" type="button" disabled aria-describedby={descriptionId}>
        {label}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <p id={descriptionId} className="pending-note">Indisponível neste protótipo · canal pendente de confirmação.</p>
    </div>
  );
}
