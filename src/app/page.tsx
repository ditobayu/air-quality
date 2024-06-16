"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

// Define the interface for the data
interface AirQualityData {
  _id: string;
  resistance: number | string;
  ppm: number | string;
  rzero: number | string;
  timestamp?: string;
  is_danger: boolean;
}

// Function to format the date
const formatDate = (timestamp: string | undefined): string => {
  if (!timestamp) return "";
  const date = new Date(timestamp);

  const seconds = String(date.getSeconds()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return `${hours}:${minutes}:${seconds}, ${day} ${month} ${year}`;
};

export default function Home() {
  const [data, setData] = useState<AirQualityData[]>([]);

  const fetchData = async () => {
    const res = await fetch("/api/air-quality");
    const data: AirQualityData[] = await res.json();
    setData(data);
  };

  useEffect(() => {
    fetchData();
    console.log(data);
  }, []);

  return (
    <div className="max-w-4xl w-full mx-auto">
      <div className="mt-20 mb-8">
        <h1 className="text-2xl font-semibold">Air Quality Data</h1>
        <p className="text-sm text-gray-500">
          A list of your recent air quality data.
        </p>
      </div>
      <Table>
        <TableCaption className="text-right">
          {data?.length} entries
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Resistance</TableHead>
            <TableHead>PPM</TableHead>
            <TableHead>RZERO</TableHead>
            <TableHead>Is Danger</TableHead>
            <TableHead className="text-right">Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.resistance}</TableCell>
              <TableCell>{item.ppm}</TableCell>
              <TableCell>{item.rzero}</TableCell>
              <TableCell
                className={`${
                  item.is_danger ? "text-red-500" : "text-green-600"
                }`}
              >
                {item.is_danger ? "DANGER!!" : "SAFE"}
              </TableCell>
              <TableCell className="text-right">
                {formatDate(item.timestamp)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
