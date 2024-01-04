import { Button } from "@chakra-ui/react";

export default function SecondaryButton({ type = 'button', variant = 'outline', className = '', disabled, children, ...props }) {
    /* return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    ); */
    
    return (
        <Button
            {...props}
            type={type}
            variant={variant}
            className={className}
            disabled={disabled}
            colorScheme="gray"
            textTransform='uppercase'
            fontSize='small'
        >
            {children}
        </Button>
    )
}
