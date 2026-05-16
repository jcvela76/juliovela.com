import { brandPalette } from "@/lib/brand";

export const brandLogoViewBox = {
  width: 760,
  height: 170,
};

export function createBrandLogoSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${brandLogoViewBox.width} ${brandLogoViewBox.height}" role="img" aria-labelledby="julio-vela-logo-title">
  <title id="julio-vela-logo-title">Julio Vela Tech Solutions</title>
  <rect width="${brandLogoViewBox.width}" height="${brandLogoViewBox.height}" fill="none"/>
  <g fill="${brandPalette.red}">
    <circle cx="51" cy="35" r="6"/>
    <circle cx="51" cy="67" r="6"/>
    <path d="M73 20H83L69 85H59Z"/>
    <path d="M100 20H110L96 85H86Z"/>
  </g>
  <text x="146" y="73" fill="${brandPalette.spaceGray}" font-family="Arial, Helvetica, sans-serif" font-size="74" font-weight="800" letter-spacing="5">JULIO VELA</text>
  <text x="193" y="138" fill="${brandPalette.interfaceGray}" font-family="Arial, Helvetica, sans-serif" font-size="31" font-weight="300" letter-spacing="9">TECH SOLUTIONS</text>
</svg>`;
}

export function createBrandLogoDataUri() {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(createBrandLogoSvg())}`;
}
