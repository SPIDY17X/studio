
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllRegistrations, mockEvents } from '@/services/event-management'; // Adjust import as needed
import type { AttendeeRegistration, EventDetails } from '@/services/event-management'; // Adjust import as needed
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut, Users, Mail, Phone, User } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const AUTH_KEY = "isAdminLoggedIn"; // Key for localStorage

interface AllRegistrations {
  [eventId: string]: AttendeeRegistration[];
}

interface EventNameMap {
    [eventId: string]: string;
}

export default function AdminDashboardPage() {
  const [registrations, setRegistrations] = useState<AllRegistrations | null>(null);
  const [eventNames, setEventNames] = useState<EventNameMap>({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // **INSECURE:** Check login status
    const isLoggedIn = localStorage.getItem(AUTH_KEY) === 'true';
    if (!isLoggedIn) {
      router.replace('/admin/login');
      return; // Stop execution if not logged in
    }

    // Fetch registrations
    const fetchRegistrations = async () => {
      setIsLoading(true);
      try {
        const allRegs = await getAllRegistrations();
        // Create a map of event IDs to names for easier lookup
        const nameMap: EventNameMap = {};
        Object.values(mockEvents).forEach(event => {
            nameMap[event.id] = event.name;
        });
        setEventNames(nameMap);
        setRegistrations(allRegs);
      } catch (error) {
        console.error("Failed to fetch registrations:", error);
        // Handle error (e.g., show toast)
      } finally {
        setIsLoading(false);
      }
    };

    fetchRegistrations();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY); // Clear login state
    router.push('/admin/login');
  };

  // Derived state for total registrations
  const totalRegistrations = registrations
    ? Object.values(registrations).reduce((sum, attendees) => sum + attendees.length, 0)
    : 0;

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-950">
      <header className="w-full max-w-6xl mb-8 flex justify-between items-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </header>

      <section className="w-full max-w-6xl bg-card p-6 rounded-lg shadow-lg">
        <div className="mb-6 flex justify-between items-center border-b pb-4">
            <h2 className="text-2xl font-semibold text-foreground">Event Registrations</h2>
             {isLoading ? (
                <Skeleton className="h-6 w-32" />
             ) : (
                <span className="text-lg text-muted-foreground font-medium">Total Registered: {totalRegistrations}</span>
             )}
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : registrations && Object.keys(registrations).length > 0 ? (
          <Accordion type="multiple" className="w-full">
            {Object.entries(registrations)
                .filter(([eventId, attendees]) => attendees.length > 0) // Only show events with registrations
                .map(([eventId, attendees]) => (
              <AccordionItem value={eventId} key={eventId}>
                <AccordionTrigger className="text-lg hover:no-underline bg-muted/50 px-4 rounded-t-md">
                   <div className="flex justify-between w-full items-center pr-2">
                     <span>{eventNames[eventId] || eventId}</span>
                     <span className="text-sm font-normal text-muted-foreground bg-background px-2 py-1 rounded">
                        {attendees.length} Attendee{attendees.length !== 1 ? 's' : ''}
                    </span>
                   </div>
                </AccordionTrigger>
                <AccordionContent className="border border-t-0 rounded-b-md p-0">
                  {attendees.length > 0 ? (
                    <div className="overflow-x-auto">
                        <Table>
                            {/* <TableCaption>List of registered attendees for {eventNames[eventId] || eventId}.</TableCaption> */}
                            <TableHeader className="bg-muted/20">
                                <TableRow>
                                <TableHead className="w-[35%]"><User className="inline-block mr-1 h-4 w-4" /> Name</TableHead>
                                <TableHead className="w-[35%]"><Mail className="inline-block mr-1 h-4 w-4" /> Email</TableHead>
                                <TableHead className="w-[30%]"><Phone className="inline-block mr-1 h-4 w-4" /> Phone Number</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {attendees.map((attendee, index) => (
                                <TableRow key={`${eventId}-${attendee.email}-${index}`} className="hover:bg-muted/10">
                                    <TableCell className="font-medium">{attendee.name}</TableCell>
                                    <TableCell>{attendee.email}</TableCell>
                                    <TableCell>{attendee.phoneNumber}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                  ) : (
                    <p className="p-4 text-center text-muted-foreground">No registrations for this event yet.</p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="text-center text-muted-foreground mt-8">No registration data available.</p>
        )}
      </section>
    </main>
  );
}
