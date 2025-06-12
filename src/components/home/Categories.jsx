const categories = [
  { label: 'Tools & Equipment', icon: '🏠' },
  { label: 'Books & Study Materials', icon: '📖' },
  { label: 'Outdoor & Travel Gear', icon: '📍' },
  { label: 'Household Items', icon: '🏠' },
  { label: 'Electronics', icon: '💻' },
  { label: 'Sports Equipment', icon: '🏀' },
];

const Categories = () => {
  return (
    <section className="px-8 pb-12 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Explore by categories</h2>
        <a href="#" className="text-blue-600 text-sm hover:underline">See All</a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat, index) => (
          <div key={index} className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow hover:shadow-md transition">
            <div className="text-3xl">{cat.icon}</div>
            <p className="mt-2 text-sm font-medium text-gray-800 text-center">{cat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
