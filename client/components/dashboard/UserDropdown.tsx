
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth";
import { useState } from "react";
import { LogoutConfirmationDialog } from "./LogoutConfirmationDialog";
import { ChevronDown } from "lucide-react";

export const UserDropdown = () => {
    const { user } = useAuth();
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

    if (!user) return null;

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2">
                        <div className="relative w-[50px] h-[50px] bg-[#DBA6A9] rounded-full flex items-center justify-center overflow-hidden">
                            <img
                                src="https://api.builder.io/api/v1/image/assets/TEMP/ca5bf68d1ef14e4e6447c83be84e7cf96bc3ccc3?width=66"
                                alt="User avatar"
                                className="w-8 h-10 object-cover mt-1"
                            />
                        </div>
                        <div className="hidden md:block text-left">
                            <p className="text-base font-semibold text-black tracking-tight">{user.name}</p>
                            <p className="text-base font-light text-[#444] tracking-tight">{user.email}</p>
                        </div>
                        <ChevronDown size={20} className="text-gray-500" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.name}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {user.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link to="/settings?tab=profile">Profile settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link to="/settings?tab=notifications">Notification preferences</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link to="/help">Help</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => setLogoutDialogOpen(true)} className="text-red-500">
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <LogoutConfirmationDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen} />
        </>
    );
};
