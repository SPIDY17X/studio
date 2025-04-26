
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
  // --- Events Before June 2025 (Unchanged Dates) ---
  LitVerse: {
    id: 'litverse-2025',
    name: 'LitVerse',
    description: 'Celebrate the written word with author talks, poetry slams, and book discussions.',
    dateTime: '2025-01-15T10:00:00Z',
    location: 'Arts Faculty Hall',
    capacity: 250,
    registeredAttendees: 110,
  },
  'Canvas Clash': { // Use quotes for names with spaces
    id: 'canvas-clash-2025',
    name: 'Canvas Clash',
    description: 'Unleash your creativity in a live painting and sketching competition.',
    dateTime: '2025-02-01T13:00:00Z',
    location: 'Fine Arts Dept. Courtyard',
    capacity: 80,
    registeredAttendees: 35,
  },
  ShutterFest: {
    id: 'shutterfest-2025',
    name: 'ShutterFest',
    description: 'Capture the essence of DU through your lens. Photography competition and exhibition.',
    dateTime: '2025-02-18T09:00:00Z',
    location: 'Campus Lawns & Various Locations',
    capacity: 120,
    registeredAttendees: 90,
  },
  HackathonX: {
    id: 'hackathonx-2025',
    name: 'HackathonX',
    description: 'A 24-hour coding marathon to build innovative solutions. Prizes and glory await!',
    dateTime: '2025-03-05T17:00:00Z', // Start time
    location: 'Cluster Innovation Centre (CIC)',
    capacity: 150,
    registeredAttendees: 145, // Almost full
  },
  'Reel Life': {
    id: 'reel-life-2025',
    name: 'Reel Life',
    description: 'Showcase your filmmaking talent. Short film screening and awards.',
    dateTime: '2025-03-20T16:00:00Z',
    location: 'SRCC Auditorium',
    capacity: 400,
    registeredAttendees: 280,
  },
  ChemFusion: {
    id: 'chemfusion-2025',
    name: 'ChemFusion',
    description: 'A symposium exploring the latest advancements in chemical sciences. Guest lectures and paper presentations.',
    dateTime: '2025-04-02T10:30:00Z',
    location: 'Chemistry Department Lecture Hall',
    capacity: 180,
    registeredAttendees: 60,
  },
  'Debate League': {
    id: 'debate-league-2025',
    name: 'Debate League',
    description: 'Witness sharp minds battle with words in the final rounds of the Inter-College Debate League.',
    dateTime: '2025-04-15T14:00:00Z',
    location: 'Conference Centre',
    capacity: 300,
    registeredAttendees: 210,
  },
  'Melody Night': {
    id: 'melody-night-2025',
    name: 'Melody Night',
    description: 'An enchanting evening featuring performances by university bands and solo artists.',
    dateTime: '2025-05-01T18:30:00Z',
    location: 'University Amphitheatre',
    capacity: 1000,
    registeredAttendees: 650,
  },

  // --- Updated Dates for June - December 2025 ---
  'Alumni Meet': {
    id: 'alumni-meet-2025',
    name: 'Alumni Meet',
    description: 'Connect with fellow graduates, network, and relive your campus memories.',
    dateTime: '2025-06-15T17:00:00Z', // Updated date
    location: 'University Guest House Lawns',
    capacity: 400,
    registeredAttendees: 150,
  },
  'Career Fair': {
    id: 'career-fair-2025',
    name: 'Career Fair',
    description: 'Explore job and internship opportunities from leading companies across various sectors.',
    dateTime: '2025-07-10T10:00:00Z', // Updated date
    location: 'Multipurpose Hall, Sports Complex',
    capacity: 2000, // Larger capacity
    registeredAttendees: 900,
  },
  'Innovation Expo': {
    id: 'innovation-expo-2025',
    name: 'Innovation Expo',
    description: 'Discover groundbreaking projects and startups by DU students and faculty.',
    dateTime: '2025-08-28T11:00:00Z', // Updated date
    location: 'Convention Hall',
    capacity: 600,
    registeredAttendees: 320,
  },
  THOMDOS: {
    id: 'thomdos-2025',
    name: 'THOMDOS',
    description: 'The annual cultural and technical festival of Delhi University. Featuring competitions, workshops, performances, and more!',
    dateTime: '2025-09-12T10:00:00Z', // Updated date (Start of festival)
    location: 'North Campus Grounds',
    capacity: 500,
    registeredAttendees: 250,
  },
  ROBOMAP: {
    id: 'robomap-2025',
    name: 'ROBOMAP',
    description: 'Witness the clash of titans in the ultimate robotics competition. Build, program, and compete!',
    dateTime: '2025-10-08T09:30:00Z', // Updated date
    location: 'Engineering Department Labs',
    capacity: 100,
    registeredAttendees: 98, // Close to capacity
  },
  COSMIC: {
    id: 'cosmic-2025',
    name: 'COSMIC',
    description: 'Explore the wonders of the universe in this hands-on astronomy workshop. Telescope viewings included!',
    dateTime: '2025-11-15T18:00:00Z', // Updated date
    location: 'Physics Department Auditorium',
    capacity: 150,
    registeredAttendees: 75,
  },
  BITBOTS: {
    id: 'bitbots-2025',
    name: 'BITBOTS',
    description: 'A fusion of competitive coding challenges and exciting e-sports tournaments. Code, game, conquer!',
    dateTime: '2025-12-05T11:00:00Z', // Updated date
    location: 'Computer Science Department Hub',
    capacity: 200,
    registeredAttendees: 200, // At capacity
  },
};


// Initialize registeredEmails for all events
const registeredEmails: Record<string, Set<string>> = {};
Object.values(mockEvents).forEach(event => {
    registeredEmails[event.id] = new Set();
});

// Add some pre-registered emails for testing
registeredEmails['thomdos-2025'].add('test@example.com');
registeredEmails['bitbots-2025'].add('full@example.com');
// Add a few more for variety
registeredEmails['litverse-2025'].add('reader@example.com');
registeredEmails['hackathonx-2025'].add('coder@example.com');


// --- Mock API Functions ---

/**
 * Simulates fetching event details with a delay.
 * @param eventName The name of the event.
 * @returns Promise resolving to EventDetails or rejecting if not found.
 */
export async function getEventDetails(eventName: string): Promise<EventDetails> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Find event case-insensitively or handle names with spaces correctly
      const event = mockEvents[eventName] || Object.values(mockEvents).find(e => e.name === eventName);
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
        // Find event case-insensitively or handle names with spaces correctly
        const event = mockEvents[eventName] || Object.values(mockEvents).find(e => e.name === eventName);

        if (!event) {
          console.error(`Attempted to register for non-existent event: ${eventName}`);
          return resolve(false); // Or reject(new Error(...))
        }

        const eventId = event.id;
        if (!registeredEmails[eventId]) {
            registeredEmails[eventId] = new Set(); // Initialize if not present (should be initialized above, but safety check)
        }

        // Check for capacity
        if (event.registeredAttendees >= event.capacity) {
          console.log(`Registration failed for ${userEmail} to ${eventName}: Event full.`);
          return resolve(false);
        }

        // Check for duplicate registration (case-insensitive email check)
        const normalizedEmail = userEmail.toLowerCase();
        let isDuplicate = false;
        registeredEmails[eventId].forEach(existingEmail => {
            if (existingEmail.toLowerCase() === normalizedEmail) {
                isDuplicate = true;
            }
        });

        if (isDuplicate) {
          console.log(`Registration failed for ${userEmail} to ${eventName}: Already registered.`);
          return resolve(false);
        }


        // Simulate successful registration
        registeredEmails[eventId].add(userEmail); // Store original case email
        // Safely update the event in the mock store
        // Find the key (original name) used in mockEvents to update it correctly
        const eventKey = Object.keys(mockEvents).find(key => mockEvents[key].id === eventId);
        if (eventKey) {
          const updatedEvent = { ...mockEvents[eventKey], registeredAttendees: mockEvents[eventKey].registeredAttendees + 1 };
          mockEvents[eventKey] = updatedEvent; // Update using the original key
          console.log(`Successfully registered ${userEmail} for ${eventName}. New count: ${updatedEvent.registeredAttendees}`);
          resolve(true);
        } else {
          // This case should theoretically not happen if event was found earlier
          console.error(`Could not find original key for event ID: ${eventId}`);
          resolve(false);
        }

      }, 700); // Simulate network delay & processing
   });
}
