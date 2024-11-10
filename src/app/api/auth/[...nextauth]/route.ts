import { authOptions } from '../../../../../../libs/Network/src/config/authOptions'
import NextAuth from 'next-auth'

//when some request come to  /api/auth/* like what ever the request come to /auth,
//it will redirect to authOption present i network folder..
//as we know next-auth's signIn make a post request to /api/auth/[...nextauth]  
//for the cline code we don't create the post request here bcz we are using graphql
//so i redirect to authOptions 
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
