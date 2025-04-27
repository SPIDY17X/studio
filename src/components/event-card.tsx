
import type { FC, ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// Corrected import path if needed, but assuming lucide-react is correct based on page.tsx usage
import { Ticket, CalendarDays, MapPin, Ban } from 'lucide-react'; // Added Ban icon
import { cn } from '@/lib/utils'; // Import cn utility

interface EventCardProps {
  eventName: string;
  shortDescription: string;
  date: string;
  location: string;
  icon: ReactNode; // Keep accepting icon as ReactNode
  isPast: boolean; // New prop to indicate if event is past
  onRegisterClick: () => void;
}

const EventCard: FC<EventCardProps> = ({ eventName, shortDescription, date, location, icon, isPast, onRegisterClick }) => {
  return (
    <Card className={cn(
      "w-full max-w-sm overflow-hidden shadow-lg transition-all duration-300 ease-in-out", // Added transition-all
      isPast ? "opacity-60 bg-muted/50 cursor-not-allowed" : "hover:shadow-xl hover:-translate-y-1" // Added hover effect
    )}>
      <CardHeader className="flex flex-row items-center gap-4 p-4 bg-primary/10">
        <div className={cn("text-primary", isPast && "text-muted-foreground")}>
          {icon} {/* Render the passed icon */}
        </div>
        <div>
          <CardTitle className={cn("text-lg font-semibold", isPast && "text-muted-foreground")}>{eventName}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">{shortDescription}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-foreground/80">
          <CalendarDays className="w-4 h-4 text-accent" />
          <span>{date}</span>
        </div>
         <div className="flex items-center gap-2 text-sm text-foreground/80">
          <MapPin className="w-4 h-4 text-accent" />
          <span>{location}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
            variant={isPast ? "secondary" : "default"}
            className={cn(
              "w-full transition-transform duration-150 ease-in-out", // Added transition classes
              isPast
                ? "cursor-not-allowed bg-muted text-muted-foreground"
                : "bg-accent text-accent-foreground hover:bg-accent/90 active:scale-95" // Added active:scale-95
            )}
            onClick={onRegisterClick}
            disabled={isPast} // Disable button for past events
        >
          {isPast ? (
            <>
              <Ban className="mr-2 h-4 w-4" /> Registration Closed
            </>
          ) : (
            <>
              <Ticket className="mr-2 h-4 w-4" /> View Details & Register
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
