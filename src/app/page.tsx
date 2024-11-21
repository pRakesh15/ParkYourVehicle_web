'use client'
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { SearchGaragesDocument, UsersDocument } from "../../../libs/Network/src/gql/generated";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data, loading } = useQuery(UsersDocument)
  const {data:sessionData,status}=useSession()
  const {data:garages}=useQuery(SearchGaragesDocument,{
    variables:{
      dateFilter:{end:'2024-11-15',start:'2024-11-13'},
      locationFilter:{
        ne_lat:1,
        ne_lng:1,
        sw_lat:-1,
        sw_lng:-1
      }
    }
  })
  // console.log(garages)
  // const router = useRouter();
  return (
    <div >
      Jay SHREE RAM
      <div className="text-white">
        {
          garages?.searchGarages.map(garages=>
          <div key={garages.id}>
            {JSON.stringify(garages)}
          </div>)
        }
      </div>

      
     
    </div>
  );
}
