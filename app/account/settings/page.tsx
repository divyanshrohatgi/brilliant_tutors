import type { Metadata } from "next";
import { UserProfile } from "@clerk/nextjs";
import { Settings } from "lucide-react";

export const metadata: Metadata = { title: "Account settings" };

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center gap-3">
          <Settings className="w-5 h-5 text-primary" />
          <h1 className="font-bold text-primary text-lg">Account settings</h1>
        </div>
        <div className="p-6">
          <UserProfile />
        </div>
      </div>
    </div>
  );
}
