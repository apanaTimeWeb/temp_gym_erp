"use client";

import { CalendarCheck, Clock, Dumbbell, User, CheckCircle } from 'lucide-react';

export interface ClientBookingRequest {
  id: string;
  clientName: string;
  preferredDate: string;
  preferredTime: string;
  sessionType: string;
  notes: string;
}

interface TrainerCoachingSessionsBookingRequestsProps {
  bookingRequests: ClientBookingRequest[];
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}

export function TrainerCoachingSessionsBookingRequests({
  bookingRequests,
  onAccept,
  onDecline,
}: TrainerCoachingSessionsBookingRequestsProps) {
  if (bookingRequests.length === 0) return null;

  return (
    <div className="bg-orange-500/10 border border-orange-500/25 rounded-2xl p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2.5 min-w-0">
          <span className="p-1.5 rounded-lg border border-orange-500/30 bg-orange-500/15 text-orange-500 shrink-0">
            <CalendarCheck size={18} />
          </span>
          <h2 className="font-bold text-text-primary text-base">Client Booking Requests</h2>
          <span className="bg-primary text-on-primary text-xs font-bold px-2.5 py-0.5 rounded-full shrink-0">
            {bookingRequests.length} Pending
          </span>
        </div>
        <p className="text-xs text-secondary hidden sm:block">
          Members requesting dedicated training slots
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bookingRequests.map((req) => (
          <div
            key={req.id}
            className="bg-card border border-border rounded-xl p-4 flex flex-col justify-between gap-3 shadow-sm hover:border-orange-500/35 transition-all"
            data-testid={`booking-request-card-${req.id}`}
          >
            <div>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="p-2 rounded-lg border border-sky-500/30 bg-sky-500/15 text-sky-500 shrink-0">
                    <User size={16} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-text-primary text-sm truncate">{req.clientName}</h3>
                    <p className="text-xs text-secondary flex items-center gap-1.5 mt-0.5">
                      <Clock size={12} className="text-amber-500 shrink-0" /> <span className="truncate">{req.preferredDate} • {req.preferredTime}</span>
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-300 px-2.5 py-0.5 rounded-full border border-purple-500/25 shrink-0">
                  <Dumbbell size={10} /> {req.sessionType}
                </span>
              </div>
              {req.notes && (
                <p className="text-xs text-secondary mt-2.5 bg-input p-2 rounded-lg italic">
                  &ldquo;{req.notes}&rdquo;
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-border">
              <button
                type="button"
                onClick={() => onAccept(req.id)}
                className="flex-1 py-1.5 px-3 border border-emerald-500/30 bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-500/25 rounded-lg text-xs font-bold transition-colors inline-flex items-center justify-center gap-1.5"
                data-testid={`accept-booking-${req.id}`}
              >
                <CheckCircle size={14} /> Accept &amp; Schedule
              </button>
              <button
                type="button"
                onClick={() => onDecline(req.id)}
                className="py-1.5 px-3 border border-rose-500/30 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 rounded-lg text-xs font-semibold transition-colors"
                data-testid={`decline-booking-${req.id}`}
              >
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
