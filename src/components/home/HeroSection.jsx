import readingImg from "../../assets/borrowLend.png";
import { Link } from "react-router-dom";
const HeroSection = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between px-8 py-16 max-w-7xl mx-auto">
      <div className="max-w-xl">
        <h2 className="text-sm text-blue-600 font-medium mb-2">Borrowlend</h2>
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          Share more. Spend less. <br />
          Lend or borrow with trust.
        </h1>
        <p className="text-gray-600 mb-6">
          Join our community of lenders and borrowers to save money and
          resources.
        </p>
        <div className="flex space-x-4">
          <Link to="lend">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700">
              Start Lending
            </button>
          </Link>
          
          <Link to="browse">
            <button className="border border-blue-600 text-blue-600 px-5 py-2 rounded-md hover:bg-blue-50">
              Browse Items
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-10 lg:mt-10">
        <img src={readingImg} alt="Borrow icon" className="w-67 h-64" />
        <p className="text-center text-blue-600 mt-4">
          Borrow and lend items in your community
        </p>
      </div>
    </section>
  );
};

export default HeroSection;

