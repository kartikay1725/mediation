"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
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
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<MediationCase>>({});

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

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditData({ ...results[index] });
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditData({});
  };

  const handleUpdate = async () => {
    if (editingIndex === null) {
      toast.error("No case selected for editing");
      return;
    };

    try {
      const res = await fetch("/api/mediation/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      if (!res.ok) throw new Error("Update failed");

      const updatedResults = [...results];
      updatedResults[editingIndex] = editData as MediationCase;
      setResults(updatedResults);
      setEditingIndex(null);
      toast.success("Case updated successfully");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update case");
    }
  };
  const handleStatusChange = async () => {
    if (editingIndex === null) {
      toast.error("No case selected for editing");
      return;
    };

    try {
      const res = await fetch("/api/case/update-status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        caseNo : editData.caseNo,
        status: editData.status,
        nextHearingDate: editData.nextHearingDate,
      }),
      });
      if (!res.ok) throw new Error("Update failed");

      const updatedResults = [...results];
      updatedResults[editingIndex] = editData as MediationCase;
      setResults(updatedResults);
      setEditingIndex(null);
      toast.success("Case updated successfully");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update case");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
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
    <div className="felx flex-col mx-auto">
      <Navbar/>
      <BackgroundBeams className="fixed inset-0" />
      <div className=" items-center justify-center py-30">
      <Card className="max-w-4xl  mx-auto">
        <CardContent className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-center">Mediation Case Search</h1>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex gap-2">
              <Select
                value={searchField}
                onValueChange={(value) => setSearchField(value as SearchField)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Search by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="caseNo">Case Number</SelectItem>
                  <SelectItem value="partiesName">Parties Name</SelectItem>
                  <SelectItem value="mediatorName">Mediator Name</SelectItem>
                </SelectContent>
              </Select>

              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search by ${getFieldLabel(searchField)}`}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 w-auto sm:w-lg"
              />
            </div>

            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>

          {results.length > 0 && (
            <div className="space-y-4">
              {results.map((caseItem, index) => (
                <Card key={index} className="p-4">
                  {editingIndex === index ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-medium">Case No</label>
                        <Input
                          name="caseNo"
                          value={editData.caseNo || ""}
                          onChange={handleInputChange}
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block font-medium">Parties</label>
                        <Input
                          name="partiesName"
                          value={editData.partiesName || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block font-medium">Mediator</label>
                        <Input
                          name="mediatorName"
                          value={editData.mediatorName || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block font-medium">Court</label>
                        <Input
                          name="referralCourt"
                          value={editData.referralCourt || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block font-medium">Category</label>
                        <Input
                          name="category"
                          value={editData.category || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block font-medium">First Date</label>
                        <Input
                          name="firstDate"
                          value={editData.firstDate || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block font-medium">Status</label>
                        <Input
                          name="status"
                          value={editData.status || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block font-medium">Next Hearing</label>
                        <Input
                          name="nextHearingDate"
                          value={editData.nextHearingDate || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-span-2 flex gap-2 justify-end">
                        <Button variant="outline" onClick={handleCancelEdit}>
                          Cancel
                        </Button>
                        <Button onClick={() => {handleUpdate();handleStatusChange();}}>
                        Save Changes
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium">Case No:</p>
                        <p>{caseItem.caseNo}</p>
                      </div>
                      <div>
                        <p className="font-medium">Parties:</p>
                        <p>{caseItem.partiesName}</p>
                      </div>
                      <div>
                        <p className="font-medium">Mediator:</p>
                        <p>{caseItem.mediatorName}</p>
                      </div>
                      <div>
                        <p className="font-medium">Court:</p>
                        <p>{caseItem.referralCourt}</p>
                      </div>
                      <div>
                        <p className="font-medium">Category:</p>
                        <p>{caseItem.category}</p>
                      </div>
                      <div>
                        <p className="font-medium">First Date:</p>
                        <p>{caseItem.firstDate}</p>
                      </div>
                      <div>
                        <p className="font-medium">Status:</p>
                        <p>{caseItem.status}</p>
                      </div>
                      <div>
                        <p className="font-medium">Next Hearing:</p>
                        <p>{caseItem.nextHearingDate}</p>
                      </div>
                      <div className="col-span-2 flex justify-end">
                        <Button onClick={() => handleEdit(index)}>
                          Edit Case
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      </div>
    </div>
  );
};