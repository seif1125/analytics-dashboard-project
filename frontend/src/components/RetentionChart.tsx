import { useMonthlyRetention } from '../hooks/useAnalyticsData';

const RetentionChart: React.FC = () => {
    const { data, isLoading, isError } = useMonthlyRetention();

    if (isLoading) return <div className="p-4 bg-white rounded shadow">Calculating retention cohorts...</div>;
    if (isError) return <div className="p-4 bg-red-100 text-red-700 rounded shadow">Error loading retention.</div>;
    if (!data) return null;

    return (
        <div className="p-6 mt-16 bg-white rounded-lg shadow-xl h-[400px]">
            <h3 className="text-lg font-semibold mb-4">M+1 User Retention by Cohort</h3>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cohort (Month)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Initial Users</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">M+1 Retention %</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item, index) => (
                        <tr key={item.cohort}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.cohort}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.initialUsers.toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600 text-right">{item.retainedPercent}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RetentionChart;