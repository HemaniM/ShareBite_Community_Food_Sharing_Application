import React from 'react';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const buttonClasses = cva(
  'inline-flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 active:scale-95',
  {
    variants: {
      variant: {
        primary: 'focus:ring-green-500',
        secondary: 'focus:ring-orange-500',
        outline: 'border-2 bg-transparent hover:bg-opacity-10',
      },
      size: {
        small: 'px-3 py-1.5',
        medium: 'px-4 py-2',
        large: 'px-6 py-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
);

const Button = ({
  // Required parameters with defaults
  text = "REQUEST",
  text_font_size = "text-sm",
  text_font_family = "Nunito",
  text_font_weight = "font-semibold",
  text_line_height = "14px",
  text_text_align = "left",
  text_color = "text-text-white",
  fill_background_color = "bg-primary-green",
  border_border_radius = "rounded-sm",

  // Optional parameters (no defaults)
  border_border,
  text_text_transform,
  effect_box_shadow,
  layout_align_self,
  layout_width,
  padding,
  position,
  margin,
  layout_gap,

  // Standard React props
  variant,
  size,
  disabled = false,
  className,
  children,
  onClick,
  type = "button",
  ...props
}) => {
  // Safe validation for optional parameters
  const hasValidBorder = border_border && typeof border_border === 'string' && border_border?.trim() !== '';
  const hasValidTextTransform = text_text_transform && typeof text_text_transform === 'string' && text_text_transform?.trim() !== '';
  const hasValidBoxShadow = effect_box_shadow && typeof effect_box_shadow === 'string' && effect_box_shadow?.trim() !== '';
  const hasValidAlignSelf = layout_align_self && typeof layout_align_self === 'string' && layout_align_self?.trim() !== '';
  const hasValidWidth = layout_width && typeof layout_width === 'string' && layout_width?.trim() !== '';
  const hasValidPadding = padding && typeof padding === 'string' && padding?.trim() !== '';
  const hasValidPosition = position && typeof position === 'string' && position?.trim() !== '';
  const hasValidMargin = margin && typeof margin === 'string' && margin?.trim() !== '';
  const hasValidGap = layout_gap && typeof layout_gap === 'string' && layout_gap?.trim() !== '';

  // Parse padding string to Tailwind classes
  const parsePadding = (paddingStr) => {
    if (!paddingStr) return '';
    const parts = paddingStr?.split(',');
    let classes = [];

    parts?.forEach(part => {
      const [direction, value] = part?.split('=');
      const numValue = value?.replace('px', '');
      switch (direction) {
        case 't': classes?.push(`pt-[${numValue}px]`); break;
        case 'r': classes?.push(`pr-[${numValue}px]`); break;
        case 'b': classes?.push(`pb-[${numValue}px]`); break;
        case 'l': classes?.push(`pl-[${numValue}px]`); break;
      }
    });

    return classes?.join(' ');
  };

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
    hasValidBorder ? `border-[${border_border}]` : '',
    hasValidTextTransform ? text_text_transform : '',
    hasValidBoxShadow ? `shadow-[${effect_box_shadow}]` : '',
    hasValidAlignSelf ? `self-${layout_align_self}` : '',
    hasValidWidth ? (layout_width?.includes('%') ? `w-[${layout_width}]` : layout_width === 'auto' ? 'w-auto' : `w-[${layout_width}]`) : '',
    hasValidPadding ? parsePadding(padding) : '',
    hasValidMargin ? parseMargin(margin) : '',
    hasValidPosition ? position : '',
    hasValidGap ? `gap-[${layout_gap}]` : '',
  ]?.filter(Boolean)?.join(' ');

  // Build responsive text alignment classes
  const getTextAlignClass = (align) => {
    switch (align) {
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      case 'justify': return 'text-justify';
      default: return 'text-left';
    }
  };

  // Build base styles combining required parameters with Tailwind mappings
  const baseStyles = [
    text_font_size,
    text_font_weight,
    text_color,
    fill_background_color,
    border_border_radius,
    getTextAlignClass(text_text_align),
  ]?.join(' ');

  // Safe click handler
  const handleClick = (event) => {
    if (disabled) return;
    if (typeof onClick === 'function') {
      onClick(event);
    }
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      style={{
        fontFamily: text_font_family,
        lineHeight: text_line_height,
      }}
      className={twMerge(
        buttonClasses({ variant, size }),
        baseStyles,
        optionalClasses,
        className
      )}
      aria-disabled={disabled}
      {...props}
    >
      {children || text}
    </button>
  );
};

export default Button;




