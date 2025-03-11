import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with the actual API key
const supabaseUrl = '';
const supabaseKey = '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize storage bucket if needed
const initializeStorage = async () => {
  try {
    // Check if bucket exists
    const { data: buckets, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.error('Error checking buckets:', error);
      return;
    }
    
    const filesBucket = buckets.find(bucket => bucket.name === 'files');
    
    // Create bucket if it doesn't exist
    if (!filesBucket) {
      console.log('Storage bucket "files" not found. Should be created in Supabase dashboard.');
    }
  } catch (error) {
    console.error('Error initializing storage:', error);
  }
};

// Run the initialization
initializeStorage();

export default supabase;
