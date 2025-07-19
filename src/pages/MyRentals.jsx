import React, { useMemo, useContext, useEffect } from "react";
import { useBorrowRequests, useUpdateBorrowRequest } from "../hooks/useBorrow";
import { AuthContext } from "../auth/Authprovider";
import { getBackendImageUrl } from "../../utils/backend-image";
import { Link } from "react-router-dom";

const RequestCard = ({ request, isOwner }) => {
  const { mutate: updateStatus, isPending } = useUpdateBorrowRequest();

  const handleUpdate = (status) => {
    updateStatus({ requestId: request._id, status });
  };

  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    denied: "bg-red-100 text-red-800",
    returned: "bg-blue-100 text-blue-800",
    cancelled: "bg-gray-100 text-gray-800",
  };

  const renderActionButtons = () => {
    if (isOwner) {
      if (request.status === 'pending') {
        return (
          <div className="flex gap-3">
            <button onClick={() => handleUpdate('approved')} disabled={isPending} className="flex-1 bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-400">Approve</button>
            <button onClick={() => handleUpdate('denied')} disabled={isPending} className="flex-1 bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 disabled:bg-gray-400">Deny</button>
          </div>
        );
      }
      if (request.status === 'approved') {
        return (
            <button onClick={() => handleUpdate('cancelled')} disabled={isPending} className="w-full bg-gray-500 text-white font-semibold py-2 rounded-lg hover:bg-gray-600 disabled:bg-gray-400">Cancel Approval</button>
        );
      }
      if (request.status === 'returned') {
        return <p className="text-sm text-blue-600 font-semibold">Item has been returned.</p>
      }
    }
    
    // --- Logic for Borrowers ---
    if (!isOwner) {
      if (request.status === 'pending') {
        return <p className="text-sm text-gray-600">Awaiting owner's response.</p>;
      }
      if (request.status === 'approved') {
        return (
          <div className="flex gap-3">
            <button onClick={() => handleUpdate('returned')} disabled={isPending} className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400">Return Item</button>
            <button disabled={isPending} className="flex-1 bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-400">Pay</button>
          </div>
        );
      }
    }

    return <p className="text-sm text-gray-500">This request has been finalized.</p>;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border flex flex-col sm:flex-row gap-4">
      <img src={getBackendImageUrl(request.item.imageUrls[0])} alt={request.item.name} className="w-full sm:w-32 h-32 object-cover rounded-md" />
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <Link to={`/item/${request.item._id}`} className="font-bold text-lg text-gray-800 hover:underline">{request.item.name}</Link>
            <p className="text-sm text-gray-500">{isOwner ? `Requested by: ${request.borrower.username}` : `Owner: ${request.owner.username}`}</p>
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[request.status]}`}>{request.status}</span>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          {renderActionButtons()}
        </div>
      </div>
    </div>
  );
};


const MyRentalsPage = () => {
  const { user } = useContext(AuthContext);
  const { requests, isLoading, error, refetch } = useBorrowRequests();

  useEffect(() => { refetch(); }, [refetch]);

  const { outgoingRequests, incomingRequests } = useMemo(() => {
    return {
      outgoingRequests: requests.filter(req => req.borrower._id === user?._id),
      incomingRequests: requests.filter(req => req.owner._id === user?._id),
    };
  }, [requests, user]);

  if (isLoading) return <div className="text-center p-10">Loading your rentals...</div>;
  if (error) return <div className="text-center p-10 text-red-500">Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Rentals</h1>
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Items I've Requested to Borrow</h2>
        {outgoingRequests.length > 0 ? (
          <div className="space-y-4">{outgoingRequests.map(req => <RequestCard key={req._id} request={req} isOwner={false} />)}</div>
        ) : (<p className="text-gray-500">You haven't requested to borrow any items yet.</p>)}
      </section>
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Requests for My Items</h2>
        {incomingRequests.length > 0 ? (
          <div className="space-y-4">{incomingRequests.map(req => <RequestCard key={req._id} request={req} isOwner={true} />)}</div>
        ) : (<p className="text-gray-500">No one has requested to borrow your items yet.</p>)}
      </section>
    </div>
  );
};

export default MyRentalsPage;
