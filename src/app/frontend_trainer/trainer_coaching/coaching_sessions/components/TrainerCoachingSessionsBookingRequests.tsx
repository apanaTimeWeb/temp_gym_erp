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
    <div className="bg-primary-subtle border border-border rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <CalendarCheck className="text-primary" size={20} />
          <h2 className="font-bold text-primary text-base">Client Booking Requests</h2>
          <span className="bg-primary text-on-primary text-xs font-bold px-2 py-0.5 rounded-full">
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
            className="bg-card border border-border rounded-xl p-4 flex flex-col justify-between gap-3 shadow-sm hover:shadow transition-shadow"
            data-testid={`booking-request-card-${req.id}`}
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary-subtle text-primary">
                    <User size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-sm">{req.clientName}</h3>
                    <p className="text-xs text-secondary flex items-center gap-1.5 mt-0.5">
                      <Clock size={12} /> {req.preferredDate} • {req.preferredTime}
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-input text-secondary px-2 py-0.5 rounded border border-border">
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
                className="flex-1 py-1.5 px-3 bg-primary text-on-primary hover:bg-primary-hover rounded-lg text-xs font-bold transition-colors inline-flex items-center justify-center gap-1.5"
                data-testid={`accept-booking-${req.id}`}
              >
                <CheckCircle size={14} /> Accept &amp; Schedule
              </button>
              <button
                type="button"
                onClick={() => onDecline(req.id)}
                className="py-1.5 px-3 border border-border text-secondary hover:text-danger rounded-lg text-xs font-semibold hover:bg-input transition-colors"
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
