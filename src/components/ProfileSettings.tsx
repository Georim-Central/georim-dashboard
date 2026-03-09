import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { User } from 'lucide-react';

type ProfileForm = {
  avatarUrl: string;
  fullName: string;
  displayName: string;
  email: string;
  username: string;
  phone: string;
  timezone: string;
  role: string;
  bio: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  twoFactorEnabled: boolean;
  loginAlerts: boolean;
};

const defaultProfile: ProfileForm = {
  avatarUrl: '',
  fullName: 'John Doe',
  displayName: 'John Doe',
  email: 'john.doe@georim.com',
  username: 'johndoe',
  phone: '+1 (555) 021-7744',
  timezone: 'America/Chicago',
  role: 'Event Organizer',
  bio: 'Building high-conversion event experiences.',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  twoFactorEnabled: true,
  loginAlerts: true
};

export function ProfileSettings() {
  const [profileForm, setProfileForm] = useState<ProfileForm>(defaultProfile);
  const [profileNotice, setProfileNotice] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const updateProfileField = <T extends keyof ProfileForm>(field: T, value: ProfileForm[T]) => {
    setProfileForm((currentProfileForm) => ({
      ...currentProfileForm,
      [field]: value
    }));
  };

  const handleProfileImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      updateProfileField('avatarUrl', String(fileReader.result || ''));
      setProfileNotice(`Profile photo selected: ${selectedFile.name}`);
      console.log('[Profile] Avatar updated', { fileName: selectedFile.name, fileSize: selectedFile.size });
    };
    fileReader.readAsDataURL(selectedFile);
    event.target.value = '';
  };

  const handleSaveProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (profileForm.newPassword && profileForm.newPassword !== profileForm.confirmPassword) {
      setProfileNotice('New password and confirm password must match.');
      return;
    }

    if (profileForm.newPassword && profileForm.currentPassword.length < 1) {
      setProfileNotice('Enter your current password to set a new password.');
      return;
    }

    console.log('[Profile] Profile settings saved', {
      ...profileForm,
      currentPassword: profileForm.currentPassword ? '••••••••' : '',
      newPassword: profileForm.newPassword ? '••••••••' : '',
      confirmPassword: profileForm.confirmPassword ? '••••••••' : ''
    });

    setProfileNotice('Profile settings saved successfully.');
    setProfileForm((currentProfileForm) => ({
      ...currentProfileForm,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  return (
    <div className="p-8 space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h1 className="text-2xl font-semibold text-gray-900">Profile Settings</h1>
        <p className="text-sm text-gray-600 mt-1">
          Update your profile picture, login information, and security details.
        </p>
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="w-16 h-16 rounded-full bg-[#7626c6] flex items-center justify-center overflow-hidden">
              {profileForm.avatarUrl ? (
                <img src={profileForm.avatarUrl} alt={profileForm.displayName} className="w-full h-full object-cover" />
              ) : (
                <User className="w-8 h-8 text-white" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{profileForm.fullName}</p>
              <p className="text-sm text-gray-600">{profileForm.role}</p>
            </div>
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-sm"
            >
              Upload Photo
            </button>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfileImageUpload}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Account Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                required
                type="text"
                value={profileForm.fullName}
                onChange={(event) => updateProfileField('fullName', event.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7626c6] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
              <input
                required
                type="text"
                value={profileForm.displayName}
                onChange={(event) => updateProfileField('displayName', event.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7626c6] focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                required
                type="email"
                value={profileForm.email}
                onChange={(event) => updateProfileField('email', event.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7626c6] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                required
                type="text"
                value={profileForm.username}
                onChange={(event) => updateProfileField('username', event.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7626c6] focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={profileForm.phone}
                onChange={(event) => updateProfileField('phone', event.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7626c6] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
              <select
                value={profileForm.timezone}
                onChange={(event) => updateProfileField('timezone', event.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7626c6] focus:border-transparent"
              >
                <option value="America/Chicago">America/Chicago (CST)</option>
                <option value="America/New_York">America/New_York (EST)</option>
                <option value="America/Los_Angeles">America/Los_Angeles (PST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role / Title</label>
            <input
              type="text"
              value={profileForm.role}
              onChange={(event) => updateProfileField('role', event.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7626c6] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              rows={3}
              value={profileForm.bio}
              onChange={(event) => updateProfileField('bio', event.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7626c6] focus:border-transparent resize-none"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Security</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                value={profileForm.currentPassword}
                onChange={(event) => updateProfileField('currentPassword', event.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7626c6] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                value={profileForm.newPassword}
                onChange={(event) => updateProfileField('newPassword', event.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7626c6] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                value={profileForm.confirmPassword}
                onChange={(event) => updateProfileField('confirmPassword', event.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7626c6] focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={profileForm.twoFactorEnabled}
                onChange={(event) => updateProfileField('twoFactorEnabled', event.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700">Enable two-factor authentication</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={profileForm.loginAlerts}
                onChange={(event) => updateProfileField('loginAlerts', event.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700">Send login alerts for new devices</span>
            </label>
          </div>

          {profileNotice && <p className="text-sm text-[#7626c6]">{profileNotice}</p>}

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-[#7626c6] text-white btn-glass rounded-lg hover:bg-[#5f1fa3] transition-colors"
            >
              Save Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
