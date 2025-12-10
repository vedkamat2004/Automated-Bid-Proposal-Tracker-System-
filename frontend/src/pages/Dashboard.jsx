import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertCircle, TrendingUp, FileText, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function Dashboard() {
  const [statistics, setStatistics] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsRes, oppsRes] = await Promise.all([
        axios.get(`${API}/statistics`),
        axios.get(`${API}/opportunities`)
      ]);
      setStatistics(statsRes.data);
      setOpportunities(oppsRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  const statusData = statistics?.status_counts ? Object.keys(statistics.status_counts).map(key => ({
    name: key,
    value: statistics.status_counts[key]
  })) : [];

  const urgentOpportunities = opportunities.filter(opp => {
    if (opp.status === 'Won' || opp.status === 'Lost' || opp.status === 'Submitted') return false;
    const deadline = new Date(opp.submission_deadline);
    const now = new Date();
    const hoursRemaining = (deadline - now) / (1000 * 60 * 60);
    return hoursRemaining <= 48 && hoursRemaining > 0;
  });

  return (
    <div data-testid="dashboard-page">
      <div className="page-header">
        <h1 className="page-title">Executive Dashboard</h1>
        <p className="page-subtitle">Real-time overview of all bid activities and performance metrics</p>
      </div>

      {/* Alert for urgent deadlines */}
      {urgentOpportunities.length > 0 && (
        <div className="alert-info mb-6" data-testid="urgent-alert">
          <div className="flex items-center">
            <AlertCircle className="mr-3" size={20} />
            <div>
              <strong className="font-semibold">{urgentOpportunities.length} Urgent Deadline{urgentOpportunities.length > 1 ? 's' : ''}</strong>
              <p className="text-sm mt-1">Opportunities requiring immediate attention (within 48 hours)</p>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="stat-card" data-testid="stat-total-opportunities">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Opportunities</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{statistics?.total_opportunities || 0}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <FileText className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="stat-card" data-testid="stat-win-rate">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Win Rate</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{statistics?.win_rate || 0}%</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="stat-card" data-testid="stat-avg-compliance">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Avg Compliance</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{statistics?.average_compliance || 0}%</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <CheckCircle className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        <div className="stat-card" data-testid="stat-urgent-deadlines">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Urgent Deadlines</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{statistics?.urgent_deadlines || 0}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <Clock className="text-red-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="chart-container" data-testid="status-chart">
          <h3 className="text-lg font-semibold mb-4">Opportunities by Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3b82f6" name="Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container" data-testid="distribution-chart">
          <h3 className="text-lg font-semibold mb-4">Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div> */}

      {/* Recent Activities */}
      <div className="chart-container" data-testid="recent-opportunities">
        <h3 className="text-lg font-semibold mb-4">Recent Opportunities</h3>
        <div className="space-y-3">
          {opportunities.slice(0, 5).map(opp => {
            const deadline = new Date(opp.submission_deadline);
            const now = new Date();
            const hoursRemaining = (deadline - now) / (1000 * 60 * 60);
            const isUrgent = hoursRemaining <= 24 && hoursRemaining > 0;
            const isWarning = hoursRemaining <= 48 && hoursRemaining > 24;

            return (
              <div key={opp.id} className="opportunity-card" data-testid={`opportunity-${opp.id}`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{opp.client}</h4>
                    <p className="text-sm text-gray-600 mt-1">{opp.project_type}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`badge badge-${opp.status.toLowerCase()}`}>{opp.status}</span>
                    <span className={`text-sm ${
                      isUrgent ? 'deadline-urgent' : 
                      isWarning ? 'deadline-warning' : 
                      'deadline-normal'
                    }`}>
                      {deadline.toLocaleDateString()}
                    </span>
                    <div className="w-20">
                      <div className="compliance-bar">
                        <div 
                          className={`compliance-fill ${
                            opp.compliance_percentage >= 80 ? 'compliance-high' :
                            opp.compliance_percentage >= 60 ? 'compliance-medium' :
                            'compliance-low'
                          }`}
                          style={{ width: `${opp.compliance_percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{opp.compliance_percentage}%</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}