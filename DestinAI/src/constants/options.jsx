export const SelectTravelsList = [
  {
    id: 1,
    title: "Solo",
    desc: "Independent traveler seeking adventure",
    icon: "🙋",
    people: "1",
  },
  {
    id: 2,
    title: "Couple",
    desc: "Romantic getaway for two",
    icon: "💑",
    people: "2",
  },
  {
    id: 3,
    title: "Family",
    desc: "Fun-filled journey with your loved ones",
    icon: "👨‍👩‍👧‍👦",
    people: "3-6",
  },
  {
    id: 4,
    title: "Friends",
    desc: "An exciting trip with your crew",
    icon: "🧑‍🤝‍🧑",
    people: "3-10",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "💵",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Balanced experience with comfort and value",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Premium stays, fine dining, and exclusive perks",
    icon: "💎",
  },
];


export const AI_PROMPT = `
You are a travel planning assistant. Your ONLY task is to return a valid JSON object representing a detailed travel itinerary.

### Input Parameters:
- Location: {location}
- Duration: {totalDays} days
- Traveler Details: {traveler}
- Budget: {budget}
- Travel Date: {date}

### ABSOLUTE RULES:
1. Respond ONLY with a valid JSON object. Do NOT include any text, comments, explanations, or markdown.
2. Do NOT include backticks or code fences. The response MUST start with { and end with }.
3. All strings MUST use double quotes (").
4. No trailing commas are allowed.
5. The JSON must be directly parseable by JSON.parse() in JavaScript.
6. All "hotelImageURL" and "placeImageURL" fields MUST be valid working image URLs.
7. Include 3 to 7 hotel objects in "hotels".
8. Include a reasonable number of itinerary places with images in "itinerary".
9. Provide "locationDetails" as 250 words including 1 heading and 2 paragraphs.
10. Each day in "dayWisePlan" must include at least 4 activities.
11. All hotels and itinerary places and day-wise activities MUST be located in {location}.

### JSON STRUCTURE:
{
  "hotels": [
    {
      "hotelName": "string",
      "hotelAddress": "string",
      "price": number,
      "hotelImageURL": "string",
      "geoCoordinates": {
        "latitude": number,
        "longitude": number
      },
      "rating": number,
      "description": "string"
    }
  ],
  "itinerary": [
    {
      "placeName": "string",
      "placeDetails": "string",
      "placeImageURL": "string",
      "geoCoordinates": {
        "latitude": number,
        "longitude": number
      },
      "ticketPricing": number,
      "timeToVisit": "string"
    }
  ],
  "locationDetails": "string (250 words, include 1 heading and 2 paragraphs)",
  "dayWisePlan": [
    {
      "day": number,
      "activities": [
        {
          "placeName": "string",
          "time": "string",
          "details": "string"
        }
      ]
    }
  ]
}
`;





