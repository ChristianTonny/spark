import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spark-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 touch-target",
  {
    variants: {
      variant: {
        default: "bg-spark-blue text-white hover:bg-spark-blue-dark active:scale-[0.98] shadow-md hover:shadow-lg",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 active:scale-[0.98] shadow-md hover:shadow-lg",
        outline:
          "border-2 border-spark-blue bg-white text-spark-blue hover:bg-blue-50 active:scale-[0.98]",
        secondary:
          "bg-gray-100 text-gray-900 hover:bg-gray-200 active:scale-[0.98]",
        ghost: "hover:bg-gray-100 hover:text-gray-900",
        link: "text-spark-blue underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2 text-sm",
        lg: "h-14 px-8 py-4 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
