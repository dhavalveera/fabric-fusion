import type { FC } from "react";

// react icons
import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

// shadcn/ui
import { Avatar, AvatarFallback } from "../library/shadcn-components/ui/avatar";
import { Button } from "../library/shadcn-components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../library/shadcn-components/ui/dropdown-menu";

const UserDropdown: FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto cursor-pointer p-0 hover:bg-transparent">
          <Avatar className="size-8">
            <FaUserCircle className="size-8" />

            <AvatarFallback>KK</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">Keith Kennedy</span>
          <span className="text-muted-foreground truncate text-xs font-normal">k.kennedy@originui.com</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <MdLogout className="size-4 opacity-60" aria-hidden="true" focusable="false" />
          <span className="font-della-respira">Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
