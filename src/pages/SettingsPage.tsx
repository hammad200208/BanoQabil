import { MainLayout } from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <MainLayout>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-description">
          Update your profile and preferences
        </p>
      </div>

      {/* Settings Form */}
      <div className="mt-6 space-y-6 max-w-xl">
        {/* Profile Section */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Profile</h2>
          <Input placeholder="Name" defaultValue="Admin User" />
          <Input placeholder="Email" defaultValue="admin@banoquabil.pk" />
        </div>

        {/* Notifications Section */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <div className="flex items-center justify-between">
            <span>Email Notifications</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span>SMS Notifications</span>
            <Switch />
          </div>
        </div>

        {/* Theme Section */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Theme</h2>
          <div className="flex items-center justify-between">
            <span>Dark Mode</span>
            <Switch />
          </div>
        </div>

        {/* Save Button */}
        <div>
          <Button className="mt-4">Save Changes</Button>
        </div>
      </div>
    </MainLayout>
  );
}
