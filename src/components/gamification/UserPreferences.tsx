
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Settings, Clock, Bell, Palette } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { toast } from '@/hooks/use-toast';

export const UserPreferences: React.FC = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const { data: preferences, isLoading } = useQuery({
    queryKey: ['preferences', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const updatePreferencesMutation = useMutation({
    mutationFn: async (updates: any) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['preferences', user?.id] });
      toast({
        title: 'Preferences Updated',
        description: 'Your preferences have been saved successfully.',
      });
    },
    onError: (error) => {
      console.error('Error updating preferences:', error);
      toast({
        title: 'Error',
        description: 'Failed to update preferences. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const [localPrefs, setLocalPrefs] = useState({
    learning_style: preferences?.learning_style || 'visual',
    difficulty_preference: preferences?.difficulty_preference || 'beginner',
    daily_goal: preferences?.daily_goal || 30,
    reminder_enabled: preferences?.reminder_enabled || true,
    reminder_time: preferences?.reminder_time || '09:00:00',
    theme_preference: preferences?.theme_preference || 'system',
    notifications_enabled: preferences?.notifications_enabled || true,
  });

  React.useEffect(() => {
    if (preferences) {
      setLocalPrefs({
        learning_style: preferences.learning_style || 'visual',
        difficulty_preference: preferences.difficulty_preference || 'beginner',
        daily_goal: preferences.daily_goal || 30,
        reminder_enabled: preferences.reminder_enabled || true,
        reminder_time: preferences.reminder_time || '09:00:00',
        theme_preference: preferences.theme_preference || 'system',
        notifications_enabled: preferences.notifications_enabled || true,
      });
    }
  }, [preferences]);

  const handleSave = () => {
    updatePreferencesMutation.mutate(localPrefs);
  };

  if (isLoading) {
    return <div>Loading preferences...</div>;
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Learning Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Learning Style */}
        <div className="space-y-2">
          <Label>Learning Style</Label>
          <Select 
            value={localPrefs.learning_style} 
            onValueChange={(value) => setLocalPrefs({...localPrefs, learning_style: value})}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="visual">Visual</SelectItem>
              <SelectItem value="auditory">Auditory</SelectItem>
              <SelectItem value="reading">Reading/Writing</SelectItem>
              <SelectItem value="kinesthetic">Kinesthetic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Difficulty Preference */}
        <div className="space-y-2">
          <Label>Difficulty Preference</Label>
          <Select 
            value={localPrefs.difficulty_preference} 
            onValueChange={(value) => setLocalPrefs({...localPrefs, difficulty_preference: value})}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Daily Goal */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Daily Goal (minutes)
          </Label>
          <Input
            type="number"
            value={localPrefs.daily_goal}
            onChange={(e) => setLocalPrefs({...localPrefs, daily_goal: parseInt(e.target.value) || 30})}
            min="5"
            max="300"
          />
        </div>

        <Separator />

        {/* Notifications */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </Label>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Enable notifications</span>
            <Switch
              checked={localPrefs.notifications_enabled}
              onCheckedChange={(checked) => setLocalPrefs({...localPrefs, notifications_enabled: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Daily reminders</span>
            <Switch
              checked={localPrefs.reminder_enabled}
              onCheckedChange={(checked) => setLocalPrefs({...localPrefs, reminder_enabled: checked})}
            />
          </div>

          {localPrefs.reminder_enabled && (
            <div className="space-y-2">
              <Label>Reminder time</Label>
              <Input
                type="time"
                value={localPrefs.reminder_time}
                onChange={(e) => setLocalPrefs({...localPrefs, reminder_time: e.target.value})}
              />
            </div>
          )}
        </div>

        <Separator />

        {/* Theme */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Theme
          </Label>
          <Select 
            value={localPrefs.theme_preference} 
            onValueChange={(value) => setLocalPrefs({...localPrefs, theme_preference: value})}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleSave} 
          className="w-full"
          disabled={updatePreferencesMutation.isPending}
        >
          {updatePreferencesMutation.isPending ? 'Saving...' : 'Save Preferences'}
        </Button>
      </CardContent>
    </Card>
  );
};
