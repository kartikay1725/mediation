"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Navbar } from "@/components/NavbarClient";
import { BackgroundBeams } from "@/components/ui/background-beams";

interface MediationCase {
  caseNo: string;
  partiesName: string;
  mediatorName: string;
  referralCourt: string;
  category: string;
  firstDate: string;
  status: string;
  nextHearingDate: string;
}

type SearchField = "caseNo" | "partiesName" | "mediatorName";

export default function SearchMediationPage() {
  const [query, setQuery] = useState("");
  const [searchField, setSearchField] = useState<SearchField>("caseNo");
  const [results, setResults] = useState<MediationCase[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    setIsSearching(true);
    toast.info("Searching cases...");

    try {
      const res = await fetch(
        `/api/mediation/search?field=${searchField}&query=${encodeURIComponent(query)}`
      );

      if (!res.ok) throw new Error("Search failed");

      const data = await res.json();
      setResults(data.results || []);

      if (data.results.length === 0) {
        toast.warning("No cases found");
      } else {
        toast.success(`Found ${data.results.length} case(s)`);
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Search failed");
    } finally {
      setIsSearching(false);
    }
  };

  const getFieldLabel = (field: SearchField): string => {
    switch (field) {
      case "caseNo": return "Case Number";
      case "partiesName": return "Parties Name";
      case "mediatorName": return "Mediator Name";
      default: return "";
    }
  };

  return (
    <div className="relative min-h-screen bg-[#f7f5f2]">
      <Navbar />
      <BackgroundBeams className="fixed inset-0" />

      <div className="max-w-4xl mx-auto py-16 px-4">
        <Card className="shadow-lg border border-gray-300">
          <CardContent className="p-6 space-y-6">
            <h1 className="text-3xl font-bold text-center text-red-800">
              Mediation Case Search
            </h1>

            {/* Button-based method selection */}
            <div className="flex gap-2 justify-center">
              {(["caseNo", "partiesName", "mediatorName"] as SearchField[]).map((field) => (
                <Button
                  key={field}
                  onClick={() => setSearchField(field)}
                  className={`${
                    searchField === field
                      ? "bg-yellow-400 text-black"
                      : "bg-red-700 text-white hover:bg-yellow-500"
                  } transition-all`}
                >
                  {getFieldLabel(field)}
                </Button>
              ))}
            </div>

            {/* Input and search button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search by ${getFieldLabel(searchField)}`}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 w-lg sm:w-2xl border border-gray-400"
              />

              <Button
                onClick={handleSearch}
                disabled={isSearching}
                className="bg-red-700 text-white hover:bg-red-800"
              >
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </div>

            {/* Results display */}
            {results.length > 0 && (
              <div className="space-y-4 mt-6">
                {results.map((caseItem, index) => (
                  <Card key={index} className="p-4 bg-white border border-gray-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><p className="font-semibold text-gray-700">Case No:</p><p>{caseItem.caseNo}</p></div>
                      <div><p className="font-semibold text-gray-700">Parties:</p><p>{caseItem.partiesName}</p></div>
                      <div><p className="font-semibold text-gray-700">Mediator:</p><p>{caseItem.mediatorName}</p></div>
                      <div><p className="font-semibold text-gray-700">Court:</p><p>{caseItem.referralCourt}</p></div>
                      <div><p className="font-semibold text-gray-700">Category:</p><p>{caseItem.category}</p></div>
                      <div><p className="font-semibold text-gray-700">First Date:</p><p>{caseItem.firstDate}</p></div>
                      <div><p className="font-semibold text-gray-700">Status:</p><p>{caseItem.status}</p></div>
                      <div><p className="font-semibold text-gray-700">Next Hearing:</p><p>{caseItem.nextHearingDate}</p></div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
