import React from "react";
import { useBookmarks } from "../hooks/useBookmarks";
import ItemCard from "../components/user/ItemsCard";
import { Loader, Heart, HeartCrack, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../layouts/Header";

const PageHeader = ({ title, subtitle, count }) => (
  <div className="bg-white border-b border-gray-200">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center py-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>
          <p className="mt-1 text-base text-slate-600">{subtitle}</p>
        </div>
        {count > 0 && (
          <div className="flex items-center gap-2 mt-4 md:mt-0 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full text-sm font-medium">
            <Heart size={16} className="text-red-500" />
            <span>
              {count} Liked Item{count > 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="text-center bg-white p-8 md:p-16 rounded-2xl shadow-sm border border-gray-200">
    <div className="flex justify-center items-center w-20 h-20 mx-auto bg-slate-100 rounded-full">
      <HeartCrack size={40} className="text-slate-500" strokeWidth={1.5} />
    </div>
    <h2 className="mt-6 text-2xl font-bold text-gray-800">
      Your Liked Items will appear here
    </h2>
    <p className="mt-2 text-base text-gray-500">
      Click the heart icon on any item you're interested in to save it.
    </p>
    <Link
      to="/browse"
      className="inline-flex items-center justify-center gap-2 mt-8 px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <span>Browse Items</span>
      <ArrowRight size={16} />
    </Link>
  </div>
);

const BookmarksPage = () => {
  const { bookmarks, isLoading } = useBookmarks();
  const bookmarkCount = bookmarks?.length || 0;

  if (isLoading) {
    return (
      <div className="bg-slate-50 min-h-screen">
        <Header />
        <div className="flex justify-center items-center py-40">
          <Loader className="animate-spin text-blue-500" size={48} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeader
        title="Liked Items"
        subtitle="All your bookmarked items, saved in one place."
        count={bookmarkCount}
      />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {bookmarkCount > 0 ? <ItemCard items={bookmarks} /> : <EmptyState />}
      </main>
    </div>
  );
};

export default BookmarksPage;
