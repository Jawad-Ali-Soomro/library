/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
// FormProvider.jsx
import { createContext, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';

// Create the context
const FormContext = createContext();

// Custom hook to use the form context
export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children, validationSchema, defaultValues }) => {
    // Initialize react-hook-form with Yup validation schema
    const [formData, setFormData] = useState(defaultValues);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
        reset,
        watch,
        getValues,
        trigger,
        control
    } = useForm({
        ...(validationSchema ? { resolver: yupResolver(validationSchema) } : {}),
        ...(formData ? { defaultValues: formData } : {}),
        mode: 'onChange'
    });



    // Context value to provide to children
    const contextValue = {
        register,
        handleSubmit,
        setValue,
        errors,
        formData,
        reset,
        watch,
        control,
        trigger,
        getValues,
        isSubmitting
    };

    return <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>;
};

// PropTypes validation
FormProvider.propTypes = {
    children: PropTypes.any.isRequired, // Ensure isSidebarOpen is a boolean and required
    validationSchema: PropTypes.any.isRequired, // Ensure isSidebarOpen is a boolean and required
    defaultValues: PropTypes.any.isRequired, // Ensure isSidebarOpen is a boolean and required
};
