import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import mainPhoto from "../../../imports/main_1.png";
import {
  Download,
  FileText,
  Wallet,
  Banknote,
  Clock,
  Printer,
  Mail,
  Phone,
  Globe,
  Instagram,
  Facebook,
  CloudUpload,
  Bell,
  QrCode,
  ShieldCheck,
  Smartphone,
  History,
} from "lucide-react";

// PrintFlow promotional poster
// Physical print size: 76.2 cm W × 152.4 cm H (exact 1:2 ratio)
// Design canvas: 762 × 1524 px (10 px = 1 cm) — scaled to fit the viewport.
//
// Vertical budget (must sum to 1524):
//   TOP (logo + headline + tagline)  : 430
//   PHONE (mockup with backdrop)     : 480
//   BENEFITS (3 cards)               : 434
//   FOOTER (angular dark-green band) : 180
//                                    = 1524

const CANVAS_W = 762;
const CANVAS_H = 1524;

export default function PrintFlowPoster() {
  const [scale, setScale] = useState(1);
  const [exporting, setExporting] = useState(false);
  const [heroSrc, setHeroSrc] = useState<string>(mainPhoto);
  const posterRef = useRef<HTMLDivElement>(null);

  // Pre-inline the hero image as a data URL so html-to-image never needs to refetch it.
  useEffect(() => {
    let cancelled = false;
    fetch(mainPhoto)
      .then((r) => r.blob())
      .then(
        (blob) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          }),
      )
      .then((dataUrl) => {
        if (!cancelled) setHeroSrc(dataUrl);
      })
      .catch(() => {
        /* keep original src */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleDownload = async () => {
    if (!posterRef.current) return;
    setExporting(true);
    try {
      // Run twice — first call warms the renderer & avoids transient image-load races.
      await toPng(posterRef.current, {
        pixelRatio: 1,
        cacheBust: true,
        backgroundColor: "#ffffff",
        width: CANVAS_W,
        height: CANVAS_H,
        style: { transform: "none" },
      });
      const dataUrl = await toPng(posterRef.current, {
        pixelRatio: 4,
        cacheBust: true,
        backgroundColor: "#ffffff",
        width: CANVAS_W,
        height: CANVAS_H,
        style: { transform: "none" },
      });
      const link = document.createElement("a");
      link.download = "printflow-poster.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Poster export failed", err);
      alert("Could not export poster. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  const handlePrint = () => window.print();

  useEffect(() => {
    const update = () => {
      const padding = 40;
      const sx = (window.innerWidth - padding) / CANVAS_W;
      const sy = (window.innerHeight - padding) / CANVAS_H;
      setScale(Math.min(sx, sy, 1));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      className="w-full bg-neutral-200 flex items-start justify-center print:bg-white"
      style={{
        minHeight: "100vh",
        padding: 20,
        height: `${CANVAS_H * scale + 40}px`,
      }}
    >
      <style>{`
        @media print {
          @page { size: 76.2cm 152.4cm; margin: 0; }
          html, body { background: #fff !important; }
          .poster-canvas {
            transform: none !important;
            width: 76.2cm !important;
            height: 152.4cm !important;
            box-shadow: none !important;
          }
        }
      `}</style>

      {/* Toolbar — hidden when printing & during PNG export */}
      {!exporting && (
        <div className="fixed top-4 right-4 z-50 flex gap-2 print:hidden">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#00736D] text-white shadow-lg hover:bg-[#005550] transition"
            style={{ fontWeight: 700, fontSize: 13 }}
          >
            <Download className="w-4 h-4" />
            Download PNG
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#002E2C] border-2 border-[#00736D] shadow-lg hover:bg-[#E6F1F0] transition"
            style={{ fontWeight: 700, fontSize: 13 }}
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
        </div>
      )}

      <div
        ref={posterRef}
        style={{
          width: CANVAS_W,
          height: CANVAS_H,
          transform: exporting ? "none" : `scale(${scale})`,
          transformOrigin: "top center",
        }}
        className="relative bg-white shadow-2xl overflow-hidden print:shadow-none flex flex-col poster-canvas"
      >
        {/* Layered background — diagonal line pattern + faint grid + corner glows */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#00736D 1px, transparent 1px), linear-gradient(90deg, #00736D 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, #00736D 0 1px, transparent 1px 14px)",
          }}
        />
        {/* Soft mint glow blobs for atmosphere */}
        <div className="absolute -left-32 top-[600px] w-[420px] h-[420px] rounded-full bg-[#80B9B6] opacity-15 blur-3xl pointer-events-none" />
        <div className="absolute -right-32 top-[1050px] w-[380px] h-[380px] rounded-full bg-[#00736D] opacity-10 blur-3xl pointer-events-none" />

        {/* Decorative side rails — vertical hairlines with anchor dots */}
        <svg
          className="absolute left-3 top-[260px] pointer-events-none"
          width="14"
          height="900"
          viewBox="0 0 14 900"
        >
          <line x1="7" y1="0" x2="7" y2="900" stroke="#00736D" strokeWidth="1" strokeDasharray="2 6" opacity="0.35" />
          {[0, 200, 400, 600, 800].map((y) => (
            <circle key={y} cx="7" cy={y} r="2.5" fill="#00736D" opacity="0.55" />
          ))}
        </svg>
        <svg
          className="absolute right-3 top-[260px] pointer-events-none"
          width="14"
          height="900"
          viewBox="0 0 14 900"
        >
          <line x1="7" y1="0" x2="7" y2="900" stroke="#00736D" strokeWidth="1" strokeDasharray="2 6" opacity="0.35" />
          {[0, 200, 400, 600, 800].map((y) => (
            <circle key={y} cx="7" cy={y} r="2.5" fill="#00736D" opacity="0.55" />
          ))}
        </svg>

        {/* Floating geometric accents */}
        <div className="absolute left-[40px] top-[680px] w-10 h-10 rounded-full border-2 border-[#00736D]/30 pointer-events-none" />
        <div className="absolute right-[60px] top-[760px] w-6 h-6 bg-[#80B9B6]/40 rotate-45 pointer-events-none" />
        <div className="absolute left-[80px] top-[1080px] w-3 h-3 bg-[#00736D]/40 rounded-full pointer-events-none" />
        <div className="absolute right-[40px] top-[1140px] w-12 h-12 rounded-full border border-[#00736D]/25 pointer-events-none" />
        <div className="absolute left-[55px] top-[1280px] w-5 h-5 bg-[#80B9B6]/35 rotate-45 pointer-events-none" />

        {/* Top decorative banner — layered curves */}
        <svg
          viewBox="0 0 762 240"
          className="absolute top-0 left-0 w-full pointer-events-none"
          preserveAspectRatio="none"
          style={{ height: 240 }}
        >
          <path d="M0,0 L762,0 L762,160 Q381,230 0,160 Z" fill="#E6F1F0" />
          <path d="M0,0 L762,0 L762,80 Q381,140 0,80 Z" fill="#CDE3E1" opacity="0.55" />
          {/* dotted accent */}
          <g fill="#00736D" opacity="0.35">
            {Array.from({ length: 18 }).map((_, i) => (
              <circle key={i} cx={20 + i * 42} cy={205 - Math.sin(i * 0.6) * 8} r="2" />
            ))}
          </g>
        </svg>

        {/* Decorative corner brackets — top-left & top-right */}
        <svg className="absolute top-4 left-4 pointer-events-none" width="56" height="56" viewBox="0 0 56 56">
          <path d="M2,18 L2,2 L18,2" stroke="#00736D" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="2" cy="2" r="3" fill="#00736D" />
        </svg>
        <svg className="absolute top-4 right-4 pointer-events-none" width="56" height="56" viewBox="0 0 56 56">
          <path d="M54,18 L54,2 L38,2" stroke="#00736D" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="54" cy="2" r="3" fill="#00736D" />
        </svg>

        {/* ============ TOP: HEADER & HOOK (430px) ============ */}
        <section
          className="relative px-12 text-center flex flex-col items-center justify-start pt-8"
          style={{ height: 430 }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-[#00736D] flex items-center justify-center shadow-lg">
              <Printer className="w-9 h-9 text-white" strokeWidth={2.5} />
            </div>
            <div className="text-left">
              <div className="text-[34px] leading-none tracking-tight text-[#002E2C]" style={{ fontWeight: 800 }}>
                PrintFlow
              </div>
              <div className="text-[10px] tracking-[0.3em] text-[#00736D] uppercase mt-1" style={{ fontWeight: 600 }}>
                Smart Campus Printing
              </div>
            </div>
          </div>

          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00736D]/10 border border-[#00736D]/20 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00736D]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#00736D]" style={{ fontWeight: 700 }}>
              For Campus Students
            </span>
          </div>

          {/* Headline with highlight underline */}
          <h1
            className="text-[#002E2C] tracking-tight leading-[0.95]"
            style={{ fontSize: 62, fontWeight: 900, letterSpacing: "-0.03em" }}
          >
            SKIP THE LINE.
            <br />
            <span className="relative inline-block">
              <span className="relative z-10 text-[#00736D]">PRINT IN SECONDS.</span>
              <span
                className="absolute left-0 right-0 bottom-1 h-3 bg-[#80B9B6]/40 rounded-sm -z-0"
                aria-hidden
              />
            </span>
          </h1>

          {/* Decorative divider */}
          <div className="mt-4 flex items-center gap-2">
            <div className="h-1 w-12 bg-[#00736D] rounded-full" />
            <div className="w-2 h-2 rounded-full bg-[#00736D]" />
            <div className="h-1 w-12 bg-[#80B9B6] rounded-full" />
          </div>

          <p className="mt-3 text-[#005550] text-[15px] max-w-[460px] leading-snug" style={{ fontWeight: 500 }}>
            The modernized, automated printing service built for university and college students.
          </p>

          {/* Stat strip */}
          <div className="mt-4 flex items-center gap-5">
            <Stat value="<60s" label="Avg. print time" />
            <div className="w-px h-8 bg-[#CDE3E1]" />
            <Stat value="24/7" label="Self-service" />
            <div className="w-px h-8 bg-[#CDE3E1]" />
            <Stat value="₱2" label="Per page" />
          </div>
        </section>

        {/* ============ UPPER MIDDLE: PHONE MOCKUP (510px) ============ */}
        <section
          className="relative flex items-center justify-center"
          style={{ height: 480 }}
        >
          {/* Mint-green hero backdrop circle */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[460px] h-[460px] rounded-full bg-gradient-to-br from-[#E6F1F0] to-[#CDE3E1]" />
          </div>

          {/* High-tech connector lines (drawn beneath phones, above backdrop) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 762 480"
            preserveAspectRatio="none"
            style={{ zIndex: 5 }}
          >
            {/* Left side connectors: chip inner edge ~x=190 → phone left edge ~x=265 */}
            <ConnectorLine x1={190} y1={105} x2={265} y2={140} />
            <ConnectorLine x1={190} y1={255} x2={255} y2={255} />
            <ConnectorLine x1={190} y1={405} x2={265} y2={370} />
            {/* Right side connectors: chip inner edge ~x=572 → phone right edge ~x=497 */}
            <ConnectorLine x1={572} y1={105} x2={497} y2={140} />
            <ConnectorLine x1={572} y1={255} x2={507} y2={255} />
            <ConnectorLine x1={572} y1={405} x2={497} y2={370} />
          </svg>

          {/* Main hero photo — central focus */}
          <img
            src={heroSrc}
            alt="PrintFlow app on mobile phones"
            className="relative object-contain"
            style={{
              maxHeight: 460,
              maxWidth: 420,
              zIndex: 10,
              filter: "drop-shadow(0 25px 35px rgba(0,46,44,0.25))",
            }}
          />

          {/* UI Callout pills — left column */}
          <CalloutPill
            icon={<CloudUpload className="w-6 h-6" />}
            label="Cloud Upload"
            className="absolute left-[30px] top-[80px]"
          />
          <CalloutPill
            icon={<QrCode className="w-6 h-6" />}
            label="GCash QR Pay"
            className="absolute left-[30px] top-[235px]"
          />
          <CalloutPill
            icon={<Smartphone className="w-6 h-6" />}
            label="Mobile First"
            className="absolute left-[30px] top-[390px]"
          />

          {/* UI Callout pills — right column */}
          <CalloutPill
            icon={<Bell className="w-6 h-6" />}
            label="Real-time Alerts"
            className="absolute right-[30px] top-[80px]"
            align="right"
          />
          <CalloutPill
            icon={<ShieldCheck className="w-6 h-6" />}
            label="Secure Files"
            className="absolute right-[30px] top-[235px]"
            align="right"
          />
          <CalloutPill
            icon={<History className="w-6 h-6" />}
            label="Print History"
            className="absolute right-[30px] top-[390px]"
            align="right"
          />
        </section>

        {/* ============ LOWER MIDDLE: 3 KEY BENEFITS (360px) ============ */}
        <section
          className="relative px-10 flex flex-col justify-center"
          style={{ height: 434 }}
        >
          <div className="text-center mb-6 flex flex-col items-center gap-2">
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#00736D]" />
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#002E2C] text-white text-[11px] tracking-[0.3em] uppercase shadow-md"
                style={{ fontWeight: 700 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#80B9B6]" />
                Why PrintFlow
                <span className="w-1.5 h-1.5 rounded-full bg-[#80B9B6]" />
              </div>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#00736D]" />
            </div>
            <div className="text-[13px] text-[#005550]" style={{ fontWeight: 500 }}>
              Three reasons students switch in seconds.
            </div>
          </div>

          <div className="space-y-3">
            <BenefitCard
              index="1"
              icon={<FileText className="w-8 h-8 text-white" strokeWidth={2.2} />}
              title="Remote File Upload"
              desc="Send your documents from anywhere."
            />
            <BenefitCard
              index="2"
              icon={
                <div className="flex items-center gap-1">
                  <Wallet className="w-7 h-7 text-white" strokeWidth={2.2} />
                  <Banknote className="w-7 h-7 text-white" strokeWidth={2.2} />
                </div>
              }
              title="Flexible Payments"
              desc="Pay via static GCash QR or Cash at the Counter."
            />
            <BenefitCard
              index="3"
              icon={
                <div className="relative">
                  <Clock className="w-8 h-8 text-white" strokeWidth={2.2} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-[3px] bg-[#FF4D4D] rotate-45 rounded-full" />
                  </div>
                </div>
              }
              title="Zero Waiting Time"
              desc="Walk in, grab your prints, walk out."
            />
          </div>
        </section>

        {/* ============ BOTTOM: ANGULAR DARK-GREEN FOOTER (224px) ============ */}
        <section className="relative" style={{ height: 180 }}>
          {/* Angular top edge — drawn ABOVE the section so it doesn't eat content */}
          <svg
            viewBox="0 0 762 36"
            className="absolute -top-[28px] left-0 w-full pointer-events-none"
            preserveAspectRatio="none"
            style={{ height: 36 }}
          >
            <polygon points="0,36 762,36 762,10 381,32 0,4" fill="#002E2C" />
          </svg>

          <div className="bg-[#002E2C] text-white relative h-full px-8 pt-3 pb-3 flex flex-col overflow-hidden">
            {/* Subtle dot grid overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.05]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #80B9B6 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            />
            {/* Diagonal accent stripe */}
            <div className="absolute top-3 right-0 w-32 h-1 bg-[#80B9B6] -rotate-3" />

            <div className="flex items-center gap-4 flex-1">
              {/* QR placeholder — realistic dummy QR */}
              <div className="w-[88px] h-[88px] bg-white p-1.5 rounded-lg shadow-xl flex-shrink-0">
                <DummyQRCode />
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-[9px] tracking-[0.3em] text-[#80B9B6] uppercase mb-1" style={{ fontWeight: 700 }}>
                  Get Started
                </div>
                <div className="text-[15px] leading-tight" style={{ fontWeight: 800 }}>
                  Scan to Download the App or Start Printing!
                </div>
                <div className="mt-1 inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#00736D]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#80B9B6]" />
                  <span className="text-[10px]" style={{ fontWeight: 600 }}>printflow.app</span>
                </div>
              </div>
            </div>

            {/* Contact details */}
            <div className="mt-2 pt-2 border-t border-[#005550]">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <ContactItem icon={<Globe className="w-3.5 h-3.5" />} label="printflow.app" />
                <ContactItem icon={<Mail className="w-3.5 h-3.5" />} label="hello@printflow.app" />
                <ContactItem icon={<Phone className="w-3.5 h-3.5" />} label="+63 917 555 0142" />
                <ContactItem icon={<Instagram className="w-3.5 h-3.5" />} label="@printflow" />
                <ContactItem icon={<Facebook className="w-3.5 h-3.5" />} label="/printflowph" />
              </div>
            </div>

            {/* Bottom inclusive message */}
            <div className="mt-1.5 pt-1.5 border-t border-[#005550] text-center">
              <div className="text-[11px] tracking-[0.18em] uppercase text-[#80B9B6]" style={{ fontWeight: 700 }}>
                Modern Printing for All Campus Students.
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function DummyQRCode() {
  // 25×25 grid mimicking a real QR layout: three finder patterns, timing strips,
  // an alignment pattern, and deterministic pseudo-random data modules.
  const SIZE = 25;
  const isFinder = (r: number, c: number) => {
    const inBox = (br: number, bc: number) =>
      r >= br && r <= br + 6 && c >= bc && c <= bc + 6;
    const ringFilled = (br: number, bc: number) => {
      const dr = r - br;
      const dc = c - bc;
      if (dr === 0 || dr === 6 || dc === 0 || dc === 6) return true; // outer ring
      if (dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4) return true; // inner block
      return false;
    };
    if (inBox(0, 0)) return ringFilled(0, 0);
    if (inBox(0, SIZE - 7)) return ringFilled(0, SIZE - 7);
    if (inBox(SIZE - 7, 0)) return ringFilled(SIZE - 7, 0);
    return null;
  };
  const isFinderArea = (r: number, c: number) =>
    (r <= 7 && c <= 7) || (r <= 7 && c >= SIZE - 8) || (r >= SIZE - 8 && c <= 7);

  // Alignment pattern bottom-right-ish
  const isAlign = (r: number, c: number) => {
    const ar = SIZE - 5;
    const ac = SIZE - 5;
    const dr = r - ar;
    const dc = c - ac;
    if (dr < 0 || dr > 4 || dc < 0 || dc > 4) return null;
    if (dr === 0 || dr === 4 || dc === 0 || dc === 4) return true;
    if (dr === 2 && dc === 2) return true;
    return false;
  };

  // Timing strips
  const isTiming = (r: number, c: number) => {
    if (r === 6 && c >= 8 && c <= SIZE - 9) return c % 2 === 0;
    if (c === 6 && r >= 8 && r <= SIZE - 9) return r % 2 === 0;
    return null;
  };

  // Deterministic data fill
  const dataFilled = (r: number, c: number) => {
    const v = (r * 73856093) ^ (c * 19349663) ^ ((r + c) * 83492791);
    return ((v >>> 0) % 100) < 48;
  };

  const cells: { r: number; c: number; on: boolean }[] = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const f = isFinder(r, c);
      if (f !== null) {
        cells.push({ r, c, on: f });
        continue;
      }
      // separator white border around finders
      if (isFinderArea(r, c)) {
        cells.push({ r, c, on: false });
        continue;
      }
      const a = isAlign(r, c);
      if (a !== null) {
        cells.push({ r, c, on: a });
        continue;
      }
      const t = isTiming(r, c);
      if (t !== null) {
        cells.push({ r, c, on: t });
        continue;
      }
      cells.push({ r, c, on: dataFilled(r, c) });
    }
  }

  // Center logo zone — clear modules in middle
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const logoR = 3.2;

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-full" shapeRendering="crispEdges">
      <rect width={SIZE} height={SIZE} fill="#ffffff" />
      {cells.map(({ r, c, on }) => {
        const inLogo = Math.abs(r + 0.5 - cy) < logoR && Math.abs(c + 0.5 - cx) < logoR;
        if (inLogo || !on) return null;
        return <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill="#002E2C" />;
      })}
      {/* Center logo cap */}
      <rect
        x={cx - logoR}
        y={cy - logoR}
        width={logoR * 2}
        height={logoR * 2}
        rx={1}
        fill="#ffffff"
      />
      <rect
        x={cx - logoR + 0.6}
        y={cy - logoR + 0.6}
        width={logoR * 2 - 1.2}
        height={logoR * 2 - 1.2}
        rx={0.8}
        fill="#00736D"
      />
      <text
        x={cx}
        y={cy + 0.7}
        textAnchor="middle"
        fontSize="2.6"
        fontWeight="900"
        fill="#ffffff"
        fontFamily="Inter, system-ui, sans-serif"
      >
        PF
      </text>
    </svg>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-[#002E2C] text-[22px] leading-none" style={{ fontWeight: 800 }}>
        {value}
      </div>
      <div className="text-[9px] tracking-[0.2em] uppercase text-[#00736D] mt-1" style={{ fontWeight: 600 }}>
        {label}
      </div>
    </div>
  );
}

function ConnectorLine({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#00736D" strokeWidth={1.2} strokeDasharray="3 3" />
      <circle cx={x1} cy={y1} r={3} fill="#00736D" />
      <circle cx={x2} cy={y2} r={3.5} fill="#00736D" stroke="#fff" strokeWidth={1.5} />
    </g>
  );
}

function CalloutPill({
  icon,
  label,
  className = "",
  align = "left",
}: {
  icon: React.ReactNode;
  label: string;
  className?: string;
  align?: "left" | "right";
}) {
  return (
    <div
      className={`${className} flex items-center gap-3 bg-white rounded-full pl-2.5 pr-6 py-2.5 shadow-[0_6px_18px_rgba(0,46,44,0.14)] border border-[#E6F1F0]`}
      style={{ zIndex: 20, flexDirection: align === "right" ? "row-reverse" : "row" }}
    >
      <div className="w-12 h-12 rounded-full bg-[#E6F1F0] text-[#00736D] flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <span className="text-[16px] text-[#002E2C] whitespace-nowrap" style={{ fontWeight: 700 }}>
        {label}
      </span>
    </div>
  );
}

function ContactItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-white/95">
      <div className="w-6 h-6 rounded-full bg-[#00736D] flex items-center justify-center text-white">
        {icon}
      </div>
      <span className="text-[11px]" style={{ fontWeight: 600 }}>{label}</span>
    </div>
  );
}

function BenefitCard({
  index,
  icon,
  title,
  desc,
}: {
  index: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="relative w-full pl-7">
      {/* Big prominent number badge — fully outside the card, no clipping */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-gradient-to-br from-[#00736D] to-[#002E2C] text-white flex items-center justify-center text-[22px] shadow-[0_8px_20px_rgba(0,115,109,0.45)] ring-4 ring-white"
        style={{ fontWeight: 900 }}
      >
        {index}
      </div>

      {/* Card body — clips its own decorations only */}
      <div className="relative w-full bg-white rounded-2xl border-2 border-[#CDE3E1] shadow-[0_12px_30px_rgba(0,46,44,0.12)] flex items-stretch overflow-hidden">
        {/* Left accent stripe */}
        <div className="w-2 bg-gradient-to-b from-[#00736D] to-[#80B9B6] flex-shrink-0" />

        {/* Faint corner glyph (clipped inside card) */}
        <div className="absolute -right-8 -bottom-8 w-28 h-28 rounded-full bg-[#E6F1F0] opacity-60 pointer-events-none" />

        <div className="relative flex items-center gap-5 px-5 py-4 flex-1">
          <div className="relative w-[64px] h-[64px] rounded-2xl bg-gradient-to-br from-[#00736D] to-[#005550] flex items-center justify-center flex-shrink-0 shadow-lg">
            <div className="absolute inset-0 rounded-2xl bg-white/10 mix-blend-overlay" />
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[#002E2C] text-[22px] leading-tight" style={{ fontWeight: 800 }}>
              {title}
            </div>
            <div className="text-[#005550] text-[13px] mt-1 leading-snug" style={{ fontWeight: 500 }}>
              {desc}
            </div>
          </div>
          <div className="relative w-8 h-8 rounded-full bg-[#E6F1F0] flex items-center justify-center text-[#00736D] flex-shrink-0">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
