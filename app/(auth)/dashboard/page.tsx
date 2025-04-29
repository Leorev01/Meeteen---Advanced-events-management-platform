'use client';

import {useState, useEffect} from 'react';
import { supabase } from '@/lib/supabase';
import ActivityLineChart from '@/components/Dashboard/ActivityLineChart';
import ActivityPieChart from '@/components/Dashboard/ActivityPieChart';

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
  const [loading, setLoading] = useState(true);


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
      setLoading(false);
    };
  
    fetchActivity();
  }, [userId]); 

  if(loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;


  return (
    <div>
      <div className='w-[70%]'>  
        <ActivityLineChart activity={activity} />
      </div>
      <div className='w-[70%]'>
        <ActivityPieChart activity={activity} />
      </div>
    </div>
  );
};

export default Dashboard;