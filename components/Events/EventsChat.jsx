"use client"; // Required for Next.js App Router

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const EventChat = ({ eventId, user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Fetch initial chat messages
    const fetchMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("event_id", eventId)
        .order("created_at", { ascending: true });
      setMessages(data || []);
    };

    fetchMessages();

    // Listen for new messages in real-time
    const subscription = supabase
      .channel(`chat-${eventId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prevMessages) => [...prevMessages, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [eventId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    await supabase.from("messages").insert([
      { event_id: eventId, user_id: user.id, message: newMessage },
    ]);
    setNewMessage("");
  };

  return (
    <div className="p-4 border rounded-lg">
      <div className="h-60 overflow-y-scroll">
        {messages.map((msg) => (
          <p key={msg.id} className="p-2 border-b">{msg.message}</p>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="border p-2 w-full"
      />
      <button onClick={sendMessage} className="bg-blue-500 text-white p-2 w-full mt-2">
        Send
      </button>
    </div>
  );
};

export default EventChat;
