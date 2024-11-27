"use client";
import React from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import Image from "next/image";

const content = [
  {
    title: "Ensuring Safety and Protection",
    description:
      "Parking lot security is a critical aspect of maintaining a safe and trustworthy environment for vehicle owners and operators. With the rise in vehicle-related crimes, such as theft, vandalism, and unauthorized access, implementing robust security measures has become essential. The security of parking lots encompasses a combination of technology, design, and management strategies to deter potential threats and ensure the protection of parked vehicles and individuals.",
    content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/parking1.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Technology Integration",
    description:
          "Automated gates equipped with RFID, license plate recognition, or ticketing systems streamline entry and exit, reducing wait times. Digital payment options such as mobile wallets, credit cards, and app-based payments enable cashless transactions for user convenience.Surveillance and monitoring systems like CCTV cameras enhance security, while IoT sensors detect occupancy, optimizing space usage. Furthermore, the inclusion of EV charging stations supports electric vehicles, promoting sustainability.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/parking2.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Version control",
    description:
      "Vehicle management involves the systematic organization and oversight of vehicle operations to ensure efficiency, safety, and cost-effectiveness. This includes tracking vehicle usage, maintaining performance records, and scheduling routine maintenance to reduce downtime and extend vehicle lifespan.Key features of modern vehicle management systems include GPS tracking, enabling real-time location monitoring; fuel management, which tracks and optimizes fuel consumption; and fleet analytics, which provides insights for better decision-making. Integrated software solutions often include driver behavior monitoring, promoting safer driving practices and reducing accidents.",
    content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/parking3.png"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Running out of content",
    description:
      "Key aspects include accessibility, such as mobile apps or online platforms for easy bookings, payments, or inquiries. Features like self-service kiosks, personalized experiences, and real-time updates on services or products further improve the customer journey.In parking and transportation, convenience is achieved through technologies like smart parking systems, which offer space availability updates, cashless payments, and reserved parking options. The goal is to save time, reduce effort, and provide a smooth, efficient experience for customers.By prioritizing convenience, businesses can increase customer retention and stand out in competitive markets.",
    content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/parking4.png"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
];
export function AboutUs() {
  return (
    <div className="p-10" id="about">
      <StickyScroll content={content} />
    </div>
  );
}
