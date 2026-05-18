import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, useInView } from "motion/react";
import {
  Printer,
  Upload,
  CreditCard,
  Package,
  ArrowRight,
  Check,
  MapPin,
  Clock,
  Smartphone,
  Store,
  GraduationCap,
  Zap,
  Shield,
  Star,
  ChevronRight,
  Menu,
  X,
  Twitter,
  Facebook,
  Instagram,
  Mail,
  Phone,
  Usb,
  Users,
  TrendingUp,
  AlertTriangle,
  Wifi,
  FileCheck,
  QrCode,
} from "lucide-react";

function useScrollInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: `${-(1 - threshold) * 100}px 0px`,
  });
  return { ref, isInView };
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const problemSection = useScrollInView();
  const stepsSection = useScrollInView();
  const audienceSection = useScrollInView();

  const steps = [
    {
      icon: <Upload className="w-7 h-7 text-white" />,
      number: "01",
      title: "Upload Your File",
      desc: "Send your PDF or DOCX directly from your phone or laptop — no USB needed, anytime and anywhere.",
      color: "from-[#00736D] to-[#005550]",
    },
    {
      icon: <QrCode className="w-7 h-7 text-white" />,
      number: "02",
      title: "Pay via GCash",
      desc: "Scan the QR code and pay securely. Your order is verified the moment payment clears.",
      color: "from-[#005550] to-[#003D3B]",
    },
    {
      icon: <Package className="w-7 h-7 text-white" />,
      number: "03",
      title: "Pick Up & Go",
      desc: "Walk straight to the counter. Your documents are ready and waiting — zero queue, zero waiting.",
      color: "from-[#003D3B] to-[#002E2C]",
    },
  ];

  const problems = [
    { icon: <Clock className="w-5 h-5" />, text: "Long, unpredictable queues" },
    {
      icon: <Usb className="w-5 h-5" />,
      text: "USB transfers & file compatibility issues",
    },
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      text: "Missed deadlines & last-minute panic",
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      text: "Cash-only payments & unpaid prints",
    },
  ];

  const solutions = [
    {
      icon: <Wifi className="w-5 h-5" />,
      text: "Remote upload from any device",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      text: "Pre-verified GCash e-wallet payments",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      text: "Instant queue placement before you leave",
    },
    {
      icon: <FileCheck className="w-5 h-5" />,
      text: "Live order tracking, end-to-end",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      {/* ── NAVBAR ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-[#00736D]/5 border-b border-[#E6F1F0]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-[#00736D] to-[#002E2C] rounded-xl flex items-center justify-center shadow-md">
              <Printer className="w-5 h-5 text-white" />
            </div>
            <span
              className={`text-xl font-extrabold tracking-tight transition-colors ${scrolled ? "text-[#002E2C]" : "text-white"}`}
            >
              PrintFlow
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {["How It Works", "For Students", "For Shops"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className={`text-sm font-semibold transition-colors hover:text-[#00736D] ${
                  scrolled ? "text-[#002E2C]/70" : "text-white/80"
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className={`text-sm font-bold px-4 py-2 rounded-xl transition-all ${
                scrolled
                  ? "text-[#00736D] hover:bg-[#E6F1F0]"
                  : "text-white/90 hover:bg-white/10"
              }`}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="text-sm font-bold px-5 py-2.5 bg-gradient-to-r from-[#00736D] to-[#002E2C] text-white rounded-xl shadow-lg shadow-[#00736D]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden p-2 rounded-xl transition-colors ${scrolled ? "text-[#002E2C]" : "text-white"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-[#E6F1F0] px-5 py-4 space-y-3"
          >
            {["How It Works", "For Students", "For Shops"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-semibold text-[#002E2C]/70 hover:text-[#00736D] py-1.5"
              >
                {item}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <Link
                to="/login"
                className="text-center text-sm font-bold py-2.5 border-2 border-[#E6F1F0] rounded-xl text-[#00736D]"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="text-center text-sm font-bold py-2.5 bg-gradient-to-r from-[#00736D] to-[#002E2C] text-white rounded-xl"
              >
                Get Started Free
              </Link>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen bg-gradient-to-br from-[#002E2C] via-[#003D3B] to-[#005550] flex items-center overflow-hidden pt-16">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [0, 60, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-[#00736D]/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.1, 1, 1.1], rotate: [30, 0, 30] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-[#80B9B6]/10 rounded-full blur-3xl"
          />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%2380B9B6%22 fill-opacity=%220.04%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#00736D]/20 border border-[#80B9B6]/30 rounded-full mb-6 backdrop-blur-sm"
            >
              <Zap className="w-4 h-4 text-[#80B9B6]" />
              <span className="text-[#80B9B6] text-sm font-semibold">
                Skip the Line. Print in Seconds
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] mb-6 tracking-tight">
              The Smart Way{" "}
              <span className="bg-gradient-to-r from-[#80B9B6] to-[#E6F1F0] bg-clip-text text-transparent">
                to Print.
              </span>
              <br />
              Skip the line,{" "}
              <span className="relative inline-block">
                every time.
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-[#80B9B6] to-[#E6F1F0] rounded-full origin-left"
                />
              </span>
            </h1>

            <p className="text-[#80B9B6]/90 text-lg sm:text-xl leading-relaxed mb-10 max-w-lg">
              PrintFlow brings a{" "}
              <strong className="text-white font-semibold">
                Pay-First, Print-Fast
              </strong>{" "}
              experience to every DNSC student. Upload your document, pay via
              GCash, and walk straight to a ready order — no USB, no cash, no
              queue.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/signup"
                  className="flex items-center justify-center gap-2.5 px-7 py-4 bg-white text-[#002E2C] font-bold text-base rounded-2xl shadow-2xl shadow-black/20 hover:shadow-2xl transition-all"
                >
                  <Smartphone className="w-5 h-5" />
                  Download the App
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/signup"
                  className="flex items-center justify-center gap-2.5 px-7 py-4 bg-transparent border-2 border-[#80B9B6]/50 text-white font-bold text-base rounded-2xl hover:bg-white/10 hover:border-[#80B9B6] transition-all"
                >
                  <Store className="w-5 h-5" />
                  Partner Your Shop
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </Link>
              </motion.div>
            </div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-10 flex items-center gap-4 flex-wrap"
            >
              <div className="flex -space-x-3">
                {["S", "M", "J", "A", "R"].map((l, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-[#80B9B6] to-[#00736D] border-2 border-[#002E2C] flex items-center justify-center text-xs font-bold text-white"
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-[#80B9B6] text-xs font-medium">
                  Trusted by 200+ DNSC students
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow behind phone */}
              <div className="absolute inset-0 bg-[#00736D]/30 rounded-[40px] blur-3xl scale-110" />

              {/* Phone frame */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-64 sm:w-72 bg-[#001A19] rounded-[44px] p-2 shadow-2xl border border-[#80B9B6]/20"
              >
                {/* Notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#001A19] rounded-full z-20 flex items-center justify-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#002E2C]" />
                  <div className="w-10 h-1.5 rounded-full bg-[#002E2C]" />
                </div>

                {/* Screen */}
                <div className="bg-[#E6F1F0] rounded-[38px] overflow-hidden h-[520px] sm:h-[580px] relative">
                  {/* App header */}
                  <div className="bg-gradient-to-r from-[#00736D] to-[#002E2C] px-4 pt-10 pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/70 text-xs">Good morning,</p>
                        <p className="text-white font-bold text-base">
                          Hello! 👋
                        </p>
                      </div>
                      <div className="w-8 h-8 bg-white/20 rounded-full" />
                    </div>
                  </div>

                  {/* Upload card */}
                  <div className="px-3 -mt-2 space-y-2.5 pt-2">
                    <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#80B9B6]/20">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 bg-gradient-to-br from-[#00736D] to-[#002E2C] rounded-xl flex items-center justify-center flex-shrink-0">
                          <Upload className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-[#002E2C] font-bold text-xs">
                            thesis_final_v3.pdf
                          </p>
                          <p className="text-[#80B9B6] text-[10px]">
                            Ready to print • 2.4 MB
                          </p>
                        </div>
                        <div className="ml-auto">
                          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Map placeholder */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#80B9B6]/20">
                      <div className="relative h-36 bg-gradient-to-br from-[#E6F1F0] via-[#d4e9e7] to-[#c0dbd8]">
                        <svg
                          className="absolute inset-0 w-full h-full opacity-30"
                          viewBox="0 0 200 150"
                        >
                          <line
                            x1="0"
                            y1="50"
                            x2="200"
                            y2="50"
                            stroke="#00736D"
                            strokeWidth="1"
                          />
                          <line
                            x1="0"
                            y1="100"
                            x2="200"
                            y2="100"
                            stroke="#00736D"
                            strokeWidth="1"
                          />
                          <line
                            x1="60"
                            y1="0"
                            x2="60"
                            y2="150"
                            stroke="#00736D"
                            strokeWidth="1"
                          />
                          <line
                            x1="130"
                            y1="0"
                            x2="130"
                            y2="150"
                            stroke="#00736D"
                            strokeWidth="1"
                          />
                          <rect
                            x="30"
                            y="25"
                            width="25"
                            height="15"
                            rx="2"
                            fill="#80B9B6"
                            opacity="0.6"
                          />
                          <rect
                            x="70"
                            y="55"
                            width="35"
                            height="20"
                            rx="2"
                            fill="#80B9B6"
                            opacity="0.6"
                          />
                          <rect
                            x="140"
                            y="20"
                            width="40"
                            height="25"
                            rx="2"
                            fill="#80B9B6"
                            opacity="0.4"
                          />
                          <rect
                            x="10"
                            y="105"
                            width="30"
                            height="18"
                            rx="2"
                            fill="#80B9B6"
                            opacity="0.5"
                          />
                          <rect
                            x="85"
                            y="110"
                            width="28"
                            height="16"
                            rx="2"
                            fill="#80B9B6"
                            opacity="0.5"
                          />
                          <rect
                            x="145"
                            y="90"
                            width="45"
                            height="22"
                            rx="2"
                            fill="#80B9B6"
                            opacity="0.4"
                          />
                        </svg>
                        <div className="absolute top-8 left-[38%] flex flex-col items-center">
                          <div className="w-7 h-7 bg-[#00736D] rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                            <Printer className="w-3.5 h-3.5 text-white" />
                          </div>
                          <div className="w-0.5 h-2 bg-[#00736D]" />
                          <div className="w-1.5 h-1.5 bg-[#00736D] rounded-full" />
                        </div>
                        <div className="absolute top-12 right-[22%] flex flex-col items-center">
                          <div className="w-6 h-6 bg-[#80B9B6] rounded-full border-2 border-white shadow-md flex items-center justify-center">
                            <Printer className="w-3 h-3 text-white" />
                          </div>
                          <div className="w-0.5 h-1.5 bg-[#80B9B6]" />
                          <div className="w-1 h-1 bg-[#80B9B6] rounded-full" />
                        </div>
                        <div className="absolute bottom-8 left-[28%]">
                          <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md animate-pulse" />
                        </div>
                        <div className="absolute top-2 left-3 bg-white/90 rounded-lg px-2 py-1 text-[9px] font-bold text-[#002E2C] shadow-sm">
                          📍 DNSC Campus
                        </div>
                      </div>
                      <div className="p-2.5">
                        <p className="text-[#002E2C] font-bold text-[11px]">
                          Partner Shops Near You
                        </p>
                        <p className="text-[#80B9B6] text-[10px]">
                          2 shops available • &lt;5 min wait
                        </p>
                      </div>
                    </div>

                    {/* Status card */}
                    <div className="bg-gradient-to-r from-[#00736D] to-[#002E2C] rounded-2xl p-3.5 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white/70 text-[10px]">
                            Order Status
                          </p>
                          <p className="font-bold text-sm">Ready for Pickup!</p>
                        </div>
                        <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                          <Package className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-[10px] text-green-300 font-semibold">
                          Walk to the counter now
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Home indicator */}
                <div className="flex justify-center py-2">
                  <div className="w-24 h-1 bg-[#80B9B6]/40 rounded-full" />
                </div>
              </motion.div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 }}
                className="absolute -right-4 sm:-right-10 top-16 bg-white rounded-2xl shadow-2xl px-3.5 py-2.5 border border-[#E6F1F0]"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-medium">
                      Payment
                    </p>
                    <p className="text-xs font-bold text-[#002E2C]">
                      Verified ✓
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 }}
                className="absolute -left-4 sm:-left-10 bottom-28 bg-white rounded-2xl shadow-2xl px-3.5 py-2.5 border border-[#E6F1F0]"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#E6F1F0] rounded-xl flex items-center justify-center">
                    <Clock className="w-4 h-4 text-[#00736D]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-medium">
                      Wait time
                    </p>
                    <p className="text-xs font-bold text-[#002E2C]">
                      0 minutes
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Hero scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-white/40"
          >
            <span className="text-xs font-medium uppercase tracking-widest">
              Scroll
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* ── PROBLEM vs SOLUTION ── */}
      <section
        id="how-it-works"
        className="py-24 sm:py-32 bg-white"
        ref={problemSection.ref}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={problemSection.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-[#E6F1F0] text-[#00736D] text-sm font-bold rounded-full mb-4 uppercase tracking-wider">
              The Problem & The Fix
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#002E2C] mb-4 leading-tight">
              Printing shouldn't feel like a{" "}
              <span className="bg-gradient-to-r from-[#00736D] to-[#80B9B6] bg-clip-text text-transparent">
                battle.
              </span>
            </h2>
            <p className="text-[#002E2C]/60 text-lg max-w-xl mx-auto">
              We've seen the chaos every deadline day. PrintFlow was built to
              end it.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Problem Side */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={problemSection.isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1772758631784-ee39316ab8e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmludCUyMHNob3AlMjBidXN5JTIwcXVldWUlMjBjb3VudGVyfGVufDF8fHx8MTc3NjYwNDQxOHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Busy print queue"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-950/95 via-red-950/70 to-red-950/30" />
              <div className="relative p-8 sm:p-10 min-h-[420px] flex flex-col justify-end">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/20 border border-red-400/30 rounded-full mb-5 w-fit">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span className="text-red-300 text-xs font-bold uppercase tracking-wider">
                    The Old Way
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white mb-5">
                  Stressful. Slow. Unreliable.
                </h3>
                <div className="space-y-3">
                  {problems.map((p, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-500/20 border border-red-400/30 rounded-xl flex items-center justify-center flex-shrink-0 text-red-400">
                        {p.icon}
                      </div>
                      <span className="text-white/85 text-sm font-medium">
                        {p.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Solution Side */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={problemSection.isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="relative rounded-3xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1662148965079-7fbb45160973?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjBjYW1wdXMlMjBwcmludGluZyUyMGRvY3VtZW50c3xlbnwxfHx8fDE3NzY2MDQ0MTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Students happy campus"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002E2C]/95 via-[#003D3B]/70 to-[#00736D]/20" />
              <div className="relative p-8 sm:p-10 min-h-[420px] flex flex-col justify-end">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#00736D]/30 border border-[#80B9B6]/30 rounded-full mb-5 w-fit">
                  <Zap className="w-4 h-4 text-[#80B9B6]" />
                  <span className="text-[#80B9B6] text-xs font-bold uppercase tracking-wider">
                    The PrintFlow Way
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white mb-5">
                  Fast. Secure. Effortless.
                </h3>
                <div className="space-y-3">
                  {solutions.map((s, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#00736D]/30 border border-[#80B9B6]/30 rounded-xl flex items-center justify-center flex-shrink-0 text-[#80B9B6]">
                        {s.icon}
                      </div>
                      <span className="text-white/90 text-sm font-medium">
                        {s.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        id="for-students"
        className="py-24 sm:py-32 bg-gradient-to-br from-[#E6F1F0] via-[#f0f8f7] to-[#E6F1F0]"
        ref={stepsSection.ref}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={stepsSection.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-[#00736D]/10 text-[#00736D] text-sm font-bold rounded-full mb-4 uppercase tracking-wider">
              Simple Process
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#002E2C] mb-4 leading-tight">
              From upload to pickup in{" "}
              <span className="bg-gradient-to-r from-[#00736D] to-[#80B9B6] bg-clip-text text-transparent">
                3 steps.
              </span>
            </h2>
            <p className="text-[#002E2C]/60 text-lg max-w-xl mx-auto">
              No installations, no queues, no surprises — just seamless printing
              every time.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6 lg:gap-8 relative">
            {/* Connector line */}
            <div className="hidden sm:block absolute top-16 left-[18%] right-[18%] h-px bg-gradient-to-r from-transparent via-[#80B9B6]/50 to-transparent" />

            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={stepsSection.isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * i }}
              >
                <div className="relative bg-white rounded-3xl p-8 shadow-xl shadow-[#00736D]/8 border border-[#80B9B6]/15 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group h-full">
                  <div className="absolute top-4 right-5 text-7xl font-black text-[#E6F1F0] select-none pointer-events-none leading-none">
                    {step.number}
                  </div>
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-black text-[#002E2C] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#002E2C]/60 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={stepsSection.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              to="/signup"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#00736D] to-[#002E2C] text-white font-bold text-base rounded-2xl shadow-xl shadow-[#00736D]/30 hover:shadow-2xl hover:-translate-y-0.5 transition-all"
            >
              Start Printing Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── AUDIENCE SPLIT ── */}
      <section id="for-shops" className="py-0" ref={audienceSection.ref}>
        <div className="grid lg:grid-cols-2">
          {/* Students Block */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={audienceSection.isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65 }}
            className="relative py-20 px-8 sm:px-12 lg:px-16 overflow-hidden bg-gradient-to-br from-[#003D3B] to-[#002E2C]"
          >
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 45, 0] }}
                transition={{ duration: 15, repeat: Infinity }}
                className="absolute -top-20 -right-20 w-72 h-72 bg-[#00736D]/15 rounded-full blur-3xl"
              />
            </div>
            <div className="relative max-w-lg">
              <div className="w-14 h-14 bg-gradient-to-br from-[#80B9B6] to-[#00736D] rounded-2xl flex items-center justify-center mb-7 shadow-xl">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <span className="inline-block text-[#80B9B6] text-sm font-bold uppercase tracking-widest mb-4">
                For Students
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-5 leading-tight">
                Never miss a deadline again.
              </h2>
              <p className="text-[#80B9B6]/90 text-base leading-relaxed mb-8">
                Queue up before you even leave your dorm. Upload your thesis,
                assignments, or forms from anywhere — your slot is reserved the
                moment you pay.
              </p>
              <div className="space-y-3 mb-10">
                {[
                  "Upload from phone, tablet, or laptop",
                  "Live wait-time on all nearby shops",
                  "GCash payment, no cash needed",
                  "Real-time order status tracking",
                ].map((feat) => (
                  <div key={feat} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#00736D]/30 border border-[#80B9B6]/40 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#80B9B6]" />
                    </div>
                    <span className="text-white/80 text-sm font-medium">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
              <img
                src="https://images.unsplash.com/photo-1612251018789-6dcc3b631f92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwZGVhZGxpbmUlMjBsYXB0b3AlMjBzdHJlc3NlZCUyMHVuaXZlcnNpdHl8ZW58MXx8fHwxNzc2NjA0NDI0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Student studying"
                className="w-full h-44 object-cover rounded-2xl opacity-60 mb-8"
              />
              <Link
                to="/signup"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-[#002E2C] font-bold rounded-xl hover:bg-[#E6F1F0] transition-all shadow-xl"
              >
                <Smartphone className="w-4 h-4" />
                Get the App Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Shops Block */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={audienceSection.isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="relative py-20 px-8 sm:px-12 lg:px-16 overflow-hidden bg-[#E6F1F0]"
          >
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                animate={{ scale: [1.1, 1, 1.1], rotate: [20, 0, 20] }}
                transition={{ duration: 18, repeat: Infinity }}
                className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#80B9B6]/20 rounded-full blur-3xl"
              />
            </div>
            <div className="relative max-w-lg">
              <div className="w-14 h-14 bg-gradient-to-br from-[#00736D] to-[#002E2C] rounded-2xl flex items-center justify-center mb-7 shadow-xl">
                <Store className="w-7 h-7 text-white" />
              </div>
              <span className="inline-block text-[#00736D] text-sm font-bold uppercase tracking-widest mb-4">
                For Shop Owners
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#002E2C] mb-5 leading-tight">
                Increase revenue. Eliminate unpaid prints.
              </h2>
              <p className="text-[#002E2C]/65 text-base leading-relaxed mb-8">
                Every order arrives pre-paid and pre-verified. Spend less time
                chasing cash and more time growing your shop's daily output.
              </p>
              <div className="space-y-3 mb-10">
                {[
                  "Zero unpaid or abandoned orders",
                  "Digital queue management dashboard",
                  "GCash auto-settlement daily",
                  "Analytics on peak hours & revenue",
                ].map((feat) => (
                  <div key={feat} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#00736D]/15 border border-[#00736D]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#00736D]" />
                    </div>
                    <span className="text-[#002E2C]/75 text-sm font-medium">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  {
                    icon: <TrendingUp className="w-5 h-5 text-[#00736D]" />,
                    label: "Revenue Growth",
                    value: "+35%",
                  },
                  {
                    icon: <Users className="w-5 h-5 text-[#00736D]" />,
                    label: "More Customers",
                    value: "2× Daily",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-[#80B9B6]/20"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {stat.icon}
                      <span className="text-xs text-[#002E2C]/50 font-medium">
                        {stat.label}
                      </span>
                    </div>
                    <p className="text-2xl font-black text-[#002E2C]">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-[#00736D] to-[#002E2C] text-white font-bold rounded-xl hover:shadow-xl hover:shadow-[#00736D]/25 hover:-translate-y-0.5 transition-all shadow-lg"
              >
                <Store className="w-4 h-4" />
                Partner Your Shop
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 sm:py-24 bg-gradient-to-r from-[#002E2C] to-[#005550] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 right-1/4 w-80 h-80 bg-[#00736D]/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 left-1/4 w-80 h-80 bg-[#80B9B6]/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
              Ready to print smarter?
            </h2>
            <p className="text-[#80B9B6]/90 text-lg mb-10">
              Join hundreds of DNSC students already using PrintFlow to
              eliminate print-day stress.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/signup"
                  className="flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-[#002E2C] font-bold text-base rounded-2xl shadow-2xl transition-all"
                >
                  <Smartphone className="w-5 h-5" />
                  Download the App
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/signup"
                  className="flex items-center justify-center gap-2.5 px-8 py-4 bg-transparent border-2 border-[#80B9B6]/40 text-white font-bold text-base rounded-2xl hover:bg-white/10 hover:border-[#80B9B6] transition-all"
                >
                  <Store className="w-5 h-5" />
                  Partner Your Shop
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#001A19] text-white/60 pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-[#00736D] to-[#002E2C] rounded-xl flex items-center justify-center">
                  <Printer className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-extrabold text-white tracking-tight">
                  PrintFlow
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-5">
                The smart print-on-demand marketplace for DNSC students and
                local shop partners.
              </p>
              <div className="flex items-center gap-3">
                {[
                  { icon: <Facebook className="w-4 h-4" />, href: "#" },
                  { icon: <Instagram className="w-4 h-4" />, href: "#" },
                  { icon: <Twitter className="w-4 h-4" />, href: "#" },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    className="w-9 h-9 bg-white/5 hover:bg-[#00736D]/30 border border-white/10 hover:border-[#80B9B6]/40 rounded-xl flex items-center justify-center transition-all hover:text-[#80B9B6]"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
                Company
              </h4>
              <ul className="space-y-3">
                {["About Us", "How It Works", "Blog", "Careers"].map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm hover:text-[#80B9B6] transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
                Product
              </h4>
              <ul className="space-y-3">
                {[
                  "For Students",
                  "For Shop Owners",
                  "Pricing",
                  "Privacy Policy",
                ].map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm hover:text-[#80B9B6] transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
                Contact the Team
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:hello@printflow.ph"
                    className="flex items-center gap-2 text-sm hover:text-[#80B9B6] transition-colors"
                  >
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    hello@printflow.ph
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+63912345678"
                    className="flex items-center gap-2 text-sm hover:text-[#80B9B6] transition-colors"
                  >
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    +63 912 345 6789
                  </a>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  DNSC Campus, Panabo City, Davao del Norte
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-center sm:text-left">
              © {new Date().getFullYear()} PrintFlow. All rights reserved. Built
              for DNSC.
            </p>
            <div className="flex items-center gap-5">
              {["Privacy Policy", "Terms of Service", "Cookies"].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="text-xs hover:text-[#80B9B6] transition-colors"
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
