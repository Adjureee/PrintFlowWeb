import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Download, FileCode } from "lucide-react";

// Pure-SVG PrintFlow logo assets so they scale infinitely and export cleanly.

const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 104 104" width="104" height="104">
  <rect width="104" height="104" rx="22" fill="#00736D"/>
  <g transform="translate(52,52)">
    <rect x="-26" y="-10" width="52" height="32" rx="5" fill="#ffffff"/>
    <rect x="-20" y="-26" width="40" height="18" rx="3" fill="#ffffff"/>
    <rect x="-18" y="6" width="36" height="22" rx="3" fill="#00736D" stroke="#ffffff" stroke-width="4"/>
    <line x1="-10" y1="14" x2="10" y2="14" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
    <line x1="-10" y1="20" x2="6" y2="20" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
    <circle cx="16" cy="-2" r="3" fill="#80B9B6"/>
  </g>
</svg>`;

const buildFullLogo = (textColor: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 160" width="520" height="160">
  <rect x="20" y="28" width="104" height="104" rx="22" fill="#00736D"/>
  <g transform="translate(72,80)">
    <rect x="-26" y="-10" width="52" height="32" rx="5" fill="#ffffff"/>
    <rect x="-20" y="-26" width="40" height="18" rx="3" fill="#ffffff"/>
    <rect x="-18" y="6" width="36" height="22" rx="3" fill="#00736D" stroke="#ffffff" stroke-width="4"/>
    <line x1="-10" y1="14" x2="10" y2="14" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
    <line x1="-10" y1="20" x2="6" y2="20" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
    <circle cx="16" cy="-2" r="3" fill="#80B9B6"/>
  </g>
  <text x="148" y="92" font-family="Inter, system-ui, sans-serif" font-size="58" font-weight="800" fill="${textColor}" letter-spacing="-2">PrintFlow</text>
  <text x="150" y="118" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="600" fill="#00736D" letter-spacing="3.5">SMART CAMPUS PRINTING</text>
</svg>`;

const LIGHT_SVG = buildFullLogo("#002E2C");
const DARK_SVG = buildFullLogo("#FFFFFF");

export default function PrintFlowLogo() {
  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col items-center justify-start gap-10 p-8">
      <div className="text-center">
        <h1 className="text-[#002E2C] text-3xl" style={{ fontWeight: 800 }}>
          PrintFlow Logo Export
        </h1>
        <p className="text-[#005550] mt-2 max-w-md mx-auto text-sm" style={{ fontWeight: 500 }}>
          SVG = vector (best for print &amp; scaling). PNG = 6× pixel ratio (~3120 px), transparent background.
        </p>
      </div>

      <LogoVariant
        label="Light variant"
        filenameBase="printflow-logo-light"
        svg={LIGHT_SVG}
        bg="bg-white"
      />
      <LogoVariant
        label="Dark variant"
        filenameBase="printflow-logo-dark"
        svg={DARK_SVG}
        bg="bg-[#002E2C]"
      />
      <LogoVariant
        label="Icon only"
        filenameBase="printflow-icon"
        svg={ICON_SVG}
        bg="bg-white"
      />
    </div>
  );
}

function LogoVariant({
  label,
  filenameBase,
  svg,
  bg,
}: {
  label: string;
  filenameBase: string;
  svg: string;
  bg: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);

  const downloadSVG = () => {
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filenameBase}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPNG = async () => {
    if (!ref.current) return;
    setBusy(true);
    try {
      const dataUrl = await toPng(ref.current, {
        pixelRatio: 6,
        backgroundColor: undefined,
        cacheBust: true,
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `${filenameBase}.png`;
      a.click();
    } catch (err) {
      console.error(err);
      alert("PNG export failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-xs uppercase tracking-[0.2em] text-[#00736D]" style={{ fontWeight: 700 }}>
        {label}
      </span>
      <div className="rounded-2xl overflow-hidden shadow-xl border border-[#CDE3E1]">
        <div ref={ref} className={`${bg} p-8 flex items-center justify-center`} dangerouslySetInnerHTML={{ __html: svg }} />
      </div>
      <div className="flex gap-2">
        <button
          onClick={downloadSVG}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#00736D] text-white shadow hover:bg-[#005550] transition"
          style={{ fontWeight: 700, fontSize: 13 }}
        >
          <FileCode className="w-4 h-4" />
          SVG
        </button>
        <button
          onClick={downloadPNG}
          disabled={busy}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#002E2C] border-2 border-[#00736D] shadow hover:bg-[#E6F1F0] transition disabled:opacity-50"
          style={{ fontWeight: 700, fontSize: 13 }}
        >
          <Download className="w-4 h-4" />
          {busy ? "Exporting…" : "PNG"}
        </button>
      </div>
    </div>
  );
}
