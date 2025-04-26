import { FC, useState, useEffect } from 'react';
import type { EventDetails } from '@/services/event-management';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import RegistrationForm from './registration-form';
import TicketConfirmation from './ticket-confirmation'; // Import the new component
import { CalendarDays, MapPin, Users, UserPlus, Ticket } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

interface EventDetailsModalProps {
  eventDetails: EventDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventDetailsModal: FC<EventDetailsModalProps> = ({ eventDetails, isOpen, onClose }) => {
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);

  // Reset registeredEmail when the modal closes or the event changes
  useEffect(() => {
    if (!isOpen || !eventDetails) {
      setRegisteredEmail(null);
    }
  }, [isOpen, eventDetails]);

  if (!eventDetails) return null;

  const handleRegistrationSuccess = (email: string) => {
    setRegisteredEmail(email);
    // The parent page's useEffect will handle refreshing the main event details
    // if needed (e.g., to update the attendee count display).
  };

  const isEventFull = eventDetails.registeredAttendees >= eventDetails.capacity;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px] bg-card text-card-foreground rounded-lg shadow-xl">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl font-bold text-primary">{eventDetails.name}</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground pt-1">
            {eventDetails.description}
          </DialogDescription>
        </DialogHeader>
        <Separator className="bg-border/50" />
        <div className="p-6 grid gap-4">
           <div className="flex items-center gap-3 text-foreground/90">
              <CalendarDays className="w-5 h-5 text-accent" />
              <span className="font-medium">Date & Time:</span>
              <span>{new Date(eventDetails.dateTime).toLocaleString()}</span>
           </div>
           <div className="flex items-center gap-3 text-foreground/90">
              <MapPin className="w-5 h-5 text-accent" />
              <span className="font-medium">Location:</span>
              <span>{eventDetails.location}</span>
           </div>
           <div className="flex items-center gap-3 text-foreground/90">
              <Users className="w-5 h-5 text-accent" />
              <span className="font-medium">Capacity:</span>
              <span>{eventDetails.registeredAttendees} / {eventDetails.capacity}</span>
           </div>

           <Separator className="my-2 bg-border/50" />

           {/* Registration / Ticket Section */}
           {isEventFull && !registeredEmail ? (
             <p className="text-center font-semibold text-destructive mt-4 p-3 bg-destructive/10 rounded-md">Registration Full</p>
           ) : registeredEmail ? (
             // Show Ticket Confirmation if registeredEmail is set
             <TicketConfirmation eventDetails={eventDetails} userEmail={registeredEmail} />
           ) : (
             // Show Registration Form if not full and not yet registered in this session
             <>
               <div className="flex items-center gap-3 text-foreground/90 mb-2">
                   <UserPlus className="w-5 h-5 text-accent" />
                   <span className="font-medium text-lg">Register for this event:</span>
               </div>
               <RegistrationForm
                 eventName={eventDetails.name}
                 onRegistrationSuccess={handleRegistrationSuccess}
               />
             </>
           )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsModal;