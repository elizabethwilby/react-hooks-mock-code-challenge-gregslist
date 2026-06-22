import React, { useState, useEffect } from "react";
import Header from "./Header";
import ListingsContainer from "./ListingsContainer";

function App() {
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/listings")
      .then((res) => res.json())
      .then((data) => setListings(data));
  }, []);

  function handleFavorite(id) {
    setListings((prev) =>
      prev.map((listing) =>
        listing.id === id
          ? { ...listing, favorited: !listing.favorited }
          : listing
      )
    );
  }

  function handleDelete(id) {
    fetch(`http://localhost:6001/listings/${id}`, { method: "DELETE" })
      .then(() => {
        setListings((prev) => prev.filter((listing) => listing.id !== id));
      });
  }

  const filteredListings = listings.filter((listing) =>
    listing.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <Header onSearch={setSearch} />
      <ListingsContainer
        listings={filteredListings}
        onFavorite={handleFavorite}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;