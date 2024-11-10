'use client'
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { UsersDocument } from "../../../libs/Network/src/gql/generated";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data, loading } = useQuery(UsersDocument)
  const {data:sessionData,status}=useSession()
  // const router = useRouter();
  return (
    <div>
      <div>
      {
            sessionData?.user?.uid?(
                <button
                onClick={()=>signOut()}
                className="hidden md:block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            ): <button
          
            className="hidden md:block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >


            <Link href={'/login'}>Login</Link>
          </button>
        }
      </div>

      {
        data?.users.map((user) => (
          <div key={user.uid}>{user.name}</div>
        ))}
    </div>
  );
}
