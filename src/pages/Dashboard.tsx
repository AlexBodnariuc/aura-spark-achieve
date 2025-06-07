
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProgressCard } from '@/components/gamification/ProgressCard';
import { AchievementCard } from '@/components/gamification/AchievementCard';
import { UserPreferences } from '@/components/gamification/UserPreferences';
import { useProgress } from '@/hooks/useProgress';
import { useAchievements } from '@/hooks/useAchievements';
import { Trophy, Target, Settings } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { progress, isLoading: progressLoading } = useProgress();
  const { achievements, isLoading: achievementsLoading } = useAchievements();

  if (progressLoading) {
    return <div className="flex items-center justify-center p-8">Loading dashboard...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Track your learning progress and achievements</p>
      </div>

      <Tabs defaultValue="progress" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Progress
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="space-y-6">
          {progress && (
            <div className="grid gap-6 md:grid-cols-2">
              <ProgressCard 
                progress={{
                  totalXp: progress.total_xp,
                  currentLevel: progress.current_level,
                  currentStreak: progress.current_streak,
                  longestStreak: progress.longest_streak,
                }}
              />
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Recent Activity</h3>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    No recent activity. Start a quiz to begin earning XP!
                  </p>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Your Achievements</h3>
            {achievementsLoading ? (
              <div className="text-center py-8">Loading achievements...</div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {achievements.map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <UserPreferences />
        </TabsContent>
      </Tabs>
    </div>
  );
};
