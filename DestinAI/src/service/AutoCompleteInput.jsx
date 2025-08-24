import React, { useState } from "react";

const AutocompleteInput = ({ apiKey, onChange }) => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    if (onChange) onChange(text);

    if (!text) {
      setSuggestions([]);
      return;
    }

    fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&apiKey=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        const newSuggestions = data.features.map((feature) => ({
          name: feature.properties.formatted,
          lat: feature.geometry.coordinates[1],
          lon: feature.geometry.coordinates[0],
        }));
        setSuggestions(newSuggestions);
      })
      .catch((err) => console.error("Error fetching suggestions:", err));
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchText(suggestion.name);
    setSuggestions([]);
    if (onChange) onChange(suggestion);
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Input */}
      <input
        type="text"
        placeholder="Enter a location..."
        value={searchText}
        onChange={handleInputChange}
        className="w-full px-4 py-2 border rounded-lg shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
      />

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-y-auto z-50">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 cursor-pointer hover:bg-blue-100 transition-colors"
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;
