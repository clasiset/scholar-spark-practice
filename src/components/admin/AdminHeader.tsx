
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const AdminHeader = () => {
    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <SidebarTrigger className="sm:hidden" />
            <div className="relative ml-auto flex-1 md:grow-0">
                {/* Search can go here later */}
            </div>
            <Avatar className="cursor-pointer">
                <AvatarFallback className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold">
                    A
                </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">Logout</Button>
        </header>
    );
};

export default AdminHeader;
