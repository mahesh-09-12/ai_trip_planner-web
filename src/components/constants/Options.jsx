export const SelectTravelersList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole travel exploration",
    icon: "🚶",
    people: "1 person",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two travels in tandem",
    icon: "👩🏻‍❤️‍👨🏻",
    people: "2 persons",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving people",
    icon: "👨‍👩‍👧‍👦",
    people: "3 to 5 people",
  },
  {
    id: 5,
    title: "Friends",
    desc: "A bunck of thrill-seekers",
    icon: "🫂",
    people: "4 to 7 people",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay concious of costs",
    icon: "🪙",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep costs at average side",
    icon: "💵",
  },
  {
    id: 3,
    title: "Luxuary",
    desc: "Don't worry about costs",
    icon: "💸",
  },
];

export const AI_PROMPT =
  "Generate a travel plan for {location} for {totalDays} days for a {traveler} with a {budget} budget. Provide a list of hotels with Name, Address, Price, Image URL, Geo Coordinates, Rating, and Description. Structure the itinerary by days (Day 1, Day 2, etc.) and add title(Day 1, Day 2, ect..), listing places to visit each day with Name, Details, Image URL, Geo Coordinates, Ticket Pricing, and Best Time to Visit. List places to visit each day strictly under a 'places' array. Do NOT use 'places_to_visit' or any other naming variation. Do NOT categorize places by morning, afternoon, evening, or night. Return the response in JSON format.";
