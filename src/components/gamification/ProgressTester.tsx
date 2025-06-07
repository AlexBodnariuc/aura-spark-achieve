
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useProgress } from '@/hooks/useProgress';
import { Zap, Trophy, Target } from 'lucide-react';

export const ProgressTester: React.FC = () => {
  const { updateProgress, isUpdating } = useProgress();
  const [xpAmount, setXpAmount] = useState(50);

  const quickActions = [
    { label: 'Complete Easy Quiz', xp: 25, icon: Target },
    { label: 'Complete Medium Quiz', xp: 50, icon: Zap },
    { label: 'Complete Hard Quiz', xp: 100, icon: Trophy },
    { label: 'Daily Bonus', xp: 10, icon: Target },
  ];

  const handleAddXP = (xp: number) => {
    updateProgress(xp);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-orange-500" />
          Progress Testing
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Actions */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Quick Actions</Label>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddXP(action.xp)}
                  disabled={isUpdating}
                  className="flex items-center gap-2 h-auto p-3"
                >
                  <IconComponent className="h-4 w-4" />
                  <div className="text-left">
                    <div className="text-xs font-medium">{action.label}</div>
                    <div className="text-xs text-muted-foreground">+{action.xp} XP</div>
                  </div>
                </Button>
              );
            })}
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
            />
            <Button
              onClick={() => handleAddXP(xpAmount)}
              disabled={isUpdating || xpAmount <= 0}
            >
              {isUpdating ? 'Adding...' : `Add ${xpAmount} XP`}
            </Button>
          </div>
        </div>

        {/* Info */}
        <div className="text-xs text-muted-foreground bg-muted p-3 rounded-lg">
          <p className="font-medium mb-1">How it works:</p>
          <ul className="space-y-1">
            <li>• Each level requires 1000 XP (Level 1: 0-999, Level 2: 1000-1999, etc.)</li>
            <li>• Progress is tracked in real-time</li>
            <li>• Achievements may unlock based on your activity</li>
            <li>• Daily streaks are maintained by regular activity</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
