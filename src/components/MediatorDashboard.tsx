'use client';

import { useEffect, useState } from 'react';
import { LoaderOne } from "@/components/ui/loader";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import { Profile } from '@/components/Profile';
import {  FollowerPointerCard } from '@/components/ui/following-pointer';
import Image from 'next/image';

type CaseType = {
  _id: string;
  caseNo: string;
  mediatorName: string;
  status: string;
  nextHearingDate: string;
  partiesName: string;
};
const TitleComponent = ({
  title,
  avatar,
}: {
  title: string;
  avatar: string;
}) => (
  <div className="flex items-center space-x-2">
    <Image
      src={`/profile/${avatar}`}
      height="20"
      width="20"
      alt="thumbnail"
      className="rounded-full border-2 border-white"
    />
    <p>{title}</p>
  </div>
);
export default function MediatorDashboard() {
  const [loading, setLoading] = useState(true);
  const [cases, setCases] = useState<CaseType[]>([]);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [mediatorName, setMediatorName] = useState<string | null>(null);
  const [mediatormail , setMediatormail] = useState<string | null>(null);
  const [mediatorImage, setMediatorImage] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchMediatorName = async () => {
        
     const userId = searchParams.get('userId');
      if (!userId) return;

      try {
        const res = await fetch(`/api/mediator/name?userId=${userId}`);
        const data = await res.json();
        if (res.ok && data.mediatorName) {
          setMediatorName(data.mediatorName);
          setMediatormail(data.mediatormail);
          setMediatorImage(data.mediatorImage);
        } else {
          toast.error('Mediator not found');
        }
      } 
      //eslint-disable-next-line
      catch (err) {
        toast.error('Failed to fetch mediator name.');
      }
    };

    fetchMediatorName();
  },
  [searchParams]);

  const fetchCases = async () => {
    if (!mediatorName) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/case/mediator?name=${encodeURIComponent(mediatorName)}`, {
        method: 'GET',
      });
      const data = await res.json();
      setCases(data.cases || []);
    } 
    //eslint-disable-next-line
    catch (err) {
      toast.error('Failed to load cases.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, caseNo: string, updated: Partial<CaseType>) => {
  setUpdatingId(id);
  try {
    const res = await fetch(`/api/case/update-status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        caseNo,
        status: updated.status,
        nextHearingDate: updated.nextHearingDate,
      }),
    });

    if (!res.ok) throw new Error();
    toast.success('Case updated successfully');
    await fetchCases();
  } catch {
    toast.error('Failed to update case');
  } finally {
    setUpdatingId(null);
  }
};


  useEffect(() => {
    if (mediatorName) fetchCases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediatorName]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <LoaderOne  />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto ">
      <FollowerPointerCard
        title={
          <TitleComponent
            title={mediatorName || 'loading...'}
             avatar={mediatorImage || ''}
          />
        }
      >
      <Profile mediatorName={mediatorName || 'loading...'}  TotalCases={cases.length} mediatorEmail={mediatormail || 'loading...'} mediatorImage={mediatorImage} />
      <div className="overflow-auto rounded-xl border shadow-sm">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 border">Case No</th>
              <th className="p-3 border">Parties</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Next Hearing Date</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c._id} className="border-b">
                <td className="p-3 border">{c.caseNo}</td>
                <td className="p-3 border">{c.partiesName}</td>
                <td className="p-3 border">
                  <select
                    value={c.status}
                    onChange={(e) =>
                      setCases((prev) =>
                        prev.map((item) =>
                          item._id === c._id ? { ...item, status: e.target.value } : item
                        )
                      )
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="success">Success</option>
                    <option value="unsuccessful">Unsuccessful</option>
                  </select>
                </td>
                <td className="p-3 border">
                  <Input
                    type="date"
                    value={c.nextHearingDate?.slice(0, 10) || ''}
                    onChange={(e) =>
                      setCases((prev) =>
                        prev.map((item) =>
                          item._id === c._id
                            ? { ...item, nextHearingDate: e.target.value }
                            : item
                        )
                      )
                    }
                  />
                </td>
                <td className="p-3 border">
                  <Button
  size="sm"
  disabled={updatingId === c._id}
  onClick={() =>
    handleUpdate(c._id, c.caseNo, {
      status: c.status,
      nextHearingDate: c.nextHearingDate,
    })
  }
>
  {updatingId === c._id ? 'Saving...' : 'Save'}
</Button>

                </td>
              </tr>
            ))}
            {!cases.length && (
              <tr>
                <td colSpan={5} className="text-center p-6 text-gray-500">
                  No cases assigned.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </ FollowerPointerCard>
    </div>
  );
}
