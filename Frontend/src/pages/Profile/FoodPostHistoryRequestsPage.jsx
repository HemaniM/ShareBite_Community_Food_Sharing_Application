import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchHistoryListingRequests } from "../../features/history/historySlice";

const formatDate = (value) => {
    if (!value) {
        return "-";
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return "-";
    }

    return date.toLocaleDateString();
};

const FoodPostHistoryRequestsPage = () => {
    const { postId } = useParams();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const {
        listingHistoryRequests,
        listingHistoryLoading,
        listingHistoryError,
        historyFoodPosts,
    } = useAppSelector((state) => state.history);

    useEffect(() => {
        if (postId) {
            dispatch(fetchHistoryListingRequests(postId));
        }
    }, [dispatch, postId]);

    const postTitle =
        location.state?.postTitle ||
        historyFoodPosts.find((post) => String(post._id) === String(postId))?.title ||
        "FOOD POST";

    return (
        <div>
            <h2 className="text-[20px] font-bold tracking-[0.5px] text-black uppercase mb-8">
                FOR <span className="text-orange">{postTitle}</span>
            </h2>

            {listingHistoryLoading && <div className="w-full rounded-xl border border-dashed border-[var(--text-grey-2)] bg-transparent text-[var(--text-grey-4)] px-6 py-10 text-center text-[15px]">Loading request history...</div>}
            {listingHistoryError && (
                <div className="w-full rounded-xl border border-dashed border-[var(--text-grey-2)] bg-transparent text-[var(--primary-orange-600)] px-6 py-10 text-center text-[15px]">{listingHistoryError}</div>
            )}

            <div className="space-y-4">
                {!listingHistoryLoading && !listingHistoryRequests.length && (
                    <div className="w-full rounded-xl border border-dashed border-[var(--text-grey-2)] bg-transparent text-[var(--text-grey-4)] px-6 py-10 text-center text-[15px]">
                        No approved/rejected requests found for this food post.
                    </div>
                )}

                {listingHistoryRequests.map((request) => {
                    const requester = request.requester || {};
                    const listing = request.listingId || {};
                    const address = [requester.address, requester.city, requester.state]
                        .filter(Boolean)
                        .join(", ");

                    return (
                        <article
                            key={request._id}
                            className="rounded-[8px] border border-[var(--white-600)] bg-white py-[22px] px-[24px]"
                        >
                            <div className="flex items-center justify-between gap-5">
                                <div className="flex flex-col gap-[15px]">
                                    <div className="flex items-center gap-[20px]">
                                        <img
                                            src={requester.profileImage || "/images/profile_image.jpg"}
                                            alt={requester.name || "Requester"}
                                            className="h-[50px] w-[50px] rounded-full object-cover"
                                        />
                                        <div>
                                            <h3 className="text-[16px] font-bold text-[var(--text-grey-5)] mb-[6px]">
                                                {requester.name || "ShareBite User"}
                                            </h3>
                                            <p className="text-[12px] text-[var(--text-grey-3)] tracking-[0.5px]">
                                                Requested On, <span className="font-bold text-[var(--text-grey-4)]">{formatDate(request.createdAt)}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-[12px] leading-[20px] text-[var(--text-grey-4)] px-2 grid md:grid-cols-2 gap-x-[80px]">
                                        <div className="flex flex-col gap-[5px]">
                                            <p>
                                                <span className="mr-[30px] font-semibold text-[var(--text-grey-5)]">
                                                    Product
                                                </span>
                                                {listing.title || postTitle}
                                            </p>
                                            <p>
                                                <span className="mr-[12px] font-semibold text-[var(--text-grey-5)]">
                                                    Request ID
                                                </span>
                                                {request._id}
                                            </p>
                                            <p>
                                                <span className="mr-[25px] font-semibold text-[var(--text-grey-5)]">
                                                    Quantity
                                                </span>
                                                {request.requestedQuantity} {listing.stock?.unit || "items"}
                                            </p>
                                            <p>
                                                <span className="mr-[38px] font-semibold text-[var(--text-grey-5)]">
                                                    From
                                                </span>
                                                {address || "-"}
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-[5px]">
                                            <p className="font-semibold text-[var(--text-grey-5)]">Contacts</p>
                                            <p>{requester.phone || "-"}</p>
                                            <p>{requester.email || "-"}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="min-w-[100px] flex justify-center">
                                    <span className={`${request.status == "rejected" ? "bg-[var(--primary-orange-50)]" : "bg-[var(--primary-green-50)]"} rounded-[10px] px-[20px] py-[8px] text-[14px] font-semibold text-[var(--text-grey-4)] capitalize`}>
                                        {request.status}
                                    </span>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
};

export default FoodPostHistoryRequestsPage;
