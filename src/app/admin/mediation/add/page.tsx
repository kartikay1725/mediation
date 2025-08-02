"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function AddMediationPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    caseNo: "",
    partiesName: "",
    referralCourt: "",
    category: "",
    mediatorName: "",
    firstDate: "",
    status: "",
    nextHearing: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mediators, setMediators] = useState<string[]>([]);

  useEffect(() => {
    const fetchMediators = async () => {
      try {
        const res = await fetch("/api/mediators");
        const data = await res.json();
        //eslint-disable-next-line
        setMediators(data?.data?.map((m: any) => m.name) || []);

      } 
      //eslint-disable-next-line
      catch (error) {
        toast.error("Failed to load mediators");
      }
    };
    fetchMediators();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/mediation/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to add case");

      toast.success("Case added successfully");
      router.push("/admin/mediation/search");
    } 
    //eslint-disable-next-line
    catch (error) {
      toast.error("Failed to add case");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputType = (key: string) => {
    if (key.toLowerCase().includes("date") || key.toLowerCase().includes("hearing")) return "date";
    return "text";
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-neutral-900 via-purple-900 to-violet-900 overflow-hidden">
      <Navbar />
      <BackgroundBeams className="fixed inset-0" />
      <div className="relative z-10 container mx-auto px-4 py-20">
        <Card className="max-w-2xl mx-auto bg-background/90 backdrop-blur-sm">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">Add Mediation Case</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {Object.entries(form).map(([key, value]) => (
                <div key={key}>
                  <Label className="capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </Label>

                  {key === "mediatorName" ? (
                    <select
                      name={key}
                      value={value}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="mt-1 w-full p-2 rounded border"
                    >
                      <option value="">Select Mediator</option>
                      {mediators.map((mediator, idx) => (
                        <option key={idx} value={mediator}>
                          {mediator}
                        </option>
                      ))}
                    </select>
                  ) : key === "status" ? (
                    <select
                      name={key}
                      value={value}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="mt-1 w-full p-2 rounded border"
                    >
                      <option value="">Select Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Success">Success</option>
                      <option value="Unsuccessful">Unsuccessful</option>
                    </select>
                  ) : (
                    <Input
                      name={key}
                      value={value}
                      onChange={handleChange}
                      placeholder={`Enter ${key.replace(/([A-Z])/g, " $1").trim()}`}
                      type={getInputType(key)}
                      className="mt-1"
                      disabled={isSubmitting}
                    />
                  )}
                </div>
              ))}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
