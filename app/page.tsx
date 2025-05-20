"use client";

import { useState } from "react";
import InteractiveAvatar from "@/components/InteractiveAvatar";

export default function App() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="w-full min-h-screen bg-[#F6FAF8] flex flex-col">
      {/* Hero Section */}
      <section className="bg-[#DDEEE5] py-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-[#357A5B] mb-4">AI Bisnis Coach untuk UMKM Anda</h1>
            <p className="text-lg text-[#357A5B] mb-6">Dapatkan solusi bisnis yang tepat dengan konsultasi AI di sini.</p>
            <button
              className="bg-[#357A5B] text-white px-6 py-3 rounded font-semibold shadow hover:bg-[#285C45] transition"
              onClick={() => setShowChat(true)}
            >
              Coba Konsultasi Gratis
            </button>
          </div>
          <div className="flex-1 flex justify-center">
            <img src="/ai-business-coach.png" alt="AI Business Coach" className="w-[320px] shadow-lg rounded" />
          </div>
        </div>
      </section>

      {/* Konsultasi Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-[#1A2E22]">Konsultasi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Konsultasi Gratis */}
            <div className="bg-[#F6FAF8] rounded-lg shadow p-8 flex flex-col items-start">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-2">💬</span>
                <span className="font-bold text-lg text-[#357A5B]">Konsultasi Gratis</span>
              </div>
              <p className="mb-6 text-[#357A5B]">Coba konsultasi AI secara gratis untuk topik bisnis tertentu.</p>
              <button
                className="border border-[#357A5B] text-[#357A5B] px-5 py-2 rounded hover:bg-[#357A5B] hover:text-white transition font-semibold"
                onClick={() => setShowChat(true)}
              >
                Mulai Chat
              </button>
            </div>
            {/* Konsultasi Berbayar */}
            <div className="bg-[#F6FAF8] rounded-lg shadow p-8 flex flex-col items-start">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-2">🧑‍💼</span>
                <span className="font-bold text-lg text-[#357A5B]">Konsultasi Berbayar</span>
              </div>
              <p className="mb-6 text-[#357A5B]">Dapatkan analisis mendalam dan sesi langsung bersama AI.</p>
              <button className="bg-[#357A5B] text-white px-5 py-2 rounded font-semibold shadow hover:bg-[#285C45] transition">
                Lihat Detail
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-[#F6FAF8]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-[#1A2E22]">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Professional */}
            <div className="bg-white rounded-lg shadow p-8 flex flex-col items-start">
              <span className="font-bold text-lg text-[#357A5B] mb-2">Professional</span>
              <span className="text-2xl font-bold mb-2">Rp 299.000/bulan</span>
              <ul className="mb-6 text-[#357A5B] text-sm list-disc pl-5">
                <li>Konsultasi teks & video dengan AI</li>
                <li>Semua topik bisnis</li>
                <li>Durasi 60 menit/sesi</li>
                <li>Laporan PDF</li>
                <li>Prioritas dukungan</li>
              </ul>
              <button className="bg-[#357A5B] text-white px-5 py-2 rounded font-semibold shadow hover:bg-[#285C45] transition">Pilih</button>
            </div>
            {/* Enterprise */}
            <div className="bg-white rounded-lg shadow p-8 flex flex-col items-start">
              <span className="font-bold text-lg text-[#357A5B] mb-2">Enterprise</span>
              <span className="text-2xl font-bold mb-2">Rp 999.000/bulan</span>
              <ul className="mb-6 text-[#357A5B] text-sm list-disc pl-5">
                <li>Semua fitur Professional</li>
                <li>Konsultasi tak terbatas</li>
                <li>Analisis data bisnis</li>
                <li>Perencanaan strategis</li>
                <li>Dukungan 24/7</li>
              </ul>
              <button className="bg-[#357A5B] text-white px-5 py-2 rounded font-semibold shadow hover:bg-[#285C45] transition">Pilih</button>
            </div>
            {/* Starter */}
            <div className="bg-white rounded-lg shadow p-8 flex flex-col items-start">
              <span className="font-bold text-lg text-[#357A5B] mb-2">Starter</span>
              <span className="text-2xl font-bold mb-2">Rp 0/bulan</span>
              <ul className="mb-6 text-[#357A5B] text-sm list-disc pl-5">
                <li>Konsultasi teks dengan AI</li>
                <li>Topik terbatas basic</li>
                <li>Durasi 15 menit/sesi</li>
              </ul>
              <button className="border border-[#357A5B] text-[#357A5B] px-5 py-2 rounded hover:bg-[#357A5B] hover:text-white transition font-semibold">Pilih</button>
            </div>
          </div>
        </div>
      </section>

      {/* Tentang Kami Section */}
      <section className="py-16 px-4 bg-[#DDEEE5]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#1A2E22]">Tentang Kami</h2>
          <p className="text-[#357A5B] text-lg">Kami adalah platform konsultasi bisnis untuk membantu UMKM meraih kesuksesan melalui teknologi AI.</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#1A2E22]">FAQ</h2>
          {/* FAQ content can be added here */}
        </div>
      </section>

      {/* Modal Popup for Chat */}
      {showChat && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black bg-opacity-40 backdrop-blur-sm transition-all duration-300 w-screen h-screen">
          <div className="flex flex-col h-full w-full bg-white animate-fadeInUp">
            {/* Header Popup */}
            <div className="flex flex-col gap-1 px-4 sm:px-8 pt-4 sm:pt-6 pb-2 sm:pb-3 border-b border-[#DDEEE5] bg-[#DDEEE5]">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-[#357A5B]">AI Bisnis Chat</span>
                <button
                  className="text-[#357A5B] hover:bg-[#C7E5D2] hover:text-[#285C45] transition rounded-full p-1.5 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-[#357A5B]"
                  onClick={() => setShowChat(false)}
                  aria-label="Tutup"
                >
                  <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 6L14 14M14 6L6 14" stroke="#357A5B" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <span className="text-sm text-[#357A5B] opacity-80 font-normal mt-1 mb-2">Konsultasi bisnis AI untuk UMKM. Mulai chat gratis sekarang!</span>
            </div>
            <div className="flex-1 flex flex-col md:flex-row w-full h-full bg-[#F6FAF8]">
              {/* Area Video/Avatar */}
              <div className="flex-1 flex items-center justify-center min-h-[220px] bg-[#DDEEE5] md:border-r border-[#DDEEE5] p-0 md:p-6">
                <div className="w-full max-w-2xl aspect-video bg-[#F6FAF8] rounded-xl shadow-lg flex items-center justify-center overflow-hidden">
                  <InteractiveAvatar />
                </div>
              </div>
              {/* Area Chat (jika ada chat/message history, bisa diletakkan di sini) */}
              {/* <div className="w-full md:w-[400px] flex flex-col bg-white p-4 shadow-xl h-full overflow-y-auto"></div> */}
            </div>
          </div>
          <style jsx global>{`
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(40px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeInUp {
              animation: fadeInUp 0.4s cubic-bezier(0.4,0,0.2,1);
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
