
"use client";

import { useState, useEffect } from 'react';
import type { EventDetails } from '@/services/event-management';
import { getEventDetails } from '@/services/event-management';
import EventCard from '@/components/event-card';
import EventDetailsModal from '@/components/event-details-modal';
// Updated imports for new icons
import { Bot, Atom, Puzzle, Activity, Ticket, CalendarDays, MapPin, Users, UserPlus, BookOpen, Brush, Camera, Code, Film, FlaskConical, Mic, Paintbrush, Music, GraduationCap, Briefcase, Lightbulb } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';


// Expanded events list with year 2025
const eventsList = [
  { name: 'THOMDOS', shortDescription: 'Cultural & Tech Fest', icon: <Activity className="w-8 h-8" />, date: 'Oct 10-12, 2025', location: 'North Campus Grounds' },
  { name: 'ROBOMAP', shortDescription: 'Robotics Competition', icon: <Bot className="w-8 h-8" />, date: 'Nov 5, 2025', location: 'Engineering Dept.' },
  { name: 'COSMIC', shortDescription: 'Astronomy Workshop', icon: <Atom className="w-8 h-8" />, date: 'Nov 20, 2025', location: 'Physics Dept.' },
  { name: 'BITBOTS', shortDescription: 'Coding & Gaming', icon: <Code className="w-8 h-8" />, date: 'Dec 1, 2025', location: 'Computer Science Dept.' },
  { name: 'LitVerse', shortDescription: 'Literature Festival', icon: <BookOpen className="w-8 h-8" />, date: 'Jan 15-16, 2025', location: 'Arts Faculty Hall' },
  { name: 'Canvas Clash', shortDescription: 'Art Competition', icon: <Brush className="w-8 h-8" />, date: 'Feb 1, 2025', location: 'Fine Arts Dept.' },
  { name: 'ShutterFest', shortDescription: 'Photography Contest', icon: <Camera className="w-8 h-8" />, date: 'Feb 18, 2025', location: 'Campus Lawns' },
  { name: 'HackathonX', shortDescription: '24hr Coding Challenge', icon: <Code className="w-8 h-8" />, date: 'Mar 5-6, 2025', location: 'CIC Building' },
  { name: 'Reel Life', shortDescription: 'Short Film Festival', icon: <Film className="w-8 h-8" />, date: 'Mar 20, 2025', location: 'SRCC Auditorium' },
  { name: 'ChemFusion', shortDescription: 'Chemistry Symposium', icon: <FlaskConical className="w-8 h-8" />, date: 'Apr 2, 2025', location: 'Chemistry Dept.' },
  { name: 'Debate League', shortDescription: 'Inter-College Debate', icon: <Mic className="w-8 h-8" />, date: 'Apr 15, 2025', location: 'Conference Centre' },
  { name: 'Melody Night', shortDescription: 'Music Concert', icon: <Music className="w-8 h-8" />, date: 'May 1, 2025', location: 'Amphitheatre' },
  { name: 'Alumni Meet', shortDescription: 'Annual Alumni Gathering', icon: <GraduationCap className="w-8 h-8" />, date: 'Jun 10, 2025', location: 'University Guest House' },
  { name: 'Career Fair', shortDescription: 'Job & Internship Fair', icon: <Briefcase className="w-8 h-8" />, date: 'Jul 5, 2025', location: 'Sports Complex' },
  { name: 'Innovation Expo', shortDescription: 'Student Project Showcase', icon: <Lightbulb className="w-8 h-8" />, date: 'Aug 22, 2025', location: 'Convention Hall' },
];

export default function Home() {
  const [selectedEventDetails, setSelectedEventDetails] = useState<EventDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const handleRegisterClick = async (eventName: string) => {
    setIsLoadingDetails(true);
    setIsModalOpen(true); // Open modal immediately to show loading state
    try {
      const details = await getEventDetails(eventName);
      setSelectedEventDetails(details);
    } catch (error) {
      console.error("Failed to fetch event details:", error);
      // Optionally show an error toast
      setIsModalOpen(false); // Close modal on error
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEventDetails(null); // Clear details when closing
  };

  // Effect to update details if already open (e.g., after registration)
  useEffect(() => {
    if (isModalOpen && selectedEventDetails?.name) { // Ensure there's a name to refresh
      const refreshDetails = async () => {
        setIsLoadingDetails(true); // Show loading state while refreshing
        try {
            const updatedDetails = await getEventDetails(selectedEventDetails.name);
            // Only update if the modal is still open for the same event
            if (isModalOpen && selectedEventDetails && updatedDetails.name === selectedEventDetails.name) {
                setSelectedEventDetails(updatedDetails);
            }
        } catch (error) {
            console.error("Failed to refresh event details:", error);
        } finally {
             // Only stop loading if the modal is still considered open conceptually
             // This check prevents setting loading to false if the modal was closed
             // *during* the fetch request.
             if (isModalOpen && selectedEventDetails?.name) {
                setIsLoadingDetails(false);
             }
        }
      };
      refreshDetails();
    }
    // Dependency array: re-run if modal opens/closes or if selectedEventDetails.name changes
    // or if the number of attendees changes (indicating successful registration)
  }, [isModalOpen, selectedEventDetails?.name, selectedEventDetails?.registeredAttendees]);


  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6 sm:p-12 md:p-24 bg-gradient-to-b from-blue-50 via-background to-background">
      <header className="w-full max-w-5xl mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-2">DU Events Hub</h1>
        <p className="text-lg text-muted-foreground">Discover and register for exciting events at Delhi University.</p>
      </header>

      <section className="w-full max-w-7xl"> {/* Increased max-width for more cards */}
        <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center text-foreground">Upcoming Events - 2025</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 justify-items-center"> {/* Adjusted grid columns */}
          {eventsList.map((event) => (
            <EventCard
              key={event.name}
              eventName={event.name}
              shortDescription={event.shortDescription}
              date={event.date}
              location={event.location}
              icon={event.icon}
              onRegisterClick={() => handleRegisterClick(event.name)}
            />
          ))}
        </div>
      </section>

      <EventDetailsModal
        isOpen={isModalOpen && !isLoadingDetails} // Only open if not loading initially
        onClose={handleCloseModal}
        eventDetails={selectedEventDetails}
      />
       {/* Conditional Skeleton loading state inside a Dialog */}
       {isModalOpen && isLoadingDetails && (
           <Dialog open={true} onOpenChange={handleCloseModal}> {/* Use handleCloseModal here */}
                <DialogContent className="sm:max-w-[525px] bg-card text-card-foreground rounded-lg shadow-xl p-6">
                     <DialogHeader>
                        <Skeleton className="h-8 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full" />
                         <Skeleton className="h-4 w-5/6" />
                     </DialogHeader>
                      <Separator className="bg-border/50 my-4" />
                      <div className="grid gap-4">
                            <div className="flex items-center gap-3"> <Skeleton className="h-5 w-5 rounded-full" /> <Skeleton className="h-4 w-1/2" /></div>
                            <div className="flex items-center gap-3"> <Skeleton className="h-5 w-5 rounded-full" /> <Skeleton className="h-4 w-3/4" /></div>
                            <div className="flex items-center gap-3"> <Skeleton className="h-5 w-5 rounded-full" /> <Skeleton className="h-4 w-1/3" /></div>
                             <Separator className="my-2 bg-border/50" />
                             {/* Simulate form area */}
                             <Skeleton className="h-6 w-1/3 mt-4 mb-2" />
                             <div className="relative">
                                <Skeleton className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
                                <Skeleton className="h-10 w-full pl-10" />
                             </div>
                             <Skeleton className="h-10 w-full mt-4" />
                      </div>
                </DialogContent>
           </Dialog>
      )}
    </main>
  );
}
