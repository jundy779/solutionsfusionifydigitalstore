import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap not-found">
      <h1 className="display">Halaman ini tidak ada.</h1>
      <p className="lead">Mungkin alamatnya berubah saat website diperbarui. Mulai lagi dari sini:</p>
      <div className="actions">
        <Link className="btn btn-primary" href="/">
          Ke beranda
        </Link>
        <Link className="btn btn-ghost" href="/layanan/">
          Lihat layanan
        </Link>
      </div>
    </section>
  );
}
