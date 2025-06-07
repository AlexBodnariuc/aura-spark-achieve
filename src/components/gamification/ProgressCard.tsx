
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Zap, Target, Calendar } from 'lucide-react';

interface ProgressData {
  totalXp: number;
  currentLevel: number;
  currentStreak: number;
  longestStreak: number;
}

interface ProgressCardProps {
  progress: ProgressData;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({ progress }) => {
  const xpForCurrentLevel = progress.currentLevel * 1000;
  const xpForNextLevel = (progress.currentLevel + 1) * 1000;
  const xpProgress = ((progress.totalXp - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Your Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Level Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Level {progress.currentLevel}</span>
            <Badge variant="secondary">{progress.totalXp} XP</Badge>
          </div>
          <Progress value={xpProgress} className="h-2" />
          <div className="text-xs text-muted-foreground text-center">
            {Math.floor(xpForNextLevel - progress.totalXp)} XP to next level
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <Zap className="h-4 w-4 text-orange-500" />
            <div>
              <div className="text-sm font-medium">{progress.currentStreak}</div>
              <div className="text-xs text-muted-foreground">Current Streak</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <Target className="h-4 w-4 text-green-500" />
            <div>
              <div className="text-sm font-medium">{progress.longestStreak}</div>
              <div className="text-xs text-muted-foreground">Best Streak</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
