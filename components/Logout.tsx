'use client'
import { authClient } from "@/src/lib/auth-client";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "./ui/dropdown-menu";

export default function Logout() {
    const router = useRouter()
    const handleLogout = async () => {
        await authClient.signOut()
        toast.success("Deconnexion reussie !")
        router.push("/")
    }
    return (
        <DropdownMenuItem>
            <button
                onClick={handleLogout}
                className="flex items-center"
            >
            <LogOutIcon className="mr-2 h-4 w-4" />
                Se deconnecter
            </button>
        </DropdownMenuItem>
    )
}