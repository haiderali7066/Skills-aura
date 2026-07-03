'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Message } from '@/lib/types';
import { Search, Mail, Eye, Inbox, Filter, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    async function fetchMessages() {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setMessages(data || []);
        setFilteredMessages(data || []);
      } catch (error) {
        console.error('[v0] Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchMessages();
  }, []);

  useEffect(() => {
    let filtered = messages;
    if (searchTerm) {
      filtered = filtered.filter((m) =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (typeFilter !== 'all') {
      filtered = filtered.filter((m) => m.message_type === typeFilter);
    }
    setFilteredMessages(filtered);
  }, [searchTerm, typeFilter, messages]);

  const unreadCount = messages.filter((m) => !m.read_at).length;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-8 max-w-7xl mx-auto"
    >
      <div>
        <h1 className="text-4xl font-black uppercase tracking-tighter scale-y-110">CRM & Messages</h1>
        <p className="text-gray-400 font-medium mt-2">Manage customer inquiries and communications.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Messages', val: messages.length },
          { label: 'Unread', val: unreadCount, color: 'text-purple-400' },
          { label: 'Inquiries', val: messages.filter(m => m.message_type === 'inquiry').length }
        ].map((stat, i) => (
          <div key={i} className="bg-[#111] border border-white/5 rounded-2xl p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{stat.label}</p>
            <p className={`text-3xl font-black ${stat.color || 'text-white'}`}>{stat.val}</p>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="bg-[#111] border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-purple-500" />
          <input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:ring-1 focus:ring-purple-500 outline-none transition-all"
          />
        </div>
        <div className="relative">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="appearance-none bg-black border border-white/5 rounded-xl py-3 px-6 pr-10 text-sm text-white font-bold uppercase tracking-widest cursor-pointer hover:border-purple-500/50 transition-all"
          >
            <option value="all">All Types</option>
            <option value="inquiry">Inquiry</option>
            <option value="consultation">Consultation</option>
            <option value="general">General</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {/* List */}
      <div className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-widest text-white">Inbox ({filteredMessages.length})</h2>
        </div>
        
        <div className="divide-y divide-white/5">
          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading messages...</div>
          ) : filteredMessages.length === 0 ? (
            <div className="p-12 text-center text-gray-500">No messages found.</div>
          ) : (
            filteredMessages.map((msg) => (
              <div 
                key={msg.id} 
                className={`p-6 flex items-start justify-between hover:bg-white/[0.02] transition-colors ${!msg.read_at ? 'bg-purple-900/5' : ''}`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-white">{msg.name}</h3>
                    {!msg.read_at && <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />}
                  </div>
                  <p className="text-sm text-gray-400 font-medium">{msg.email}</p>
                  <p className="text-sm text-gray-300 pt-2">{msg.subject}</p>
                  <p className="text-xs text-gray-600 font-bold uppercase tracking-widest pt-1">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/5 text-gray-400">
                    {msg.message_type}
                  </span>
                  <button className="text-gray-500 hover:text-purple-400 transition-colors">
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}