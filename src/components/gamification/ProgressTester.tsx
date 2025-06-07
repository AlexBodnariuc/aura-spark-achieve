
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useProgress } from '@/hooks/useProgress';
import { Zap, Trophy, Target, Calendar, CheckCircle, BookOpen, Award } from 'lucide-react';

export const ProgressTester: React.FC = () => {
  const { updateProgress, isUpdating } = useProgress();
  const [xpAmount, setXpAmount] = useState(50);

  const gamificationActions = [
    { 
      label: 'Correct Answer', 
      xp: 10, 
      icon: CheckCircle, 
      color: 'text-green-500',
      description: 'Single correct answer in quiz'
    },
    { 
      label: 'Complete Easy Quiz', 
      xp: 25, 
      icon: Target, 
      color: 'text-blue-500',
      description: '5 questions, basic difficulty'
    },
    { 
      label: 'Complete Medium Quiz', 
      xp: 50, 
      icon: BookOpen, 
      color: 'text-orange-500',
      description: '10 questions, medium difficulty'
    },
    { 
      label: 'Complete Hard Quiz', 
      xp: 100, 
      icon: Trophy, 
      color: 'text-purple-500',
      description: '15 questions, hard difficulty'
    },
    { 
      label: 'Perfect Score Bonus', 
      xp: 25, 
      icon: Award, 
      color: 'text-yellow-500',
      description: '100% correct answers bonus'
    },
    { 
      label: 'Daily Login', 
      xp: 10, 
      icon: Calendar, 
      color: 'text-cyan-500',
      description: 'Daily activity bonus'
    },
    { 
      label: 'Streak Bonus', 
      xp: 15, 
      icon: Zap, 
      color: 'text-red-500',
      description: 'Consecutive days bonus'
    },
  ];

  const streakActions = [
    { label: '3-Day Streak', xp: 30, description: 'Maintain 3 consecutive days' },
    { label: '7-Day Streak', xp: 75, description: 'Weekly consistency bonus' },
    { label: '30-Day Streak', xp: 300, description: 'Monthly achievement bonus' },
  ];

  const handleAddXP = (xp: number) => {
    updateProgress(xp);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-orange-500" />
          Gamification Testing
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quiz & Learning Actions */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Quiz & Learning Actions</Label>
          <div className="grid grid-cols-1 gap-2">
            {gamificationActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddXP(action.xp)}
                  disabled={isUpdating}
                  className="flex items-center justify-between h-auto p-3"
                >
                  <div className="flex items-center gap-2">
                    <IconComponent className={`h-4 w-4 ${action.color}`} />
                    <div className="text-left">
                      <div className="text-sm font-medium">{action.label}</div>
                      <div className="text-xs text-muted-foreground">{action.description}</div>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-right">
                    +{action.xp} XP
                  </div>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Streak Bonuses */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Streak Bonuses</Label>
          <div className="grid grid-cols-1 gap-2">
            {streakActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleAddXP(action.xp)}
                disabled={isUpdating}
                className="flex items-center justify-between h-auto p-3"
              >
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-amber-500" />
                  <div className="text-left">
                    <div className="text-sm font-medium">{action.label}</div>
                    <div className="text-xs text-muted-foreground">{action.description}</div>
                  </div>
                </div>
                <div className="text-xs font-medium text-right">
                  +{action.xp} XP
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Custom XP Input */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Custom XP Amount</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={xpAmount}
              onChange={(e) => setXpAmount(parseInt(e.target.value) || 0)}
              min="1"
              max="1000"
              className="flex-1"
              placeholder="Enter XP amount"
            />
            <Button
              onClick={() => handleAddXP(xpAmount)}
              disabled={isUpdating || xpAmount <= 0}
            >
              {isUpdating ? 'Adding...' : `Add ${xpAmount} XP`}
            </Button>
          </div>
        </div>

        {/* System Info */}
        <div className="text-xs text-muted-foreground bg-muted p-3 rounded-lg">
          <p className="font-medium mb-2">Gamification System Overview:</p>
          <ul className="space-y-1">
            <li>• <strong>Levels:</strong> 1000 XP per level (Level 1: 0-999, Level 2: 1000-1999, etc.)</li>
            <li>• <strong>Quiz XP:</strong> Based on difficulty and performance</li>
            <li>• <strong>Bonuses:</strong> Perfect scores, daily logins, streaks</li>
            <li>• <strong>Achievements:</strong> Unlock based on milestones and activities</li>
            <li>• <strong>Progress:</strong> Real-time updates with toast notifications</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
