import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for trying out EduSynth",
      icon: <Star className="w-6 h-6" />,
      features: [
        "3 courses per month",
        "Basic AI-generated notes",
        "Simple quizzes",
        "Community support",
        "Export to PDF"
      ],
      limitations: [
        "Limited YouTube video length (30 min)",
        "Max 10MB PDF files",
        "Basic AI tutor responses"
      ],
      cta: "Get Started Free",
      popular: false,
      color: "border-border"
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "Best for students and professionals",
      icon: <Zap className="w-6 h-6" />,
      features: [
        "Unlimited courses",
        "Advanced AI analysis",
        "Interactive quizzes with explanations",
        "Smart flashcards with spaced repetition",
        "Priority AI tutor",
        "Export to all formats (PDF, SCORM, Web)",
        "Course analytics",
        "Custom branding"
      ],
      limitations: [],
      cta: "Start Pro Trial",
      popular: true,
      color: "border-primary"
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      description: "For teams and organizations",
      icon: <Crown className="w-6 h-6" />,
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Admin dashboard",
        "API access",
        "Custom integrations",
        "White-label solution",
        "Dedicated support",
        "Custom AI training",
        "SSO integration",
        "Advanced analytics"
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false,
      color: "border-accent"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Simple, Transparent
            <span className="bg-gradient-secondary bg-clip-text text-transparent"> Pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the plan that fits your learning needs. Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative group hover:shadow-card transition-all duration-300 hover:scale-105 ${plan.color} ${
                plan.popular ? 'ring-2 ring-primary shadow-glow' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-white border-0">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                  plan.popular ? 'bg-gradient-primary text-white' : 'bg-muted text-foreground'
                }`}>
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <p className="text-muted-foreground mt-2">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.limitations.length > 0 && (
                  <div className="pt-4 border-t border-border/50">
                    <p className="text-xs text-muted-foreground mb-3 font-medium">Limitations:</p>
                    <div className="space-y-2">
                      {plan.limitations.map((limitation, limitIndex) => (
                        <div key={limitIndex} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full flex-shrink-0" />
                          <span className="text-xs text-muted-foreground">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button 
                  variant={plan.popular ? "hero" : "outline"} 
                  className="w-full mt-6"
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-8">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
            <div className="space-y-3">
              <h4 className="font-semibold">Can I change plans anytime?</h4>
              <p className="text-muted-foreground text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">What payment methods do you accept?</h4>
              <p className="text-muted-foreground text-sm">We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Is there a free trial for Pro?</h4>
              <p className="text-muted-foreground text-sm">Yes, we offer a 14-day free trial for the Pro plan with no credit card required.</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Do you offer student discounts?</h4>
              <p className="text-muted-foreground text-sm">Yes, we offer 50% off Pro plans for verified students. Contact support for details.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;