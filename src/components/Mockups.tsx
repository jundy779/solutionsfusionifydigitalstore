import type { CSSProperties } from "react";
import { ArrowRight, Bell, CheckCircle, Circle, FileText } from "./Icons";

const d = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

/* Hero: an order bot conversation running on a phone, with the shop
   dashboard behind it updating when the payment lands. Illustrative. */
export function HeroStage() {
  return (
    <div className="stage" aria-label="Contoh alur: pelanggan pesan lewat WhatsApp, bot memproses, dashboard admin ikut terupdate">
      <div className="stage-dash" aria-hidden="true">
        <div className="dash-top">
          <strong>Dashboard order</strong>
          <span>Hari ini</span>
        </div>
        <div className="dash-stats">
          <div className="dash-stat">
            <small>Order masuk</small>
            <b>38</b>
          </div>
          <div className="dash-stat">
            <small>Dibayar</small>
            <b>31</b>
          </div>
          <div className="dash-stat">
            <small>Dibalas bot</small>
            <b>92%</b>
          </div>
        </div>
        <div className="dash-bars">
          {[34, 52, 40, 61, 48, 70, 58, 76, 64, 88].map((h, i) => (
            <i key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="dash-rows">
          <div className="dash-row is-new">
            <code>#1042</code>
            <span className="status paid">Dibayar</span>
            <span>Keripik pedas lv.3 × 2</span>
          </div>
          <div className="dash-row">
            <code>#1041</code>
            <span className="status proc">Diproses</span>
            <span>Basreng original × 3</span>
          </div>
          <div className="dash-row">
            <code>#1040</code>
            <span className="status ship">Dikirim</span>
            <span>Paket hampers × 1</span>
          </div>
        </div>
      </div>

      <div className="phone" aria-hidden="true">
        <div className="phone-screen">
          <div className="phone-bar">
            <span className="phone-avatar">KS</span>
            <span>
              <strong>Keripik Bu Sari</strong>
              <small>Bot order aktif</small>
            </span>
          </div>
          <div className="chat">
            <div className="msg out" style={d(0.4)}>
              Kak, keripik pedas level 3 masih ada?
            </div>
            <div className="typing" style={d(1)}>
              <i />
              <i />
              <i />
            </div>
            <div className="msg in" style={d(1.9)}>
              Masih, stok 24 pcs. Mau pesan berapa?
            </div>
            <div className="msg out" style={d(3)}>
              2 ya, kirim ke Bogor
            </div>
            <div className="typing" style={d(3.5)}>
              <i />
              <i />
              <i />
            </div>
            <div className="msg in" style={d(4.4)}>
              Total Rp56.000 + ongkir Rp12.000.
              <span className="pay">Bayar lewat QRIS</span>
            </div>
            <div className="msg ok" style={d(5.8)}>
              Pembayaran diterima. Pesanan #1042 diproses.
            </div>
          </div>
        </div>
      </div>

      <div className="toast" aria-hidden="true">
        <span className="toast-icon">
          <Bell />
        </span>
        <span>
          <strong>Order #1042 sudah dibayar</strong>
          <small>Notifikasi ke WhatsApp admin</small>
        </span>
      </div>
      <p className="stage-note">Contoh alur automation order</p>
    </div>
  );
}

/* Small, honest visuals for each service tile */
export function ServiceVisual({ slug }: { slug: string }) {
  switch (slug) {
    case "web-development":
      return (
        <div className="mini-browser" aria-hidden="true">
          <div className="mini-browser-bar">
            <i />
            <i />
            <i />
            <span>tokokamu.id/pesan</span>
          </div>
          <div className="mini-browser-body">
            <div className="mb-lines">
              <b />
              <b />
              <i />
              <i />
              <span className="mb-cta" />
            </div>
            <div className="mb-form">
              <small>Form pemesanan</small>
              <i />
              <i />
              <em />
            </div>
            <div className="mb-flow">
              <span>Form</span>
              <ArrowRight />
              <span>Database</span>
              <ArrowRight />
              <span>Email</span>
              <ArrowRight />
              <span>WhatsApp</span>
              <ArrowRight />
              <span>Dashboard</span>
            </div>
          </div>
        </div>
      );
    case "automation-bots":
      return (
        <div className="mini-chat" aria-hidden="true">
          <div className="msg out">/status 1041</div>
          <div className="msg in">Order #1041 sedang dikemas, estimasi kirim sore ini.</div>
          <div className="msg ok">Pengingat pembayaran terkirim ke 12 pelanggan</div>
        </div>
      );
    case "ai-solutions":
      return (
        <div className="mini-ai" aria-hidden="true">
          <div className="ai-doc">
            <small>invoice-maret.pdf</small>
            <i />
            <i />
            <i />
          </div>
          <div className="ai-out">
            <div>
              <span>Vendor</span>
              <b>CV Sinar Jaya</b>
            </div>
            <div>
              <span>Total</span>
              <b>Rp4.250.000</b>
            </div>
            <div>
              <span>Jatuh tempo</span>
              <b>12 April</b>
            </div>
          </div>
        </div>
      );
    case "digital-systems":
      return (
        <div className="mini-nodes" aria-hidden="true">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            {[
              [18, 22],
              [82, 22],
              [18, 80],
              [82, 80],
            ].map(([x, y]) => (
              <line
                key={`${x}${y}`}
                x1="50"
                y1="50"
                x2={x}
                y2={y}
                stroke="#b9cff0"
                strokeWidth="0.8"
                strokeDasharray="2 2"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
          <span className="node" style={{ left: "18%", top: "22%" }}>
            Payment
          </span>
          <span className="node" style={{ left: "82%", top: "22%" }}>
            Database
          </span>
          <span className="node hub" style={{ left: "50%", top: "50%" }}>
            API
          </span>
          <span className="node" style={{ left: "18%", top: "80%" }}>
            WhatsApp
          </span>
          <span className="node" style={{ left: "82%", top: "80%" }}>
            Dashboard
          </span>
        </div>
      );
    case "cloud-deployment":
      return (
        <div className="mini-deploy" aria-hidden="true">
          <div className="dim">$ git push origin main</div>
          <div>Building project...</div>
          <div className="ok">✓ Build selesai dalam 41 detik</div>
          <div className="ok">✓ SSL aktif untuk domainkamu.id</div>
          <div className="ok">✓ Backup harian terjadwal 02.00</div>
        </div>
      );
    case "project-assistance":
      return (
        <div className="mini-code" aria-hidden="true">
          <div className="head">api/orders.ts</div>
          <div className="del">- const total = items.price * qty</div>
          <div className="add">+ const total = items.reduce((s, i) =&gt; s + i.price * i.qty, 0)</div>
          <div className="note">
            <b>Catatan review:</b> total salah saat keranjang berisi lebih dari satu produk.
          </div>
        </div>
      );
    case "consulting-documentation":
      return (
        <div className="mini-checklist" aria-hidden="true">
          <strong>Dokumen handover</strong>
          <div>
            <CheckCircle /> Arsitektur dan alur data
          </div>
          <div>
            <CheckCircle /> Dokumentasi API
          </div>
          <div>
            <CheckCircle /> Runbook deployment
          </div>
          <div className="todo">
            <Circle /> Akses dan credential diserahkan
          </div>
        </div>
      );
    default:
      return null;
  }
}

/* Document in, structured data out, a person approves */
export function AiDemo() {
  return (
    <div className="ai-demo" aria-label="Contoh: AI membaca dokumen lalu mengisi data, admin menyetujui">
      <div className="ai-demo-head">
        <b>Pemrosesan dokumen</b>
        <span>Contoh alur</span>
      </div>
      <div className="ai-file">
        <FileText />
        <span>
          Formulir pendaftaran_Rizky.pdf
          <small>Diunggah orang tua lewat form PPDB</small>
        </span>
      </div>
      <div className="ai-fields">
        <div>
          <span>Nama siswa</span>
          <b>Rizky Ananda</b>
        </div>
        <div>
          <span>Asal sekolah</span>
          <b>SMPN 2 Bojonggede</b>
        </div>
        <div>
          <span>Jurusan pilihan</span>
          <b>TKJ</b>
        </div>
        <div>
          <span>Berkas</span>
          <b>Lengkap</b>
        </div>
      </div>
      <div className="ai-review">
        Panitia tetap memeriksa sebelum disimpan
        <span>
          <i>Setujui</i>
          <i>Koreksi</i>
        </span>
      </div>
    </div>
  );
}
