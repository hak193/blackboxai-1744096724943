import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const stats = [
    { name: 'Total CPNs Generated', value: '1,234', change: '+12%', changeType: 'increase' },
    { name: 'Success Rate', value: '98.5%', change: '+2.3%', changeType: 'increase' },
    { name: 'Active Users', value: '456', change: '+5%', changeType: 'increase' },
    { name: 'Average Response Time', value: '120ms', change: '-15ms', changeType: 'decrease' },
  ];

  const recentActivity = [
    { id: 1, type: 'CPN Generated', user: 'John Doe', timestamp: '2 hours ago', status: 'success' },
    { id: 2, type: 'Market Analysis', user: 'Jane Smith', timestamp: '3 hours ago', status: 'pending' },
    { id: 3, type: 'CPN Validation', user: 'Mike Johnson', timestamp: '5 hours ago', status: 'success' },
    { id: 4, type: 'API Integration', user: 'Sarah Wilson', timestamp: '1 day ago', status: 'failed' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back, {user?.name || 'User'}!
        </h1>
        <p className="mt-1 text-gray-500">
          Here's what's happening with your CPN system today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
                <i
                  className={`ml-1 fas fa-${
                    stat.changeType === 'increase' ? 'arrow-up' : 'arrow-down'
                  }`}
                ></i>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          <div className="mt-6 flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              {recentActivity.map((activity) => (
                <li key={activity.id} className="py-5">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <span
                        className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${
                          activity.status === 'success'
                            ? 'bg-green-100'
                            : activity.status === 'pending'
                            ? 'bg-yellow-100'
                            : 'bg-red-100'
                        }`}
                      >
                        <i
                          className={`fas fa-${
                            activity.status === 'success'
                              ? 'check'
                              : activity.status === 'pending'
                              ? 'clock'
                              : 'times'
                          } text-${
                            activity.status === 'success'
                              ? 'green'
                              : activity.status === 'pending'
                              ? 'yellow'
                              : 'red'
                          }-600`}
                        ></i>
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.type}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {activity.user}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <p className="text-sm text-gray-500">{activity.timestamp}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <button className="text-sm font-medium text-primary-600 hover:text-primary-500">
              View all activity <i className="fas fa-arrow-right ml-1"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
