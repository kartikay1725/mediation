"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function CaseNoSearch() {
  const [caseNo, setCaseNo] = useState("");

  const handleSearch = async () => {
    if (!caseNo) return toast.error("Please enter a case number");

    try {
      const res = await fetch(`/api/mediation/search/case-no?caseNo=${caseNo}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || "Something went wrong");

      toast.success("Case found");
    }
    //eslint-disable-next-line
    catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-xl space-y-4">
      <Label>Enter Case Number</Label>
      <Input value={caseNo} onChange={(e) => setCaseNo(e.target.value)} placeholder="e.g. 2024-D123" />
      <Button onClick={handleSearch}>Search Case</Button>
    </div>
  );
}
