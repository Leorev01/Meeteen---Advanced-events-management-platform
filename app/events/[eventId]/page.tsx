"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";

const EventDetailPage = () => {
  const searchParams = useSearchParams();

  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const date = searchParams.get("date");
  const src = searchParams.get("src");

  if (!title) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      {src && <Image src={src} alt={title} width={500} height={300} />}
      <p className="text-lg">{description}</p>
      <p className="text-gray-500">{date}</p>
    </div>
  );
};

export default EventDetailPage;
