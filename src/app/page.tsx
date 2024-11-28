'use client'
import 'mapbox-gl/dist/mapbox-gl.css';
import { useQuery } from "@apollo/client";
import { SearchGaragesDocument, UsersDocument } from "../../../libs/Network/src/gql/generated";
import { useSession } from "next-auth/react";
import Counter from '@/components/atoms/Counter';
import { AboutUs } from '@/components/atoms/AboutUs';
import { WorldMapDemo } from '@/components/atoms/WorldMapDemo';
import { AnimatedTestimonialsDemo } from '@/components/atoms/Testimonials';
import { Footer } from '@/components/atoms/Footer';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
export default function Home() {
  const { data, loading } = useQuery(UsersDocument)
  const { data: sessionData, status } = useSession()
  const { data: garages } = useQuery(SearchGaragesDocument, {
    variables: {
      dateFilter: { end: '2024-11-15', start: '2024-11-13' },
      locationFilter: {
        ne_lat: 1,
        ne_lng: 1,
        sw_lat: -1,
        sw_lng: -1
      }
    }
  })
  // console.log(garages)
  // const router = useRouter();

  const router = useRouter()

  return (
    <div className="relative h-screen">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/bgvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center h-full text-white bg-black bg-opacity-50">
        <h1 className="text-4xl md:text-6xl font-bold mt-[152px]">Welcome to Parking Hub</h1>
        <p className="mt-8 text-lg md:text-xl">We Find Spots, You Avoid Fights.</p>

        {
          sessionData?.user?.email ? (<button onClick={() => router.push('/search')} className="mt-36 px-6 py-2 bg-green-600 hover:bg-blue-700 rounded-lg">

            Search Garages
          </button>) : (<button onClick={() => router.push('/login')} className="mt-36 px-6 py-2 bg-green-600 hover:bg-blue-700 rounded-lg">
            Start for free

          </button>)
        }
      </div>
      <Counter />
      <AboutUs />
      <WorldMapDemo />
      <AnimatedTestimonialsDemo />
      <Footer />
    </div>
  );

}
