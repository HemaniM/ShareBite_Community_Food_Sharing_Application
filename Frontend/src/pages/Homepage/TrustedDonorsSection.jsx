import React from "react";
import { Icon } from "../../components/Icons/Icons";
import { Link } from "react-router-dom";
import Button1 from "../../components/ui/Button1";


const TILE_CLASSES = [
  "md:col-span-3 md:row-span-2",
  "md:col-span-3 md:row-span-1",
  "md:col-span-6 md:row-span-1",
  "md:col-span-3 md:row-span-1",
  "md:col-span-3 md:row-span-1",
  "md:col-span-3 md:row-span-1",
  "md:col-span-4 md:row-span-1",
  "md:col-span-4 md:row-span-1",
  "md:col-span-4 md:row-span-1",
  "md:col-span-3 md:row-span-2",
  "md:col-span-3 md:row-span-2",
  "md:col-span-3 md:row-span-2",
  "md:col-span-3 md:row-span-2",
];


const TrustedDonorsSection = ({
  products = [],
  loading = false,
  error = null,
  onProductClick,
  onViewMoreClick,
}) => {


  // const getItemClasses = (type) => {
  //   switch (type) {
  //     case "large":
  //       return "col-span-2 md:col-span-1 row-span-2 h-[300px] md:h-[400px]";
  //     case "wide":
  //       return "col-span-2 h-[150px] md:h-[190px]";
  //     case "medium":
  //       return "col-span-1 h-[150px] md:h-[190px]";
  //     case "small":
  //       return "col-span-1 h-[150px] md:h-[190px]";
  //     default:
  //       return "col-span-1 h-[150px] md:h-[190px]";
  //   }
  // };

  return (
    <section className="w-full py-[60px] lg:py-[60px]">
      <div className="mx-auto w-full max-w-[975px]">
        <div className="flex flex-col gap-[50px]">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold uppercase tracking-wide text-black sm:text-xl lg:text-[22px]">
              From Most Trusted Donors
            </h2>

            {/* View More Button */}
            <Button1
              variant="filled"
              color="green"
              size="sm"
              onClick={onViewMoreClick}
              className="w-[47px] h-[30px] lg:w-[47px] lg:h-[30px] rounded-[10px]"
            >
              <Icon name="right_arrow" />
            </Button1>
          </div>

          {/* Food Items Grid */}
          {loading ? (
            <div className="w-full rounded-xl border border-dashed border-[var(--text-grey-2)] bg-transparent p-6 text-[var(--text-grey-4)]">
              Loading food posts from trusted donors...
            </div>
          ) : error ? (
            <div className="w-full rounded-xl border border-dashed border-[var(--text-grey-2)] bg-transparent p-6 text-[var(--primary-orange-600)]">
              {error}
            </div>
          ) : products.length === 0 ? (
            <div className="w-full rounded-xl border border-dashed border-[var(--text-grey-2)] bg-transparent p-6 text-[var(--text-grey-4)]">
              No food posts are available from trusted donors right now.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:gap-[20px] sm:grid-cols-3 md:grid-cols-12 md:grid-rows-[180px_180px_200px_300px]">
              {products.map((item, index) => (
                <article
                  key={item?.id || `${item?.title}-${index}`}
                  onClick={() => onProductClick?.(item)}
                  className={`group relative col-span-1 overflow-hidden rounded-[12px] shadow-sm ${TILE_CLASSES[index] || "md:col-span-3 md:row-span-1"}`}
                >
                  {/* Background Image */}
                  <img
                    src={item?.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Overlay Content */}
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" /> */}

                  {/* Bottom Content */}
                  {item?.donorId ? (
                    <Link
                      to={`/user/${item.donorId}`}
                      onClick={(e) => e.stopPropagation()}
                      className="cursor-pointer absolute left-3 top-3 rounded-full bg-black/15 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-sm"
                    >
                      {item?.donorName}
                    </Link>
                  ) : (
                    <span className="absolute left-3 top-3 rounded-full bg-black/15 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                      {item?.donorName}
                    </span>
                  )}
                  {/* {item?.donorName && (
                    <span className="absolute left-3 top-3 rounded-full bg-black/15 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                      {item?.donorName}
                    </span>
                  )} */}

                  {/* Add Button */}
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-black/15 p-3 px-4 backdrop-blur-[2px]">
                    <div>
                      <h3 className="text-xs mb-1 font-semibold text-white sm:text-sm">
                        {item.title}
                      </h3>
                      <p className="text-[11px] font-semibold sm:text-xs text-[var(--primary-orange-100)]">
                        {item?.price === 0 ? "FREE /-" : `${item?.price} ₹/-`}
                      </p>
                    </div>

                    {/* <Icon
                    name="cart_small"
                    className="hover:opacity-90 transition-opacity"
                  /> */}

                    <Button1
                      variant="filled"
                      color="orange"
                      size="sm"
                      onClick={(event) => {
                        event.stopPropagation();
                        onProductClick?.(item);
                      }}
                      className="py-2.5 px-3.5"
                    >
                      <Icon name="right_arrow" />
                    </Button1>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrustedDonorsSection;
