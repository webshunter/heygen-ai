"use client";
import { useState, useRef, useEffect } from "react";
import { set, get } from "idb-keyval";
import Link from "next/link";

export default function ChatPage() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{id: number, title: string}[]>([]);
  const [activeHistory, setActiveHistory] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
    if (!input.trim()) return;
    let currentHistoryId = activeHistory;
    // If no active chat, create a new one
    if (currentHistoryId === null) {
      const newId = Date.now();
      const newTitle = `Chat ${history.length + 1}`;
      setHistory([{ id: newId, title: newTitle }, ...history]);
      setActiveHistory(newId);
      setMessages([]);
      currentHistoryId = newId;
    }
    setMessages((msgs) => [...msgs, { role: "user", content: input }]);
    const userMessage = input;
    setInput("");

    // Loading
    setMessages((msgs) => [
      ...msgs,
      { role: "assistant", content: "..." }
    ]);

    try {
      const res = await fetch("https://n8n.gugusdarmayanto.my.id/webhook-test/groq-webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs.slice(0, -1),
        { role: "assistant", content: data.aiResponse || "Tidak ada balasan." }
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

  // Delete chat
  const handleDeleteChat = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    if (activeHistory === id) {
      if (newHistory.length > 0) {
        setActiveHistory(newHistory[0].id);
        const savedMessages = (await get(`chat-messages-${newHistory[0].id}`)) || [];
        setMessages(savedMessages);
      } else {
        setActiveHistory(null);
        setMessages([]);
      }
    }
    await set(`chat-messages-${id}`, null);
  };

  // Rename chat
  const handleRenameChat = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingTitle(id);
    const chat = history.find(item => item.id === id);
    if (chat) {
      setNewTitle(chat.title);
    }
  };

  // Save new title
  const handleSaveTitle = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTitle !== null) {
      setHistory(history.map(item => 
        item.id === editingTitle ? { ...item, title: newTitle } : item
      ));
      setEditingTitle(null);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F6FAF8]">
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#357A5B] text-white p-2 rounded-lg shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar Histori */}
      <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static inset-y-0 left-0 z-40 w-64 bg-white text-[#357A5B] h-screen transition-transform duration-300 ease-in-out border-r border-[#285C45]`}>
        <div className="p-4 pb-0">
          <Link href="/" className="flex items-center gap-2 mb-6 border border-[#357A5B] shadow-sm px-2 py-1 rounded-md text-[#357A5B] font-semibold bg-white hover:bg-[#357A5B] hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#357A5B]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Kembali</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto p-4 pt-0">
          <div className="text-lg font-bold mb-4">Histori</div>
          <div className="flex flex-col gap-1">
            {history.map((item) => (
              <div
                key={item.id}
                className={`group relative flex items-center rounded transition ${
                  activeHistory === item.id ? "bg-[#FF7A00] text-white" : "hover:bg-[#F6FAF8] text-[#357A5B]"
                }`}
              >
                {editingTitle === item.id ? (
                  <form onSubmit={handleSaveTitle} className="flex-1 px-3 py-2">
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-2 py-1 rounded border focus:outline-none focus:ring-2 focus:ring-[#FF7A00] text-black"
                      autoFocus
                    />
                  </form>
                ) : (
                  <button
                    onClick={() => {
                      handleSwitchChat(item.id);
                      setIsSidebarOpen(false);
                    }}
                    className="flex-1 text-left px-3 py-2 truncate"
                  >
                    {item.title}
                  </button>
                )}
                <div className="absolute right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => handleRenameChat(item.id, e)}
                    className="p-1 hover:bg-[#F6FAF8] rounded"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={(e) => handleDeleteChat(item.id, e)}
                    className="p-1 hover:bg-[#F6FAF8] rounded"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 border-t border-[#285C45]">
          <button
            className="w-full bg-[#357A5B] text-white py-2 rounded hover:bg-[#285C45] transition font-bold flex items-center justify-center gap-2 shadow"
            onClick={() => {
              handleNewChat();
              setIsSidebarOpen(false);
            }}
          >
            <span>+</span> Chat Baru
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Area Chat */}
      <div className="flex-1 flex flex-col h-screen bg-[#F6FAF8]">
        <header className="p-4 md:p-6 text-xl md:text-2xl font-bold text-center text-[#357A5B] bg-white shadow border-b border-[#F6FAF8]">
          Konsultasi AI Bisnis
        </header>
        <main className="flex-1 overflow-y-auto px-2 md:px-4 py-4 md:py-8">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-[#357A5B] px-4">
              <div className="text-xl md:text-3xl font-bold mb-4 text-center">Selamat Datang di Konsultasi AI Bisnis</div>
              <div className="mb-2">Contoh pertanyaan:</div>
              <div className="flex flex-col gap-2 text-sm md:text-base w-full max-w-md">
                <div className="bg-white border border-[#357A5B] rounded px-4 py-2">Apa itu HUBUNK?</div>
                <div className="bg-white border border-[#357A5B] rounded px-4 py-2">Bagaimana cara meningkatkan penjualan UMKM?</div>
                <div className="bg-white border border-[#357A5B] rounded px-4 py-2">Bagaimana cara membuat website bisnis?</div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 max-w-2xl mx-auto">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`px-3 md:px-4 py-2 md:py-3 rounded-2xl max-w-[85%] md:max-w-[60%] text-sm md:text-base whitespace-pre-line shadow-sm ${
                      msg.role === "user"
                        ? "bg-[#FF7A00] text-white"
                        : "bg-white text-[#357A5B] border border-[#F6FAF8]"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          )}
        </main>
        <form
          onSubmit={handleSend}
          className="p-2 md:p-4 bg-white border-t border-[#F6FAF8]"
        >
          <div className="flex gap-2 max-w-2xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik pesan Anda..."
              className="flex-1 px-3 py-2 md:py-3 rounded-lg border border-[#357A5B] focus:outline-none focus:ring-2 focus:ring-[#FF7A00] text-sm md:text-base"
            />
            <button
              type="submit"
              className="bg-[#FF7A00] text-white px-4 py-2 md:py-3 rounded-lg hover:bg-[#FF8C1A] transition font-bold shadow"
            >
              Kirim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 