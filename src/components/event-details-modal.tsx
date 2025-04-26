import type { FC } from 'react';
import type { EventDetails } from '@/services/event-management';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import RegistrationForm from './registration-form';
import { CalendarDays, MapPin, Users, UserPlus } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

interface EventDetailsModalProps {
  eventDetails: EventDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventDetailsModal: FC<EventDetailsModalProps> = ({ eventDetails, isOpen, onClose }) => {
  if (!eventDetails) return null;

  const handleRegistrationSuccess = () => {
    // Potentially update the UI state here if needed,
    // e.g., update registered attendee count visually.
    // For now, the toast in RegistrationForm handles user feedback.
    // We could also close the modal automatically after successful registration:
    // onClose();
  };


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
           {eventDetails.registeredAttendees < eventDetails.capacity ? (
            <>
               <Separator className="my-2 bg-border/50" />
               <div className="flex items-center gap-3 text-foreground/90 mb-2">
                   <UserPlus className="w-5 h-5 text-accent" />
                   <span className="font-medium text-lg">Register for this event:</span>
               </div>
              <RegistrationForm
                eventName={eventDetails.name}
                onRegistrationSuccess={handleRegistrationSuccess}
              />
            </>
           ) : (
               <p className="text-center font-semibold text-destructive mt-4 p-3 bg-destructive/10 rounded-md">Registration Full</p>
           )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsModal;
