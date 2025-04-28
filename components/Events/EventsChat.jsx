"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

const EventsChat = ({ eventId, user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!eventId) return;
  
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("id, user_id, message, created_at")
        .eq("event_id", eventId)
        .order("created_at", { ascending: true });
  
      if (error) {
        console.error("Error fetching messages:", error);
        return;
      }
      setMessages(data || []);
    };
  
    fetchMessages();
  
    // Subscribe to real-time messages
    const channel = supabase
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
      supabase.removeChannel(channel);
    };
  }, [eventId]);
  
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    // Create a temporary message for instant UI update
    const tempMessage = {
      id: Date.now(), // Temporary ID
      user_id: user.id,
      message: newMessage,
    };

    setMessages((prevMessages) => [...prevMessages, tempMessage]);

    setNewMessage("");

    const { error } = await supabase.from("messages").insert([
      {
        event_id: eventId,
        user_id: user.id,
        message: newMessage,
      },
    ]);

    if (error) {
      console.error("Error sending message:", error);
    }
    await fetch('/api/auth/log-activity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user.id,
        action: 'send_message',
        metadata: {
          message: newMessage,
          event_id: eventId,
          timestamp: new Date().toISOString(),
        }
      }),

    })
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold text-center mb-4">Chatroom</h2>
      
      {/* Chat Messages */}
      <div className="border rounded-lg p-4 h-80 overflow-y-auto bg-gray-100">
        {messages.map((msg) => (
          <div key={msg.id} className={`p-2 my-2 rounded-md ${msg.user_id === user?.id ? "bg-blue-500 text-white ml-auto" : "bg-white text-gray-900"}`}>
            <p className="text-sm">{msg.message}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Field */}
      <div className="mt-4 flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow p-2 border rounded-l-lg"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white p-2 rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default EventsChat;
