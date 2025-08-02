"use client";

import React, { useState } from "react";
import { toast } from "sonner";

export default function DeleteCaseBox() {
  const [showInput, setShowInput] = useState(false);
  const [caseNo, setCaseNo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!caseNo.trim()) {
      toast.error("Please enter a valid Case No.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/case/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caseNo }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to delete case.");
      } else {
        toast.success(data.message || "Case deleted successfully.");
        setShowInput(false);
        setCaseNo("");
      }
    } 
    //eslint-disable-next-line
    catch (err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {!showInput ? (
        <button
          onClick={() => setShowInput(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-red-700"
        >
          Delete Case
        </button>
      ) : (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Case No."
            value={caseNo}
            onChange={(e) => setCaseNo(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl text-sm w-48 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-red-700"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Confirm"}
          </button>
          <button
            onClick={() => {
              setShowInput(false);
              setCaseNo("");
            }}
            className="text-sm text-gray-600 hover:text-black underline"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
