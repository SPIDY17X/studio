
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
    <Card className="w-full bg-primary/5 border-accent shadow-md mt-4">
      <CardHeader className="flex flex-row items-center gap-3 pb-3">
        <CheckCircle className="w-7 h-7 text-green-600" />
        <div>
            <CardTitle className="text-lg font-semibold text-accent">Ticket Confirmed!</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">You are registered for {eventDetails.name}.</CardDescription>
        </div>
      </CardHeader>
      <Separator className="mx-6 bg-border/30"/>
      <CardContent className="p-6 grid gap-3 text-sm">
        <div className="flex items-center gap-3 text-foreground/90">
           <Ticket className="w-4 h-4 text-accent" />
           <span className="font-medium">Event:</span>
           <span>{eventDetails.name}</span>
        </div>
        <div className="flex items-center gap-3 text-foreground/90">
            <CalendarDays className="w-4 h-4 text-accent" />
            <span className="font-medium">Date & Time:</span>
            <span>{new Date(eventDetails.dateTime).toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-3 text-foreground/90">
            <MapPin className="w-4 h-4 text-accent" />
            <span className="font-medium">Location:</span>
            <span>{eventDetails.location}</span>
        </div>
         <Separator className="my-2 bg-border/30"/>
        <div className="flex items-center gap-3 text-foreground/90">
            <Mail className="w-4 h-4 text-accent" />
            <span className="font-medium">Registered Email:</span>
            <span className="font-mono text-xs bg-muted px-2 py-1 rounded">{userEmail}</span>
        </div>
         <div className="flex items-center gap-3 text-foreground/90">
            <Phone className="w-4 h-4 text-accent" />
            <span className="font-medium">Registered Phone:</span>
            <span className="font-mono text-xs bg-muted px-2 py-1 rounded">{userPhoneNumber}</span>
        </div>
         <p className="text-xs text-muted-foreground mt-3">Keep this confirmation for your records. You might receive an email or SMS confirmation as well (feature not implemented).</p>
      </CardContent>
    </Card>
  );
};

export default TicketConfirmation;
