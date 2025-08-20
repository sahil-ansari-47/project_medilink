import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { connectToDatabase } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      await connectToDatabase();

      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      if (!sessionUser) return session;
      session.user.id = sessionUser._id.toString();
      session.user.first_name = sessionUser.first_name;
      session.user.last_name = sessionUser.last_name;
      session.user.image = sessionUser.image;
      if (sessionUser.phone_number) {
        session.user.address = sessionUser.address;
        session.user.phone_number = sessionUser.phone_number;
        session.user.city = sessionUser.city;
        session.user.state = sessionUser.state;
        session.user.age = sessionUser.age;
        session.user.gender = sessionUser.gender;
        session.user.blood_group = sessionUser.blood_group;
        session.user.pincode = sessionUser.pincode;
      }
      return session;
    },
    async signIn({ profile }) {
      await connectToDatabase();

      //check if user already exists
      const userExists = await User.findOne({ email: profile.email });
      //If not, create a new user
      if (!userExists) {
        await User.create({
          email: profile.email,
          first_name: profile.given_name,
          last_name: profile.family_name,
          image: profile.picture,
        });
      }

      return true;
    },
  },
});

export { handler as GET, handler as POST };
