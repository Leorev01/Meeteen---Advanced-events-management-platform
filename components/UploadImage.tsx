// UploadImage.tsx
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';

const UploadImage = ({ userId, setAvatarUrl }: { userId: string, setAvatarUrl: (url: string) => void }) => {
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (!image || !userId) return;

    setUploading(true);

    const filePath = `profile_pictures/${userId}/${image.name}`;

    const { error } = await supabase.storage
      .from('profile_pictures')
      .upload(filePath, image, { upsert: true });

    if (error) {
      console.error('Upload error:', error.message);
      setUploading(false);
      return;
    }

    const publicUrl = supabase.storage.from('profile_pictures').getPublicUrl(filePath).data.publicUrl;

    // Update the user's avatar URL in the database
    await supabase
      .from('users')
      .update({ avatar_url: publicUrl })
      .eq('id', userId);

    setAvatarUrl(publicUrl);
    setUploading(false);
    alert('Profile image updated!');
  };

  return (
    <div className="upload-image">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />
      <button
        onClick={uploadImage}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload New Image'}
      </button>
    </div>
  );
};

export default UploadImage;
