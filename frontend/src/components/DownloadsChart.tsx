import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDailyDownloads } from '../hooks/useAnalyticsData';

const DownloadsChart: React.FC = () => {
  const { data, isLoading, isError, error } = useDailyDownloads();
  console.log(data);
  if (isLoading) {
    return <div className="p-4 bg-white rounded shadow">Loading daily downloads...</div>;
  }

  if (isError) {
    // Display a user-friendly error
    return <div className="p-4 bg-red-100 text-red-700 rounded shadow">Error: {error.message}</div>;
  }

  // Ensure data is available before rendering
  if (!data) {
    return <div className="p-4 bg-yellow-100 text-yellow-700 rounded shadow">No data available.</div>;
  }

  return (
    <div className="p-6 mt-5 bg-white rounded-lg shadow-xl  min-h-[450px]">
      <h3 className="text-lg text-gray-900 font-medium text-start mb-4">Daily Application Downloads</h3>
      <ResponsiveContainer className="!h-[400px] !min-h-[200px]! border rounded-lg" >
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* DataKey must match the property name in the DownloadsDataPoint interface */}
          <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} name="Downloads" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DownloadsChart;