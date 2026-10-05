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

/**
 * Calculates the popularity of an event
 * @param id - The ID of the event
 * @returns Popularity information for the event
 */
export const getEventPopularity = async (id: number) => {
  const event: Event | null = await getEventById(id);

  if (!event) {
    return null;
  }

  const spotsRemaining: number =
    event.capacity - event.registrationCount;

  const popularityScore: number =
    event.capacity === 0
      ? 0
      : Math.round(
          (event.registrationCount / event.capacity) * 100 * 10
        ) / 10;

  let popularityTier: string;

  if (popularityScore >= 90) {
    popularityTier = "Hot";
  } else if (popularityScore >= 70) {
    popularityTier = "Popular";
  } else if (popularityScore >= 50) {
    popularityTier = "Moderate";
  } else if (popularityScore >= 25) {
    popularityTier = "Building";
  } else {
    popularityTier = "New";
  }

  return {
    ...event,
    spotsRemaining,
    popularityScore,
    popularityTier,
  };
};

/**
 * Creates a new event
 * @param eventData - The data for the new event
 * @returns The created event with generated ID
 */
export const createEvent = async (eventData: {
  name: string;
  date: string;
  capacity: number;
}): Promise<Event> => {
  const newEvent: Event = {
    id: Date.now(),
    name: eventData.name,
    date: eventData.date,
    capacity: eventData.capacity,
    registrationCount: 0,
  };

  events.push(newEvent);
  return structuredClone(newEvent);
};