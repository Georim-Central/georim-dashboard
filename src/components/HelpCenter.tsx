import { FormEvent, useState } from 'react';
import { Search, Shield, MessageCircle } from 'lucide-react';

type HelpForm = {
  fullName: string;
  email: string;
  topic: string;
  message: string;
};

const defaultHelpForm: HelpForm = {
  fullName: 'John Doe',
  email: 'john.doe@georim.com',
  topic: 'dashboard',
  message: ''
};

const faqItems = [
  {
    id: 'faq-dashboard',
    question: 'How do I manage all events from the dashboard?',
    answer: 'Use Dashboard to open any event card, then switch to Event Management tabs for details, ticketing, orders, and reports.'
  },
  {
    id: 'faq-team',
    question: 'How can I invite team members with event access?',
    answer: 'Go to Team, click Invite Team Member, choose role and event access, then send the invite.'
  },
  {
    id: 'faq-ticketing',
    question: 'Where do I edit or delete ticket types?',
    answer: 'Open an event, go to Ticketing, and use the Edit and Delete icons on each ticket type.'
  },
  {
    id: 'faq-reports',
    question: 'Where can I download reports?',
    answer: 'Inside Event Management, open Reports to export attendee and performance information.'
  }
];

export function HelpCenter() {
  const [helpForm, setHelpForm] = useState<HelpForm>(defaultHelpForm);
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqItems[0].id);
  const [notice, setNotice] = useState<string | null>(null);

  const updateHelpField = <K extends keyof HelpForm>(field: K, value: HelpForm[K]) => {
    setHelpForm((currentForm) => ({
      ...currentForm,
      [field]: value
    }));
  };

  const handleSubmitHelpRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = helpForm.message.trim();
    if (!message) {
      setNotice('Please add a message so we can help you.');
      return;
    }

    console.log('[Help] Request submitted', {
      ...helpForm,
      message
    });

    setNotice('Help request submitted. Our support team will reach out shortly.');
    setHelpForm((currentForm) => ({
      ...currentForm,
      message: ''
    }));
  };

  return (
    <div className="p-8 space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-[#7626c6]/10">
            <Shield className="w-5 h-5 text-[#7626c6]" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Help Center</h1>
        </div>
        <p className="text-sm text-gray-600">
          Get dashboard support and browse FAQs for common event-management tasks.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="w-5 h-5 text-[#7626c6]" />
            <h2 className="text-lg font-semibold text-gray-900">Contact Support</h2>
          </div>
          <p className="text-sm text-gray-600 mb-5">
            Your login details are prefilled to speed up support requests.
          </p>

          <form onSubmit={handleSubmitHelpRequest} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={helpForm.fullName}
                  onChange={(event) => updateHelpField('fullName', event.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7626c6] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={helpForm.email}
                  onChange={(event) => updateHelpField('email', event.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7626c6] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
              <select
                value={helpForm.topic}
                onChange={(event) => updateHelpField('topic', event.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7626c6] focus:border-transparent"
              >
                <option value="dashboard">Dashboard</option>
                <option value="events">Event Management</option>
                <option value="ticketing">Ticketing</option>
                <option value="orders">Orders & Check-in</option>
                <option value="account">Account & Login</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                rows={5}
                value={helpForm.message}
                onChange={(event) => updateHelpField('message', event.target.value)}
                placeholder="Describe the issue you need help with..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7626c6] focus:border-transparent resize-none"
              />
            </div>

            {notice && <p className="text-sm text-[#7626c6]">{notice}</p>}

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-[#7626c6] text-white btn-glass rounded-lg hover:bg-[#5f1fa3] transition-colors"
              >
                Send Help Request
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-5 h-5 text-[#7626c6]" />
            <h2 className="text-lg font-semibold text-gray-900">FAQs</h2>
          </div>

          <div className="space-y-3">
            {faqItems.map((faq) => {
              const isOpen = openFaqId === faq.id;

              return (
                <div key={faq.id} className="border border-gray-200 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                    aria-expanded={isOpen}
                    aria-controls={`${faq.id}-panel`}
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                  </button>

                  {isOpen && (
                    <div id={`${faq.id}-panel`} className="px-4 pb-4 text-sm text-gray-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
