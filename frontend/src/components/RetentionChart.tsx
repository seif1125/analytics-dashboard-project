import { useMonthlyRetention } from '../hooks/useAnalyticsData';

const RetentionChart: React.FC = () => {
    const { data, isLoading, isError } = useMonthlyRetention();

    if (isLoading) return <div className="p-4 h-[450px] bg-white rounded shadow">Calculating retention cohorts...</div>;
    if (isError) return <div className="p-4 h-[450px] bg-red-100 text-red-700 rounded shadow">Error loading retention.</div>;
    if (!data) return null;

    return (
        <div className="mx-6 p-6 mt-16 bg-white rounded-lg shadow-xl h-[450px]">
            <h3 className="text-lg font-medium text-gray-900 text-start mb-4">M+1 User Retention by Cohort</h3>
            <table className="min-w-full divide-y !h-[300px] !min-h-[200px]! border rounded-lg divide-gray-200">
                <thead className="bg-indigo-500">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Cohort (Month)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Initial Users</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">M+1 Retention %</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item) => (
                        <tr key={item.cohort}>
                            <td className=" text-start px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.cohort}</td>
                            <td className="text-start px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.initialUsers.toLocaleString()}</td>
                            <td className="text-start px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">{item.retainedPercent}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RetentionChart;