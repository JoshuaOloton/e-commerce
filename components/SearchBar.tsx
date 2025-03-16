"use client";

import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative w-full max-w-md mb-8">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search products now..."
        className="w-full py-2 pl-12 pr-4 rounded-xl border border-gray-300"
      />
    </div>
  );
};

export default SearchBar;
