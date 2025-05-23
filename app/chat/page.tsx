"use client";
import { useState, useRef, useEffect } from "react";
import { set, get } from "idb-keyval";

export default function ChatPage() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{id: number, title: string}[]>([]);
  const [activeHistory, setActiveHistory] = useState<number | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Load history and messages from IndexedDB
  useEffect(() => {
    (async () => {
      const savedHistory = (await get("chat-history")) || [];
      setHistory(savedHistory);
      if (savedHistory.length > 0) {
        setActiveHistory(savedHistory[0].id);
        const savedMessages = (await get(`chat-messages-${savedHistory[0].id}`)) || [];
        setMessages(savedMessages);
      }
    })();
  }, []);

  // Save messages to IndexedDB when changed
  useEffect(() => {
    if (activeHistory !== null) {
      set(`chat-messages-${activeHistory}`, messages);
    }
  }, [messages, activeHistory]);

  // Save history to IndexedDB when changed
  useEffect(() => {
    set("chat-history", history);
  }, [history]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || activeHistory === null) return;
    setMessages((msgs) => [...msgs, { role: "user", content: input }]);
    const userMessage = input;
    setInput("");

    // Loading
    setMessages((msgs) => [
      ...msgs,
      { role: "assistant", content: "..." }
    ]);

    try {
      const res = await fetch("https://your-n8n-domain/webhook/chat-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs.slice(0, -1),
        { role: "assistant", content: data.reply || "Tidak ada balasan." }
      ]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs.slice(0, -1),
        { role: "assistant", content: "Gagal terhubung ke server." }
      ]);
    }
  };

  // Start new chat
  const handleNewChat = () => {
    const newId = Date.now();
    const newTitle = `Chat ${history.length + 1}`;
    setHistory([{ id: newId, title: newTitle }, ...history]);
    setActiveHistory(newId);
    setMessages([]);
  };

  // Switch chat
  const handleSwitchChat = async (id: number) => {
    setActiveHistory(id);
    const savedMessages = (await get(`chat-messages-${id}`)) || [];
    setMessages(savedMessages);
  };

  return (
    <div className="min-h-screen flex bg-[#F6FAF8]">
      {/* Sidebar Histori */}
      <aside className="hidden md:flex flex-col w-60 bg-white border-r min-h-screen p-4 gap-4 sticky top-0">
        <div className="text-lg font-bold text-[#357A5B] mb-2">Histori</div>
        <div className="flex-1 flex flex-col gap-1">
          {history.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSwitchChat(item.id)}
              className={`text-left px-3 py-2 rounded transition ${
                activeHistory === item.id
                  ? "bg-[#FF7A00] text-white"
                  : "hover:bg-[#F6FAF8] text-[#357A5B]"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
        <button
          className="mt-2 bg-[#357A5B] text-white rounded px-3 py-2 font-bold hover:bg-[#285C45] transition"
          onClick={handleNewChat}
        >
          + Chat Baru
        </button>
      </aside>
      {/* Area Chat */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white shadow p-4 text-xl font-bold text-[#357A5B] text-center sticky top-0 z-10">
          Konsultasi AI Bisnis
        </header>
        <main className="flex-1 overflow-y-auto px-2 md:px-0">
          <div className="max-w-2xl mx-auto py-8 flex flex-col gap-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-[80%] md:max-w-[60%] text-base md:text-lg whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-[#FF7A00] text-white"
                      : "bg-white text-[#357A5B] border"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        </main>
        <form
          onSubmit={handleSend}
          className="bg-white p-4 flex gap-2 items-center max-w-2xl mx-auto w-full sticky bottom-0"
        >
          <input
            type="text"
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF7A00] text-base md:text-lg"
            placeholder="Ketik pesan..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#FF7A00] text-white px-6 py-2 rounded-full font-bold hover:scale-105 transition-all duration-200"
          >
            Kirim
          </button>
        </form>
      </div>
    </div>
  );
} 