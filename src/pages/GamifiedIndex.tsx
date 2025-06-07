
import React from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { Header } from '@/components/layout/Header';
import { Dashboard } from './Dashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plus, 
  Trophy, 
  Brain, 
  Play,
  RotateCcw,
  ArrowRight,
  CheckCircle,
  Clock,
  Award
} from 'lucide-react';

export const GamifiedIndex: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen quiz-gradient">
        <Header />
        
        {/* Hero Section */}
        <section className="relative py-20 px-6">
          <div className="container mx-auto text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-6xl md:text-8xl font-bold text-gradient mb-6 leading-tight">
                Quiz Academy
              </h1>
              
              <p className="text-2xl md:text-3xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
                Îmbunătățește-ți cunoștințele și câștigă XP!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button size="lg" className="btn-cyan px-10 py-4 text-xl font-bold rounded-2xl shadow-glow hover:shadow-card transition-all">
                  <Play className="h-6 w-6 mr-3" />
                  Începe Acum
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="card-gradient shadow-card hover:shadow-glow transition-all duration-300 group border-0">
                <CardHeader className="pb-4 text-center">
                  <div className="mx-auto mb-6 p-4 bg-quiz-cyan/20 rounded-3xl group-hover:bg-quiz-cyan/30 transition-all border border-quiz-cyan/30">
                    <Plus className="h-10 w-10 text-quiz-cyan" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">Creează Quiz Nou</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-white/70 leading-relaxed text-lg">
                    Generează quiz-uri personalizate din fișierele tale PDF
                  </p>
                </CardContent>
              </Card>

              <Card className="card-gradient shadow-card hover:shadow-glow transition-all duration-300 group border-0">
                <CardHeader className="pb-4 text-center">
                  <div className="mx-auto mb-6 p-4 bg-quiz-purple/30 rounded-3xl group-hover:bg-quiz-purple/40 transition-all border border-quiz-purple/40">
                    <Trophy className="h-10 w-10 text-quiz-purple" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">Quiz-uri Disponibile</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-white/70 leading-relaxed text-lg">
                    Continuă quiz-urile în curs sau începe unele noi
                  </p>
                </CardContent>
              </Card>

              <Card className="card-gradient shadow-card hover:shadow-glow transition-all duration-300 group border-0">
                <CardHeader className="pb-4 text-center">
                  <div className="mx-auto mb-6 p-4 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-3xl group-hover:from-pink-500/30 group-hover:to-purple-600/30 transition-all border border-pink-500/30">
                    <Brain className="h-10 w-10 text-pink-400" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">Medmentor AI</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-white/70 leading-relaxed text-lg">
                    Ajutorul tău AI pentru pregătirea admiterii la medicină
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen quiz-gradient">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column - Create Quiz */}
          <Card className="card-gradient shadow-card border-0 h-fit">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-6 p-6 bg-quiz-cyan/20 rounded-3xl border border-quiz-cyan/30">
                <Plus className="h-12 w-12 text-quiz-cyan" />
              </div>
              <CardTitle className="text-3xl font-bold text-white mb-4">Creează Quiz Nou</CardTitle>
              <p className="text-white/70 text-lg">Generează quiz-uri personalizate din fișierele tale PDF</p>
            </CardHeader>
          </Card>

          {/* Right Column - Available Quizzes */}
          <div className="lg:col-span-2">
            <Card className="card-gradient shadow-card border-0">
              <CardHeader className="flex flex-row items-center justify-between pb-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-2xl border border-pink-500/30">
                    <Trophy className="h-8 w-8 text-pink-400" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-white">Quiz-uri Disponibile</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/70 text-lg mb-6">Continuă quiz-urile în curs sau începe unele noi</p>
                
                {/* Quiz Items */}
                <div className="space-y-4">
                  {[
                    { name: 'Subiect 6', status: 'Completat', score: '16%', action: 'Reîncercare', color: 'green' },
                    { name: 'Subiect 5', status: 'Completat', score: '14%', action: 'Reîncercare', color: 'green' },
                    { name: 'Subiect 4', status: 'In progres', score: null, action: 'Continuă', color: 'orange' }
                  ].map((quiz, index) => (
                    <div key={index} className="flex items-center justify-between p-4 glass-card rounded-xl border border-white/10">
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 rounded-full bg-white/20"></div>
                        <div>
                          <h3 className="text-white font-semibold text-lg">{quiz.name}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className={`text-sm px-2 py-1 rounded-full ${
                              quiz.color === 'green' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {quiz.status}
                            </span>
                            {quiz.score && (
                              <span className="text-white/60 text-sm">Scor: {quiz.score}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button 
                        className="btn-cyan px-6 py-2 rounded-xl font-semibold"
                        size="sm"
                      >
                        {quiz.action === 'Reîncercare' && <RotateCcw className="h-4 w-4 mr-2" />}
                        {quiz.action === 'Continuă' && <ArrowRight className="h-4 w-4 mr-2" />}
                        {quiz.action}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section - Medmentor AI */}
        <Card className="card-gradient shadow-card border-0 mt-8">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-6 p-6 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl border border-blue-500/30">
              <Brain className="h-12 w-12 text-blue-400" />
            </div>
            <CardTitle className="text-4xl font-bold text-white mb-4">
              Medmentor, ajutorul tău AI pentru admitere
            </CardTitle>
            <p className="text-white/70 text-xl max-w-2xl mx-auto">
              Platforma ta pentru pregătirea admiterii la medicină
            </p>
          </CardHeader>
        </Card>
      </main>
    </div>
  );
};
