"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function MediatorSearch() {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (!query) return toast.error("Please enter a mediator or party name");

    try {
      const res = await fetch(`/api/mediation/search/mediator-or-parties?query=${query}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || "Something went wrong");

      toast.success("Results found");
    } 
    //eslint-disable-next-line
    catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-xl space-y-4">
      <Label>Enter Mediator or Party Name</Label>
      <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. Rahul Mehta or Priya Sharma" />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
}
