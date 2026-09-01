import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "danger";
  size?: "default" | "sm" | "lg" | "icon";
  fullWidth?: boolean;
  isLoading?: boolean;
  children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      fullWidth,
      isLoading,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const variants = {
      default:
        "bg-green-success text-white hover:bg-green-success/90 focus-visible:ring-green-success",
      secondary:
        "bg-form-bg text-white border border-border-light hover:bg-form-bg/80",
      outline: "border border-border-medium text-white hover:bg-form-bg/50",
      ghost: "text-white-secondary hover:text-white hover:bg-form-bg/50",
      danger: "bg-error-red text-white hover:bg-error-red/90",
    };

    const sizes = {
      default: "h-12 px-6 py-3 text-black font-semibold rounded-lg",
      sm: "h-9 px-4 py-2 text-xs",
      lg: "h-14 px-8 py-4 text-base",
      icon: "h-10 w-10",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center cursor-pointer justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0",
          "disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className,
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </div>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
