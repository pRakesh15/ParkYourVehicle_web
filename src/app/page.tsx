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
      Jay SHREE RAM
     
    </div>
  );
}
