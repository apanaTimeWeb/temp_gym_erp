"use client";
import React, { useState } from 'react';
import { X, Send, Megaphone, Loader2, CheckCircle2, MessageSquare, Mail, Bell } from 'lucide-react';

interface TrainerMembersBroadcastModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TrainerMembersBroadcastModal({
  isOpen,
  onClose,
}: TrainerMembersBroadcastModalProps) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [audience, setAudience] = useState<'ALL' | 'PT_ONLY' | 'ATTENTION_ONLY'>('ALL');
  const [channel, setChannel] = useState<'WHATSAPP' | 'EMAIL' | 'PUSH'>('WHATSAPP');
  const [isSending, setIsSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSending(true);
    // Simulate instantaneous delivery
    setTimeout(() => {
      setIsSending(false);
      setSuccessMsg(`Announcement successfully broadcasted to ${
        audience === 'ALL' ? 'all 10 trainees' : audience === 'PT_ONLY' ? '7 active 1-on-1 PT clients' : '3 trainees needing attention'
      } via ${channel === 'WHATSAPP' ? 'WhatsApp' : channel === 'EMAIL' ? 'Email' : 'In-App Notification'}!`);
      setTimeout(() => {
        setSuccessMsg(null);
        setSubject('');
        setMessage('');
        onClose();
      }, 1800);
    }, 700);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="broadcast-modal-title"
      data-testid="trainer_members-broadcast-modal"
    >
      <div className="my-auto bg-card border border-border rounded-2xl w-full max-w-lg flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-header shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Megaphone size={16} />
            </div>
            <div>
              <h3 id="broadcast-modal-title" className="text-sm font-bold text-primary">
                Broadcast Announcement to Trainees
              </h3>
              <p className="text-xs text-secondary">Send instant updates, workout cues, or batch alerts</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-secondary hover:text-primary p-1.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSend} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">
              Target Audience
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setAudience('ALL')}
                className={`p-2.5 rounded-xl border text-xs font-semibold text-center motion-safe:transition-all ${
                  audience === 'ALL'
                    ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary'
                    : 'border-border bg-input text-secondary hover:text-primary'
                }`}
              >
                All Trainees (10)
              </button>
              <button
                type="button"
                onClick={() => setAudience('PT_ONLY')}
                className={`p-2.5 rounded-xl border text-xs font-semibold text-center motion-safe:transition-all ${
                  audience === 'PT_ONLY'
                    ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary'
                    : 'border-border bg-input text-secondary hover:text-primary'
                }`}
              >
                PT Clients (7)
              </button>
              <button
                type="button"
                onClick={() => setAudience('ATTENTION_ONLY')}
                className={`p-2.5 rounded-xl border text-xs font-semibold text-center motion-safe:transition-all ${
                  audience === 'ATTENTION_ONLY'
                    ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary'
                    : 'border-border bg-input text-secondary hover:text-primary'
                }`}
              >
                Attention (3)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">
              Channel
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setChannel('WHATSAPP')}
                className={`flex-1 flex items-center justify-center gap-1.5 p-2 rounded-xl border text-xs font-semibold motion-safe:transition-all ${
                  channel === 'WHATSAPP'
                    ? 'border-success bg-success/15 text-success ring-1 ring-success'
                    : 'border-border bg-input text-secondary hover:text-primary'
                }`}
              >
                <MessageSquare size={14} />
                WhatsApp
              </button>
              <button
                type="button"
                onClick={() => setChannel('EMAIL')}
                className={`flex-1 flex items-center justify-center gap-1.5 p-2 rounded-xl border text-xs font-semibold motion-safe:transition-all ${
                  channel === 'EMAIL'
                    ? 'border-info bg-info/15 text-info ring-1 ring-info'
                    : 'border-border bg-input text-secondary hover:text-primary'
                }`}
              >
                <Mail size={14} />
                Email
              </button>
              <button
                type="button"
                onClick={() => setChannel('PUSH')}
                className={`flex-1 flex items-center justify-center gap-1.5 p-2 rounded-xl border text-xs font-semibold motion-safe:transition-all ${
                  channel === 'PUSH'
                    ? 'border-warning bg-warning/15 text-warning ring-1 ring-warning'
                    : 'border-border bg-input text-secondary hover:text-primary'
                }`}
              >
                <Bell size={14} />
                App Push
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="broadcast-subject" className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">
              Announcement Title / Subject
            </label>
            <input
              id="broadcast-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Schedule Update: Tomorrow's Morning Turf Training"
              className="w-full min-h-11 px-4 bg-input border border-border rounded-lg text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            />
          </div>

          <div>
            <label htmlFor="broadcast-message" className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">
              Message Content *
            </label>
            <textarea
              id="broadcast-message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="Type your coaching announcement or motivational check-in..."
              className="w-full p-3 bg-input border border-border rounded-lg text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            />
          </div>

          {successMsg && (
            <div className="p-3 rounded-lg bg-success/15 text-success border border-success/30 flex items-center gap-2 text-xs font-medium">
              <CheckCircle2 size={16} />
              <span>{successMsg}</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              disabled={isSending}
              className="min-h-10 px-4 rounded-lg border border-border text-xs font-semibold text-primary hover:bg-input"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSending || !message.trim()}
              className="min-h-10 px-5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring flex items-center gap-1.5 disabled:opacity-60"
            >
              {isSending ? (
                <>
                  <Loader2 size={14} className="motion-safe:animate-spin" />
                  Sending Broadcast...
                </>
              ) : (
                <>
                  <Send size={14} />
                  Send Broadcast
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

