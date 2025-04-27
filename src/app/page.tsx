
"use client";

import { useState, useEffect } from 'react';
import type { EventDetails } from '@/services/event-management';
import { getEventDetails } from '@/services/event-management';
import EventCard from '@/components/event-card';
import EventDetailsModal from '@/components/event-details-modal';
// Updated imports for new icons
import { Bot, Atom, Activity, Ticket, CalendarDays, MapPin, Users, UserPlus, BookOpen, Brush, Camera, Code, Film, FlaskConical, Mic, Paintbrush, Music, GraduationCap, Briefcase, Lightbulb } from 'lucide-react'; // Removed Puzzle, added missing icons
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'; // Import DialogTitle
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast"; // Import useToast
import { VisuallyHidden } from '@/components/ui/visually-hidden'; // Import VisuallyHidden

// Expanded events list with updated dates for June-December 2025
// Added 'isPast' flag for events before May 2025
const eventsList = [
  // Events before May 2025 (Marked as past)
  { name: 'LitVerse', shortDescription: 'Literature Festival', icon: <BookOpen className="w-8 h-8" />, date: 'Jan 15-16, 2025', location: 'Arts Faculty Hall', isPast: true },
  { name: 'Canvas Clash', shortDescription: 'Art Competition', icon: <Brush className="w-8 h-8" />, date: 'Feb 1, 2025', location: 'Fine Arts Dept.', isPast: true },
  { name: 'ShutterFest', shortDescription: 'Photography Contest', icon: <Camera className="w-8 h-8" />, date: 'Feb 18, 2025', location: 'Campus Lawns', isPast: true },
  { name: 'HackathonX', shortDescription: '24hr Coding Challenge', icon: <Code className="w-8 h-8" />, date: 'Mar 5-6, 2025', location: 'CIC Building', isPast: true },
  { name: 'Reel Life', shortDescription: 'Short Film Festival', icon: <Film className="w-8 h-8" />, date: 'Mar 20, 2025', location: 'SRCC Auditorium', isPast: true },
  { name: 'ChemFusion', shortDescription: 'Chemistry Symposium', icon: <FlaskConical className="w-8 h-8" />, date: 'Apr 2, 2025', location: 'Chemistry Dept.', isPast: true },
  { name: 'Debate League', shortDescription: 'Inter-College Debate', icon: <Mic className="w-8 h-8" />, date: 'Apr 15, 2025', location: 'Conference Centre', isPast: true },

  // Events from May 2025 onwards (Not marked as past)
  { name: 'Melody Night', shortDescription: 'Music Concert', icon: <Music className="w-8 h-8" />, date: 'May 1, 2025', location: 'Amphitheatre', isPast: false },
  { name: 'Alumni Meet', shortDescription: 'Annual Alumni Gathering', icon: <GraduationCap className="w-8 h-8" />, date: 'Jun 15, 2025', location: 'University Guest House', isPast: false },
  { name: 'Career Fair', shortDescription: 'Job & Internship Fair', icon: <Briefcase className="w-8 h-8" />, date: 'Jul 10, 2025', location: 'Sports Complex', isPast: false },
  { name: 'Innovation Expo', shortDescription: 'Student Project Showcase', icon: <Lightbulb className="w-8 h-8" />, date: 'Aug 28, 2025', location: 'Convention Hall', isPast: false },
  { name: 'THOMDOS', shortDescription: 'Cultural & Tech Fest', icon: <Activity className="w-8 h-8" />, date: 'Sep 12-14, 2025', location: 'North Campus Grounds', isPast: false },
  { name: 'ROBOMAP', shortDescription: 'Robotics Competition', icon: <Bot className="w-8 h-8" />, date: 'Oct 8, 2025', location: 'Engineering Dept.', isPast: false },
  { name: 'COSMIC', shortDescription: 'Astronomy Workshop', icon: <Atom className="w-8 h-8" />, date: 'Nov 15, 2025', location: 'Physics Dept.', isPast: false },
  { name: 'BITBOTS', shortDescription: 'Coding & Gaming', icon: <Code className="w-8 h-8" />, date: 'Dec 5, 2025', location: 'Computer Science Dept.', isPast: false },
];

export default function Home() {
  const [selectedEventDetails, setSelectedEventDetails] = useState<EventDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const { toast } = useToast(); // Initialize toast

  const handleRegisterClick = async (eventName: string, isPast: boolean) => {
    // Check if the event is marked as past based on the list
    if (isPast) {
      toast({
        title: "Registration Closed",
        description: `Registration for ${eventName} has ended as the event date has passed.`,
        variant: "destructive",
      });
      return; // Don't proceed to open the modal
    }

    // If not past, proceed to fetch details and open modal
    setIsLoadingDetails(true);
    setIsModalOpen(true); // Open modal immediately to show loading state
    try {
      const details = await getEventDetails(eventName);
      // Double-check the date from fetched details (more reliable)
      const eventDate = new Date(details.dateTime);
      const cutoffDate = new Date('2025-05-01T00:00:00Z'); // May 1st, 2025
      if (eventDate < cutoffDate) {
          toast({
              title: "Registration Closed",
              description: `Registration for ${eventName} has ended.`,
              variant: "destructive",
          });
          setIsModalOpen(false); // Close modal if date check fails after fetch
          setIsLoadingDetails(false);
          return;
      }
      setSelectedEventDetails(details);
    } catch (error) {
      console.error("Failed to fetch event details:", error);
      toast({
         title: "Error",
         description: "Could not fetch event details. Please try again.",
         variant: "destructive",
      });
      setIsModalOpen(false); // Close modal on error
    } finally {
      // Only set loading to false if the modal wasn't closed due to error or past date check
       // Check if the modal *should* still be open conceptually before setting loading false
       const shouldStillBeOpen = isModalOpen && !(error || (selectedEventDetails && new Date(selectedEventDetails.dateTime) < new Date('2025-05-01T00:00:00Z')));
       if (shouldStillBeOpen) {
         setIsLoadingDetails(false);
       } else {
          // If the modal was intentionally closed (e.g., due to past date check after fetch), ensure loading is false.
          setIsLoadingDetails(false);
       }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEventDetails(null); // Clear details when closing
  };

  // Effect to update details if already open (e.g., after registration)
  useEffect(() => {
    if (isModalOpen && selectedEventDetails?.name && !isLoadingDetails) { // Add !isLoadingDetails to prevent race condition
      const refreshDetails = async () => {
        // No need to set loading true here if we only refresh *after* initial load
        try {
            const updatedDetails = await getEventDetails(selectedEventDetails.name);
            // Only update if the modal is still open for the same event
            if (isModalOpen && selectedEventDetails && updatedDetails.name === selectedEventDetails.name) {
                setSelectedEventDetails(updatedDetails);
            }
        } catch (error) {
            console.error("Failed to refresh event details:", error);
             toast({ // Add toast on refresh error
                 title: "Refresh Error",
                 description: "Could not refresh event details.",
                 variant: "destructive",
              });
        }
      };
      // Debounce or throttle this refresh if needed, but for now, a direct call is fine
      // if registration success triggers a re-render or state change that runs this effect.
       refreshDetails();
    }
    // Dependency array: re-run if modal opens/closes or if selectedEventDetails.name changes
    // Adding registeredAttendees ensures refresh after successful registration shown in modal
  }, [isModalOpen, selectedEventDetails?.name, selectedEventDetails?.registeredAttendees, isLoadingDetails, toast]); // Include isLoadingDetails and toast


  return (
    // Increased padding: p-8 sm:p-16 md:p-28
    <main className="flex min-h-screen flex-col items-center justify-start p-8 sm:p-16 md:p-28 bg-gradient-to-b from-blue-200 via-blue-50 to-teal-100"> {/* Updated background gradient */}
      {/* Increased header margin-bottom: mb-16 */}
      <header className="w-full max-w-5xl mb-16 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-accent mb-3">DU Events Hub</h1> {/* Increased font size, Adjusted margin */}
        <p className="text-lg md:text-xl text-muted-foreground">Discover and register for exciting events at Delhi University.</p> {/* Increased font size */}
      </header>

      <section className="w-full max-w-7xl"> {/* Increased max-width for more cards */}
        {/* Increased heading margin-bottom: mb-10 */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-10 text-center text-foreground">Upcoming Events - 2025</h2>
        {/* Increased gap: gap-8 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 justify-items-center"> {/* Adjusted grid columns and gap */}
          {eventsList.map((event) => (
            <EventCard
              key={event.name}
              eventName={event.name}
              shortDescription={event.shortDescription}
              date={event.date}
              location={event.location}
              icon={event.icon}
              isPast={event.isPast} // Pass the isPast flag
              onRegisterClick={() => handleRegisterClick(event.name, event.isPast)} // Pass isPast to handler
            />
          ))}
        </div>
      </section>

      {/* Non-loading modal - pass details only when not loading and details exist */}
      <EventDetailsModal
        isOpen={isModalOpen && !isLoadingDetails && !!selectedEventDetails}
        onClose={handleCloseModal}
        eventDetails={selectedEventDetails}
      />

       {/* Conditional Skeleton loading state inside a Dialog */}
       {/* Use derived state for clarity: showLoadingDialog */}
       {isModalOpen && isLoadingDetails && (
            <Dialog open={true} onOpenChange={handleCloseModal}> {/* Use handleCloseModal here */}
                <DialogContent className="sm:max-w-[525px] bg-card text-card-foreground rounded-lg shadow-xl p-6">
                     <DialogHeader>
                        {/* Add a visually hidden DialogTitle for accessibility */}
                        <DialogTitle><VisuallyHidden>Loading Event Details</VisuallyHidden></DialogTitle>
                        <Skeleton className="h-8 w-3/4 mb-2" /> {/* Simulates Title */}
                        <Skeleton className="h-4 w-full mb-1" />     {/* Simulates Description line 1 */}
                        <Skeleton className="h-4 w-5/6" />    {/* Simulates Description line 2 */}
                     </DialogHeader>
                      <Separator className="bg-border/50 my-4" />
                      <div className="grid gap-4">
                            {/* Simulate detail rows */}
                            <div className="flex items-center gap-3"> <Skeleton className="h-5 w-5 rounded-full" /> <Skeleton className="h-4 w-1/2" /></div>
                            <div className="flex items-center gap-3"> <Skeleton className="h-5 w-5 rounded-full" /> <Skeleton className="h-4 w-3/4" /></div>
                            <div className="flex items-center gap-3"> <Skeleton className="h-5 w-5 rounded-full" /> <Skeleton className="h-4 w-1/3" /></div>
                             <Separator className="my-2 bg-border/50" />
                             {/* Simulate form area */}
                             <Skeleton className="h-6 w-1/3 mt-4 mb-3" /> {/* Adjusted margins */}
                             {/* Simulate Email Input */}
                             <div className="relative mb-3"> {/* Added margin */}
                                <Skeleton className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
                                <Skeleton className="h-10 w-full pl-10" />
                             </div>
                             {/* Simulate Phone Input */}
                              <div className="relative mb-4"> {/* Added margin */}
                                <Skeleton className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
                                <Skeleton className="h-10 w-full pl-10" />
                             </div>
                             {/* Simulate Button */}
                             <Skeleton className="h-10 w-full mt-2" /> {/* Adjusted margin */}
                      </div>
                </DialogContent>
           </Dialog>
      )}
    </main>
  );
}
