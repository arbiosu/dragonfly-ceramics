import { useState, useCallback, useMemo } from 'react';
import { createProductAction, updateProductAction } from '@/actions/products';
import { isValidationActionError } from '@/lib/common/action-types';
import { Tables, Enums } from '@/lib/supabase/database/types';

export type FormStatus =
  | { type: 'idle' }
  | { type: 'validating' }
  | { type: 'submitting' }
  | { type: 'success'; message: string }
  | { type: 'error'; message: string; errors?: string[] };

export type FormMode = 'create' | 'edit';

export interface FieldErrors {
  [key: string]: string | undefined;
}

export interface ProductFormData {
  name: string;
  type: Enums<'filter_type'>;
  description?: string;
  color?: string;
  care?: string;
  capacity?: string;
  slug: string;

  active: boolean;
  is_preview: boolean;

  weight: string;
  width: string;
  length: string;
  height: string;
  set: string;

  price: string;
  discount?: string;
  inventory: string;

  stripeId?: string;
  stripePriceId?: string;
}

interface EditData {
  product: Tables<'products'>;
}

interface UseProductFormOptions {
  mode: FormMode;
  editData?: EditData;
}

const INITIAL_FORM_DATA: ProductFormData = {
  name: '',
  type: 'other',
  description: '',
  color: '',
  care: '',
  capacity: '',
  slug: '',

  active: true,
  is_preview: false,

  weight: '',
  width: '',
  length: '',
  height: '',
  set: '',

  price: '',
  discount: '',
  inventory: '',
};

const MAX_STEPS = 5;

export function useProductForm(options: UseProductFormOptions) {
  const { mode, editData } = options;

  const [formData, setFormData] = useState<ProductFormData>(() => {
    if (mode === 'edit' && editData) {
      return {
        name: editData.product.name,
        slug: editData.product.slug,
        type: editData.product.type,
        description: editData.product.description ?? undefined,
        color: editData.product.color ?? undefined,
        care: editData.product.care ?? undefined,
        capacity: editData.product.capacity ?? undefined,
        active: editData.product.active,
        is_preview: editData.product.is_preview,
        weight: editData.product.weight.toString(),
        width: editData.product.width.toString(),
        length: editData.product.length.toString(),
        height: editData.product.height.toString(),
        set: editData.product.set.toString(),
        price: editData.product.price.toString(),
        discount: editData.product.discount?.toString() ?? undefined,
        inventory: editData.product.inventory.toString(),
      };
    }
    return INITIAL_FORM_DATA;
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const updateField = useCallback(
    <K extends keyof ProductFormData>(field: K, value: ProductFormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear field error when user starts typing
      if (fieldErrors[field]) {
        setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
      }

      // Clear general errors
      if (status.type === 'error') {
        setStatus({ type: 'idle' });
      }
    },
    [fieldErrors, status.type]
  );

  const generateSlug = useCallback(() => {
    const slug = formData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    updateField('slug', slug);
  }, [formData.name, updateField]);

  const validateStep = useCallback(
    (step: number): { isValid: boolean; errors: string[] } => {
      const errors: string[] = [];

      switch (step) {
        case 1:
          if (!formData.name.trim()) errors.push('Name is required');
          if (!formData.slug.trim()) errors.push('Slug is required');
          if (!formData.type.trim()) errors.push('Type is required');
          break;

        case 2:
          if (formData.weight === '0') errors.push('Invalid weight');
          if (formData.height === '0') errors.push('Invalid height');
          if (formData.width === '0') errors.push('Invalid width');
          if (formData.length === '0') errors.push('Invalid length');
          break;

        case 3:
          if (formData.price === '0') errors.push('Invalid price');
          if (formData.set === '0') errors.push('Invalid set');
          if (formData.inventory === '') errors.push('Invalid inventory');
          break;

        case 4: // images
          break;

        case 5:
          const step1 = validateStep(1);
          const step2 = validateStep(2);
          const step3 = validateStep(3);
          const step4 = validateStep(4);
          errors.push(
            ...step1.errors,
            ...step2.errors,
            ...step3.errors,
            ...step4.errors
          );
          break;
      }
      return { isValid: errors.length === 0, errors };
    },
    [formData]
  );

  const canProceed = useMemo(() => {
    const validation = validateStep(currentStep);
    return validation.isValid;
  }, [currentStep, validateStep]);

  const goNext = useCallback(() => {
    const validation = validateStep(currentStep);

    if (!validation.isValid) {
      setStatus({
        type: 'error',
        message: 'Please fix the errors before proceeding',
        errors: validation.errors,
      });
      return;
    }

    if (currentStep < MAX_STEPS) {
      setCurrentStep((prev) => prev + 1);
      setStatus({ type: 'idle' });
    }
  }, [currentStep, validateStep]);

  const goBack = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setStatus({ type: 'idle' });
    }
  }, [currentStep]);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setCurrentStep(1);
    setStatus({ type: 'idle' });
    setFieldErrors({});
  }, []);

  const getStepLabel = useCallback((step: number): string => {
    const labels = {
      1: 'Basic Information',
      2: 'Product Dimensions',
      3: 'Pricing & Inventory',
      4: 'Images',
      5: 'Review & Submit',
    };
    return labels[step as keyof typeof labels] || '';
  }, []);

  const submit = useCallback(async () => {
    const validation = validateStep(5);
    if (!validation.isValid) {
      setStatus({
        type: 'error',
        message: 'Please fix all validation errors',
        errors: validation.errors,
      });
      return;
    }
    setStatus({ type: 'submitting' });

    try {
      if (mode === 'create') {
        const result = await createProductAction({
          product: {
            ...formData,
            width: parseInt(formData.width),
            weight: parseInt(formData.weight),
            height: parseInt(formData.height),
            length: parseInt(formData.length),
            price: parseInt(formData.price),
            discount: formData.discount
              ? parseInt(formData.discount)
              : undefined,
            inventory: parseInt(formData.inventory),
            set: parseInt(formData.set),
          },
        });

        if (!result.success) {
          if (isValidationActionError(result.error)) {
            setStatus({
              type: 'error',
              message: 'Validation failed - please fix the following errors: ',
              errors: result.error.errors,
            });
          } else {
            setStatus({
              type: 'error',
              message: result.error.message || 'Failed to create product',
            });
          }
        }

        setStatus({
          type: 'success',
          message: 'Product created successfully!',
        });

        setTimeout(() => {
          resetForm();
        }, 1500);

        return;
      } else {
        if (!editData?.product.id) {
          setStatus({ type: 'error', message: 'No content ID for editing' });
          return;
        }

        const result = await updateProductAction({
          id: editData.product.id,
          ...formData,
          width: parseInt(formData.width),
          weight: parseInt(formData.weight),
          height: parseInt(formData.height),
          length: parseInt(formData.length),
          price: parseInt(formData.price),
          discount: formData.discount ? parseInt(formData.discount) : undefined,
          inventory: parseInt(formData.inventory),
          set: parseInt(formData.set),
        });

        if (!result.success) {
          if (isValidationActionError(result.error)) {
            setStatus({
              type: 'error',
              message: 'Validation failed - please fix the following errors: ',
              errors: result.error.errors,
            });
          } else {
            setStatus({
              type: 'error',
              message: result.error.message || 'Failed to update product',
            });
          }
          return;
        }

        setStatus({
          type: 'success',
          message: 'Product updated successfully!',
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      });
    }
  }, [formData, mode, editData, validateStep, isValidationActionError]);

  return {
    // State
    formData,
    currentStep,
    status,
    fieldErrors,
    canProceed,

    // Actions
    updateField,
    generateSlug,
    goNext,
    goBack,
    submit,
    resetForm,

    // Utilities
    getStepLabel,
    validateStep,

    // Constants
    maxSteps: MAX_STEPS,
    isLoading: status.type === 'submitting' || status.type === 'validating',
    isSuccess: status.type === 'success',
    isError: status.type === 'error',
  };
}
