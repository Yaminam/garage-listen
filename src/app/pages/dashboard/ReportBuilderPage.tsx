import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Calendar, Download, Mail, FileText, Clock, Trash2 } from "lucide-react";

type Report = {
  id: number;
  name: string;
  date: string;
  modules: number;
  platforms: number;
  format: string;
  status: "ready" | "generating";
};

const initialReports: Report[] = [
  { id: 1, name: "Weekly Brand Report", date: "Feb 26, 2026", modules: 5, platforms: 6, format: "PDF", status: "ready" },
  { id: 2, name: "Sentiment Deep Dive", date: "Feb 24, 2026", modules: 3, platforms: 4, format: "Excel", status: "ready" },
  { id: 3, name: "Competitor Overview", date: "Feb 20, 2026", modules: 4, platforms: 5, format: "PPT", status: "ready" },
  { id: 4, name: "Q1 Executive Summary", date: "Feb 15, 2026", modules: 6, platforms: 6, format: "PDF", status: "ready" },
];

const reportModules = [
  { id: "overview", name: "Executive Overview", description: "High-level KPIs and summary" },
  { id: "sentiment", name: "Sentiment Analysis", description: "Detailed sentiment breakdown" },
  { id: "mentions", name: "Top Mentions", description: "Most engaging mentions" },
  { id: "trends", name: "Trending Topics", description: "Emerging keywords and trends" },
  { id: "competitors", name: "Competitor Comparison", description: "Share of voice analysis" },
  { id: "platforms", name: "Platform Performance", description: "Performance by channel" },
];

const platforms = ["Twitter", "Instagram", "YouTube", "News", "Reddit", "LinkedIn"];

export function ReportBuilderPage() {
  const [selectedModules, setSelectedModules] = useState(["overview", "sentiment", "mentions"]);
  const [selectedPlatforms, setSelectedPlatforms] = useState(platforms);
  const [dateRange, setDateRange] = useState("last7days");
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [recipients, setRecipients] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportHistory, setReportHistory] = useState<Report[]>(initialReports);

  const toggleModule = (id: string) => {
    setSelectedModules(
      selectedModules.includes(id)
        ? selectedModules.filter((m) => m !== id)
        : [...selectedModules, id]
    );
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(
      selectedPlatforms.includes(platform)
        ? selectedPlatforms.filter((p) => p !== platform)
        : [...selectedPlatforms, platform]
    );
  };

  const handleGenerateReport = () => {
    if (selectedModules.length === 0) { toast.error("Select at least one report module"); return; }
    if (selectedPlatforms.length === 0) { toast.error("Select at least one platform"); return; }
    setIsGenerating(true);
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1800)),
      {
        loading: "Generating report...",
        success: () => {
          setIsGenerating(false);
          const newReport: Report = {
            id: Date.now(),
            name: `Custom Report — ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`,
            date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            modules: selectedModules.length,
            platforms: selectedPlatforms.length,
            format: "PDF",
            status: "ready",
          };
          setReportHistory((prev) => [newReport, ...prev]);
          return `Report ready — ${selectedModules.length} sections, ${selectedPlatforms.length} platforms`;
        },
        error: "Failed to generate report",
      }
    );
    setTimeout(() => setIsGenerating(false), 1800);
  };

  const handleEmailReport = () => {
    if (scheduleEnabled && !recipients.trim()) { toast.error("Enter at least one recipient email"); return; }
    toast.success("Report scheduled for email delivery");
  };

  const handleExportFormat = (format: string) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: `Preparing ${format} export...`,
        success: `${format} report downloaded`,
        error: `Failed to export ${format}`,
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">Report Builder</h1>
          <p className="text-gray-600">Create custom reports for stakeholders</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={handleEmailReport}>
            <Mail className="w-4 h-4" />
            Email Report
          </Button>
          <Button className="gap-2 bg-primary" onClick={handleGenerateReport} disabled={isGenerating}>
            <Download className="w-4 h-4" />
            {isGenerating ? "Generating..." : "Generate Report"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Report Configuration */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Report Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Date Range */}
              <div className="space-y-2">
                <Label>Date Range</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "last7days", label: "Last 7 Days" },
                    { value: "last30days", label: "Last 30 Days" },
                    { value: "lastquarter", label: "Last Quarter" },
                    { value: "custom", label: "Custom Range" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setDateRange(option.value)}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        dateRange === option.value
                          ? "border-primary bg-primary-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Calendar className="w-5 h-5 mb-1 mx-auto" />
                      <div className="text-sm font-medium">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Platforms */}
              <div className="space-y-2">
                <Label>Select Platforms</Label>
                <div className="grid grid-cols-3 gap-3">
                  {platforms.map((platform) => (
                    <label
                      key={platform}
                      className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <Checkbox
                        checked={selectedPlatforms.includes(platform)}
                        onCheckedChange={() => togglePlatform(platform)}
                      />
                      <span className="text-sm">{platform}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Select Modules */}
              <div className="space-y-2">
                <Label>Report Modules</Label>
                <div className="space-y-2">
                  {reportModules.map((module) => (
                    <label
                      key={module.id}
                      className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <Checkbox
                        checked={selectedModules.includes(module.id)}
                        onCheckedChange={() => toggleModule(module.id)}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-medium">{module.name}</div>
                        <div className="text-sm text-gray-600">{module.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Schedule Email */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Schedule Email Delivery</CardTitle>
                <Switch checked={scheduleEnabled} onCheckedChange={setScheduleEnabled} />
              </div>
            </CardHeader>
            {scheduleEnabled && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <select
                    id="frequency"
                    className="w-full h-11 rounded-lg border border-gray-200 px-3"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipients">Recipients</Label>
                  <input
                    id="recipients"
                    type="text"
                    placeholder="email@company.com, email2@company.com"
                    value={recipients}
                    onChange={(e) => setRecipients(e.target.value)}
                    className="w-full h-11 rounded-lg border border-gray-200 px-3"
                  />
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 space-y-4">
                <div className="text-center pb-4 border-b">
                  <h3 className="text-xl mb-1">Social Listening Report</h3>
                  <p className="text-sm text-gray-600">February 20-27, 2026</p>
                </div>

                {selectedModules.includes("overview") && (
                  <div className="pb-4 border-b">
                    <h4 className="font-medium mb-2">Executive Overview</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-2 bg-gray-50 rounded text-center">
                        <div className="text-xl font-medium">24.5K</div>
                        <div className="text-xs text-gray-600">Mentions</div>
                      </div>
                      <div className="p-2 bg-gray-50 rounded text-center">
                        <div className="text-xl font-medium">74%</div>
                        <div className="text-xs text-gray-600">Sentiment</div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedModules.includes("sentiment") && (
                  <div className="pb-4 border-b">
                    <h4 className="font-medium mb-2">Sentiment Analysis</h4>
                    <div className="h-20 bg-gray-50 rounded flex items-center justify-center text-sm text-gray-500">
                      Chart preview
                    </div>
                  </div>
                )}

                {selectedModules.includes("mentions") && (
                  <div className="pb-4 border-b">
                    <h4 className="font-medium mb-2">Top Mentions</h4>
                    <div className="space-y-2">
                      <div className="p-2 bg-gray-50 rounded text-xs">
                        Sample mention preview...
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-center text-xs text-gray-500">
                  + {selectedModules.length} more sections
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">Export Format</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleExportFormat("PDF")}>PDF</Button>
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleExportFormat("Excel")}>Excel</Button>
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleExportFormat("PPT")}>PPT</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-primary-50 to-accent-50">
            <CardHeader>
              <CardTitle className="text-base">Report Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Modules:</span>
                <span className="font-medium">{selectedModules.length} selected</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Platforms:</span>
                <span className="font-medium">{selectedPlatforms.length} selected</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date Range:</span>
                <span className="font-medium">Last 7 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Schedule:</span>
                <span className="font-medium">{scheduleEnabled ? "Enabled" : "Disabled"}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Generated Reports History */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Generated Reports History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {reportHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <FileText className="w-10 h-10 mb-3 opacity-40" />
              <p className="font-medium">No reports generated yet</p>
              <p className="text-sm">Generate a report above and it will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-slate-800">
                  <tr className="text-left">
                    <th className="px-6 py-3 text-xs font-medium text-gray-500">Report Name</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500">Date</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500">Sections</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500">Platforms</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500">Format</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500">Status</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-slate-700">
                  {reportHistory.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-slate-800">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">{report.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{report.date}</td>
                      <td className="px-6 py-4 text-sm">{report.modules}</td>
                      <td className="px-6 py-4 text-sm">{report.platforms}</td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className="text-xs">{report.format}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className="text-xs bg-accent-100 text-accent-700">
                          ✓ Ready
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1 text-xs h-7"
                            onClick={() => {
                              toast.promise(
                                new Promise((r) => setTimeout(r, 600)),
                                { loading: "Downloading...", success: `${report.name} downloaded`, error: "Failed" }
                              );
                            }}
                          >
                            <Download className="w-3 h-3" />
                            Download
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="gap-1 text-xs h-7 text-gray-400 hover:text-error-500"
                            onClick={() => {
                              setReportHistory((prev) => prev.filter((r) => r.id !== report.id));
                              toast.success("Report deleted");
                            }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
