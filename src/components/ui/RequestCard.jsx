import React from "react";
import { useUpdateBorrowRequest } from "../../hooks/useBorrow";
import { getBackendImageUrl } from "../../../utils/backend-image";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react"; // For a nice error icon

const RequestCard = ({ request, isOwner }) => {
  const { mutate: updateStatus, isPending } = useUpdateBorrowRequest();

  if (!request.item) {
    return (
      <div className="bg-red-50 p-4 rounded-lg shadow-md border border-red-200 flex items-center gap-4">
        <AlertTriangle className="w-8 h-8 text-red-500 flex-shrink-0" />
        <div>
          <h3 className="font-bold text-red-800">Invalid Request</h3>
          <p className="text-sm text-red-700">The item associated with this request has been deleted.</p>
        </div>
      </div>
    );
  }


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
      if (request.status === "pending") {
        return (
          <div className="flex gap-3">
            <button
              onClick={() => handleUpdate("approved")}
              disabled={isPending}
              className="flex-1 bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-400"
            >
              Approve
            </button>
            <button
              onClick={() => handleUpdate("denied")}
              disabled={isPending}
              className="flex-1 bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 disabled:bg-gray-400"
            >
              Deny
            </button>
          </div>
        );
      }
      if (request.status === "approved") {
        return (
          <div className="flex flex-col gap-2">
            <p className="text-sm text-green-700 font-semibold text-center">
              Awaiting payment from borrower.
            </p>
            <button
              onClick={() => handleUpdate("cancelled")}
              disabled={isPending}
              className="w-full bg-gray-500 text-white font-semibold py-2 rounded-lg hover:bg-gray-600 disabled:bg-gray-400"
            >
              Cancel Approval
            </button>
          </div>
        );
      }
    }

    if (!isOwner) {
      if (request.status === "pending") {
        return (
          <p className="text-sm text-gray-600 text-center">
            Awaiting owner's response.
          </p>
        );
      }
      if (request.status === "approved") {
        return (
          <div className="flex flex-col gap-3">
            <h3 className="text-md font-semibold text-gray-800">
              Payment Required
            </h3>
            <button
              // Add  payment 
              onClick={() => alert("Redirecting to payment...")}
              disabled={isPending}
              className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-400"
            >
              Pay Now
            </button>
            <button
              onClick={() => handleUpdate("cancelled")}
              disabled={isPending}
              className="w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 disabled:bg-gray-400"
            >
              Cancel Request
            </button>
          </div>
        );
      }
    }

    return (
      <p className="text-sm text-gray-500 text-center">
        This request has been finalized.
      </p>
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border flex flex-col sm:flex-row gap-4">
      <img
        src={getBackendImageUrl(request.item?.imageUrls?.[0])}
        alt={request.item?.name || 'Item image'}
        className="w-full sm:w-32 h-32 object-cover rounded-md"
      />
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <Link
              to={`/item/${request.item._id}`} 
              className="font-bold text-lg text-gray-800 hover:underline"
            >
              {request.item.name}
            </Link>
            <p className="text-sm text-gray-500">
              {isOwner
                ? `Requested by: ${request.borrower.username}`
                : `Owner: ${request.owner.username}`}
            </p>
          </div>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
              statusStyles[request.status] || "bg-gray-100 text-gray-800"
            }`}
          >
            {request.status}
          </span>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          {renderActionButtons()}
        </div>
      </div>
    </div>
  );
};

export default RequestCard;