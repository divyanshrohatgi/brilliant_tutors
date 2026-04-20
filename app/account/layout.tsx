import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { AccountNav } from "@/components/account/AccountNav";

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || "Account";
  const initials = [user.firstName?.[0], user.lastName?.[0]].filter(Boolean).join("").toUpperCase() || "?";

  return (
    <div className="min-h-screen bg-muted">
      {/* Account header */}
      <div className="bg-primary text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center gap-4">
          {user.imageUrl ? (
            <Image
              src={user.imageUrl}
              alt={name}
              width={48}
              height={48}
              className="rounded-full border-2 border-white/30 shrink-0"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg shrink-0">
              {initials}
            </div>
          )}
          <div>
            <p className="text-white/60 text-xs uppercase tracking-widest font-semibold">My account</p>
            <p className="text-xl font-bold leading-tight">{name}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* Sidebar — stacks on mobile, fixed width on desktop */}
          <aside className="w-full lg:w-52 shrink-0">
            <div className="bg-white rounded-xl border border-border p-3 lg:sticky lg:top-6">
              <AccountNav />
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0 w-full">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
