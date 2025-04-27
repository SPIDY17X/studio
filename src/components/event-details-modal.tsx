
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
import { CalendarDays, MapPin, Users, UserPlus, Ticket, AlertCircle } from 'lucide-react'; // Added AlertCircle
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Import Alert components

interface EventDetailsModalProps {
  eventDetails: EventDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventDetailsModal: FC<EventDetailsModalProps> = ({ eventDetails, isOpen, onClose }) => {
  // State to hold both email and phone number after successful registration
  const [registrationDetails, setRegistrationDetails] = useState<{ email: string; phoneNumber: string } | null>(null);

  // Reset registrationDetails when the modal closes or the event changes
  useEffect(() => {
    if (!isOpen || !eventDetails) {
      setRegistrationDetails(null);
    }
  }, [isOpen, eventDetails]);

  if (!eventDetails) return null;

  const handleRegistrationSuccess = (details: { email: string; phoneNumber: string }) => {
    setRegistrationDetails(details);
    // The parent page's useEffect will handle refreshing the main event details
    // if needed (e.g., to update the attendee count display).
  };

  const isEventFull = eventDetails.registeredAttendees >= eventDetails.capacity;
  const spotsLeft = eventDetails.capacity - eventDetails.registeredAttendees;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
       {/* Adjust max-width for slightly wider modal */}
      <DialogContent className="sm:max-w-md md:max-w-lg bg-card text-card-foreground rounded-lg shadow-xl">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl font-bold text-primary">{eventDetails.name}</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground pt-1">
            {eventDetails.description}
          </DialogDescription>
        </DialogHeader>
        <Separator className="bg-border/50" />
        {/* Adjusted padding and gap */}
        <div className="p-6 pt-4 grid gap-5">
           {/* Use flex column for better alignment on smaller widths within the grid item */}
           <div className="flex items-start gap-3 text-foreground/90">
              <CalendarDays className="w-5 h-5 text-accent mt-0.5 shrink-0" /> {/* Align icon better */}
              <div>
                <span className="font-medium block">Date & Time:</span>
                <span className="text-sm">{new Date(eventDetails.dateTime).toLocaleString()}</span>
              </div>
           </div>
           <div className="flex items-start gap-3 text-foreground/90">
              <MapPin className="w-5 h-5 text-accent mt-0.5 shrink-0" />
              <div>
                <span className="font-medium block">Location:</span>
                <span className="text-sm">{eventDetails.location}</span>
              </div>
           </div>
           <div className="flex items-start gap-3 text-foreground/90">
              <Users className="w-5 h-5 text-accent mt-0.5 shrink-0" />
              <div>
                <span className="font-medium block">Capacity:</span>
                <span className="text-sm">
                    {eventDetails.registeredAttendees} / {eventDetails.capacity} Registered
                    {!isEventFull && spotsLeft <= 10 && ( // Show warning if few spots left
                        <span className="text-destructive font-semibold ml-2">({spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} left!)</span>
                    )}
                </span>
              </div>
           </div>

           <Separator className="my-2 bg-border/50" />

           {/* Registration / Ticket Section */}
           {/* Use ShadCN Alert for 'Registration Full' message */}
           {isEventFull && !registrationDetails ? (
             <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Registration Full</AlertTitle>
                <AlertDescription>
                    Unfortunately, this event has reached its maximum capacity.
                </AlertDescription>
            </Alert>
           ) : registrationDetails ? (
             // Show Ticket Confirmation if registrationDetails is set
             <TicketConfirmation
                eventDetails={eventDetails}
                userEmail={registrationDetails.email}
                userPhoneNumber={registrationDetails.phoneNumber}
             />
           ) : (
             // Show Registration Form if not full and not yet registered in this session
             <>
               <div className="flex items-center gap-3 text-foreground/90 mb-0"> {/* Reduced mb */}
                   <UserPlus className="w-5 h-5 text-accent" />
                   {/* Slightly bolder title */}
                   <span className="font-semibold text-lg">Register for this event:</span>
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
