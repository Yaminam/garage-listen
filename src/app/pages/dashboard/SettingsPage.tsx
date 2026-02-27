import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Switch } from "../../components/ui/switch";
import { Badge } from "../../components/ui/badge";
import { User, Users, Key, CreditCard, Bell, Trash2, Plus, Copy } from "lucide-react";

const teamMembers = [
  { name: "John Doe", email: "john@acme.com", role: "Admin", status: "Active" },
  { name: "Jane Smith", email: "jane@acme.com", role: "Editor", status: "Active" },
  { name: "Mike Johnson", email: "mike@acme.com", role: "Viewer", status: "Pending" },
];

export function SettingsPage() {
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [members, setMembers] = useState(teamMembers);
  const [newMemberEmail, setNewMemberEmail] = useState("");

  const handleSaveProfile = () => toast.success("Profile saved successfully");

  const handleUpdatePassword = () => {
    if (!currentPassword) { toast.error("Enter your current password"); return; }
    if (newPassword.length < 8) { toast.error("New password must be at least 8 characters"); return; }
    if (newPassword !== confirmPassword) { toast.error("Passwords do not match"); return; }
    setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
    toast.success("Password updated successfully");
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText("gl_prod_1234567890abcdef");
    toast.success("API key copied to clipboard");
  };

  const handleGenerateKey = () => {
    const key = "gl_prod_" + Math.random().toString(36).slice(2, 18);
    navigator.clipboard.writeText(key);
    toast.success("New API key generated and copied to clipboard");
  };

  const handleAddMember = () => {
    if (!newMemberEmail.trim() || !newMemberEmail.includes("@")) { toast.error("Enter a valid email address"); return; }
    setMembers((prev) => [...prev, { name: newMemberEmail.split("@")[0], email: newMemberEmail, role: "Viewer", status: "Pending" }]);
    setNewMemberEmail("");
    toast.success(`Invitation sent to ${newMemberEmail}`);
  };

  const handleRemoveMember = (email: string) => {
    setMembers((prev) => prev.filter((m) => m.email !== email));
    toast.success("Member removed");
  };

  const handleDownloadInvoice = (date: string) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 800)),
      { loading: "Preparing invoice...", success: `Invoice for ${date} downloaded`, error: "Download failed" }
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and application preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto">
          <TabsTrigger value="profile" className="gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="team" className="gap-2">
            <Users className="w-4 h-4" />
            Team
          </TabsTrigger>
          <TabsTrigger value="api" className="gap-2">
            <Key className="w-4 h-4" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="w-4 h-4" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">JD</span>
                </div>
                <div>
                  <Button variant="outline" size="sm">Change Photo</Button>
                  <p className="text-xs text-gray-500 mt-1">JPG or PNG, max 5MB</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john@acme.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" defaultValue="Acme Inc." />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-primary" onClick={handleSaveProfile}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
              <div className="flex justify-end">
                <Button className="bg-primary" onClick={handleUpdatePassword}>Update Password</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Team Members</CardTitle>
                <div className="flex gap-2 items-center">
                  <Input
                    placeholder="email@company.com"
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                    className="w-52"
                    onKeyDown={(e) => e.key === "Enter" && handleAddMember()}
                  />
                  <Button className="gap-2 bg-primary" onClick={handleAddMember}>
                    <Plus className="w-4 h-4" />
                    Add Member
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th className="pb-3 font-medium text-sm text-gray-600">Name</th>
                      <th className="pb-3 font-medium text-sm text-gray-600">Email</th>
                      <th className="pb-3 font-medium text-sm text-gray-600">Role</th>
                      <th className="pb-3 font-medium text-sm text-gray-600">Status</th>
                      <th className="pb-3 font-medium text-sm text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((member, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-4">{member.name}</td>
                        <td className="py-4 text-sm text-gray-600">{member.email}</td>
                        <td className="py-4">
                          <select className="text-sm border border-gray-200 rounded px-2 py-1" defaultValue={member.role.toLowerCase()}>
                            <option value="admin">Admin</option>
                            <option value="editor">Editor</option>
                            <option value="viewer">Viewer</option>
                          </select>
                        </td>
                        <td className="py-4">
                          <Badge variant={member.status === "Active" ? "default" : "secondary"}>
                            {member.status}
                          </Badge>
                        </td>
                        <td className="py-4">
                          <Button variant="ghost" size="sm" onClick={() => handleRemoveMember(member.email)}>
                            <Trash2 className="w-4 h-4 text-error-500" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Admin</h4>
                  <p className="text-sm text-gray-600">
                    Full access to all features, team management, and billing
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Editor</h4>
                  <p className="text-sm text-gray-600">
                    Can create reports, manage alerts, and view all data
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Viewer</h4>
                  <p className="text-sm text-gray-600">
                    Read-only access to dashboards and reports
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys Tab */}
        <TabsContent value="api" className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Platform Default API</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium mb-1">Use Garage Listen API</h4>
                  <p className="text-sm text-gray-600">
                    Access social platforms through our unified API
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Your API Keys</CardTitle>
                <Button className="gap-2 bg-primary" onClick={handleGenerateKey}>
                  <Plus className="w-4 h-4" />
                  Generate Key
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Production API Key</span>
                  <Badge>Active</Badge>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <code className="flex-1 p-2 bg-gray-50 rounded text-sm">
                    {apiKeyVisible ? "gl_prod_1234567890abcdef" : "••••••••••••••••••••"}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setApiKeyVisible(!apiKeyVisible)}
                  >
                    {apiKeyVisible ? "Hide" : "Show"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleCopyApiKey}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500">Created on Feb 1, 2026 • Last used 2 hours ago</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Connect Your Own API</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                Connect your own social platform API keys for direct access
              </p>
              <div className="space-y-3">
                {["Twitter API", "Instagram API", "YouTube API"].map((platform) => (
                  <div key={platform} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <span className="font-medium">{platform}</span>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-6 bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl mb-1">Growth Plan</h3>
                    <p className="text-gray-600">$299/month</p>
                  </div>
                  <Badge className="bg-accent text-white">Active</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mentions Used:</span>
                    <span className="font-medium">24,583 / 100,000</span>
                  </div>
                  <div className="w-full bg-white rounded-full h-2">
                    <div className="h-2 bg-primary rounded-full" style={{ width: "25%" }} />
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-gray-600">Billing Cycle:</span>
                    <span className="font-medium">Renews March 1, 2026</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="flex-1">Change Plan</Button>
                <Button className="flex-1 bg-primary">Upgrade</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs font-medium">VISA</span>
                  </div>
                  <div>
                    <div className="font-medium">•••• •••• •••• 4242</div>
                    <div className="text-sm text-gray-600">Expires 12/2027</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">Update</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: "Feb 1, 2026", amount: "$299.00", status: "Paid" },
                  { date: "Jan 1, 2026", amount: "$299.00", status: "Paid" },
                  { date: "Dec 1, 2025", amount: "$299.00", status: "Paid" },
                ].map((invoice, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <div className="font-medium">{invoice.date}</div>
                      <div className="text-sm text-gray-600">{invoice.amount}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge>{invoice.status}</Badge>
                      <Button variant="outline" size="sm" onClick={() => handleDownloadInvoice(invoice.date)}>Download</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium mb-1">Alert Notifications</h4>
                  <p className="text-sm text-gray-600">Receive emails for critical alerts</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium mb-1">Weekly Report</h4>
                  <p className="text-sm text-gray-600">Get weekly performance summary</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium mb-1">Product Updates</h4>
                  <p className="text-sm text-gray-600">News about features and improvements</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Push Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium mb-1">Browser Notifications</h4>
                  <p className="text-sm text-gray-600">Show desktop notifications</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium mb-1">Mobile Notifications</h4>
                  <p className="text-sm text-gray-600">Push to mobile device</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
