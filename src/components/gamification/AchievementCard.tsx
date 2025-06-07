
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Star } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xp_reward: number;
  condition_type: string;
  condition_value: number;
  earned?: boolean;
  earned_at?: string;
}

interface AchievementCardProps {
  achievement: Achievement;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  return (
    <Card className={`transition-all duration-200 ${achievement.earned ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200' : 'bg-muted/50'}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={`text-2xl ${achievement.earned ? 'grayscale-0' : 'grayscale'}`}>
            {achievement.icon}
          </div>
          
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <h3 className={`font-medium text-sm ${achievement.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                {achievement.name}
              </h3>
              {achievement.earned && (
                <Award className="h-4 w-4 text-yellow-500" />
              )}
            </div>
            
            <p className={`text-xs ${achievement.earned ? 'text-foreground/80' : 'text-muted-foreground'}`}>
              {achievement.description}
            </p>
            
            <div className="flex items-center gap-2 pt-1">
              <Badge variant={achievement.earned ? "default" : "secondary"} className="text-xs">
                <Star className="h-3 w-3 mr-1" />
                {achievement.xp_reward} XP
              </Badge>
              
              {achievement.earned && achievement.earned_at && (
                <span className="text-xs text-muted-foreground">
                  Earned {new Date(achievement.earned_at).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
