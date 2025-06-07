
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { User, Settings, LogOut, Brain, Bell } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import { AuthModal } from '@/components/auth/AuthModal';
import { useProgress } from '@/hooks/useProgress';

export const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const { progress } = useProgress();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  const getUserInitials = (name: string | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <>
      <header className="glass-card border-b border-white/10">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 p-3 bg-quiz-cyan/20 rounded-2xl border border-quiz-cyan/30">
              <Brain className="h-8 w-8 text-quiz-cyan" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gradient">Quiz Academy</h1>
              <p className="text-sm text-white/70 font-medium">Îmbunătățește-ți cunoștințele și câștigă XP!</p>
            </div>
          </div>

          {/* User Profile Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-3 text-white">
                  <span className="text-sm opacity-70">{user.email}</span>
                  <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">P</span>
                  </div>
                </div>

                {progress && (
                  <div className="flex items-center gap-3">
                    <Badge className="bg-quiz-cyan/20 text-quiz-cyan border-quiz-cyan/30 px-3 py-1">
                      Level {progress.current_level}
                    </Badge>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-3 py-1">
                      {progress.total_xp} XP
                    </Badge>
                  </div>
                )}

                <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-12 w-12 rounded-full border border-white/20 hover:bg-white/10">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-quiz-purple text-white font-semibold">
                          {getUserInitials(user.user_metadata?.full_name)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 glass-card text-white border-white/20" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        {user.user_metadata?.full_name && (
                          <p className="font-medium">{user.user_metadata.full_name}</p>
                        )}
                        <p className="w-[200px] truncate text-sm text-white/70">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator className="bg-white/20" />
                    <DropdownMenuItem className="text-white hover:bg-white/10">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-white/10">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/20" />
                    <DropdownMenuItem onClick={handleSignOut} className="text-white hover:bg-white/10">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Sign In
                </Button>
                <Button 
                  onClick={() => setShowAuthModal(true)}
                  className="btn-cyan px-6 py-2 rounded-xl font-semibold shadow-glow hover:shadow-card transition-all"
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
};
