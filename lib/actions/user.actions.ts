'use server'

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";

// export const signIn = async ({ email, password }: signInProps) => {
//     try {
//         const { account } = await createAdminClient();
//         const response = await account.createEmailPasswordSession(email, password);
//         return parseStringify(response);
//     } catch (error) {

//     }
// }


export const signIn = async ({ email, password }: signInProps) => {
    try {
      const { account } = await createAdminClient();
      const session = await account.createEmailPasswordSession(email, password);
  
      cookies().set("appwrite-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });
  
    //   const user = await getUserInfo({ userId: session.userId }) 
  
      return parseStringify(session);
    } catch (error) {
      console.error('Error', error);
    }
  }



export const signUp = async (userData: SignUpParams) => {
    try {
        const { account } = await createAdminClient();
        const { firstName, lastName, email, password } = userData;

        console.log(firstName, lastName, email, password);

        const newUserAccount = await account.create(
            ID.unique(),
            email,
            password,
            `${firstName} ${lastName}`
        );

        const session = await account.createEmailPasswordSession(email, password);

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        return parseStringify(newUserAccount)

    } catch (error) {
        console.log(error);
    }
}


export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        const user = await account.get();
        return parseStringify(user);
    } catch (error) {
        return null;
    }
}

export const logoutAccount = async () => {
    try {
        const { account } = await createSessionClient();

        cookies().delete('appwrite-session');
        await account.deleteSession('current');
    } catch (error) {
        console.log(error);
    }
}
