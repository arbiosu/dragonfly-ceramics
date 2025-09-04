'use client';

import { useState, useRef, useCallback } from 'react';
import { Input } from '../ui/input';
import { createClient } from '@/lib/supabase/client';
import { generateSignedUploadUrl } from '@/lib/supabase/storage';
import { createGalleryImage } from '@/lib/supabase/model';

interface ImageFormData {
  image: File | null;
  folder: 'chain_vases' | 'raku_pieces' | 'stoneware' | 'miscellaneous';
  type: 'chain vases' | 'raku pieces' | 'stoneware' | 'miscellaneous';
  color: string;
  year: string;
}

interface FormStatus {
  isLoading: boolean;
  error: string | null;
  success: string | null;
}

const INITIAL_STATUS: FormStatus = {
  isLoading: false,
  error: null,
  success: null,
};

const INITIAL_FORM_DATA: ImageFormData = {
  image: null,
  folder: 'miscellaneous',
  type: 'miscellaneous',
  color: '',
  year: '',
};

export default function UploadImageForm() {
  const [formData, setFormData] = useState<ImageFormData>(INITIAL_FORM_DATA);
  const [status, setStatus] = useState<FormStatus>(INITIAL_STATUS);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      if (status.error || status.success) {
        setStatus(INITIAL_STATUS);
      }
    },
    [status.error, status.success]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const currentFile = e.target.files?.[0] || null;
      setFormData((prevData) => ({
        ...prevData,
        image: currentFile,
      }));
      if (status.error || status.success) {
        setStatus(INITIAL_STATUS);
      }
    },
    [status.error, status.success]
  );

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ isLoading: true, error: null, success: null });

    if (!formData.image) {
      setStatus({
        isLoading: false,
        error: 'No image selected. Please select an image.',
        success: null,
      });
      return;
    }
    if (!formData.type || !formData.color || !formData.year) {
      setStatus({
        isLoading: false,
        error: 'Type / Color / Year is empty! Please try again.',
        success: null,
      });
      return;
    }
    const filename = formData.image.name;

    try {
      const { data: signedUrl, error: signedUrlError } =
        await generateSignedUploadUrl(`${formData.folder}/${filename}`);
      if (signedUrlError) {
        setStatus({
          isLoading: false,
          error: signedUrlError,
          success: null,
        });
        return;
      }
      if (signedUrl) {
        setStatus({
          isLoading: true,
          error: null,
          success: `URL Generated. Uploading...`,
        });
        const supabase = createClient();
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('gallery')
          .uploadToSignedUrl(signedUrl.path, signedUrl.token, formData.image, {
            cacheControl: '31536000',
            metadata: {
              type: formData.type,
              color: formData.color,
              year: formData.year,
            },
          });
        if (uploadError) {
          setStatus({
            isLoading: false,
            error: `Upload failed: ${uploadError}`,
            success: null,
          });
          return;
        }
        if (uploadData) {
          const galleryImage = {
            name: filename,
            type: formData.type,
            color: formData.color,
            year: parseInt(formData.year),
            path: uploadData.fullPath,
          };
          const { error } = await createGalleryImage(galleryImage);
          if (error) {
            setStatus({
              isLoading: false,
              error: `Upload to database failed. Contact the dev.: ${error}`,
              success: null,
            });
          }
          setStatus({
            isLoading: false,
            error: null,
            success: `Image has been uploaded! PATH: ${uploadData.path}.`,
          });
          resetForm();
          return;
        }
      }
    } catch (error) {
      console.log(error);
      let errMsg = 'ERROR: ';
      if (error instanceof Error) {
        errMsg += error.message;
      }
      setStatus({ isLoading: false, error: errMsg, success: null });
    }
  };
  const isSubmitDisabled = status.isLoading;
  return (
    <div className='text-black'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor='image' className='text-xl'>
            Image*
          </label>
          <Input
            id='image'
            name='image'
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            ref={fileInputRef}
            disabled={status.isLoading}
            required
          />
          <p className='mt-1 text-sm text-gray-500'>
            2 MB file size limit - please wait until upload is complete - you
            will see a green success message.
          </p>
        </div>

        <div>
          <label className='text-xl'>Folder*</label>
          <div className='mt-2 space-y-2'>
            {['chain_vases', 'raku_pieces', 'stoneware', 'miscellaneous'].map(
              (f) => (
                <label key={f} className='flex items-center gap-2'>
                  <input
                    type='radio'
                    name='folder'
                    value={f}
                    checked={formData.folder === f}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        folder: e.target.value as ImageFormData['folder'],
                      }))
                    }
                    disabled={status.isLoading}
                  />
                  {f.replace('_', ' ')}
                </label>
              )
            )}
          </div>
        </div>
        <div>
          <label className='text-xl'>Type*</label>
          <div className='mt-2 space-y-2'>
            {['chain vases', 'raku pieces', 'stoneware', 'miscellaneous'].map(
              (f) => (
                <label key={f} className='flex items-center gap-2'>
                  <input
                    type='radio'
                    name='type'
                    value={f}
                    checked={formData.type === f}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        type: e.target.value as ImageFormData['type'],
                      }))
                    }
                    disabled={status.isLoading}
                  />
                  {f}
                </label>
              )
            )}
          </div>
        </div>

        <div>
          <label htmlFor='color' className='text-xl'>
            Color*
          </label>
          <Input
            id='color'
            name='color'
            type='text'
            value={formData.color}
            onChange={handleInputChange}
            placeholder='Color'
            disabled={status.isLoading}
            required
            className='mt-1'
          />
        </div>
        <div>
          <label htmlFor='year' className='text-xl'>
            Year*
          </label>
          <Input
            id='year'
            name='year'
            type='text'
            value={formData.year}
            onChange={handleInputChange}
            placeholder='Year'
            disabled={status.isLoading}
            required
            className='mt-1'
          />
        </div>
        <div className='mt-4 min-h-[20px]'>
          {' '}
          {status.error && <p className='text-red-600'>{status.error}</p>}
          {status.success && <p className='text-green-600'>{status.success}</p>}
        </div>
        <button
          type='submit'
          disabled={isSubmitDisabled}
          className='rounded bg-dfNew2 p-4 text-xl transition duration-300 hover:scale-105'
        >
          {status.isLoading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>
    </div>
  );
}
