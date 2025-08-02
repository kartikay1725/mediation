"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";

type Mediator = {
  id: string;
  name: string;
  email: string;
  specialization: string;
  photo: string;
};

type MediatorsListProps = {
  mediators: Mediator[];
};

export const MediatorsList = ({ mediators }: MediatorsListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
      {mediators.map((mediator) => (
        <Card key={mediator.id} className="bg-white dark:bg-zinc-900 shadow-md hover:shadow-lg transition">
          <CardHeader className="flex items-center gap-4">
            <Image
              src={mediator.photo}
              alt={mediator.name}
              width={60}
              height={60}
              className="rounded-full object-cover"
            />
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                {mediator.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{mediator.specialization}</p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-300">Email: {mediator.email}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
