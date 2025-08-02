"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function AddCaseForm() {
  const [form, setForm] = useState({
    caseNo: "",
    parties: "",
    mediator: "",
    court: "",
    hearingDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.caseNo || !form.parties || !form.mediator) {
      return toast.error("Please fill all required fields");
    }

    try {
      const res = await fetch("/api/mediation/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Error adding case");

      toast.success("Case added successfully");
      setForm({ caseNo: "", parties: "", mediator: "", court: "", hearingDate: "" });
    } 
    //eslint-disable-next-line
    catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-xl space-y-4">
      <Label>Case No</Label>
      <Input name="caseNo" value={form.caseNo} onChange={handleChange} placeholder="Case Number" />

      <Label>Parties Involved</Label>
      <Input name="parties" value={form.parties} onChange={handleChange} placeholder="Name of parties" />

      <Label>Mediator Name</Label>
      <Input name="mediator" value={form.mediator} onChange={handleChange} placeholder="Mediator name" />

      <Label>Court Name</Label>
      <Input name="court" value={form.court} onChange={handleChange} placeholder="e.g. Delhi District Court" />

      <Label>Next Hearing Date</Label>
      <Input name="hearingDate" type="date" value={form.hearingDate} onChange={handleChange} />

      <Button onClick={handleSubmit}>Add Case</Button>
    </div>
  );
}
