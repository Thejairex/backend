import { FormLabel } from "@chakra-ui/react";

export default function InputLabel({ value, className = '', children, ...props }) {
    /* return (
        <label {...props} className={`block font-medium text-sm text-gray-700 ` + className}>
            {value ? value : children}
        </label>
    ); */
    return (
        <FormLabel {...props} className={className}>
            {value ? value : children}
        </FormLabel>
    )
}
