export function scrollTo(elementId: string): void {
  const el = document.getElementById(elementId);
  el?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
  });
}
