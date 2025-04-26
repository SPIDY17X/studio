/**
 * Represents the details of an event.
 */
export interface EventDetails {
  /** Unique identifier for the event */
  id: string;
  /**
   * The name of the event.
   */
  name: string;
  /**
   * A detailed description of the event.
   */
  description: string;
  /**
   * The date and time of the event (ISO string format recommended).
   */
  dateTime: string;
  /**
   * The location where the event will be held.
   */
  location: string;
  /**
   * The maximum number of attendees allowed for the event.
   */
  capacity: number;
  /**
   * The number of attendees currently registered for the event.
   */
  registeredAttendees: number;
}

// --- Mock Data Store ---
// In a real app, this would be a database or API call.
const mockEvents: Record<string, EventDetails> = {
  THOMDOS: {
    id: 'thomdos-2024',
    name: 'THOMDOS',
    description: 'The annual cultural and technical festival of Delhi University. Featuring competitions, workshops, performances, and more!',
    dateTime: '2024-10-10T10:00:00Z', // Use ISO format
    location: 'North Campus Grounds',
    capacity: 500,
    registeredAttendees: 250,
  },
  ROBOMAP: {
    id: 'robomap-2024',
    name: 'ROBOMAP',
    description: 'Witness the clash of titans in the ultimate robotics competition. Build, program, and compete!',
    dateTime: '2024-11-05T09:30:00Z',
    location: 'Engineering Department Labs',
    capacity: 100,
    registeredAttendees: 98, // Close to capacity
  },
  COSMIC: {
    id: 'cosmic-2024',
    name: 'COSMIC',
    description: 'Explore the wonders of the universe in this hands-on astronomy workshop. Telescope viewings included!',
    dateTime: '2024-11-20T18:00:00Z',
    location: 'Physics Department Auditorium',
    capacity: 150,
    registeredAttendees: 75,
  },
  BITBOTS: {
    id: 'bitbots-2024',
    name: 'BITBOTS',
    description: 'A fusion of competitive coding challenges and exciting e-sports tournaments. Code, game, conquer!',
    dateTime: '2024-12-01T11:00:00Z',
    location: 'Computer Science Department Hub',
    capacity: 200,
    registeredAttendees: 200, // At capacity
  },
};

const registeredEmails: Record<string, Set<string>> = {
    'thomdos-2024': new Set(['test@example.com']),
    'robomap-2024': new Set(),
    'cosmic-2024': new Set(),
    'bitbots-2024': new Set(['full@example.com']), // Add some emails to simulate full
};


// --- Mock API Functions ---

/**
 * Simulates fetching event details with a delay.
 * @param eventName The name of the event.
 * @returns Promise resolving to EventDetails or rejecting if not found.
 */
export async function getEventDetails(eventName: string): Promise<EventDetails> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const event = mockEvents[eventName];
      if (event) {
        // Return a copy to prevent direct modification of the mock store
        resolve({ ...event });
      } else {
        reject(new Error(`Event "${eventName}" not found.`));
      }
    }, 500); // Simulate network delay
  });
}

/**
 * Simulates registering a user for an event with checks.
 * @param eventName The name of the event.
 * @param userEmail The user's email.
 * @returns Promise resolving to true on success, false on failure (duplicate/full).
 */
export async function registerForEvent(eventName: string, userEmail: string): Promise<boolean> {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
        const event = mockEvents[eventName];
        if (!event) {
          console.error(`Attempted to register for non-existent event: ${eventName}`);
          return resolve(false); // Or reject(new Error(...))
        }

        const eventId = event.id;
        if (!registeredEmails[eventId]) {
            registeredEmails[eventId] = new Set(); // Initialize if not present
        }

        // Check for capacity
        if (event.registeredAttendees >= event.capacity) {
          console.log(`Registration failed for ${userEmail} to ${eventName}: Event full.`);
          return resolve(false);
        }

        // Check for duplicate registration
        if (registeredEmails[eventId].has(userEmail)) {
          console.log(`Registration failed for ${userEmail} to ${eventName}: Already registered.`);
          return resolve(false);
        }

        // Simulate successful registration
        registeredEmails[eventId].add(userEmail);
        mockEvents[eventName].registeredAttendees += 1; // IMPORTANT: Update the count
        console.log(`Successfully registered ${userEmail} for ${eventName}. New count: ${mockEvents[eventName].registeredAttendees}`);
        resolve(true);

      }, 700); // Simulate network delay & processing
   });
}
