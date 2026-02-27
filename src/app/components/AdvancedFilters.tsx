import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

interface FilterOption {
  name: string;
  value: string;
}

interface AdvancedFiltersProps {
  onApply: (filters: Record<string, any>) => void;
  onSave?: (filterName: string, filters: Record<string, any>) => void;
}

export function AdvancedFilters({ onApply, onSave }: AdvancedFiltersProps) {
  const [filters, setFilters] = useState({
    sentiment: '',
    platform: '',
    dateRange: 'all',
    searchTerm: '',
    language: '',
    minEngagement: '',
  });

  const [saveFilterName, setSaveFilterName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onApply(filters);
  };

  const handleSave = () => {
    if (saveFilterName && onSave) {
      onSave(saveFilterName, filters);
      setSaveFilterName('');
      setShowSaveDialog(false);
    }
  };

  const handleReset = () => {
    setFilters({
      sentiment: '',
      platform: '',
      dateRange: 'all',
      searchTerm: '',
      language: '',
      minEngagement: '',
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
      <h3 className="font-semibold text-lg">Advanced Filters</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sentiment">Sentiment</Label>
          <select
            id="sentiment"
            value={filters.sentiment}
            onChange={(e) => handleFilterChange('sentiment', e.target.value)}
            className="w-full h-10 rounded-lg border border-gray-200 px-2"
          >
            <option value="">All</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="platform">Platform</Label>
          <select
            id="platform"
            value={filters.platform}
            onChange={(e) => handleFilterChange('platform', e.target.value)}
            className="w-full h-10 rounded-lg border border-gray-200 px-2"
          >
            <option value="">All Platforms</option>
            <option value="twitter">Twitter</option>
            <option value="instagram">Instagram</option>
            <option value="facebook">Facebook</option>
            <option value="youtube">YouTube</option>
            <option value="reddit">Reddit</option>
            <option value="news">News</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateRange">Date Range</Label>
          <select
            id="dateRange"
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className="w-full h-10 rounded-lg border border-gray-200 px-2"
          >
            <option value="all">All Time</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <select
            id="language"
            value={filters.language}
            onChange={(e) => handleFilterChange('language', e.target.value)}
            className="w-full h-10 rounded-lg border border-gray-200 px-2"
          >
            <option value="">All Languages</option>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="pt">Portuguese</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="minEngagement">Min. Engagement</Label>
          <Input
            id="minEngagement"
            type="number"
            placeholder="0"
            value={filters.minEngagement}
            onChange={(e) => handleFilterChange('minEngagement', e.target.value)}
            className="h-10"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="searchTerm">Search Term</Label>
          <Input
            id="searchTerm"
            placeholder="e.g., #ProductLaunch"
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            className="h-10"
          />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button onClick={handleApply} className="bg-primary hover:bg-primary-600">
          Apply Filters
        </Button>
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
        {onSave && (
          <Button
            variant="outline"
            onClick={() => setShowSaveDialog(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Save Search
          </Button>
        )}
      </div>

      {showSaveDialog && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
          <Label htmlFor="filterName">Search Name</Label>
          <div className="flex gap-2">
            <Input
              id="filterName"
              placeholder="e.g., High engagement positive mentions"
              value={saveFilterName}
              onChange={(e) => setSaveFilterName(e.target.value)}
              className="h-10"
            />
            <Button
              onClick={handleSave}
              disabled={!saveFilterName}
              className="bg-primary hover:bg-primary-600"
            >
              Save
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowSaveDialog(false);
                setSaveFilterName('');
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
