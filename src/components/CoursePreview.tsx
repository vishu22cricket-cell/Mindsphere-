import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { 
  BookOpen, 
  MessageSquare, 
  FileText, 
  Brain, 
  Download,
  CheckCircle,
  Clock,
  Star,
  Send
} from "lucide-react";

interface CoursePreviewProps {
  isVisible: boolean;
  courseTitle: string;
  sourceType: "youtube" | "pdf";
  inputContent?: string; // URL or file name
}

const CoursePreview = ({ isVisible, courseTitle, sourceType, inputContent }: CoursePreviewProps) => {
  const { toast } = useToast();
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'ai' as const,
      message: "Hi! I'm your AI tutor for this course. I can help explain concepts, answer questions, and provide additional examples. What would you like to learn more about?"
    },
    {
      id: 2,
      type: 'user' as const,
      message: "Can you explain neural networks in simple terms?"
    },
    {
      id: 3,
      type: 'ai' as const,
      message: "Think of neural networks like your brain! Just as your brain has neurons that connect and pass information, artificial neural networks have nodes that process information. Each node receives input, processes it, and passes the result to the next layer. The network 'learns' by adjusting these connections based on examples, just like how you learn from experience! 🧠"
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  if (!isVisible) return null;

  const getAIResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();
    
    // Different responses based on keywords or topics
    if (message.includes('neural network') || message.includes('ai') || message.includes('machine learning')) {
      return "Neural networks are inspired by biological neurons! They consist of interconnected nodes that process information in layers. Each connection has a weight that gets adjusted during training. Think of it like learning to recognize patterns - the more examples you see, the better you get at identifying them.";
    } else if (message.includes('explain') || message.includes('what is') || message.includes('how does')) {
      return "Great question! Let me break this down step by step with examples from the course content. This concept builds on the fundamentals we covered earlier and connects to practical applications you'll encounter in real-world scenarios.";
    } else if (message.includes('example') || message.includes('practical') || message.includes('use case')) {
      return "Here's a practical example: In the finance industry, this concept is used for fraud detection, risk assessment, and algorithmic trading. For instance, banks use these techniques to analyze transaction patterns and identify suspicious activities in real-time.";
    } else if (message.includes('difference') || message.includes('compare') || message.includes('vs')) {
      return "The key differences lie in their approach and application. Method A focuses on accuracy and precision, while Method B prioritizes speed and scalability. The choice depends on your specific requirements - data size, processing time, and accuracy needs.";
    } else if (message.includes('code') || message.includes('implement') || message.includes('programming')) {
      return "From a programming perspective, here's how you'd implement this: Start with data preprocessing, then define your model architecture, set up training loops, and finally evaluate performance. I can walk you through each step with code examples if you'd like!";
    } else if (message.includes('thank') || message.includes('thanks')) {
      return "You're welcome! I'm here to help you master these concepts. Feel free to ask about any part of the course material - whether it's theory, practical applications, or implementation details.";
    } else {
      // Default varied responses
      const defaultResponses = [
        "That's an insightful question! Based on the course material, this topic connects to several key principles we've discussed. Let me elaborate on the most important aspects.",
        "Excellent point! This concept is fundamental to understanding the broader framework. I can provide specific examples and walk through the reasoning step by step.",
        "I can definitely help with that! This is a common area where students need clarification. Let me explain it using analogies and practical examples from the course.",
        "Great question! This relates directly to what we covered in the previous sections. The key insight here is understanding how different components work together.",
        "That's a topic that often requires deeper explanation. Based on the course content, here are the essential points you need to understand about this concept."
      ];
      return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      type: 'user' as const,
      message: newMessage
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    const currentMessage = newMessage;
    setNewMessage('');
    
    // Simulate AI response with contextual reply
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai' as const,
        message: getAIResponse(currentMessage)
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleExportCourse = () => {
    toast({
      title: "Course Export Started",
      description: "Your complete course is being prepared for download...",
    });
  };

  const handleSaveToDashboard = () => {
    toast({
      title: "Course Saved",
      description: "Successfully saved to your dashboard for future access.",
    });
  };

  // Generate dynamic content based on source type and input
  const generateContent = () => {
    const isYoutube = sourceType === "youtube";
    const isPDF = sourceType === "pdf";
    
    // Base content variations for different source types
    const contentVariations = {
      youtube: {
        notes: [
          {
            title: "Video Overview & Key Concepts",
            content: `This section covers the main topics discussed in the video. Key insights have been extracted and organized for easy learning and reference...`,
            duration: "8 min read"
          },
          {
            title: "Detailed Analysis",
            content: `Deep dive into the core concepts presented. This analysis breaks down complex topics into digestible segments with practical examples...`,
            duration: "12 min read"
          },
          {
            title: "Practical Applications",
            content: `Real-world applications and use cases discussed in the video. Learn how to implement these concepts in practical scenarios...`,
            duration: "6 min read"
          }
        ],
        quizzes: [
          {
            question: "According to the video, what is the most critical factor for implementing machine learning models in production?",
            options: [
              "Data quality and preprocessing",
              "Model complexity and accuracy",
              "Infrastructure scalability",
              "Team expertise and collaboration"
            ],
            correct: 0,
            explanation: "High-quality, well-preprocessed data is fundamental to successful ML deployment, as poor data quality can undermine even the most sophisticated models."
          },
          {
            question: "Which architectural pattern was recommended for handling real-time data processing?",
            options: [
              "Batch processing with scheduled jobs",
              "Event-driven microservices architecture",
              "Monolithic application design",
              "Client-side processing only"
            ],
            correct: 1,
            explanation: "Event-driven microservices provide the flexibility and scalability needed for real-time data processing while maintaining system resilience."
          },
          {
            question: "What was identified as the primary challenge when scaling distributed systems?",
            options: [
              "Hardware limitations",
              "Network latency and consistency",
              "Programming language choice",
              "Database selection"
            ],
            correct: 1,
            explanation: "Managing network latency while maintaining data consistency across distributed nodes is the fundamental challenge in scaling distributed systems."
          }
        ],
        flashcards: [
          { 
            front: "CAP Theorem", 
            back: "In distributed systems, you can only guarantee 2 out of 3: Consistency, Availability, and Partition tolerance",
            category: "System Design"
          },
          { 
            front: "Event Sourcing", 
            back: "An architectural pattern where state changes are stored as a sequence of events, enabling audit trails and time-travel debugging",
            category: "Architecture"
          },
          { 
            front: "Circuit Breaker Pattern", 
            back: "A design pattern that prevents cascading failures by monitoring service calls and 'opening' when failure rates exceed thresholds",
            category: "Resilience"
          },
          { 
            front: "CQRS", 
            back: "Command Query Responsibility Segregation - separating read and write operations for better performance and scalability",
            category: "Architecture"
          }
        ]
      },
      pdf: {
        notes: [
          {
            title: "Document Summary",
            content: `Comprehensive overview of the PDF content. Key sections have been identified and summarized for structured learning...`,
            duration: "10 min read"
          },
          {
            title: "Important Concepts",
            content: `Critical concepts and definitions extracted from the document. These form the foundation for understanding the subject matter...`,
            duration: "15 min read"
          },
          {
            title: "Detailed Explanations",
            content: `In-depth explanations of complex topics found in the document. Each concept is broken down with examples and context...`,
            duration: "20 min read"
          }
        ],
        quizzes: [
          {
            question: "Based on the research findings, which methodology showed the highest success rate for data validation?",
            options: [
              "Cross-validation with k-fold splitting",
              "Bootstrap sampling techniques",
              "Stratified random sampling",
              "Monte Carlo simulation methods"
            ],
            correct: 0,
            explanation: "Cross-validation with k-fold splitting provides robust estimates by training and testing on different data subsets, minimizing overfitting risks."
          },
          {
            question: "According to the document, what is the primary limitation of traditional statistical approaches?",
            options: [
              "Computational complexity",
              "Assumption of linear relationships",
              "Limited sample size requirements",
              "Inability to handle missing data"
            ],
            correct: 1,
            explanation: "Traditional statistical methods often assume linear relationships, which may not capture complex, non-linear patterns in real-world data."
          },
          {
            question: "Which framework was recommended for implementing the proposed solution?",
            options: [
              "Agile development methodology",
              "Waterfall project management",
              "DevOps continuous integration",
              "Design thinking approach"
            ],
            correct: 0,
            explanation: "Agile methodology's iterative approach aligns with the experimental nature of the proposed solution, allowing for rapid testing and refinement."
          }
        ],
        flashcards: [
          { 
            front: "Statistical Significance", 
            back: "A measure (p-value < 0.05) indicating that observed results are unlikely to have occurred by chance alone",
            category: "Statistics"
          },
          { 
            front: "Null Hypothesis", 
            back: "The default assumption that there is no relationship or effect, which researchers attempt to reject through testing",
            category: "Research Methods"
          },
          { 
            front: "Type I Error", 
            back: "False positive - rejecting a true null hypothesis, concluding an effect exists when it doesn't",
            category: "Statistical Inference"
          },
          { 
            front: "Effect Size", 
            back: "A quantitative measure of the magnitude of a phenomenon, indicating practical significance beyond statistical significance",
            category: "Statistics"
          },
          { 
            front: "Confidence Interval", 
            back: "A range of values that likely contains the true population parameter with a specified level of confidence (e.g., 95%)",
            category: "Statistical Inference"
          }
        ]
      }
    };

    return contentVariations[sourceType];
  };

  const content = generateContent();
  const mockNotes = content.notes;
  const mockQuizzes = content.quizzes;
  const mockFlashcards = content.flashcards;

  return (
    <div className="mt-8 animate-fade-in">
      <Card className="bg-gradient-card border-primary/20 shadow-glow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <CheckCircle className="w-6 h-6 text-green-500" />
              Course Generated Successfully!
            </CardTitle>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              {sourceType === "youtube" ? "YouTube" : "PDF"} Content
            </Badge>
          </div>
          <p className="text-muted-foreground">
            <strong>{courseTitle}</strong> has been transformed into a complete micro-course
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="notes" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="notes" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Notes
              </TabsTrigger>
              <TabsTrigger value="quizzes" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Quizzes
              </TabsTrigger>
              <TabsTrigger value="flashcards" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Flashcards
              </TabsTrigger>
              <TabsTrigger value="tutor" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                AI Tutor
              </TabsTrigger>
            </TabsList>

            <TabsContent value="notes" className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Generated Lecture Notes</h3>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
              </div>
              {mockNotes.map((note, index) => (
                <Card key={index} className="border border-border/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{note.title}</CardTitle>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {note.duration}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{note.content}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="quizzes" className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Interactive Quizzes</h3>
                <Badge variant="secondary">{mockQuizzes.length} Questions</Badge>
              </div>
              {mockQuizzes.map((quiz, index) => (
                <Card key={index} className="border border-border/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Question {index + 1}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        Multiple Choice
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium mb-4 text-foreground">{quiz.question}</p>
                    <div className="space-y-3">
                      {quiz.options.map((option, optIndex) => (
                        <div 
                          key={optIndex} 
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                            optIndex === quiz.correct 
                              ? "bg-green-50 border-green-300 text-green-800 shadow-sm" 
                              : "bg-card border-border/50 hover:border-primary/30 hover:bg-accent/30"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium ${
                              optIndex === quiz.correct 
                                ? "bg-green-200 text-green-800" 
                                : "bg-muted text-muted-foreground"
                            }`}>
                              {String.fromCharCode(65 + optIndex)}
                            </span>
                            <span className="flex-1">{option}</span>
                            {optIndex === quiz.correct && (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    {quiz.explanation && (
                      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Explanation:</strong> {quiz.explanation}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="flashcards" className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Study Flashcards</h3>
                <Badge variant="secondary">{mockFlashcards.length} Cards</Badge>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {mockFlashcards.map((card, index) => (
                  <Card key={index} className="group cursor-pointer hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card to-accent/10 border-2 border-border/50 hover:border-primary/30">
                    <CardContent className="p-6">
                      <div className="text-center space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-center gap-2">
                            <Badge variant="secondary" className="text-xs font-medium">
                              {card.category}
                            </Badge>
                          </div>
                          <div className="bg-primary/5 rounded-lg p-4 border">
                            <Badge variant="outline" className="mb-3 text-xs">Term</Badge>
                            <p className="font-semibold text-lg text-foreground">{card.front}</p>
                          </div>
                        </div>
                        <div className="border-t-2 border-dashed border-border/50 pt-4">
                          <div className="bg-accent/20 rounded-lg p-4 border">
                            <Badge variant="outline" className="mb-3 text-xs">Definition</Badge>
                            <p className="text-sm text-muted-foreground leading-relaxed">{card.back}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tutor" className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">AI Tutor Chat</h3>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-muted-foreground">Online</span>
                </div>
              </div>
              <Card className="border border-border/50">
                <CardContent className="p-6">
                  <div className="space-y-4 max-h-60 overflow-y-auto">
                    {chatMessages.map((message) => (
                      <div key={message.id} className={`flex items-start gap-3 ${message.type === 'user' ? 'justify-end' : ''}`}>
                        {message.type === 'ai' && (
                          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                            <Brain className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div className={`flex-1 ${message.type === 'user' ? 'max-w-xs' : ''}`}>
                          <p className={`text-sm rounded-lg p-3 ${
                            message.type === 'ai' 
                              ? 'bg-muted/50' 
                              : 'bg-primary text-primary-foreground'
                          }`}>
                            {message.message}
                          </p>
                        </div>
                        {message.type === 'user' && (
                          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium">You</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <input 
                      type="text" 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Ask your AI tutor anything..." 
                      className="flex-1 px-4 py-3 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button size="sm" className="px-4" onClick={handleSendMessage}>
                      <Send className="w-4 h-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex gap-3 mt-6 pt-6 border-t">
            <Button variant="hero" className="flex-1" onClick={handleExportCourse}>
              <Download className="w-4 h-4 mr-2" />
              Export Complete Course
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleSaveToDashboard}>
              <Star className="w-4 h-4 mr-2" />
              Save to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoursePreview;