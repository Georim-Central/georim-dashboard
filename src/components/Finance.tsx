import { DollarSign, TrendingUp, Clock } from 'lucide-react';

export function Finance() {
  // Mock data - Total Revenue = Available to Withdraw + Pending Balance
  const availableToWithdraw = 12450.00;
  const pendingBalance = 3280.50;
  const totalRevenue = availableToWithdraw + pendingBalance;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="min-h-full bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Finance</h1>
          <p className="text-gray-600 mt-1">Track your earnings and manage withdrawals</p>
        </div>

        {/* Financial Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Revenue Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-[#7626c6]" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total Revenue</h3>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {formatCurrency(totalRevenue)}
            </div>
            <p className="text-sm text-gray-500">
              Total earned from all completed orders
            </p>
          </div>

          {/* Available to Withdraw Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Available to Withdraw</h3>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {formatCurrency(availableToWithdraw)}
            </div>
            <p className="text-sm text-gray-500">
              Funds ready for immediate withdrawal
            </p>
          </div>

          {/* Pending Balance Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Pending Balance</h3>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {formatCurrency(pendingBalance)}
            </div>
            <p className="text-sm text-gray-500">
              Funds being processed, available soon
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-blue-900 mb-1">Payment Processing Information</h4>
              <p className="text-sm text-blue-700">
                Payments typically move from <span className="font-medium">Pending Balance</span> to{' '}
                <span className="font-medium">Available to Withdraw</span> after 5-7 business days. 
                This hold period helps protect against fraud and chargebacks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
