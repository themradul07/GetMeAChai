import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from "next-auth/providers/google";
import User from '@/models/User';
import { connectdb } from '@/db/connectdb';

let isConnected = false;

async function ensureDBConnected() {
  if (!isConnected) {
    await connectdb();
    isConnected = true;
  }
}

export const authoptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  callbacks: {
    async signIn({ user, account }) {

      await ensureDBConnected();
      const currentUser = await User.findOne({ email: user.email });

      if (!currentUser) {
        const newUser = await User.create({
          email: user.email,
          username: user.email.split('@')[0],
          name: user.name || "Anonymous",
          profilePicture: "cat.jpeg",
          coverPicture: "/banner.jpg",
        });
        await newUser.save();
      }
      return true;

    },

    async session({ session }) {
      await ensureDBConnected();

      const currentUser = await User.findOne({ email: session.user.email });

      if (currentUser) {
        console.log(currentUser)
        session.user.name = currentUser.username;
        session.user.name1 = currentUser.name;
        session.user.img = currentUser.profilePicture;
      }
      else {
        console.log("No User Found")
      }

      return session;
    }
  }
});

export { authoptions as GET, authoptions as POST };
