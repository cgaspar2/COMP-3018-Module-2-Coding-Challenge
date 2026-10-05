import { Event } from "../models/eventModel";

// In-memory storage for demo purposes
const events: Event[] = [
  {
    id: 1,
    name: "Tech Conference 2025",
    date: "2025-03-15T09:00:00.000Z",
    capacity: 200,
    registrationCount: 185,
  },
  {
    id: 2,
    name: "Startup Pitch Night",
    date: "2025-02-20T18:00:00.000Z",
    capacity: 50,
    registrationCount: 12,
  },
  {
    id: 3,
    name: "Web Dev Workshop",
    date: "2025-02-10T10:00:00.000Z",
    capacity: 30,
    registrationCount: 30,
  },
];

/**
 * Retrieves all events from storage
 * @returns Array of all events
 */
export const getAllEvents = async (): Promise<Event[]> => {
  // Return a deep clone to avoid direct mutation
  return structuredClone(events);
};

 /**
  * Retrieves an event by its ID
  * @param id - The ID of the event to retrieve
  * @returns The event if found, otherwise null
  */
export const getEventById = async (
  id: number
): Promise<Event | null> => {
  const event: Event | undefined = events.find(
    (event: Event) => event.id === id
  );

  return event ? structuredClone(event) : null;
};

