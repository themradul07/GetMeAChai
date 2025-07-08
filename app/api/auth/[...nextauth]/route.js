import NextAuth from 'next-auth'

import GitHubProvider from 'next-auth/providers/github'
import mongoose from 'mongoose';
import User from '@/models/User';
import Payment from '@/models/Payment';
import {connectdb } from '@/db/connectdb';

connectdb();

export const authoptions = NextAuth({
  providers: [
    
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],

  callbacks: {
    
    async signIn({ user, account, profile, email, credentials }) {
           
      if(account.provider == "github")  {

        const currentUser = await User.findOne({email: user.email}) 
        if(!currentUser){
          //create an account
          const newUser = await User.create({
            email :user.email,
            username : user.username || user.name.replace(/\s+/g, '').toLowerCase(),
            name: user.name,
            profilePicture: user.image,
            coverPicture: "/banner.gif",

          })
          await newUser.save();
          }
          return true;
        }
        
    },

    async session({ session, user, token }) {
     

      const currentUser = await User.findOne({email: session.user.email});
      console.log("Current User:", currentUser);

      session.user.name = currentUser.username;
      session.user.name1 = currentUser.name;
      session.user.img = currentUser.profilePicture;

      
      return session;
    }


    

  }
})

export { authoptions as GET, authoptions as POST }