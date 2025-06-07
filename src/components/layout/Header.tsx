
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
import { User, Settings, LogOut, Stethoscope, Bell } from 'lucide-react';
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
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 p-2 bg-medical-light-blue rounded-xl">
              <Stethoscope className="h-6 w-6 text-medical-blue" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">MedMentor</h1>
              <p className="text-xs text-medical-blue font-medium">Learning Platform</p>
            </div>
          </div>

          {/* Navigation for logged in users */}
          {user && (
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-600 hover:text-medical-blue font-medium transition-colors">
                Courses
              </a>
              <a href="#" className="text-gray-600 hover:text-medical-blue font-medium transition-colors">
                Mentors
              </a>
              <a href="#" className="text-gray-600 hover:text-medical-blue font-medium transition-colors">
                Progress
              </a>
              <a href="#" className="text-gray-600 hover:text-medical-blue font-medium transition-colors">
                Resources
              </a>
            </nav>
          )}

          <div className="flex items-center gap-4">
            {user ? (
              <>
                {progress && (
                  <div className="hidden sm:flex items-center gap-3">
                    <Badge variant="secondary" className="bg-medical-light-blue text-medical-blue border-medical-blue/20">
                      Level {progress.current_level}
                    </Badge>
                    <Badge variant="outline" className="border-medical-teal text-medical-teal">
                      {progress.total_xp} XP
                    </Badge>
                  </div>
                )}

                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-medical-blue/20">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-medical-light-blue text-medical-blue font-semibold">
                          {getUserInitials(user.user_metadata?.full_name)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        {user.user_metadata?.full_name && (
                          <p className="font-medium">{user.user_metadata.full_name}</p>
                        )}
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Button variant="ghost" className="text-gray-600 hover:text-medical-blue">
                  Sign In
                </Button>
                <Button 
                  onClick={() => setShowAuthModal(true)}
                  className="medical-gradient text-white hover:shadow-lg transition-all"
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
