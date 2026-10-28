'use client';

import Link from 'next/link';
import { useProductForm } from '@/hooks/useProductsForm';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

import type { Tables } from '@/lib/supabase/database/types';

interface ProductFormProps {
  mode?: 'create' | 'edit';
  editData?: {
    product: Tables<'products'>;
  };
}

export function ProductForm(props: ProductFormProps) {
  const { mode = 'create', editData } = props;

  const {
    formData,
    currentStep,
    status,
    fieldErrors,
    canProceed,
    updateField,
    generateSlug,
    goNext,
    goBack,
    submit,
    resetForm,
    getStepLabel,
    validateStep,
    maxSteps,
    isLoading,
    isError,
    isSuccess,
  } = useProductForm({ mode, editData });

  return (
    <section id='form'>
      <div className='flex max-w-3xl flex-col pb-5'>
        <h6 className='font-bold'>
          {mode === 'create' ? 'Create' : 'Edit'} Product
        </h6>
        <p>Fields marked with * are required.</p>
        <p>
          This is a multi-step form. If you need help, refer to the{' '}
          <Link href='#' className='text-blue-600 underline'>
            guide
          </Link>{' '}
          or contact an Admin.
        </p>
      </div>

      <div className='pb-5'>
        <div className='mb-2 flex items-center justify-between'>
          <span className='text-sm font-medium'>
            Step {currentStep} of {maxSteps}
          </span>
          <span className='text-sm text-gray-500'>
            {getStepLabel(currentStep)}
          </span>
        </div>
        <div className='h-2 rounded-full bg-gray-200'>
          <div
            className='h-full rounded-full bg-blue-600 transition-all duration-300'
            style={{ width: `${(currentStep / maxSteps) * 100}%` }}
          />
        </div>
      </div>

      <div className='max-w-7xl'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (currentStep === maxSteps) {
              submit();
            }
          }}
          className='space-y-4'
        >
          {currentStep >= 1 && (
            <>
              <div>
                <Label htmlFor='name'>Name*</Label>
                <Input
                  id='name'
                  type='text'
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  onBlur={generateSlug}
                  disabled={isLoading}
                  required
                  placeholder='Raku Vase'
                />
              </div>
              <div>
                <Label htmlFor='type'>Product Type*</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => updateField('type', value as any)}
                  disabled={isLoading}
                >
                  <SelectTrigger id='type'>
                    <SelectValue placeholder='Select product type...' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='mugs'>Mug</SelectItem>
                    <SelectItem value='vases'>Vase</SelectItem>
                    <SelectItem value='dispensers'>Dispenser</SelectItem>
                    <SelectItem value='spoonrests'>Spoon Rest</SelectItem>
                    <SelectItem value='bowls'>Bowl</SelectItem>
                    <SelectItem value='seconds'>Seconds</SelectItem>
                    <SelectItem value='other'>Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor='slug'>
                  Slug*
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={generateSlug}
                    className='ml-2'
                  >
                    <Sparkles className='h-4 w-4' />
                    Generate from product name
                  </Button>
                </Label>
                <Input
                  id='slug'
                  type='text'
                  value={formData.slug}
                  onChange={(e) => updateField('slug', e.target.value)}
                  disabled={isLoading}
                  required
                  placeholder='e.g., raku-vase-blue'
                />
              </div>
              <div>
                <Label htmlFor='description'>Description</Label>
                <Input
                  id='description'
                  type='text'
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  disabled={isLoading}
                  required
                  placeholder='Optional description'
                />
              </div>
              <div>
                <Label htmlFor='color'>Color</Label>
                <Input
                  id='color'
                  type='text'
                  value={formData.color}
                  onChange={(e) => updateField('color', e.target.value)}
                  disabled={isLoading}
                  required
                  placeholder='Blue'
                />
              </div>
              <div>
                <Label htmlFor='capacity'>Capacity</Label>
                <Input
                  id='capacity'
                  type='text'
                  value={formData.capacity}
                  onChange={(e) => updateField('capacity', e.target.value)}
                  disabled={isLoading}
                  required
                  placeholder='12oz'
                />
              </div>
            </>
          )}
          {currentStep >= 2 && (
            <>
              <div>
                <Label htmlFor='weight'>Weight*</Label>
                <Input
                  id='weight'
                  type='number'
                  value={formData.weight}
                  onChange={(e) => updateField('weight', e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <div>
                <Label htmlFor='width'>Width*</Label>
                <Input
                  id='width'
                  type='number'
                  value={formData.width}
                  onChange={(e) => updateField('width', e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <div>
                <Label htmlFor='length'>Length*</Label>
                <Input
                  id='length'
                  type='number'
                  value={formData.length}
                  onChange={(e) => updateField('length', e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <div>
                <Label htmlFor='height'>Height*</Label>
                <Input
                  id='height'
                  type='number'
                  value={formData.height}
                  onChange={(e) => updateField('height', e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
            </>
          )}
          {currentStep >= 3 && (
            <>
              <div>
                <Label htmlFor='price'>Price*</Label>
                <Input
                  id='price'
                  type='number'
                  value={formData.price}
                  onChange={(e) => updateField('price', e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <div>
                <Label htmlFor='inventory'>Inventory*</Label>
                <Input
                  id='inventory'
                  type='number'
                  value={formData.inventory}
                  onChange={(e) => updateField('inventory', e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <div>
                <Label htmlFor='set'>Set*</Label>
                <Input
                  id='set'
                  type='number'
                  value={formData.set}
                  onChange={(e) => updateField('set', e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
            </>
          )}
          <div className='min-h-5 space-y-2'>
            {isError && status.type === 'error' && (
              <div className='rounded-md bg-red-50 p-4' role='alert'>
                <p className='font-medium text-red-800'>{status.message}</p>
                {status.errors && status.errors.length > 0 && (
                  <ul className='mt-2 list-inside list-disc text-sm text-red-700'>
                    {status.errors.map((error, i) => (
                      <li key={i}>{error}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            {isSuccess && status.type === 'success' && (
              <div className='rounded-md bg-green-50 p-4' role='alert'>
                <p className='font-medium text-green-800'>{status.message}</p>
              </div>
            )}
          </div>
          {currentStep === maxSteps && (
            <Button
              type='submit'
              variant='default'
              size='lg'
              disabled={isLoading || !canProceed}
              className='bg-blue-800 text-white'
            >
              {isLoading
                ? 'Processing...'
                : mode === 'create'
                  ? 'Create Content'
                  : 'Save Changes'}
            </Button>
          )}
        </form>
        <div className='flex justify-between gap-8 pt-8'>
          <Button
            type='button'
            variant='outline'
            size='lg'
            disabled={currentStep === 1 || isLoading}
            onClick={goBack}
          >
            <ArrowLeft />
            Back
          </Button>
          {currentStep < maxSteps && (
            <Button
              type='button'
              size='lg'
              disabled={isLoading || !canProceed}
              onClick={goNext}
              className='bg-violet-800 text-white'
            >
              Next
              <ArrowRight />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
