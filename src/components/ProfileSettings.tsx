import { ChangeEvent, FormEvent, useEffect, useId, useRef, useState } from 'react';
import { CreditCard, Shield, Sparkles, User } from 'lucide-react';

import { ProfileSection } from '@/types/navigation';

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
  cardholderName: string;
  cardLastFour: string;
  invoiceEmail: string;
  billingCompany: string;
  premiumPlan: string;
  premiumAutoRenew: boolean;
  productNotifications: boolean;
  billingNotifications: boolean;
  weeklyDigest: boolean;
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
  loginAlerts: true,
  cardholderName: 'John Doe',
  cardLastFour: '4242',
  invoiceEmail: 'billing@georim.com',
  billingCompany: 'Georim Inc.',
  premiumPlan: 'Scale',
  premiumAutoRenew: true,
  productNotifications: true,
  billingNotifications: true,
  weeklyDigest: false,
};

interface ProfileSettingsProps {
  activeSection: ProfileSection;
}

const sectionTitles: Record<ProfileSection, string> = {
  profile: 'Profile',
  security: 'Security',
  payments: 'Payments',
  billing: 'Billing',
  'premium-subscriptions': 'Premium Subscriptions',
  notifications: 'Notifications',
};

export function ProfileSettings({ activeSection }: ProfileSettingsProps) {
  const fieldIdPrefix = useId();
  const [profileForm, setProfileForm] = useState<ProfileForm>(defaultProfile);
  const [profileNotice, setProfileNotice] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const sectionRefs = useRef<Record<ProfileSection, HTMLDivElement | null>>({
    profile: null,
    security: null,
    payments: null,
    billing: null,
    'premium-subscriptions': null,
    notifications: null,
  });

  const getFieldId = (field: string) => `${fieldIdPrefix}-${field}`;

  useEffect(() => {
    const targetSection = sectionRefs.current[activeSection];
    if (targetSection && typeof targetSection.scrollIntoView === 'function') {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeSection]);

  const updateProfileField = <T extends keyof ProfileForm>(field: T, value: ProfileForm[T]) => {
    setProfileForm((currentProfileForm) => ({
      ...currentProfileForm,
      [field]: value,
    }));
  };

  const handleProfileImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      updateProfileField('avatarUrl', String(fileReader.result || ''));
      setProfileNotice(`Profile photo selected: ${selectedFile.name}`);
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

    setProfileNotice(`${sectionTitles[activeSection]} settings saved successfully.`);
    setProfileForm((currentProfileForm) => ({
      ...currentProfileForm,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
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
        <div ref={(node) => { sectionRefs.current.profile = node; }} className={`bg-white rounded-xl border p-6 ${activeSection === 'profile' ? 'border-[#7626c6]/50' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between gap-4 mb-5">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
              <p className="text-sm text-gray-600 mt-1">Personal identity, account details, and organizer bio.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#7626c6]/10 px-3 py-1 text-xs font-medium text-[#7626c6]">
              <User className="w-3.5 h-3.5" />
              Active Section
            </div>
          </div>

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

          <div className="mt-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor={getFieldId('full-name')} className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  id={getFieldId('full-name')}
                  required
                  type="text"
                  value={profileForm.fullName}
                  onChange={(event) => updateProfileField('fullName', event.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7626c6] focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor={getFieldId('display-name')} className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                <input
                  id={getFieldId('display-name')}
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
                <label htmlFor={getFieldId('email-address')} className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  id={getFieldId('email-address')}
                  required
                  type="email"
                  value={profileForm.email}
                  onChange={(event) => updateProfileField('email', event.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7626c6] focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor={getFieldId('username')} className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                  id={getFieldId('username')}
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
                <label htmlFor={getFieldId('phone-number')} className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  id={getFieldId('phone-number')}
                  type="tel"
                  value={profileForm.phone}
                  onChange={(event) => updateProfileField('phone', event.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7626c6] focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor={getFieldId('timezone')} className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                <select
                  id={getFieldId('timezone')}
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
              <label htmlFor={getFieldId('role-title')} className="block text-sm font-medium text-gray-700 mb-2">Role / Title</label>
              <input
                id={getFieldId('role-title')}
                type="text"
                value={profileForm.role}
                onChange={(event) => updateProfileField('role', event.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7626c6] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor={getFieldId('bio')} className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                id={getFieldId('bio')}
                rows={3}
                value={profileForm.bio}
                onChange={(event) => updateProfileField('bio', event.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7626c6] focus:border-transparent resize-none"
              />
            </div>
          </div>
        </div>

        <div ref={(node) => { sectionRefs.current.security = node; }} className={`bg-white rounded-xl border p-6 space-y-4 ${activeSection === 'security' ? 'border-[#7626c6]/50' : 'border-gray-200'}`}>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-[#7626c6]/10 p-2">
              <Shield className="w-4 h-4 text-[#7626c6]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Security</h2>
              <p className="text-sm text-gray-600">Protect access to your organizer workspace.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor={getFieldId('current-password')} className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <input
                id={getFieldId('current-password')}
                type="password"
                value={profileForm.currentPassword}
                onChange={(event) => updateProfileField('currentPassword', event.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7626c6] focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor={getFieldId('new-password')} className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                id={getFieldId('new-password')}
                type="password"
                value={profileForm.newPassword}
                onChange={(event) => updateProfileField('newPassword', event.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7626c6] focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor={getFieldId('confirm-password')} className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                id={getFieldId('confirm-password')}
                type="password"
                value={profileForm.confirmPassword}
                onChange={(event) => updateProfileField('confirmPassword', event.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7626c6] focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label htmlFor={getFieldId('two-factor-enabled')} className="flex items-center gap-2 cursor-pointer">
              <input
                id={getFieldId('two-factor-enabled')}
                type="checkbox"
                checked={profileForm.twoFactorEnabled}
                onChange={(event) => updateProfileField('twoFactorEnabled', event.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700">Enable two-factor authentication</span>
            </label>
            <label htmlFor={getFieldId('login-alerts')} className="flex items-center gap-2 cursor-pointer">
              <input
                id={getFieldId('login-alerts')}
                type="checkbox"
                checked={profileForm.loginAlerts}
                onChange={(event) => updateProfileField('loginAlerts', event.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700">Send login alerts for new devices</span>
            </label>
          </div>
        </div>

        <div ref={(node) => { sectionRefs.current.payments = node; }} className={`bg-white rounded-xl border p-6 space-y-4 ${activeSection === 'payments' ? 'border-[#7626c6]/50' : 'border-gray-200'}`}>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-[#7626c6]/10 p-2">
              <CreditCard className="w-4 h-4 text-[#7626c6]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Payments</h2>
              <p className="text-sm text-gray-600">Manage payout and payment method details used across your workspace.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={getFieldId('cardholder-name')} className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
              <input
                id={getFieldId('cardholder-name')}
                type="text"
                value={profileForm.cardholderName}
                onChange={(event) => updateProfileField('cardholderName', event.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7626c6] focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor={getFieldId('card-last-four')} className="block text-sm font-medium text-gray-700 mb-2">Default Card</label>
              <input
                id={getFieldId('card-last-four')}
                type="text"
                value={profileForm.cardLastFour}
                onChange={(event) => updateProfileField('cardLastFour', event.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7626c6] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div ref={(node) => { sectionRefs.current.billing = node; }} className={`bg-white rounded-xl border p-6 space-y-4 ${activeSection === 'billing' ? 'border-[#7626c6]/50' : 'border-gray-200'}`}>
          <h2 className="text-lg font-semibold text-gray-900">Billing</h2>
          <p className="text-sm text-gray-600">Control invoice recipients and company billing identity.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={getFieldId('invoice-email')} className="block text-sm font-medium text-gray-700 mb-2">Invoice Email</label>
              <input
                id={getFieldId('invoice-email')}
                type="email"
                value={profileForm.invoiceEmail}
                onChange={(event) => updateProfileField('invoiceEmail', event.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7626c6] focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor={getFieldId('billing-company')} className="block text-sm font-medium text-gray-700 mb-2">Billing Company</label>
              <input
                id={getFieldId('billing-company')}
                type="text"
                value={profileForm.billingCompany}
                onChange={(event) => updateProfileField('billingCompany', event.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7626c6] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div ref={(node) => { sectionRefs.current['premium-subscriptions'] = node; }} className={`bg-white rounded-xl border p-6 space-y-4 ${activeSection === 'premium-subscriptions' ? 'border-[#7626c6]/50' : 'border-gray-200'}`}>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-[#7626c6]/10 p-2">
              <Sparkles className="w-4 h-4 text-[#7626c6]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Premium Subscriptions</h2>
              <p className="text-sm text-gray-600">Review your current plan and renewal preferences.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={getFieldId('premium-plan')} className="block text-sm font-medium text-gray-700 mb-2">Current Plan</label>
              <select
                id={getFieldId('premium-plan')}
                value={profileForm.premiumPlan}
                onChange={(event) => updateProfileField('premiumPlan', event.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7626c6] focus:border-transparent"
              >
                <option value="Starter">Starter</option>
                <option value="Scale">Scale</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>
            <label htmlFor={getFieldId('premium-auto-renew')} className="flex items-center gap-2 cursor-pointer mt-8">
              <input
                id={getFieldId('premium-auto-renew')}
                type="checkbox"
                checked={profileForm.premiumAutoRenew}
                onChange={(event) => updateProfileField('premiumAutoRenew', event.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700">Renew subscription automatically</span>
            </label>
          </div>
        </div>

        <div ref={(node) => { sectionRefs.current.notifications = node; }} className={`bg-white rounded-xl border p-6 space-y-4 ${activeSection === 'notifications' ? 'border-[#7626c6]/50' : 'border-gray-200'}`}>
          <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          <p className="text-sm text-gray-600">Choose which organizer updates should reach your inbox.</p>
          <div className="space-y-3">
            <label htmlFor={getFieldId('product-notifications')} className="flex items-center gap-2 cursor-pointer">
              <input
                id={getFieldId('product-notifications')}
                type="checkbox"
                checked={profileForm.productNotifications}
                onChange={(event) => updateProfileField('productNotifications', event.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700">Product announcements and new features</span>
            </label>
            <label htmlFor={getFieldId('billing-notifications')} className="flex items-center gap-2 cursor-pointer">
              <input
                id={getFieldId('billing-notifications')}
                type="checkbox"
                checked={profileForm.billingNotifications}
                onChange={(event) => updateProfileField('billingNotifications', event.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700">Billing and invoice notifications</span>
            </label>
            <label htmlFor={getFieldId('weekly-digest')} className="flex items-center gap-2 cursor-pointer">
              <input
                id={getFieldId('weekly-digest')}
                type="checkbox"
                checked={profileForm.weeklyDigest}
                onChange={(event) => updateProfileField('weeklyDigest', event.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700">Weekly organizer digest</span>
            </label>
          </div>

          {profileNotice && <p className="text-sm text-[#7626c6]" aria-live="polite">{profileNotice}</p>}

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
