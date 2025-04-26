import type { FC, ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// Corrected import path if needed, but assuming lucide-react is correct based on page.tsx usage
import { Ticket, CalendarDays, MapPin } from 'lucide-react';

interface EventCardProps {
  eventName: string;
  shortDescription: string;
  date: string;
  location: string;
  icon: ReactNode; // Keep accepting icon as ReactNode
  onRegisterClick: () => void;
}

const EventCard: FC<EventCardProps> = ({ eventName, shortDescription, date, location, icon, onRegisterClick }) => {
  return (
    <Card className="w-full max-w-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <CardHeader className="flex flex-row items-center gap-4 p-4 bg-primary/10">
        <div className="text-primary">
          {icon} {/* Render the passed icon */}
        </div>
        <div>
          <CardTitle className="text-lg font-semibold">{eventName}</CardTitle>
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
            variant="default"
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={onRegisterClick}>
          <Ticket className="mr-2 h-4 w-4" /> View Details & Register
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
