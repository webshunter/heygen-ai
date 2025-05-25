"use client";

import { useState, useEffect } from "react";
import InteractiveAvatar from "@/components/InteractiveAvatar";
import { useRouter } from 'next/navigation';


export default function App() {

  const [isHeygenVisible, setIsHeygenVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {

    
    // Inject HeyGen streaming embed script once on mount
    const script = document.createElement("script");
    script.innerHTML = `!function(window){const host=\"https://labs.heygen.com\",url=host+\"/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJKdW5lX0hSX3B1YmxpYyIsInByZXZpZXdJ%0D%0AbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3YzLzc0NDQ3YTI3ODU5YTQ1NmM5%0D%0ANTVlMDFmMjFlZjE4MjE2XzQ1NjIwL3ByZXZpZXdfdGFsa18xLndlYnAiLCJuZWVkUmVtb3ZlQmFj%0D%0Aa2dyb3VuZCI6ZmFsc2UsImtub3dsZWRnZUJhc2VJZCI6IjZlY2ExNDQ5NDc1NzQzZDZhY2NiMTVm%0D%0AYjVjM2EzZTg2IiwidXNlcm5hbWUiOiI0ODZhN2RlNzc0N2E0OGI2YWQ2OTU5NTBjNTc0MzRhNCJ9&inIFrame=1\",clientWidth=document.body.clientWidth,wrapDiv=document.createElement(\"div\");wrapDiv.id=\"heygen-streaming-embed\";wrapDiv.classList.add('hide');const container=document.createElement(\"div\");container.id=\"heygen-streaming-container\";const stylesheet=document.createElement(\"style\");stylesheet.innerHTML=\`
  #heygen-streaming-embed {\n    z-index: 9999;\n    position: fixed;\n    left: 40px;\n    bottom: 40px;\n    width: 200px;\n    height: 200px;\n    border-radius: 50%;\n    border: 2px solid #fff;\n    box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.12);\n    transition: all linear 0.1s;\n    overflow: hidden;\n\n    opacity: 0;\n    visibility: hidden;\n  }\n  #heygen-streaming-embed.show {\n    opacity: 1;\n    visibility: visible;\n  }\n  #heygen-streaming-embed.expand {\n    \${clientWidth<540?"height: 266px; width: 96%; left: 50%; transform: translateX(-50%);":"height: 366px; width: calc(366px * 16 / 9);"}\n    border: 0;\n    border-radius: 8px;\n  }\n  #heygen-streaming-container {\n    width: 100%;\n    height: 100%;\n  }\n  #heygen-streaming-container iframe {\n    width: 100%;\n    height: 100%;\n    border: 0;\n  }\n  #heygen-close-btn {\n  border:1px solid black;\n  position: absolute;\n    top: 16px;\n    right: 24px;\n    z-index: 10000;\n    background: rgba(255,255,255,0.9);\n    border: none;\n    border-radius: 50%;\n    width: 32px;\n    height: 32px;\n    font-size: 20px;\n    color: #357A5B;\n    cursor: pointer;\n    box-shadow: 0 2px 8px rgba(0,0,0,0.08);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    transition: background 0.2s;\n  }\n  #heygen-close-btn:hover {\n    background: #357A5B;\n    color: #fff;\n  }\n  \`;const iframe=document.createElement("iframe");iframe.allowFullscreen=!1,iframe.title="Streaming Embed",iframe.role="dialog",iframe.allow="microphone",iframe.src=url;let visible=!1,initial=!1;window.addEventListener("message",(e=>{e.origin===host&&e.data&&e.data.type&&"streaming-embed"===e.data.type&&("init"===e.data.action?(initial=!0,wrapDiv.classList.toggle("show",initial)):"show"===e.data.action?(visible=!0,wrapDiv.classList.toggle("expand",visible)):"hide"===e.data.action&&(visible=!1,wrapDiv.classList.toggle("expand",visible)))})),container.appendChild(iframe),wrapDiv.appendChild(stylesheet),wrapDiv.appendChild(container);
  // Add close button
  const closeBtn = document.createElement('button');
  closeBtn.id = 'heygen-close-btn';
  closeBtn.innerHTML = '&times;';
  closeBtn.onclick = function() {
    wrapDiv.className = 'hide';
  };
  wrapDiv.appendChild(closeBtn);
  document.body.appendChild(wrapDiv)}(globalThis);`;
    document.body.appendChild(script);
    // Polling untuk memastikan class hide selalu di-set saat load
    const checkAndUpdateClass = () => {
      const el = document.getElementById("heygen-streaming-embed");
      if (el && el.className == "hide show") {
          el.className = 'hide';
      }else{
        setTimeout(checkAndUpdateClass, 1);
      }
    };
    checkAndUpdateClass();
    return () => {
      document.body.removeChild(script);
    };
  }, [isHeygenVisible]);

  return (
    <div className="w-full min-h-screen bg-[#F6FAF8] flex flex-col" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Google Fonts Import */}
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap" rel="stylesheet" />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#DDEEE5] to-[#FFF7E6] py-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <h1 className="text-2xl md:text-5xl font-extrabold text-[#357A5B] mb-4 drop-shadow-lg">
              AI Bisnis Coach untuk Anda
            </h1>
            <p className="text-xl text-[#357A5B] mb-8 font-medium">
              Dapatkan solusi bisnis yang tepat dengan konsultasi AI di sini.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src="/assets/images/ilustrasi.jpeg"
              alt="Ilustrasi AI Bisnis Coach"
              className="max-w-xs md:max-w-md rounded-2xl shadow-2xl animate-float"
              style={{ transition: 'transform 0.3s' }}
            />
          </div>
        </div>
      </section>

      {/* Konsultasi Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-[#1A2E22]">Konsultasi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Konsultasi Gratis */}
            <div className="bg-[#F6FAF8] rounded-2xl shadow-lg p-8 flex flex-col items-start hover:shadow-2xl hover:scale-105 transition-all duration-200">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-2">💬</span>
                <span className="font-bold text-lg text-[#357A5B]">Konsultasi Gratis</span>
              </div>
              <p className="mb-6 text-[#357A5B]">Coba konsultasi AI secara gratis untuk topik bisnis tertentu.</p>
              <button
                style={{ background: 'linear-gradient(90deg, #FF7A00 0%, #FFB347 100%)', color: 'white', border: 'none' }}
                className="px-6 py-3 rounded-full font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200"
                onClick={() => router.push('/chat')}
              >
                Mulai Chat
              </button>
            </div>
            {/* Konsultasi Berbayar */}
            <div className="bg-[#F6FAF8] rounded-2xl shadow-lg p-8 flex flex-col items-start hover:shadow-2xl hover:scale-105 transition-all duration-200">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-2">🧑‍💼</span>
                <span className="font-bold text-lg text-[#357A5B]">Konsultasi AI Agent</span>
              </div>
              <p className="mb-6 text-[#357A5B]">Dapatkan analisis mendalam dan sesi langsung bersama AI.</p>
              <button
                style={{ background: 'linear-gradient(90deg, #FF7A00 0%, #FFB347 100%)', color: 'white', border: 'none' }}
                className="px-6 py-3 rounded-full font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200"
                onClick={() => {
                  const el = document.getElementById("heygen-streaming-embed");
                  if (el && el.className == "hide") {
                    el.className = 'show';
                  }
                }}
              >
                Mulai Konsultasi
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
    </div>
  );
}
