
import type { FC } from 'react';
import type { EventDetails } from '@/services/event-management';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, CalendarDays, MapPin, Mail, Ticket, Phone } from 'lucide-react'; // Added Phone icon
import { Separator } from "@/components/ui/separator";

interface TicketConfirmationProps {
  eventDetails: EventDetails;
  userEmail: string;
  userPhoneNumber: string; // Added phone number prop
}

const TicketConfirmation: FC<TicketConfirmationProps> = ({ eventDetails, userEmail, userPhoneNumber }) => {
  return (
    // Enhanced styling: prominent border, slightly different background
    <Card className="w-full bg-accent/5 border-2 border-accent/50 shadow-lg mt-4 rounded-lg overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-4 p-4 bg-accent/10">
        <CheckCircle className="w-8 h-8 text-green-500 shrink-0" /> {/* Made icon slightly larger */}
        <div>
            {/* Use accent color for title */}
            <CardTitle className="text-xl font-bold text-accent">Ticket Confirmed!</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">You're successfully registered for {eventDetails.name}.</CardDescription>
        </div>
      </CardHeader>
      <Separator className="mx-4 bg-accent/30"/> {/* Use accent color for separator */}
      <CardContent className="p-4 grid gap-3 text-sm">
        <div className="flex items-start gap-3 text-foreground/90"> {/* Use items-start for potential wrapping */}
           <Ticket className="w-4 h-4 text-accent mt-0.5 shrink-0" /> {/* Adjusted icon alignment */}
           <span className="font-medium w-24 shrink-0">Event:</span> {/* Fixed width for label */}
           <span className="font-semibold">{eventDetails.name}</span> {/* Made event name bold */}
        </div>
        <div className="flex items-start gap-3 text-foreground/90">
            <CalendarDays className="w-4 h-4 text-accent mt-0.5 shrink-0" />
            <span className="font-medium w-24 shrink-0">Date & Time:</span>
            <span>{new Date(eventDetails.dateTime).toLocaleString()}</span>
        </div>
        <div className="flex items-start gap-3 text-foreground/90">
            <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
            <span className="font-medium w-24 shrink-0">Location:</span>
            <span>{eventDetails.location}</span>
        </div>
         <Separator className="my-3 bg-accent/20"/> {/* Adjusted spacing and color */}
        <div className="flex items-start gap-3 text-foreground/90">
            <Mail className="w-4 h-4 text-accent mt-0.5 shrink-0" />
            <span className="font-medium w-24 shrink-0">Registered Email:</span>
            {/* Slightly enhanced badge style */}
            <span className="font-mono text-xs bg-accent/10 text-accent-foreground/90 px-2 py-1 rounded border border-accent/20">{userEmail}</span>
        </div>
         <div className="flex items-start gap-3 text-foreground/90">
            <Phone className="w-4 h-4 text-accent mt-0.5 shrink-0" />
            <span className="font-medium w-24 shrink-0">Registered Phone:</span>
            <span className="font-mono text-xs bg-accent/10 text-accent-foreground/90 px-2 py-1 rounded border border-accent/20">{userPhoneNumber}</span>
        </div>
         <p className="text-xs text-muted-foreground mt-4 italic"> {/* Added italic */}
            Please keep this confirmation for your records. A confirmation might also be sent via email/SMS (feature not implemented).
         </p>
      </CardContent>
    </Card>
  );
};

export default TicketConfirmation;

