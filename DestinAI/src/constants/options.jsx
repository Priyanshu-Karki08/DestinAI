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

// export const AI_PROMPT = `
// You are a travel planning assistant. Your task is to generate a detailed travel itinerary based on the following input parameters:
// - **Location**: {location}
// - **Duration**: {totalDays} days
// - **Traveler Details**: {traveler}
// - **Budget**: {budget}
// - **Travel Date**: {date}

// ### Instructions:
// 1. Respond strictly with a valid JSON object. Do not include any additional text, comments, or explanations outside the JSON object.
// 2. Ensure the JSON object starts with "{" and ends with "}".
// 3. The JSON structure should include the following keys and nested data:
//    - \`hotels\` (array): A list of recommended hotels. Each hotel should include:
//      - \`hotelName\`: Name of the hotel (string).
//      - \`hotelAddress\`: Full address of the hotel (string).
//      - \`price\`: Price per night in USD (number).
//      - \`hotelImageURL\`: URL to an image of the hotel (string).
//      - \`geoCoordinates\`: Object with latitude and longitude:
//        - \`latitude\`: Latitude of the hotel (number).
//        - \`longitude\`: Longitude of the hotel (number).
//      - \`rating\`: Average user rating out of 5 (number).
//      - \`description\`: A short description of the hotel (string).
//      - Ensure there are at least 3 hotels and a maximum of 7 hotels in the list.
//    - \`itinerary\` (array): A list of places to visit. Each place should include:
//      - \`placeName\`: Name of the place (string).
//      - \`placeDetails\`: A short description of the place (string).
//      - \`placeImageURL\`: URL to an image of the place (string).
//      - \`geoCoordinates\`: Object with latitude and longitude:
//        - \`latitude\`: Latitude of the place (number).
//        - \`longitude\`: Longitude of the place (number).
//      - \`ticketPricing\`: Ticket price in USD (number).
//      - \`timeToVisit\`: Best time to visit the place (string).
//    - \`locationDetails\` (string): A 250 words description of the location (string) with 1 heading and 2 paragraph.
//    - \`dayWisePlan\` (array): A day-by-day breakdown of activities. Each day should include:
//      - \`day\`: Day number (integer).
//      - \`activities\` (array): A list of activities, where each activity includes:
//        - \`placeName\`: Name of the place (string).
//        - \`time\`: Time allocated for the activity (string).
//        - \`details\`: A short description of the activity (string).
//      - Ensure each day has a minimum of 4 activities. You can include more if needed but do not restrict the number of activities to a set maximum.

// 4. Format the JSON for correctness and readability, ensuring it is valid for direct parsing.

// ### Careful Instructions, must to do:
// 1. Respond strictly with a valid JSON object. Do not include any additional text, comments, or explanations outside the JSON object.
// 2. Ensure the JSON object starts with \`{\` and ends with \`}\`.
// 3. Do not include backticks (\`) or formatting markers like \` \`\`\`json \`.\`
// 4. Format the JSON for correctness and readability, ensuring it is valid for direct parsing.
// `;

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


