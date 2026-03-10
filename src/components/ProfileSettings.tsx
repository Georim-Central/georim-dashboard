import { ChangeEvent, ComponentType, FormEvent, ReactNode, useId, useRef, useState } from 'react';
import { AlertTriangle, Bell, Clock, CreditCard, DollarSign, MapPin, Shield, Sparkles, Tag, User } from 'lucide-react';
import { FaCcMastercard, FaCcVisa, FaUniversity } from 'react-icons/fa';

import { Pricing, type PricingPlan } from '@/components/ui/pricing';
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
  taxId: string;
  billingAddressLine1: string;
  billingAddressLine2: string;
  billingCity: string;
  billingState: string;
  billingPostalCode: string;
  billingCountry: string;
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
  taxId: 'US-84-2981734',
  billingAddressLine1: '214 Market Street',
  billingAddressLine2: 'Suite 800',
  billingCity: 'Chicago',
  billingState: 'IL',
  billingPostalCode: '60607',
  billingCountry: 'United States',
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

const sectionDescriptions: Record<ProfileSection, string> = {
  profile: 'Update your profile picture, identity, and organizer details.',
  security: 'Manage access controls, passwords, and login protection.',
  payments: 'Manage payment methods, defaults, and failed charge recovery.',
  billing: 'Manage plans, invoices, tax details, and billing address information.',
  'premium-subscriptions': 'Review plan access and subscription renewal preferences.',
  notifications: 'Choose which account updates should reach your inbox.',
};

const sectionIcons: Record<ProfileSection, ComponentType<{ className?: string }>> = {
  profile: User,
  security: Shield,
  payments: CreditCard,
  billing: DollarSign,
  'premium-subscriptions': Sparkles,
  notifications: Bell,
};

const inputClassName = 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7626c6] focus:border-transparent';
const cardClassName = 'bg-white rounded-xl border border-gray-200 p-6';

const premiumPlanCatalog: Array<{
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  isPopular?: boolean;
}> = [
  {
    name: 'Starter',
    monthlyPrice: 29,
    yearlyPrice: 23,
    description: 'Great for solo organizers launching early-stage events.',
    features: ['1 active event at a time', 'Basic attendee insights', 'Email support', 'Standard checkout flows'],
  },
  {
    name: 'Scale',
    monthlyPrice: 99,
    yearlyPrice: 79,
    description: 'Best for growing teams running multiple revenue-generating events.',
    features: [
      'Unlimited active events',
      'Advanced event analytics',
      'Priority support',
      'Team collaboration tools',
      'Marketing automation',
    ],
    isPopular: true,
  },
  {
    name: 'Enterprise',
    monthlyPrice: 249,
    yearlyPrice: 199,
    description: 'For organizations that need advanced security, scale, and custom workflows.',
    features: [
      'Everything in Scale',
      'Dedicated success manager',
      'SSO and advanced permissions',
      'Custom contracts and onboarding',
      'Premium SLA support',
    ],
  },
];

const savedPaymentMethods = [
  {
    id: 'visa',
    label: 'Visa ending in 4242',
    detail: 'Expires 08/28',
    type: 'Primary card',
    isDefault: true,
    icon: FaCcVisa,
    iconClassName: 'text-[#1434cb]',
  },
  {
    id: 'mastercard',
    label: 'Mastercard ending in 1881',
    detail: 'Expires 01/29',
    type: 'Backup card',
    icon: FaCcMastercard,
    iconClassName: 'text-[#ff5f00]',
  },
  {
    id: 'bank',
    label: 'Chase Business Account',
    detail: 'ACH ending in 9021',
    type: 'Bank account',
    icon: FaUniversity,
    iconClassName: 'text-[#117aca]',
  },
];

const invoiceRecords = [
  { id: 'INV-2026-031', period: 'March 2026', amount: '$99.00', status: 'Paid', issuedOn: 'Mar 1, 2026' },
  { id: 'INV-2026-022', period: 'February 2026', amount: '$99.00', status: 'Paid', issuedOn: 'Feb 1, 2026' },
  { id: 'INV-2026-011', period: 'January 2026', amount: '$99.00', status: 'Paid', issuedOn: 'Jan 1, 2026' },
];

const billingHistoryEntries = [
  { label: 'Last successful charge', value: 'March 1, 2026' },
  { label: 'Next renewal', value: 'April 1, 2026' },
  { label: 'Current billing cadence', value: 'Monthly' },
];

function SettingsCard({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description: string;
  icon?: ComponentType<{ className?: string }>;
  children: ReactNode;
}) {
  return (
    <section className={cardClassName}>
      <div className="flex items-start gap-3 mb-5">
        {Icon ? (
          <div className="rounded-lg bg-[#7626c6]/10 p-2.5">
            <Icon className="w-4 h-4 text-[#7626c6]" />
          </div>
        ) : null}
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function DetailBlock({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon?: ComponentType<{ className?: string }>;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200/90 bg-white/70 p-5">
      <div className="mb-4 flex items-center gap-2">
        {Icon ? (
          <div className="rounded-lg bg-[#7626c6]/10 p-2">
            <Icon className="h-4 w-4 text-[#7626c6]" />
          </div>
        ) : null}
        <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-700">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export function ProfileSettings({ activeSection }: ProfileSettingsProps) {
  const fieldIdPrefix = useId();
  const [profileForm, setProfileForm] = useState<ProfileForm>(defaultProfile);
  const [profileNotice, setProfileNotice] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const getFieldId = (field: string) => `${fieldIdPrefix}-${field}`;

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

  const handleSaveSection = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (activeSection === 'security') {
      if (profileForm.newPassword && profileForm.newPassword !== profileForm.confirmPassword) {
        setProfileNotice('New password and confirm password must match.');
        return;
      }

      if (profileForm.newPassword && profileForm.currentPassword.length < 1) {
        setProfileNotice('Enter your current password to set a new password.');
        return;
      }
    }

    setProfileNotice(`${sectionTitles[activeSection]} settings saved successfully.`);

    if (activeSection === 'security') {
      setProfileForm((currentProfileForm) => ({
        ...currentProfileForm,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    }
  };

  const CurrentSectionIcon = sectionIcons[activeSection];
  const activePremiumPlan =
    premiumPlanCatalog.find((plan) => plan.name === profileForm.premiumPlan) ?? premiumPlanCatalog[0];

  const pricingPlans: PricingPlan[] = premiumPlanCatalog.map((plan) => ({
    id: plan.name.toLowerCase(),
    name: plan.name.toUpperCase(),
    price: String(plan.monthlyPrice),
    yearlyPrice: String(plan.yearlyPrice),
    period: 'per month',
    features: plan.features,
    description: plan.description,
    buttonText: plan.name === profileForm.premiumPlan ? 'Current Plan' : `Choose ${plan.name}`,
    isPopular: Boolean(plan.isPopular),
    isCurrentPlan: plan.name === profileForm.premiumPlan,
    onSelect: () => {
      updateProfileField('premiumPlan', plan.name);
      setProfileNotice(`${plan.name} plan selected. Save Premium Subscriptions to confirm the change.`);
    },
  }));

  const renderProfileOverview = () => (
    <section className={`${cardClassName} h-full`}>
      <h2 className="text-lg font-semibold text-gray-900">Profile Overview</h2>
      <p className="text-sm text-gray-600 mt-1">This information appears across your workspace and organizer profile.</p>

      <div className="mt-5 flex flex-col gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 sm:flex-row sm:items-center">
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
    </section>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <>
            <SettingsCard
              title="Personal Information"
              description="Update your public account identity and organizer details."
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor={getFieldId('full-name')} className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    id={getFieldId('full-name')}
                    required
                    type="text"
                    value={profileForm.fullName}
                    onChange={(event) => updateProfileField('fullName', event.target.value)}
                    className={inputClassName}
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
                    className={inputClassName}
                  />
                </div>
                <div>
                  <label htmlFor={getFieldId('email-address')} className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    id={getFieldId('email-address')}
                    required
                    type="email"
                    value={profileForm.email}
                    onChange={(event) => updateProfileField('email', event.target.value)}
                    className={inputClassName}
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
                    className={inputClassName}
                  />
                </div>
                <div>
                  <label htmlFor={getFieldId('phone-number')} className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    id={getFieldId('phone-number')}
                    type="tel"
                    value={profileForm.phone}
                    onChange={(event) => updateProfileField('phone', event.target.value)}
                    className={inputClassName}
                  />
                </div>
                <div>
                  <label htmlFor={getFieldId('timezone')} className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                  <select
                    id={getFieldId('timezone')}
                    value={profileForm.timezone}
                    onChange={(event) => updateProfileField('timezone', event.target.value)}
                    className={inputClassName}
                  >
                    <option value="America/Chicago">America/Chicago (CST)</option>
                    <option value="America/New_York">America/New_York (EST)</option>
                    <option value="America/Los_Angeles">America/Los_Angeles (PST)</option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor={getFieldId('role-title')} className="block text-sm font-medium text-gray-700 mb-2">Role / Title</label>
                  <input
                    id={getFieldId('role-title')}
                    type="text"
                    value={profileForm.role}
                    onChange={(event) => updateProfileField('role', event.target.value)}
                    className={inputClassName}
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor={getFieldId('bio')} className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    id={getFieldId('bio')}
                    rows={4}
                    value={profileForm.bio}
                    onChange={(event) => updateProfileField('bio', event.target.value)}
                    className={`${inputClassName} resize-none`}
                  />
                </div>
              </div>
            </SettingsCard>
          </>
        );

      case 'security':
        return (
          <>
            <SettingsCard
              title="Password"
              description="Change your password and keep your organizer account protected."
              icon={Shield}
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <label htmlFor={getFieldId('current-password')} className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <input
                    id={getFieldId('current-password')}
                    type="password"
                    value={profileForm.currentPassword}
                    onChange={(event) => updateProfileField('currentPassword', event.target.value)}
                    className={inputClassName}
                  />
                </div>
                <div>
                  <label htmlFor={getFieldId('new-password')} className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    id={getFieldId('new-password')}
                    type="password"
                    value={profileForm.newPassword}
                    onChange={(event) => updateProfileField('newPassword', event.target.value)}
                    className={inputClassName}
                  />
                </div>
                <div>
                  <label htmlFor={getFieldId('confirm-password')} className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <input
                    id={getFieldId('confirm-password')}
                    type="password"
                    value={profileForm.confirmPassword}
                    onChange={(event) => updateProfileField('confirmPassword', event.target.value)}
                    className={inputClassName}
                  />
                </div>
              </div>
            </SettingsCard>

            <SettingsCard
              title="Login Protection"
              description="Choose extra safeguards for sign-ins and new-device activity."
            >
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
            </SettingsCard>
          </>
        );

      case 'payments':
        return (
          <SettingsCard
            title="Payment Methods"
            description="Manage saved cards, bank accounts, your default method, and failed payment recovery."
            icon={CreditCard}
          >
            <div className="space-y-5">
              <DetailBlock title="Saved Payment Methods" icon={CreditCard}>
                <div className="space-y-3">
                  {savedPaymentMethods.map((method) => (
                    <div key={method.id} className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
                          <method.icon className={`h-7 w-7 ${method.iconClassName}`} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{method.label}</p>
                          <p className="text-sm text-gray-600">{method.type} · {method.detail}</p>
                        </div>
                      </div>
                      {method.isDefault ? (
                        <span className="inline-flex rounded-full bg-[#7626c6]/10 px-3 py-1 text-xs font-semibold text-[#7626c6]">
                          Default
                        </span>
                      ) : (
                        <button type="button" className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                          Set as Default
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </DetailBlock>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <DetailBlock title="Default Payment Method" icon={CreditCard}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor={getFieldId('cardholder-name')} className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                      <input
                        id={getFieldId('cardholder-name')}
                        type="text"
                        value={profileForm.cardholderName}
                        onChange={(event) => updateProfileField('cardholderName', event.target.value)}
                        className={inputClassName}
                      />
                    </div>
                    <div>
                      <label htmlFor={getFieldId('card-last-four')} className="block text-sm font-medium text-gray-700 mb-2">Default Card Last Four</label>
                      <input
                        id={getFieldId('card-last-four')}
                        type="text"
                        value={profileForm.cardLastFour}
                        onChange={(event) => updateProfileField('cardLastFour', event.target.value)}
                        className={inputClassName}
                      />
                    </div>
                  </div>
                </DetailBlock>

                <DetailBlock title="Payment Failures" icon={AlertTriangle}>
                  <div className="space-y-4">
                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                      <p className="text-sm font-medium text-amber-900">Retry backup method after 24 hours</p>
                      <p className="mt-1 text-sm text-amber-800">If the primary card fails, Georim will charge the backup card before interrupting your subscription.</p>
                    </div>
                    <label htmlFor={getFieldId('billing-notifications-payments')} className="flex items-center gap-2 cursor-pointer">
                      <input
                        id={getFieldId('billing-notifications-payments')}
                        type="checkbox"
                        checked={profileForm.billingNotifications}
                        onChange={(event) => updateProfileField('billingNotifications', event.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm text-gray-700">Email me immediately when a payment fails</span>
                    </label>
                    <p className="text-sm text-gray-600">Last failure: none in the last 90 days.</p>
                  </div>
                </DetailBlock>
              </div>
            </div>
          </SettingsCard>
        );

      case 'billing':
        return (
          <SettingsCard
            title="Billing"
            description="Manage subscriptions, invoices, billing history, tax details, and billing address information."
            icon={DollarSign}
          >
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
                <DetailBlock title="Plans & Subscriptions" icon={Sparkles}>
                  <div className="flex flex-col gap-4 rounded-xl border border-[#7626c6]/15 bg-[#f7f1ff] p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Current plan</p>
                      <p className="text-xl font-semibold text-gray-900">{activePremiumPlan.name}</p>
                      <p className="mt-1 text-sm text-gray-600">{activePremiumPlan.description}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-sm text-gray-600">Next renewal</p>
                      <p className="font-semibold text-gray-900">April 1, 2026</p>
                      <p className="mt-1 text-sm text-[#7626c6]">{profileForm.premiumAutoRenew ? 'Auto-renew enabled' : 'Auto-renew disabled'}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">Use Premium Subscriptions to compare Starter, Scale, and Enterprise plans in detail.</p>
                </DetailBlock>

                <DetailBlock title="Billing History" icon={Clock}>
                  <div className="space-y-3">
                    {billingHistoryEntries.map((entry) => (
                      <div key={entry.label} className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3">
                        <span className="text-sm text-gray-600">{entry.label}</span>
                        <span className="text-sm font-medium text-gray-900">{entry.value}</span>
                      </div>
                    ))}
                  </div>
                </DetailBlock>
              </div>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <DetailBlock title="Invoices" icon={Tag}>
                  <div className="space-y-3">
                    {invoiceRecords.map((invoice) => (
                      <div key={invoice.id} className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{invoice.id}</p>
                          <p className="text-sm text-gray-600">{invoice.period} · Issued {invoice.issuedOn}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-900">{invoice.amount}</span>
                          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{invoice.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </DetailBlock>

                <DetailBlock title="Tax Info" icon={DollarSign}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor={getFieldId('invoice-email')} className="block text-sm font-medium text-gray-700 mb-2">Invoice Email</label>
                      <input
                        id={getFieldId('invoice-email')}
                        type="email"
                        value={profileForm.invoiceEmail}
                        onChange={(event) => updateProfileField('invoiceEmail', event.target.value)}
                        className={inputClassName}
                      />
                    </div>
                    <div>
                      <label htmlFor={getFieldId('billing-company')} className="block text-sm font-medium text-gray-700 mb-2">Billing Company</label>
                      <input
                        id={getFieldId('billing-company')}
                        type="text"
                        value={profileForm.billingCompany}
                        onChange={(event) => updateProfileField('billingCompany', event.target.value)}
                        className={inputClassName}
                      />
                    </div>
                    <div>
                      <label htmlFor={getFieldId('tax-id')} className="block text-sm font-medium text-gray-700 mb-2">Tax ID / VAT Number</label>
                      <input
                        id={getFieldId('tax-id')}
                        type="text"
                        value={profileForm.taxId}
                        onChange={(event) => updateProfileField('taxId', event.target.value)}
                        className={inputClassName}
                      />
                    </div>
                  </div>
                </DetailBlock>
              </div>

              <DetailBlock title="Billing Address" icon={MapPin}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label htmlFor={getFieldId('billing-address-line1')} className="block text-sm font-medium text-gray-700 mb-2">Address Line 1</label>
                    <input
                      id={getFieldId('billing-address-line1')}
                      type="text"
                      value={profileForm.billingAddressLine1}
                      onChange={(event) => updateProfileField('billingAddressLine1', event.target.value)}
                      className={inputClassName}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor={getFieldId('billing-address-line2')} className="block text-sm font-medium text-gray-700 mb-2">Address Line 2</label>
                    <input
                      id={getFieldId('billing-address-line2')}
                      type="text"
                      value={profileForm.billingAddressLine2}
                      onChange={(event) => updateProfileField('billingAddressLine2', event.target.value)}
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label htmlFor={getFieldId('billing-city')} className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      id={getFieldId('billing-city')}
                      type="text"
                      value={profileForm.billingCity}
                      onChange={(event) => updateProfileField('billingCity', event.target.value)}
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label htmlFor={getFieldId('billing-state')} className="block text-sm font-medium text-gray-700 mb-2">State / Region</label>
                    <input
                      id={getFieldId('billing-state')}
                      type="text"
                      value={profileForm.billingState}
                      onChange={(event) => updateProfileField('billingState', event.target.value)}
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label htmlFor={getFieldId('billing-postal-code')} className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                    <input
                      id={getFieldId('billing-postal-code')}
                      type="text"
                      value={profileForm.billingPostalCode}
                      onChange={(event) => updateProfileField('billingPostalCode', event.target.value)}
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label htmlFor={getFieldId('billing-country')} className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <input
                      id={getFieldId('billing-country')}
                      type="text"
                      value={profileForm.billingCountry}
                      onChange={(event) => updateProfileField('billingCountry', event.target.value)}
                      className={inputClassName}
                    />
                  </div>
                </div>
              </DetailBlock>
            </div>
          </SettingsCard>
        );

      case 'premium-subscriptions':
        return (
          <>
            <SettingsCard
              title="Choose a Plan"
              description="Upgrade, downgrade, or compare plans before you confirm your next billing cycle."
            >
              <Pricing
                plans={pricingPlans}
                title="Flexible pricing for every organizer"
                description={`Your current plan is ${activePremiumPlan.name}.
Switch between plans below and save when you're ready to apply the change.`}
              />
            </SettingsCard>
          </>
        );

      case 'notifications':
        return (
          <SettingsCard
            title="Notification Preferences"
            description="Choose which organizer updates should reach your inbox."
            icon={Bell}
          >
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
          </SettingsCard>
        );
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className={`grid gap-6 ${activeSection === 'profile' ? 'xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.95fr)]' : ''}`}>
        <div className={`${cardClassName} border-[#7626c6]/10`}>
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-[#7626c6]/10 p-2.5">
              <CurrentSectionIcon className="w-5 h-5 text-[#7626c6]" />
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#7626c6]">Account Settings</p>
              <h1 className="text-2xl font-semibold text-gray-900 mt-1">{sectionTitles[activeSection]}</h1>
              <p className="text-sm text-gray-600 mt-1">{sectionDescriptions[activeSection]}</p>
            </div>
          </div>
        </div>

        {activeSection === 'profile' ? renderProfileOverview() : null}
      </div>

      <form onSubmit={handleSaveSection} className="space-y-6">
        {renderSectionContent()}

        {profileNotice ? (
          <div className={`${cardClassName} border-[#7626c6]/20 py-4`}>
            <p className="text-sm text-[#7626c6]" aria-live="polite">{profileNotice}</p>
          </div>
        ) : null}

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-[#7626c6] text-white btn-glass rounded-lg hover:bg-[#5f1fa3] transition-colors"
          >
            Save {sectionTitles[activeSection]}
          </button>
        </div>
      </form>
    </div>
  );
}
