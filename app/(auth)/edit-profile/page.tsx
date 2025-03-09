'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';

const EditProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null); // To handle file input for avatar upload

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data?.session) {
        setUser(data.session.user);

        // Fetch the user's profile data, including avatar URL
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('name, avatar') // Fetch the user's name and avatar
          .eq('id', data.session.user.id)
          .single(); // Ensure it returns only one row

        if (profile) {
          setName(profile.name); // Set the name, fallback to empty string if null
          setAvatarUrl(profile.avatar || null); // Handle when no avatar is set
        }

        if (profileError) {
          console.error('Error fetching profile:', profileError.message);
        }
      } else {
        console.log('No active session');
      }

      setLoading(false);
    };

    getSession();
  }, []);

  // Handle file input for uploading image
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Upload the image to Supabase and return the public URL
  const uploadImage = async (file: File) => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error('Error getting user:', userError);
      return null;
    }
    const user = userData?.user;
    const { data, error } = await supabase
      .storage
      .from('avatars') // Assuming 'avatars' is the storage bucket
      .upload(`public/${user?.id}/${file.name}`, file);

    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }

    // Get the public URL of the uploaded image
    const imageUrl = supabase
      .storage
      .from('avatars')
      .getPublicUrl(data?.path || '')
      .data.publicUrl;

    return imageUrl; // Return the URL
  };

  // Update the avatar URL in the database
  const updateAvatar = async (avatarUrl: string) => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error('Error getting user:', userError);
      return;
    }
    const user = userData?.user;

    const { error } = await supabase
      .from('users')
      .update({ avatar: avatarUrl }) // Store the URL in the database
      .eq('id', user?.id);

    if (error) {
      console.error('Error updating avatar:', error);
    } else {
      console.log('Avatar updated successfully!');
    }
  };

  // Handle avatar upload and saving the URL
  const handleUploadAvatar = async () => {
    if (file) {
      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        setAvatarUrl(imageUrl); // Update the UI with the new avatar
        await updateAvatar(imageUrl); // Save the avatar URL in the database
      }
    }
  };

  // Handle the name update
  const handleNameChange = async () => {
    if (!name || !user) return;

    // Update the name in the user's profile
    const { error } = await supabase
      .from('users')
      .update({ name })
      .eq('id', user.id);

    if (error) {
      console.error('Error updating name:', error.message);
    } else {
      alert('Profile updated!');
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold text-center mb-6">Edit Profile</h1>

      {/* Avatar Section */}
      <div className="mb-6 text-center">
        <h2 className="text-xl font-medium mb-4">Profile Image</h2>
        <div className="relative inline-block rounded-full overflow-hidden w-36 h-36 bg-gray-200">
          {avatarUrl ? (
            <Image src={avatarUrl} alt="Profile" layout="fill" objectFit="cover" />
          ) : (
            <Image src='/images/default-avatar.png' alt="Profile" layout="fill" objectFit="cover" />
          )}
        </div>

        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="mt-4 block mx-auto border border-gray-300 rounded-md p-2"
        />
        <button
          onClick={handleUploadAvatar}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Upload Avatar
        </button>
      </div>

      {/* Name Section */}
      <div className="mb-6">
        <h2 className="text-xl font-medium mb-4">Update Name</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
          placeholder="Enter your name"
        />
        <button
          onClick={handleNameChange}
          className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Update Name
        </button>
      </div>
    </div>
  );
};

export default EditProfilePage;
