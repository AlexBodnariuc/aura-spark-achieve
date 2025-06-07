
import React from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { Header } from '@/components/layout/Header';
import { Dashboard } from './Dashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Stethoscope, 
  BookOpen, 
  Users, 
  Award, 
  ChevronRight, 
  Play,
  Star,
  CheckCircle,
  Brain,
  Heart,
  Shield
} from 'lucide-react';

export const GamifiedIndex: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-medical-light-blue via-white to-blue-50">
        <Header />
        
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="container mx-auto text-center">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-medical-blue/20 text-medical-blue text-sm font-medium">
                  <Stethoscope className="h-4 w-4" />
                  Medical Learning Platform
                </div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Master
                <span className="medical-gradient bg-clip-text text-transparent"> Medical </span>
                Knowledge
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Advance your medical expertise with our comprehensive learning platform. 
                Interactive courses, real case studies, and peer collaboration.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="medical-gradient text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-medical hover:shadow-lg transition-all">
                  <Play className="h-5 w-5 mr-2" />
                  Start Learning
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-medical-blue text-medical-blue hover:bg-medical-light-blue rounded-xl">
                  Watch Demo
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Floating Medical Icons */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 text-medical-blue/20 animate-pulse">
              <Heart className="h-8 w-8" />
            </div>
            <div className="absolute top-40 right-20 text-medical-teal/20 animate-pulse delay-1000">
              <Brain className="h-6 w-6" />
            </div>
            <div className="absolute bottom-40 left-20 text-medical-blue/20 animate-pulse delay-500">
              <Shield className="h-7 w-7" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Why Choose MedMentor?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our platform combines cutting-edge technology with proven medical education methods
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center border-0 shadow-medical hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="mx-auto mb-4 p-3 bg-medical-light-blue rounded-2xl group-hover:bg-medical-blue group-hover:text-white transition-all">
                    <BookOpen className="h-8 w-8 text-medical-blue group-hover:text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Interactive Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    Comprehensive medical courses with interactive content, simulations, and real-world scenarios
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-medical hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="mx-auto mb-4 p-3 bg-medical-light-blue rounded-2xl group-hover:bg-medical-teal group-hover:text-white transition-all">
                    <Users className="h-8 w-8 text-medical-teal group-hover:text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Expert Mentorship</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    Connect with experienced medical professionals and get personalized guidance
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-medical hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="mx-auto mb-4 p-3 bg-medical-light-blue rounded-2xl group-hover:bg-medical-blue group-hover:text-white transition-all">
                    <Award className="h-8 w-8 text-medical-blue group-hover:text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    Earn recognized certifications and track your professional development progress
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-medical hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="mx-auto mb-4 p-3 bg-medical-light-blue rounded-2xl group-hover:bg-medical-teal group-hover:text-white transition-all">
                    <CheckCircle className="h-8 w-8 text-medical-teal group-hover:text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Progress Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    Monitor your learning journey with detailed analytics and achievement systems
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 medical-gradient text-white">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">15k+</div>
                <div className="text-lg opacity-90">Medical Students</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
                <div className="text-lg opacity-90">Expert Mentors</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">1200+</div>
                <div className="text-lg opacity-90">Courses Available</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
                <div className="text-lg opacity-90">Success Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Dr. Sarah Johnson",
                  role: "Resident Physician",
                  content: "MedMentor transformed my learning experience. The interactive courses and expert mentorship helped me excel in my residency.",
                  rating: 5
                },
                {
                  name: "Alex Chen",
                  role: "Medical Student",
                  content: "The progress tracking and gamification made studying enjoyable. I improved my exam scores significantly.",
                  rating: 5
                },
                {
                  name: "Dr. Michael Rodriguez",
                  role: "Attending Physician",
                  content: "As a mentor on this platform, I've seen firsthand how effective the learning methodology is for students.",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <Card key={index} className="border-0 shadow-medical">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">"{testimonial.content}"</p>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-medical-blue">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Ready to Advance Your Medical Career?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of medical professionals who are already accelerating their learning with MedMentor
              </p>
              <Button size="lg" className="medical-gradient text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-medical">
                Get Started Today
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Dashboard />
    </div>
  );
};
