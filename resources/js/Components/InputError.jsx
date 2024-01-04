import { FormErrorMessage } from "@chakra-ui/react";

export default function InputError({ message, className = '', ...props }) {
    /* return message ? (
        <p {...props} className={'text-sm text-red-600 ' + className}>
            {message}
        </p>
    ) : null; */
    return message ? (
        <FormErrorMessage {...props} className={className}>
            {message}
        </FormErrorMessage>
    ) : null;
}
