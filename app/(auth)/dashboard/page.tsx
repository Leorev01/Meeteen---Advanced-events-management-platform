'use client';

import {useState, useEffect} from 'react';
import { supabase } from '@/lib/supabase';
import ActivityChart from '@/components/Dashboard/ActivityChart';

type Activity = {
  id: number;
  user_id: string;
  action: string;
  metadata: string;
  created_at: string;
}

const Dashboard = () => {

  const [userId, setUserId] = useState<string | null>(null);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    fetchUser();
  }, []);
  
  useEffect(() => {
    const fetchActivity = async () => {
      if (!userId) return; // Ensure userId is available before fetching activity
  
      const { data, error } = await supabase
        .from('user_activities')
        .select('*')
        .eq('user_id', userId);
  
      if (error) {
        console.error('Error fetching activity:', error);
      } else {
        setActivity(data as Activity[]);
      }
    };
  
    fetchActivity();
  }, [userId]); 



  return (
    <div className='w-[50%]'>
      <ActivityChart activity={activity} />
    </div>
  );
};

export default Dashboard;