import React from 'react';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const buttonStyles = cva(
    'inline-flex items-center justify-center font-nunito font-bold transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
    {
        variants: {
            variant: {
                filled: '',
                outline: 'bg-transparent border-2',
            },
            color: {
                green: '',
                orange: '',
            },
            size: {
                sm: 'px-4 py-2 text-sm rounded-md',
                md: 'px-6 py-2.5 text-base rounded-[14px]',
                lg: 'px-8 py-3 text-lg rounded-xl',
                icon: 'p-2 rounded-full',
            },
        },
        compoundVariants: [
            // FILLED
            {
                variant: 'filled',
                color: 'orange',
                className: 'bg-orange text-white hover:opacity-90',
            },
            {
                variant: 'filled',
                color: 'green',
                className: 'bg-green text-white hover:opacity-90',
            },

            // OUTLINE
            {
                variant: 'outline',
                color: 'orange',
                className:
                    'border-orange text-orange hover:bg-orange hover:text-white',
            },
            {
                variant: 'outline',
                color: 'green',
                className:
                    'border-green text-green hover:bg-green hover:text-white',
            },
        ],
        defaultVariants: {
            variant: 'filled',
            color: 'orange',
            size: 'md',
        },
    }
);

const Button1 = ({
    children,
    className,
    variant,
    color,
    size,
    disabled,
    ...props
}) => {
    return (
        <button
            disabled={disabled}
            className={twMerge(
                buttonStyles({ variant, color, size }),
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button1;
