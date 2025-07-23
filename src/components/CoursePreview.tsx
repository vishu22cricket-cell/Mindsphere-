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
    
    // Create content variations based on actual input
    const getTopicKeywords = () => {
      const input = inputContent?.toLowerCase() || courseTitle.toLowerCase();
      if (input.includes('machine learning') || input.includes('ai') || input.includes('neural')) {
        return 'AI/ML';
      } else if (input.includes('react') || input.includes('javascript') || input.includes('programming')) {
        return 'Programming';
      } else if (input.includes('business') || input.includes('management') || input.includes('strategy')) {
        return 'Business';
      } else if (input.includes('design') || input.includes('ui') || input.includes('ux')) {
        return 'Design';
      } else if (input.includes('data') || input.includes('analytics') || input.includes('statistics')) {
        return 'Data Science';
      } else if (input.includes('marketing') || input.includes('sales') || input.includes('growth')) {
        return 'Marketing';
      } else {
        return 'General';
      }
    };

    const topic = getTopicKeywords();
    const inputName = inputContent || courseTitle;

    const contentVariations = {
      youtube: {
        notes: [
          {
            title: `Key Insights from "${inputName}"`,
            content: `This video covers essential ${topic.toLowerCase()} concepts that are fundamental to understanding the field. The presenter breaks down complex ideas into digestible segments, providing practical examples and real-world applications. Key takeaways include implementation strategies, best practices, and common pitfalls to avoid when working in this domain.`,
            duration: "8 min read"
          },
          {
            title: `Deep Dive Analysis - ${topic} Fundamentals`,
            content: `A comprehensive analysis of the core principles discussed in the video. This section explores the theoretical foundations and practical implications of the concepts presented. We examine how these ideas connect to broader industry trends and their relevance to current ${topic.toLowerCase()} practices and methodologies.`,
            duration: "12 min read"
          },
          {
            title: `Practical Implementation Guide`,
            content: `Step-by-step guidance on applying the concepts from "${inputName}" in real-world scenarios. This practical guide includes actionable strategies, implementation frameworks, and case studies that demonstrate successful application of the discussed principles in professional ${topic.toLowerCase()} environments.`,
            duration: "6 min read"
          }
        ],
        quizzes: [
          {
            question: `Based on the video "${inputName.substring(0, 50)}...", what was identified as the most critical factor for success in ${topic.toLowerCase()}?`,
            options: [
              "Understanding foundational principles and theory",
              "Practical hands-on experience and application", 
              "Staying updated with latest trends and technologies",
              "Building strong professional networks and mentorship"
            ],
            correct: 0,
            explanation: `The video emphasized that mastering foundational principles in ${topic.toLowerCase()} provides the strongest base for long-term success, as trends change but core concepts remain valuable.`
          },
          {
            question: `Which approach was recommended for beginners starting in ${topic.toLowerCase()}?`,
            options: [
              "Jump directly into advanced topics",
              "Start with practical projects immediately",
              "Build solid theoretical understanding first",
              "Focus only on the most popular tools"
            ],
            correct: 2,
            explanation: `A solid theoretical foundation enables better decision-making and problem-solving as you progress in ${topic.toLowerCase()}, making it the recommended starting approach.`
          },
          {
            question: `What was highlighted as the biggest challenge when scaling ${topic.toLowerCase()} solutions?`,
            options: [
              "Technical complexity and system architecture",
              "Team coordination and communication",
              "Budget constraints and resource allocation", 
              "Maintaining quality while increasing speed"
            ],
            correct: 3,
            explanation: `Balancing quality with speed becomes increasingly difficult as ${topic.toLowerCase()} projects scale, requiring careful planning and process optimization.`
          }
        ],
        flashcards: [
          { 
            front: `Core ${topic} Principle`, 
            back: `Fundamental concept in ${topic.toLowerCase()} that serves as the foundation for more advanced techniques and applications discussed in "${inputName}"`,
            category: topic
          },
          { 
            front: `${topic} Best Practice`, 
            back: `Recommended approach or methodology highlighted in the video for achieving optimal results in ${topic.toLowerCase()} projects`,
            category: "Best Practices"
          },
          { 
            front: `Implementation Strategy`, 
            back: `Step-by-step approach for applying ${topic.toLowerCase()} concepts in real-world scenarios, as outlined in the video content`,
            category: "Implementation"
          },
          { 
            front: `${topic} Challenge`, 
            back: `Common obstacle or difficulty encountered when working with ${topic.toLowerCase()} that was addressed in the video discussion`,
            category: "Problem Solving"
          }
        ]
      },
      pdf: {
        notes: [
          {
            title: `Document Overview: "${inputName}"`,
            content: `Comprehensive summary of the key concepts and findings presented in this ${topic.toLowerCase()} document. The material covers essential theories, methodologies, and practical applications relevant to the field. This overview identifies the main arguments, supporting evidence, and conclusions drawn by the authors.`,
            duration: "10 min read"
          },
          {
            title: `Critical Analysis - ${topic} Research`,
            content: `In-depth analysis of the research methodology, data interpretation, and conclusions presented in "${inputName}". This section examines the validity of the arguments, the strength of the evidence, and the implications for current ${topic.toLowerCase()} practice and future research directions.`,
            duration: "15 min read"
          },
          {
            title: `Key Concepts and Applications`,
            content: `Detailed exploration of the fundamental concepts introduced in the document and their practical applications. This section breaks down complex theoretical frameworks into understandable components and demonstrates how they can be applied in professional ${topic.toLowerCase()} contexts.`,
            duration: "20 min read"
          }
        ],
        quizzes: [
          {
            question: `According to the document "${inputName.substring(0, 50)}...", what methodology was most effective for ${topic.toLowerCase()} research?`,
            options: [
              "Quantitative analysis with statistical validation",
              "Qualitative research with case study approach", 
              "Mixed-methods combining multiple data sources",
              "Experimental design with controlled variables"
            ],
            correct: 2,
            explanation: `The document emphasized that mixed-methods approaches provide the most comprehensive understanding in ${topic.toLowerCase()} research by combining multiple perspectives and data types.`
          },
          {
            question: `What was identified as the primary limitation in current ${topic.toLowerCase()} approaches?`,
            options: [
              "Lack of standardized measurement tools",
              "Insufficient sample sizes in studies",
              "Limited consideration of contextual factors",
              "Overreliance on theoretical models"
            ],
            correct: 2,
            explanation: `The research highlighted that contextual factors significantly impact ${topic.toLowerCase()} outcomes but are often overlooked in traditional approaches.`
          },
          {
            question: `Which framework was recommended for implementing the document's findings?`,
            options: [
              "Systematic implementation with phase-by-phase rollout",
              "Rapid deployment across all areas simultaneously", 
              "Pilot testing followed by gradual expansion",
              "Theoretical validation before practical application"
            ],
            correct: 2,
            explanation: `Pilot testing allows for validation and refinement of ${topic.toLowerCase()} approaches before full-scale implementation, reducing risks and improving outcomes.`
          }
        ],
        flashcards: [
          { 
            front: `${topic} Research Method`, 
            back: `Primary research methodology discussed in "${inputName}" for investigating ${topic.toLowerCase()} phenomena and generating reliable findings`,
            category: "Research Methods"
          },
          { 
            front: `Key Finding`, 
            back: `Major discovery or conclusion from the research presented in the document that advances understanding in ${topic.toLowerCase()}`,
            category: topic
          },
          { 
            front: `Theoretical Framework`, 
            back: `Conceptual model or theory used in the document to explain and predict ${topic.toLowerCase()} behaviors and outcomes`,
            category: "Theory"
          },
          { 
            front: `Practical Application`, 
            back: `Real-world use case or implementation strategy for the ${topic.toLowerCase()} concepts described in the research document`,
            category: "Application"
          },
          { 
            front: `Research Limitation`, 
            back: `Acknowledged constraint or boundary of the study that affects the generalizability of the ${topic.toLowerCase()} findings`,
            category: "Critical Analysis"
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