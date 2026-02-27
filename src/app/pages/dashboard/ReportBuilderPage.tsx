import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { Checkbox } from "../../components/ui/checkbox";
import { Calendar, Download, Mail, FileText } from "lucide-react";

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">Report Builder</h1>
          <p className="text-gray-600">Create custom reports for stakeholders</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <FileText className="w-4 h-4" />
            Templates
          </Button>
          <Button className="gap-2 bg-primary">
            <Download className="w-4 h-4" />
            Generate Report
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
                  <Button variant="outline" size="sm" className="flex-1">PDF</Button>
                  <Button variant="outline" size="sm" className="flex-1">Excel</Button>
                  <Button variant="outline" size="sm" className="flex-1">PPT</Button>
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
    </div>
  );
}
