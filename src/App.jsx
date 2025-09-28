"use client";
import { useState } from "react";
import { FaCamera, FaMapMarkerAlt, FaUsers } from "react-icons/fa";

export default function Home() {
  const [showMap, setShowMap] = useState(false);
  const [loadingCamera, setLoadingCamera] = useState(false);

  const handleCameraClick = (e) => {
    e.preventDefault();
    setLoadingCamera(true);

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (!isMobile) {
      // Desktop → buka Instagram web
      window.open("https://www.instagram.com", "_blank");
      setLoadingCamera(false);
      return;
    }

    // Buat iframe tersembunyi untuk mencoba membuka Instagram Camera
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = "instagram://camera";
    document.body.appendChild(iframe);

    const start = Date.now();

    setTimeout(() => {
      const elapsed = Date.now() - start;
      if (elapsed < 2000) {
        // Jika Instagram tidak terbuka, redirect ke App Store / Play Store
        const userAgent = navigator.userAgent || navigator.vendor;
        if (/iPad|iPhone|iPod/.test(userAgent)) {
          window.location.href =
            "https://apps.apple.com/app/instagram/id389801252";
        } else {
          window.location.href =
            "https://play.google.com/store/apps/details?id=com.instagram.android";
        }
      } 
      document.body.removeChild(iframe);
      setLoadingCamera(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-600 to-orange-500 text-white flex flex-col items-center px-4 py-10 relative">
      {/* Logo */}
      <img src="src/assets/Logo.png" alt="Logo" className="w-60 mb-6" />

      {/* Judul */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-12 leading-tight">
        DAPATKAN <br /> KOPI GRATIS
      </h1>

      {/* Langkah-langkah */}
      <div className="w-full max-w-2xl space-y-6">
        <div className="flex bg-white text-black p-6 rounded-2xl items-start gap-4 shadow-lg">
          <div className="text-3xl font-extrabold text-red-600">1.</div>
          <p className="text-lg">
            Ambil foto orang parade atau foto bareng orang parade.
          </p>
        </div>

        <div className="flex bg-white text-black p-6 rounded-2xl items-start gap-4 shadow-lg">
          <div className="text-3xl font-extrabold text-red-600">2.</div>
          <p className="text-lg">
            Upload di Instagram Story, lalu tag <strong>@Lionparcelid</strong>{" "}
            dan pakai hashtag <strong>#BigPaketnyaFastSampainya</strong>.
          </p>
        </div>

        <div className="flex bg-white text-black p-6 rounded-2xl items-start gap-4 shadow-lg">
          <div className="text-3xl font-extrabold text-red-600">3.</div>
          <p className="text-lg">
            Tunjukkan bukti Instastory kamu di lokasi penukaran untuk klaim
            hadiah.
          </p>
        </div>
      </div>

      {/* Tombol CTA */}
      <div className="flex flex-col md:flex-row gap-6 mt-12">
        {/* Kamera */}
        <button
          onClick={handleCameraClick}
          className="flex flex-col items-center bg-transparent text-white hover:opacity-90 transition relative"
          disabled={loadingCamera}
        >
          {loadingCamera && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <FaCamera className="text-5xl mb-2" />
          <span className="text-lg font-medium">Ambil Foto Sekarang</span>
        </button>

        {/* Lokasi Penukaran */}
        <button
          onClick={() => setShowMap(true)}
          className="flex flex-col items-center bg-transparent text-white hover:opacity-90 transition"
        >
          <FaMapMarkerAlt className="text-5xl mb-2" />
          <span className="text-lg font-medium">Lokasi Penukaran</span>
        </button>

        {/* Temukan Orang Parade */}
        <a
          href="#"
          className="flex flex-col items-center bg-transparent text-white hover:opacity-90 transition"
        >
          <FaUsers className="text-5xl mb-2" />
          <span className="text-lg font-medium">Temukan Orang Parade</span>
        </a>
      </div>

      {/* Modal Popup Google Maps */}
      {showMap && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl p-4 relative">
            <button
              onClick={() => setShowMap(false)}
              className="absolute top-3 right-3 text-2xl text-black hover:text-red-600"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-black mb-4 text-center">
              Lokasi Penukaran Kopi Gratis
            </h2>
            <iframe
              src="https://www.google.com/maps/d/embed?mid=1unSJbe-VCZ-nIyUQt1u11F1k_qpd3cM&ehbc=2E312F"
              width="100%"
              height="480"
              className="rounded-xl border-0"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
