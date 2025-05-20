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
        <div className="fixed inset-0 z-50 w-screen h-screen bg-black bg-opacity-40 backdrop-blur-sm transition-all duration-300">
          <button
            className="absolute top-4 right-4 z-50 text-[#357A5B] hover:bg-[#C7E5D2] hover:text-[#285C45] transition rounded-full p-2 text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-[#357A5B]"
            onClick={() => setShowChat(false)}
            aria-label="Tutup"
          >
            <svg width="28" height="28" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6L14 14M14 6L6 14" stroke="#357A5B" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="w-full h-full flex items-center justify-center">
            <div 
              id="heygen-streaming-embed"
              className="w-[90vw] max-w-3xl h-[80vh] max-h-[700px] bg-white rounded-lg shadow-xl overflow-hidden"
              style={{
                position: 'relative',
                zIndex: 9999,
                transition: 'all linear 0.1s',
              }}
            >
              <div id="heygen-streaming-container" className="w-full h-full">
                <iframe
                  src="https://labs.heygen.com/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJBbGVzc2FuZHJhX0NoYWlyX1NpdHRpbmdfcHVibGljIiwicHJldmlld0ltZyI6Imh0dHBzOi8vZmlsZXMyLmhleWdlbi5haS9hdmF0YXIvdjMvODllMDdiODI2ZjFjNGNiMWE1NTQ5MjAxY2RkOGY0ZDZfNTUzMDAvcHJldmlld190YXJnZXQud2VicCIsIm5lZWRSZW1vdmVCYWNrZ3JvdW5kIjpmYWxzZSwia25vd2xlZGdlQmFzZUlkIjoiZGVtby0xIiwidXNlcm5hbWUiOiI0ODZhN2RlNzc0N2E0OGI2YWQ2OTU5NTBjNTc0MzRhNCJ9&inIFrame=1&lang=id"
                  className="w-full h-full"
                  allow="microphone"
                  title="Streaming Embed"
                  role="dialog"
                  allowFullScreen={false}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
