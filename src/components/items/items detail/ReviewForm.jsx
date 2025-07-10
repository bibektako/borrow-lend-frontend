import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCreateReview } from '../../../hooks/useReview';
import { AuthContext } from '../../../auth/Authprovider';
import { Star } from 'lucide-react';
import { toast } from 'react-toastify';

const ReviewForm = ({ itemId }) => {
    const { user } = useContext(AuthContext);
    const { mutate: createReview, isPending } = useCreateReview();
    const [hoverRating, setHoverRating] = useState(0);

    const formik = useFormik({
        initialValues: {
            rating: 0,
            comment: '',
        },
        validationSchema: Yup.object({
            rating: Yup.number().min(1, 'Please select a rating.').required('Rating is required.'),
            comment: Yup.string().required('Please leave a comment.').min(10, 'Comment must be at least 10 characters.'),
        }),
        onSubmit: (values, { resetForm }) => {
            if (!user) {
                toast.error("You must be logged in to leave a review.");
                return;
            }
            createReview({
                ...values,
                item_id: itemId,
                user_id: user._id,
            }, {
                onSuccess: () => {
                    resetForm();
                }
            });
        },
    });

    return (
        <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Leave a Review</h3>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Rating</label>
                    <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => formik.setFieldValue('rating', star)}
                                className="p-1"
                            >
                                <Star
                                    size={24}
                                    className={`cursor-pointer transition-colors ${
                                        (hoverRating || formik.values.rating) >= star
                                            ? 'text-yellow-400 fill-yellow-400'
                                            : 'text-gray-300'
                                    }`}
                                />
                            </button>
                        ))}
                    </div>
                    {formik.touched.rating && formik.errors.rating ? (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.rating}</p>
                    ) : null}
                </div>

                <div>
                    <label htmlFor="comment" className="block text-sm font-semibold text-gray-700 mb-2">Your Comment</label>
                    <textarea
                        id="comment"
                        rows="4"
                        {...formik.getFieldProps('comment')}
                        placeholder="Share your experience with this item..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                    {formik.touched.comment && formik.errors.comment ? (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.comment}</p>
                    ) : null}
                </div>

                <div className="text-right">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        {isPending ? 'Submitting...' : 'Submit Review'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;
