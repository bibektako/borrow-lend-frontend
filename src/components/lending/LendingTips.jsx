import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Info, Camera, FileText, Tag, MessageSquare, CalendarCheck, ChevronDown } from 'lucide-react';
const CustomAccordionItem = ({ title, content, value, isOpen, onToggle, icon }) => {
  return (
    <div className="border-b border-gray-200">
      <h2>
        <button
          type="button"
          className="flex items-center justify-between w-full py-4 font-medium text-left text-gray-700 hover:bg-gray-50 px-2 rounded-t-lg"
          onClick={() => onToggle(isOpen ? null : value)}
          aria-expanded={isOpen}
        >
          <div className="flex items-center">
            {icon}
            <span>{title}</span>
          </div>
          <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </h2>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-40' : 'max-h-0'
        }`}
      >
        <div className="py-4 px-2 text-sm text-gray-600 pl-10">
          {content}
        </div>
      </div>
    </div>
  );
};

const LendingTips = () => {
  const [openItem, setOpenItem] = useState('item-1'); // Keep the first item open by default

  const tips = [
    {
      id: 'item-1',
      title: 'Take great photos',
      content: 'Clear, well-lit photos from multiple angles help borrowers see exactly what they\'re getting. Include photos of any wear and tear for transparency.',
      icon: <Camera className="h-4 w-4 mr-3 text-blue-600" />,
    },
    {
      id: 'item-2',
      title: 'Write detailed descriptions',
      content: 'Include specifications, condition, age, and any special features. The more details you provide, the more likely borrowers will choose your item.',
      icon: <FileText className="h-4 w-4 mr-3 text-blue-600" />,
    },
    {
      id: 'item-3',
      title: 'Set a fair price',
      content: 'Research similar items to set a competitive daily rate. Remember that lower prices often lead to more frequent rentals and higher overall earnings.',
      icon: <Tag className="h-4 w-4 mr-3 text-blue-600" />,
    },
    {
      id: 'item-4',
      title: 'Be responsive',
      content: 'Quick responses to inquiries increase your chances of securing a rental. Enable notifications to stay on top of messages.',
      icon: <MessageSquare className="h-4 w-4 mr-3 text-blue-600" />,
    },
    {
      id: 'item-5',
      title: 'Keep your calendar updated',
      content: 'To avoid booking conflicts and cancellations, make sure your item\'s availability is always current.',
      icon: <CalendarCheck className="h-4 w-4 mr-3 text-blue-600" />,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 border border-gray-100">
      <h2 className="text-xl font-bold mb-5 text-gray-900">Pro Lending Tips</h2>
      <div className="w-full space-y-1">
        {tips.map((tip) => (
          <CustomAccordionItem
            key={tip.id}
            value={tip.id}
            title={tip.title}
            content={tip.content}
            icon={tip.icon}
            isOpen={openItem === tip.id}
            onToggle={setOpenItem}
          />
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <div className="flex items-start">
          <Info className="h-6 w-6 text-blue-500 mt-0.5 mr-3 shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-800">Lender Protection</h3>
            <p className="text-sm text-blue-700 mt-1">
              All rentals include our Lender Protection guarantee, covering up to Rs 20,000 in damages or theft.
            </p>
            <Link to="/help/lender-protection" className="text-sm text-blue-600 font-semibold hover:underline mt-2 inline-block">
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LendingTips;
