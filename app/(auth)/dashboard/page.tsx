'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import ActivityLineChart from '@/components/Dashboard/ActivityLineChart';
import ActivityPieChart from '@/components/Dashboard/ActivityPieChart';

type Activity = {
  id: number;
  user_id: string;
  action: string;
  metadata: string;
  created_at: string;
};

const Dashboard = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user ID
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    fetchUser();
  }, []);

  // Fetch user activity
  useEffect(() => {
    const fetchActivity = async () => {
      if (!userId) return;

      const { data, error } = await supabase
        .from('user_activities')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching activity:', error);
      } else {
        setActivity(data as Activity[]);
      }
      setLoading(false);
    };

    fetchActivity();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-gray-500 text-lg">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Dashboard Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Welcome to Your Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your activities and insights at a glance.</p>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Line Chart */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Activity Over Time</h2>
            <ActivityLineChart activity={activity} />
          </div>

          {/* Pie Chart */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Activity Breakdown</h2>
            <ActivityPieChart activity={activity} />
          </div>
        </div>

        {/* Recent Activities Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activities</h2>
          {activity.length > 0 ? (
            <ul className="space-y-4">
              {activity.slice(0, 5).map((act) => (
                <li
                  key={act.id}
                  className="flex justify-between items-center bg-white shadow-lg rounded-lg p-4"
                >
                  <span className="text-gray-700">{act.action.replace('_', ' ')}</span>
                  <span className="text-gray-500 text-sm">
                    {new Date(act.created_at).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No recent activities found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;