import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Brain, BookOpen, Download } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      icon: <Upload className="w-8 h-8" />,
      title: "Upload Content",
      description: "Simply paste a YouTube URL or drag & drop your PDF files. Our system supports multiple formats and handles large files efficiently.",
      color: "bg-blue-500"
    },
    {
      step: "02", 
      icon: <Brain className="w-8 h-8" />,
      title: "AI Processing",
      description: "Our advanced AI analyzes your content, extracts key concepts, and identifies learning objectives using natural language processing.",
      color: "bg-purple-500"
    },
    {
      step: "03",
      icon: <BookOpen className="w-8 h-8" />,
      title: "Course Generation",
      description: "AI creates comprehensive notes, interactive quizzes, flashcards, and a personalized tutor based on your content.",
      color: "bg-green-500"
    },
    {
      step: "04",
      icon: <Download className="w-8 h-8" />,
      title: "Learn & Export",
      description: "Study with the generated materials, chat with your AI tutor, and export everything in multiple formats for offline use.",
      color: "bg-orange-500"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            How It
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform any content into a complete learning experience in just four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent transform translate-x-4 z-0" />
              )}
              
              <Card className="relative z-10 group hover:shadow-card transition-all duration-300 hover:scale-105 bg-gradient-card border-0">
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center text-white mx-auto group-hover:scale-110 transition-transform`}>
                      {step.icon}
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="absolute -top-2 -right-2 bg-primary text-primary-foreground border-0 w-8 h-8 rounded-full flex items-center justify-center p-0 text-sm font-bold"
                    >
                      {step.step}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-hero rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-white/90 mb-6">
              Join thousands of learners who are already transforming their study experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors"
              >
                Start Creating Now
              </button>
              <button className="border border-white/20 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
                View Examples
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;