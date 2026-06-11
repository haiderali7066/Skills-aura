'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Message } from '@/lib/types';
import { Search, Mail, Eye } from 'lucide-react';

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
      filtered = filtered.filter((message) =>
        message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter((message) => message.message_type === typeFilter);
    }

    setFilteredMessages(filtered);
  }, [searchTerm, typeFilter, messages]);

  const unreadCount = messages.filter((m) => !m.read_at).length;
  const inquiriesCount = messages.filter((m) => m.message_type === 'inquiry').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Messages & CRM</h1>
        <p className="text-muted-foreground mt-1">Manage customer inquiries and communications</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Messages</p>
              <p className="text-3xl font-bold">{messages.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Unread</p>
              <p className="text-3xl font-bold text-yellow-600">{unreadCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Inquiries</p>
              <p className="text-3xl font-bold">{inquiriesCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-input bg-background"
            >
              <option value="all">All Types</option>
              <option value="inquiry">Inquiry</option>
              <option value="consultation">Consultation</option>
              <option value="general">General</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <Card>
        <CardHeader>
          <CardTitle>Messages ({filteredMessages.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading messages...</div>
          ) : filteredMessages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No messages found</div>
          ) : (
            <div className="space-y-3">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start justify-between p-4 border rounded-lg transition-colors ${
                    !message.read_at
                      ? 'bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900'
                      : 'border-border hover:bg-muted/50'
                  }`}
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{message.name}</h3>
                      {!message.read_at && (
                        <span className="w-2 h-2 bg-blue-600 rounded-full dark:bg-blue-400" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{message.email}</p>
                    <p className="text-sm mt-2">{message.subject}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(message.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary">
                      {message.message_type}
                    </span>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
