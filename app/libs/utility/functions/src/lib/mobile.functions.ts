export function isMobile(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

export function isTablet(): boolean {
  return window.innerWidth < 1240 && window.innerWidth >= 768;
}

export function isSmallScreen(): boolean {
  return window.innerWidth < 1240;
}

export function isSmallLaptop(): boolean {
  return window.innerWidth >= 1240 && window.innerWidth < 1900;
}

export function isFullHD(): boolean {
  return window.innerWidth >= 1900;
}
