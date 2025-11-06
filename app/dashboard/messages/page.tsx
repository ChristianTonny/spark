'use client';

import { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useConvexAuth } from '@/lib/hooks/useConvexAuth';
import { Send, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function MessagesPage() {
  const { user, clerkUser } = useConvexAuth();
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversations = useQuery(api.messages.listConversations, user ? {} : 'skip');
  const messages = useQuery(api.messages.getMessages, selectedConvId ? { conversationId: selectedConvId as any } : 'skip');
  const sendMessage = useMutation(api.messages.sendMessage);
  const markAsRead = useMutation(api.messages.markAsRead);

  useEffect(() => {
    if (selectedConvId && messages) {
      markAsRead({ conversationId: selectedConvId as any });
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, selectedConvId]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedConvId) return;

    await sendMessage({
      conversationId: selectedConvId as any,
      text: messageText.trim(),
    });
    setMessageText('');
  };

  if (!user) {
    return <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-white border-3 border-black shadow-brutal-lg p-8 text-center">
        <h2 className="text-2xl font-black mb-4">Sign in to view messages</h2>
        <Link href="/sign-in" className="px-6 py-3 bg-primary text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all inline-block">
          Sign In
        </Link>
      </div>
    </div>;
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      <div className="border-b-3 border-black p-4">
        <Link href="/dashboard/student" className="inline-flex items-center gap-2 font-bold hover:underline">
          <ArrowLeft className="w-5 h-5" />
          Back
        </Link>
        <h1 className="text-3xl font-black mt-2">Messages</h1>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Conversations List */}
        <div className={`w-full md:w-80 border-r-3 border-black bg-white overflow-y-auto ${selectedConvId ? 'hidden md:block' : ''}`}>
          {!conversations || conversations.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600 font-bold">No conversations yet</p>
            </div>
          ) : (
            conversations.map((conv) => (
              <button
                key={conv._id}
                onClick={() => setSelectedConvId(conv._id)}
                className={`w-full p-4 border-b-2 border-gray-200 text-left hover:bg-gray-50 transition-colors ${selectedConvId === conv._id ? 'bg-brutal-yellow' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary border-2 border-black flex items-center justify-center text-white font-black">
                    {conv.otherUser?.firstName?.[0]}{conv.otherUser?.lastName?.[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black">{conv.otherUser?.firstName} {conv.otherUser?.lastName}</p>
                    <p className="text-sm text-gray-600 truncate">{conv.lastMessageText || 'Start a conversation'}</p>
                  </div>
                  {conv.unreadCount > 0 && (
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {conv.unreadCount}
                    </div>
                  )}
                </div>
              </button>
            ))
          )}
        </div>

        {/* Messages View */}
        <div className={`flex-1 flex flex-col ${!selectedConvId ? 'hidden md:flex' : ''}`}>
          {!selectedConvId ? (
            <div className="flex-1 flex items-center justify-center p-8 text-center">
              <p className="text-xl font-bold text-gray-600">Select a conversation to start messaging</p>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages?.map((msg) => {
                  const isOwn = msg.senderId === user._id;
                  return (
                    <div key={msg._id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs md:max-w-md p-3 border-2 border-black ${isOwn ? 'bg-primary text-white' : 'bg-white'}`}>
                        {!isOwn && <p className="text-xs font-black mb-1">{msg.sender?.firstName}</p>}
                        <p className="font-bold">{msg.text}</p>
                        <p className="text-xs mt-1 opacity-70">{new Date(msg.createdAt).toLocaleTimeString()}</p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Send Message Form */}
              <form onSubmit={handleSend} className="p-4 border-t-3 border-black bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-3 border-3 border-black shadow-brutal-sm focus:shadow-brutal focus:outline-none font-bold"
                  />
                  <button
                    type="submit"
                    disabled={!messageText.trim()}
                    className="px-6 py-3 bg-primary text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>

              {/* Back button for mobile */}
              <button
                onClick={() => setSelectedConvId(null)}
                className="md:hidden p-4 border-t-3 border-black bg-white font-bold uppercase text-center"
              >
                ← Back to Conversations
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
