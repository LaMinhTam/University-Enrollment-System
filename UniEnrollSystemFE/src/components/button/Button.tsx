/* eslint-disable react-refresh/only-export-components */
import { withErrorBoundary } from "react-error-boundary";
import { Link } from "react-router-dom";
import { ErrorComponent } from "../common";

interface ButtonProps {
    type?: "button" | "submit" | "reset";
    children: React.ReactNode;
    className?: string;
    isLoading?: boolean;
    href?: string;
    kind?: "primary" | "secondary" | "ghost";
}

const Button = ({
    type = "button",
    children,
    className = "",
    isLoading = false,
    href = "",
    kind = "primary",
    ...rest
}: ButtonProps) => {
    const child = isLoading ? (
        <div className="w-10 h-10 border-4 border-white rounded-full border-t-transparent border-b-transparent animate-spin"></div>
    ) : (
        children
    );
    let defaultClassName =
        "min-h-[56px] flex items-center justify-center p-4 text-base font-semibold rounded-xl";
    switch (kind) {
        case "primary":
            defaultClassName = defaultClassName + " bg-primary text-white";
            break;
        case "secondary":
            defaultClassName = defaultClassName + " bg-secondary text-white";
            break;
        case "ghost":
            defaultClassName =
                defaultClassName + " text-secondary bg-secondary bg-opacity-10";
            break;

        default:
            break;
    }
    if (href) {
        return (
            <Link to={href} className={`${defaultClassName} ${className}`}>
                {child}
            </Link>
        );
    }
    return (
        <button
            className={`${defaultClassName} ${
                isLoading ? "opacity-50 pointer-events-none" : ""
            } ${className}`}
            type={type}
            {...rest}
        >
            {child}
        </button>
    );
};

export default withErrorBoundary(Button, { FallbackComponent: ErrorComponent });
