import React, { useState } from 'react';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const inputClasses = cva(
  'w-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'focus:ring-green-500',
        error: 'border-red-500 focus:ring-red-500',
        success: 'border-green-500 focus:ring-green-500',
      },
      size: {
        small: 'px-3 py-1.5 text-sm',
        medium: 'px-4 py-2 text-base',
        large: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  }
);

const EditText = ({
  // Required parameters with defaults
  fill_background_color = "bg-background-input",
  border_border_radius = "rounded-md",

  // Optional parameters (no defaults)
  placeholder,
  text_font_size,
  text_font_family,
  text_font_weight,
  text_line_height,
  text_text_align,
  text_color,
  border_border,
  text_text_transform,
  layout_width,
  padding,
  position,
  layout_gap,

  // Standard React props
  variant,
  size,
  disabled = false,
  className,
  value,
  onChange,
  onFocus,
  onBlur,
  type = "text",
  id,
  name,
  required = false,
  maxLength,
  minLength,
  pattern,
  autoComplete,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Safe validation for optional parameters
  const hasValidPlaceholder = placeholder && typeof placeholder === 'string' && placeholder?.trim() !== '';
  const hasValidFontSize = text_font_size && typeof text_font_size === 'string' && text_font_size?.trim() !== '';
  const hasValidFontFamily = text_font_family && typeof text_font_family === 'string' && text_font_family?.trim() !== '';
  const hasValidFontWeight = text_font_weight && typeof text_font_weight === 'string' && text_font_weight?.trim() !== '';
  const hasValidLineHeight = text_line_height && typeof text_line_height === 'string' && text_line_height?.trim() !== '';
  const hasValidTextAlign = text_text_align && typeof text_text_align === 'string' && text_text_align?.trim() !== '';
  const hasValidTextColor = text_color && typeof text_color === 'string' && text_color?.trim() !== '';
  const hasValidBorder = border_border && typeof border_border === 'string' && border_border?.trim() !== '';
  const hasValidTextTransform = text_text_transform && typeof text_text_transform === 'string' && text_text_transform?.trim() !== '';
  const hasValidWidth = layout_width && typeof layout_width === 'string' && layout_width?.trim() !== '';
  const hasValidPadding = padding && typeof padding === 'string' && padding?.trim() !== '';
  const hasValidPosition = position && typeof position === 'string' && position?.trim() !== '';
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

  // Build optional Tailwind classes
  const optionalClasses = [
    hasValidFontSize ? text_font_size : '',
    hasValidFontWeight ? text_font_weight : '',
    hasValidTextColor ? text_color : '',
    hasValidBorder ? `border-[${border_border}]` : 'border border-gray-300',
    hasValidTextTransform ? text_text_transform : '',
    hasValidWidth ? (layout_width?.includes('%') ? `w-[${layout_width}]` : layout_width === 'auto' ? 'w-auto' : `w-[${layout_width}]`) : '',
    hasValidPadding ? parsePadding(padding) : '',
    hasValidPosition ? position : '',
    hasValidGap ? `gap-[${layout_gap}]` : '',
  ]?.filter(Boolean)?.join(' ');

  // Build responsive text alignment classes
  const getTextAlignClass = (align) => {
    if (!hasValidTextAlign) return '';
    switch (align) {
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      case 'justify': return 'text-justify';
      default: return 'text-left';
    }
  };

  // Build base styles
  const baseStyles = [
    fill_background_color,
    border_border_radius,
    hasValidTextAlign ? getTextAlignClass(text_text_align) : '',
  ]?.filter(Boolean)?.join(' ');

  // Handle focus events
  const handleFocus = (event) => {
    setIsFocused(true);
    if (typeof onFocus === 'function') {
      onFocus(event);
    }
  };

  const handleBlur = (event) => {
    setIsFocused(false);
    if (typeof onBlur === 'function') {
      onBlur(event);
    }
  };

  // Handle change event
  const handleChange = (event) => {
    if (typeof onChange === 'function') {
      onChange(event);
    }
  };

  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      disabled={disabled}
      required={required}
      maxLength={maxLength}
      minLength={minLength}
      pattern={pattern}
      autoComplete={autoComplete}
      placeholder={hasValidPlaceholder ? placeholder : ''}
      style={{
        fontFamily: hasValidFontFamily ? text_font_family : 'inherit',
        lineHeight: hasValidLineHeight ? text_line_height : 'inherit',
      }}
      className={twMerge(
        inputClasses({ variant, size }),
        baseStyles,
        optionalClasses,
        isFocused ? 'ring-2' : '',
        className
      )}
      aria-invalid={variant === 'error'}
      {...props}
    />
  );
};

export default EditText; 