import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  MessageSquare, 
  FileText, 
  Brain, 
  Download, 
  Zap,
  Target,
  Users,
  Clock
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Generated Notes",
      description: "Automatically extract key concepts and create comprehensive lecture notes from any content.",
      badge: "Smart"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Interactive Quizzes",
      description: "Generate targeted quizzes that test understanding and reinforce learning objectives.",
      badge: "Adaptive"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Smart Flashcards",
      description: "Create memory-boosting flashcards with spaced repetition algorithms.",
      badge: "Efficient"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "AI Tutor Chat",
      description: "Get instant answers and explanations from your personal AI teaching assistant.",
      badge: "24/7"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Course Summaries",
      description: "Receive concise summaries highlighting the most important learning points.",
      badge: "Focused"
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Export Everything",
      description: "Download courses in multiple formats: PDF, SCORM, or interactive web packages.",
      badge: "Flexible"
    }
  ];

  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      number: "50,000+",
      label: "Active Learners"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      number: "2x Faster",
      label: "Learning Speed"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      number: "15,000+",
      label: "Courses Created"
    }
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Features header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need to
            <span className="bg-gradient-secondary bg-clip-text text-transparent"> Learn Faster</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI-powered platform transforms any content into a complete learning experience 
            with all the tools you need to master new skills.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-card transition-all duration-300 hover:scale-105 bg-gradient-card border-0"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats section */}
        <div className="bg-gradient-hero rounded-3xl p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-8">
            Trusted by Learners Worldwide
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-white mx-auto mb-3">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;