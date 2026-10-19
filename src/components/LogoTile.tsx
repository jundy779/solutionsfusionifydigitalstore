import Image from "next/image";
import Link from "next/link";

type Props = {
  name: string;
  meta: string;
  logo: { src: string; width: number; height: number };
  href: string;
  external?: boolean;
};

// One logo tile. Visual layers (all CSS): a soft spotlight that follows the
// cursor, a light sweep across the tile, and the logo going from muted to
// full color with a small lift. Touch screens show full color by default.
export function LogoTile({ name, meta, logo, href, external = false }: Props) {
  const inner = (
    <>
      <span className="logo-tile__mark" aria-hidden="true">
        <Image src={logo.src} alt="" width={logo.width} height={logo.height} />
      </span>
      <span className="logo-tile__text">
        <strong>{name}</strong>
        <span>{meta}</span>
      </span>
      <span className="logo-tile__shine" aria-hidden="true" />
    </>
  );
  return external ? (
    <a className="logo-tile" href={href} target="_blank" rel="noopener noreferrer" data-spot>
      {inner}
    </a>
  ) : (
    <Link className="logo-tile" href={href} data-spot>
      {inner}
    </Link>
  );
}
