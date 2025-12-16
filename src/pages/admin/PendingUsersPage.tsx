import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { UserCard } from "@/components/admin/UserCard";
import { useGetUsers } from "@/hooks/admin/use-get-users";

const PendingUsersPage = () => {
  // Search & Filter & Pagination state
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;
  
  // Fetch users with backend pagination - filter for pending professors only
  const { users, totalPages, isLoadingUsers } = useGetUsers({
    page,
    perPage,
    search,
    roleFilter: "professor/ta", // Only fetch pending professors
    yearFilter: "all",
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">Pending Users</h1>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search pending users..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pl-10" />
          </div>
        </div>

        <AdminPagination page={page} totalPages={totalPages} onPageChange={setPage} />

        {isLoadingUsers ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading users...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {users.map((user) => (
                <UserCard key={user.id} user={user} userType="pending"/>
              ))}
            </div>
            {users.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No pending users found.</p>
            )}
          </>
        )}

        <AdminPagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default PendingUsersPage;
