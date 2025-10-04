import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card } from '../../components/ui/card';
import { Switch } from '../../components/ui/switch';
import { toast } from 'sonner';

const Settings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    // Mock password change
    toast.success('Password updated successfully');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleThemeToggle = (checked: boolean) => {
    setDarkMode(checked);
    document.documentElement.classList.toggle('dark', checked);
    toast.success(`${checked ? 'Dark' : 'Light'} mode enabled`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="p-8">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-2 text-foreground">Settings</h1>
        <p className="text-muted-foreground mb-8">
          Manage your account preferences
        </p>

        {/* Account Info */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Account Information</h2>
          <div className="space-y-4">
            <div>
              <Label className="text-muted-foreground">Name</Label>
              <p className="text-foreground font-medium">{user?.name}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Email</Label>
              <p className="text-foreground font-medium">{user?.email}</p>
            </div>
          </div>
        </Card>

        {/* Change Password */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Change Password</h2>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Update Password</Button>
          </form>
        </Card>

        {/* Appearance */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Appearance</h2>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="darkMode" className="text-base">Dark Mode</Label>
              <p className="text-sm text-muted-foreground">
                Switch between light and dark themes
              </p>
            </div>
            <Switch
              id="darkMode"
              checked={darkMode}
              onCheckedChange={handleThemeToggle}
            />
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 border-destructive">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Danger Zone</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Once you logout, you'll need to sign in again to access your wallet.
          </p>
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
