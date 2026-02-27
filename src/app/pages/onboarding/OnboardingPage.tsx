import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Check, X, CheckCircle, Plus, AlertCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { validateEmail } from "../../lib/validation";

const steps = [
  "Account Info",
  "Brand Setup",
  "Keywords",
  "Competitors",
  "Platforms",
  "Region & Language",
  "Goals",
  "Connect Accounts",
  "Done",
];

const platforms = [
  { id: "twitter", name: "Twitter", icon: "𝕏" },
  { id: "instagram", name: "Instagram", icon: "📷" },
  { id: "youtube", name: "YouTube", icon: "▶️" },
  { id: "news", name: "News", icon: "📰" },
  { id: "blogs", name: "Blogs", icon: "📝" },
  { id: "reddit", name: "Reddit", icon: "🔴" },
  { id: "linkedin", name: "LinkedIn", icon: "💼" },
  { id: "facebook", name: "Facebook", icon: "👍" },
  { id: "forums", name: "Forums", icon: "💬" },
];

const goalOptions = [
  { id: "brand-monitoring", label: "Brand Monitoring", description: "Track brand mentions and reputation" },
  { id: "competitor-analysis", label: "Competitor Analysis", description: "Monitor competitor activity" },
  { id: "customer-insights", label: "Customer Insights", description: "Understand customer sentiment" },
  { id: "trend-discovery", label: "Trend Discovery", description: "Find emerging trends and topics" },
  { id: "crisis-management", label: "Crisis Management", description: "Quick response to negative mentions" },
  { id: "market-research", label: "Market Research", description: "Analyze market trends and opportunities" },
];

export function OnboardingPage() {
  const navigate = useNavigate();
  const { completeOnboarding } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [tried, setTried] = useState(false); // tracks if user tried to advance without meeting requirements

  // Step 1: Account Info
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  // Step 2: Brand Setup
  const [brandName, setBrandName] = useState("");
  const [brandDescription, setBrandDescription] = useState("");

  // Step 4: Keywords
  const [keywords, setKeywords] = useState<string[]>(["brand name"]);
  const [keywordInput, setKeywordInput] = useState("");
  const [keywordOperator, setKeywordOperator] = useState<"AND" | "OR" | "NOT">("OR");

  const addKeyword = () => {
    const trimmed = keywordInput.trim();
    if (trimmed && !keywords.includes(trimmed)) {
      setKeywords([...keywords, trimmed]);
      setKeywordInput("");
    }
  };
  const removeKeyword = (kw: string) => setKeywords(keywords.filter((k) => k !== kw));
  const [competitors, setCompetitors] = useState<string[]>([]);
  const [competitorInput, setCompetitorInput] = useState("");

  // Step 4: Platforms
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  // Step 5: Region & Language
  const [region, setRegion] = useState("global");
  const [language, setLanguage] = useState("english");

  // Step 6: Goals
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  // Step 7: Connect Accounts
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>([]);

  const addCompetitor = () => {
    if (competitorInput.trim() && !competitors.includes(competitorInput.trim())) {
      setCompetitors([...competitors, competitorInput.trim()]);
      setCompetitorInput("");
    }
  };

  const removeCompetitor = (competitor: string) => {
    setCompetitors(competitors.filter((c) => c !== competitor));
  };

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(
      selectedPlatforms.includes(platformId)
        ? selectedPlatforms.filter((p) => p !== platformId)
        : [...selectedPlatforms, platformId]
    );
  };

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(
      selectedGoals.includes(goalId)
        ? selectedGoals.filter((g) => g !== goalId)
        : [...selectedGoals, goalId]
    );
  };

  const toggleConnectedAccount = (accountId: string) => {
    setConnectedAccounts(
      connectedAccounts.includes(accountId)
        ? connectedAccounts.filter((a) => a !== accountId)
        : [...connectedAccounts, accountId]
    );
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return !!(fullName.trim() && email.trim() && company.trim() && !validateEmail(email));
      case 1: return !!brandName.trim();
      case 2: return true;
      case 3: return true;
      case 4: return selectedPlatforms.length > 0;
      case 5: return true;
      case 6: return selectedGoals.length > 0;
      case 7: return true;
      case 8: return true;
      default: return true;
    }
  };

  const stepError = (): string | null => {
    if (!tried) return null;
    switch (currentStep) {
      case 0:
        if (!fullName.trim()) return "Full name is required";
        if (!email.trim()) return "Email is required";
        if (validateEmail(email)) return validateEmail(email);
        if (!company.trim()) return "Company name is required";
        return null;
      case 1: return !brandName.trim() ? "Brand name is required" : null;
      case 4: return selectedPlatforms.length === 0 ? "Select at least one platform" : null;
      case 6: return selectedGoals.length === 0 ? "Select at least one goal" : null;
      default: return null;
    }
  };

  const handleNext = () => {
    if (!canProceed()) {
      setTried(true);
      return;
    }
    setTried(false);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
      navigate("/dashboard");
    }
  };

  const handleBack = () => {
    setTried(false);
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const [countdown, setCountdown] = useState(3);

  // Auto-redirect with countdown on Done step
  useEffect(() => {
    if (currentStep === 8) {
      completeOnboarding();
      setCountdown(3);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            navigate("/dashboard");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentStep, navigate, completeOnboarding]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          </div>
          <h1 className="text-3xl mb-2 text-gray-900">Welcome to Garage Listen</h1>
          <p className="text-gray-600">Let's set up your social listening workspace</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => (
              <div key={step} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    index < currentStep
                      ? "bg-accent border-accent text-white"
                      : index === currentStep
                      ? "bg-primary border-primary text-white"
                      : "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
                </div>
                <span className={`text-xs mt-2 hidden md:block ${index === currentStep ? "text-gray-900" : "text-gray-500"}`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute h-full bg-primary transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <Card className="border-0 shadow-2xl">
          <CardContent className="p-8">
            {/* Inline step error banner */}
            {stepError() && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 mb-6">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {stepError()}
              </div>
            )}
            {/* Step 1: Account Info */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl mb-2">Create your account</h2>
                  <p className="text-gray-600">Tell us about yourself</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => { setFullName(e.target.value); setTried(false); }}
                      placeholder="John Doe"
                      className={`h-12 ${tried && !fullName.trim() ? "border-red-500" : ""}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setTried(false); }}
                      placeholder="john@example.com"
                      className={`h-12 ${tried && validateEmail(email) ? "border-red-500" : ""}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      value={company}
                      onChange={(e) => { setCompany(e.target.value); setTried(false); }}
                      placeholder="Acme Inc."
                      className={`h-12 ${tried && !company.trim() ? "border-red-500" : ""}`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Brand Setup */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl mb-2">Brand Setup</h2>
                  <p className="text-gray-600">What's your brand name and what do you do?</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="brandName">Brand Name</Label>
                    <Input
                      id="brandName"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      placeholder="e.g., Acme Inc."
                      className="h-12 text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brandDescription">Brand Description</Label>
                    <textarea
                      id="brandDescription"
                      value={brandDescription}
                      onChange={(e) => setBrandDescription(e.target.value)}
                      placeholder="Briefly describe your brand and what you do..."
                      className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Keywords */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl mb-2">What do you want to track?</h2>
                  <p className="text-gray-600">Add keywords, phrases, or hashtags to monitor across all platforms.</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Add Keyword or Phrase</Label>
                    <div className="flex gap-2">
                      <Input
                        value={keywordInput}
                        onChange={(e) => setKeywordInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addKeyword()}
                        placeholder='e.g. "Garage Listen" or #brandname'
                        className="h-12 flex-1"
                      />
                      <Button onClick={addKeyword} className="h-12 px-6">
                        <Plus className="w-4 h-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </div>
                  {/* Operator selector */}
                  <div className="space-y-2">
                    <Label>Match Operator</Label>
                    <div className="flex gap-2">
                      {(["OR", "AND", "NOT"] as const).map((op) => (
                        <button
                          key={op}
                          type="button"
                          onClick={() => setKeywordOperator(op)}
                          className={`px-4 py-2 rounded-lg border-2 text-sm font-mono font-semibold transition-colors ${
                            keywordOperator === op
                              ? "border-primary bg-primary text-white"
                              : "border-gray-200 hover:border-gray-300 text-gray-600"
                          }`}
                        >
                          {op}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">
                      {keywordOperator === "OR" && "Show results matching any of the keywords (broader results)"}
                      {keywordOperator === "AND" && "Show results that match ALL keywords simultaneously (narrower results)"}
                      {keywordOperator === "NOT" && "Exclude results containing the additional keywords"}
                    </p>
                  </div>
                  {/* Keywords list */}
                  {keywords.length > 0 && (
                    <div className="space-y-2">
                      <Label>Your Keywords</Label>
                      <div className="p-3 border rounded-lg bg-gray-50">
                        <div className="flex flex-wrap gap-2">
                          {keywords.map((kw, i) => (
                            <span key={kw} className="flex items-center">
                              {i > 0 && (
                                <span className="text-xs font-mono font-bold text-primary mr-2">{keywordOperator}</span>
                              )}
                              <Badge variant="secondary" className="px-3 py-1.5">
                                {kw}
                                <button onClick={() => removeKeyword(kw)} className="ml-2">
                                  <X className="w-3 h-3" />
                                </button>
                              </Badge>
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Query: <code className="text-primary">{keywords.join(` ${keywordOperator} `)}</code>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Competitors */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl mb-2">Add competitors to track</h2>
                  <p className="text-gray-600">Monitor your competition and compare performance (Optional)</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="competitors">Competitor Name</Label>
                    <div className="flex gap-2">
                      <Input
                        id="competitors"
                        value={competitorInput}
                        onChange={(e) => setCompetitorInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addCompetitor()}
                        placeholder="e.g., Competitor Inc."
                        className="h-12"
                      />
                      <Button onClick={addCompetitor} className="h-12 px-8">Add</Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {competitors.map((competitor) => (
                      <Badge key={competitor} variant="secondary" className="px-3 py-1.5 text-sm">
                        {competitor}
                        <button onClick={() => removeCompetitor(competitor)} className="ml-2">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Platforms */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl mb-2">Select platforms to monitor</h2>
                  <p className="text-gray-600">Choose where you want to listen for mentions</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {platforms.map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => togglePlatform(platform.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedPlatforms.includes(platform.id)
                          ? "border-primary bg-primary-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-3xl mb-2">{platform.icon}</div>
                      <div className="font-medium text-sm">{platform.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6: Region & Language */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl mb-2">Region & Language</h2>
                  <p className="text-gray-600">Customize your listening preferences</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="region">Region</Label>
                    <select
                      id="region"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full h-12 rounded-lg border border-gray-200 px-3"
                    >
                      <option value="global">Global</option>
                      <option value="north-america">North America</option>
                      <option value="south-america">South America</option>
                      <option value="europe">Europe</option>
                      <option value="asia">Asia</option>
                      <option value="middle-east">Middle East</option>
                      <option value="africa">Africa</option>
                      <option value="oceania">Oceania</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <select
                      id="language"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full h-12 rounded-lg border border-gray-200 px-3"
                    >
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="german">German</option>
                      <option value="portuguese">Portuguese</option>
                      <option value="chinese">Chinese</option>
                      <option value="japanese">Japanese</option>
                      <option value="arabic">Arabic</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 7: Goals */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl mb-2">What are your goals?</h2>
                  <p className="text-gray-600">Select what you want to achieve with social listening</p>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {goalOptions.map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => toggleGoal(goal.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        selectedGoals.includes(goal.id)
                          ? "border-primary bg-primary-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="font-medium">{goal.label}</div>
                      <div className="text-sm text-gray-600">{goal.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 8: Connect Accounts */}
            {currentStep === 7 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl mb-2">Connect your accounts</h2>
                  <p className="text-gray-600">Optional: Connect social accounts for deeper insights</p>
                </div>
                <div className="space-y-3">
                  {platforms.slice(0, 5).map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => toggleConnectedAccount(platform.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                        connectedAccounts.includes(platform.id)
                          ? "border-primary bg-primary-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{platform.icon}</span>
                        <span className="font-medium">{platform.name}</span>
                      </div>
                      <Button 
                        variant={connectedAccounts.includes(platform.id) ? "default" : "outline"}
                        onClick={() => toggleConnectedAccount(platform.id)}
                      >
                        {connectedAccounts.includes(platform.id) ? "Connected" : "Connect"}
                      </Button>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 9: Done */}
            {currentStep === 8 && (
              <div className="space-y-6 text-center py-8">
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center animate-pulse">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">Welcome to Garage Listen!</h2>
                  <p className="text-gray-600 text-lg">
                    Your setup is complete. Get ready to explore your social listening dashboard.
                  </p>
                </div>
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 text-left">
                  <h3 className="font-semibold text-primary mb-3">Your Setup Summary:</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Brand:</span> {brandName}</p>
                    <p><span className="font-medium">Keywords:</span> {keywords.join(` ${keywordOperator} `)}</p>
                    <p><span className="font-medium">Platforms:</span> {selectedPlatforms.length} selected</p>
                    <p><span className="font-medium">Region:</span> {region}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-gray-500 text-sm">Redirecting to dashboard in...</p>
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <span className="text-white text-2xl font-bold">{countdown}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            {currentStep < 8 && (
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="h-12 px-8"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleNext} 
                  disabled={!canProceed()}
                  className="h-12 px-8 bg-primary hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentStep === steps.length - 2 ? "Complete Setup" : "Continue"}
                </Button>
              </div>
            )}

            {currentStep === 8 && (
              <div className="flex justify-center mt-8 pt-6 border-t">
                <Button
                  onClick={() => { completeOnboarding(); navigate("/dashboard"); }}
                  className="h-12 px-12 bg-primary hover:bg-primary-600">
                  Go to Dashboard Now
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
