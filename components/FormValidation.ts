interface FormField {
  id: string;
  fieldType: string;
  label: string;
  isRequired: boolean;
}

export const validateForm = (formFields: FormField[], formData: Record<string, any>) => {
  let isValid = true;
  const errors: string[] = [];

  formFields.forEach((field) => {
    const value = formData[field.id];
    if (field.isRequired && (!value || value.length === 0)) {
      isValid = false;
      errors.push(`${field.label} is required.`);
    }

    switch (field.fieldType) {
      case "email":
        if (value && !/^\S+@\S+\.\S+$/.test(value)) {
          isValid = false;
          errors.push(`${field.label} must be a valid email address.`);
        }
        break;
      case "phone":
        if (value && !/^\+?[\d\s-]{10,}$/.test(value)) {
          isValid = false;
          errors.push(`${field.label} must be a valid phone number.`);
        }
        break;
      case "date":
        if (value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
          isValid = false;
          errors.push(`${field.label} must be a valid date in YYYY-MM-DD format.`);
        }
        break;
      case "time":
        if (value && !/^([01]\d|2[0-3]):([0-5]\d)$/.test(value)) {
          isValid = false;
          errors.push(`${field.label} must be a valid time in HH:MM format.`);
        }
        break;
    }
  });

  return { isValid, errors };
};