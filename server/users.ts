"use server"

import { auth } from "@/src/lib/auth"

export const signIn = async ({ email, password }: { email: string, password: string }) => {
   try{
        await auth.api.signInEmail({
            body: {
                email,
                password
            }
        })
        return {
            success: true,
            message: "Connexion reussie !"
        }
   } catch (error) {
        const err = error as Error
        return {
            success: false,
            message: err.message
        }
   }
}


export const signUp = async () => {
    await auth.api.signUpEmail({
        body: {
            email: "resa@gmail.com",
            password: "FormResa",
            name: "Résita"
        }
    })
}