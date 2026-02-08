import React from 'react';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const pagerClasses = cva(
  'flex items-center justify-center transition-all duration-300',
  {
    variants: {
      variant: {
        dots: 'space-x-2',
        numbers: 'space-x-1',
        lines: 'space-x-1',
      },
      size: {
        small: '',
        medium: '',
        large: '',
      },
    },
    defaultVariants: {
      variant: 'dots',
      size: 'medium',
    },
  }
);

const dotClasses = cva(
  'rounded-full transition-all duration-300 cursor-pointer hover:opacity-80',
  {
    variants: {
      size: {
        small: 'w-2 h-2',
        medium: 'w-3 h-3',
        large: 'w-4 h-4',
      },
      active: {
        true: 'bg-primary-green scale-110',
        false: 'bg-gray-300 hover:bg-gray-400',
      },
    },
    defaultVariants: {
      size: 'medium',
      active: false,
    },
  }
);

const numberClasses = cva(
  'flex items-center justify-center rounded transition-all duration-300 cursor-pointer font-medium hover:opacity-80',
  {
    variants: {
      size: {
        small: 'w-6 h-6 text-xs',
        medium: 'w-8 h-8 text-sm',
        large: 'w-10 h-10 text-base',
      },
      active: {
        true: 'bg-primary-green text-white',
        false: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
      },
    },
    defaultVariants: {
      size: 'medium',
      active: false,
    },
  }
);

const lineClasses = cva(
  'transition-all duration-300 cursor-pointer',
  {
    variants: {
      size: {
        small: 'w-6 h-1',
        medium: 'w-8 h-1',
        large: 'w-10 h-1.5',
      },
      active: {
        true: 'bg-primary-green',
        false: 'bg-gray-300 hover:bg-gray-400',
      },
    },
    defaultVariants: {
      size: 'medium',
      active: false,
    },
  }
);

const PagerIndicator = ({
  // Optional parameters (no defaults)
  layout_width,
  margin,
  position,

  // Component specific props
  totalPages = 5,
  currentPage = 0,
  variant = 'dots',
  size = 'medium',
  onPageChange,
  showNumbers = false,
  className,
  ...props
}) => {
  // Safe validation for optional parameters
  const hasValidWidth = layout_width && typeof layout_width === 'string' && layout_width?.trim() !== '';
  const hasValidMargin = margin && typeof margin === 'string' && margin?.trim() !== '';
  const hasValidPosition = position && typeof position === 'string' && position?.trim() !== '';

  // Parse margin string to Tailwind classes
  const parseMargin = (marginStr) => {
    if (!marginStr) return '';
    const parts = marginStr?.split(',');
    let classes = [];

    parts?.forEach(part => {
      const [direction, value] = part?.split('=');
      const numValue = value?.replace('px', '');
      const isNegative = numValue?.startsWith('-');
      const absValue = isNegative ? numValue?.substring(1) : numValue;
      const prefix = isNegative ? '-' : '';

      switch (direction) {
        case 't': classes?.push(`${prefix}mt-[${absValue}px]`); break;
        case 'r': classes?.push(`${prefix}mr-[${absValue}px]`); break;
        case 'b': classes?.push(`${prefix}mb-[${absValue}px]`); break;
        case 'l': classes?.push(`${prefix}ml-[${absValue}px]`); break;
      }
    });

    return classes?.join(' ');
  };

  // Build optional Tailwind classes
  const optionalClasses = [
    hasValidWidth ? (layout_width?.includes('%') ? `w-[${layout_width}]` : layout_width === 'auto' ? 'w-auto' : `w-[${layout_width}]`) : '',
    hasValidMargin ? parseMargin(margin) : '',
    hasValidPosition ? position : '',
  ]?.filter(Boolean)?.join(' ');

  // Handle page click
  const handlePageClick = (pageIndex) => {
    if (typeof onPageChange === 'function') {
      onPageChange(pageIndex);
    }
  };

  // Generate pages array
  const pages = Array.from({ length: totalPages }, (_, index) => index);

  // Render different variants
  const renderIndicators = () => {
    switch (variant) {
      case 'numbers':
        return pages?.map((pageIndex) => (
          <button
            key={pageIndex}
            onClick={() => handlePageClick(pageIndex)}
            className={numberClasses({
              size,
              active: pageIndex === currentPage,
            })}
            aria-label={`Go to page ${pageIndex + 1}`}
            aria-current={pageIndex === currentPage ? 'page' : undefined}
          >
            {pageIndex + 1}
          </button>
        ));

      case 'lines':
        return pages?.map((pageIndex) => (
          <div
            key={pageIndex}
            onClick={() => handlePageClick(pageIndex)}
            className={lineClasses({
              size,
              active: pageIndex === currentPage,
            })}
            role="button"
            tabIndex={0}
            aria-label={`Go to page ${pageIndex + 1}`}
            onKeyDown={(e) => {
              if (e?.key === 'Enter' || e?.key === ' ') {
                handlePageClick(pageIndex);
              }
            }}
          />
        ));

      default: // dots
        return pages?.map((pageIndex) => (
          <button
            key={pageIndex}
            onClick={() => handlePageClick(pageIndex)}
            className={dotClasses({
              size,
              active: pageIndex === currentPage,
            })}
            aria-label={`Go to page ${pageIndex + 1}`}
            aria-current={pageIndex === currentPage ? 'page' : undefined}
          />
        ));
    }
  };

  return (
    <nav
      className={twMerge(
        pagerClasses({ variant, size }),
        optionalClasses,
        className
      )}
      role="navigation"
      aria-label="Pagination navigation"
      {...props}
    >
      {renderIndicators()}
    </nav>
  );
};

export default PagerIndicator;