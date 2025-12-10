import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Calendar, User, DollarSign, FileText, CheckCircle, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function OpportunityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [opportunity, setOpportunity] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const [oppRes, actRes] = await Promise.all([
        axios.get(`${API}/opportunities/${id}`),
        axios.get(`${API}/activities/${id}`)
      ]);
      setOpportunity(oppRes.data);
      setActivities(actRes.data);
    } catch (error) {
      console.error('Error loading opportunity:', error);
      toast.error('Failed to load opportunity details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!opportunity) {
    return <div className="flex items-center justify-center h-screen">Opportunity not found</div>;
  }

  return (
    <div data-testid="opportunity-detail-page">
      <Button variant="ghost" onClick={() => navigate('/tracker')} className="mb-4" data-testid="back-btn">
        <ArrowLeft className="mr-2" size={20} />
        Back to Tracker
      </Button>

      <div className="page-header mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">{opportunity.client}</h1>
            <p className="page-subtitle">{opportunity.project_type}</p>
          </div>
          <div className="flex gap-2">
            <span className={`badge badge-${opportunity.status.toLowerCase()}`}>{opportunity.status}</span>
            <span className={`badge badge-${opportunity.priority_level.toLowerCase()}`}>{opportunity.priority_level} Priority</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card data-testid="card-deadline">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submission Deadline</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Date(opportunity.submission_deadline).toLocaleDateString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(opportunity.submission_deadline).toLocaleTimeString()}
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-compliance">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Status</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{opportunity.compliance_percentage}%</div>
            <div className="mt-2 compliance-bar">
              <div 
                className={`compliance-fill ${
                  opportunity.compliance_percentage >= 80 ? 'compliance-high' :
                  opportunity.compliance_percentage >= 60 ? 'compliance-medium' :
                  'compliance-low'
                }`}
                style={{ width: `${opportunity.compliance_percentage}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-owner">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proposal Owner</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{opportunity.proposal_owner}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {opportunity.submission_format} Submission
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList data-testid="tabs-list">
          <TabsTrigger value="details" data-testid="tab-details">Details</TabsTrigger>
          <TabsTrigger value="activity" data-testid="tab-activity">Activity Log</TabsTrigger>
        </TabsList>

        <TabsContent value="details" data-testid="tab-content-details">
          <Card>
            <CardHeader>
              <CardTitle>Opportunity Details</CardTitle>
              <CardDescription>Complete information about this opportunity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">RFP Release Date</p>
                  <p className="text-lg font-semibold">{opportunity.rfp_release_date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Industry</p>
                  <p className="text-lg font-semibold">{opportunity.industry || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Budget</p>
                  <p className="text-lg font-semibold">{opportunity.budget || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Submission Format</p>
                  <p className="text-lg font-semibold">{opportunity.submission_format}</p>
                </div>
              </div>
              {opportunity.portal_link && (
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Portal Link</p>
                  <a 
                    href={opportunity.portal_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                    data-testid="portal-link"
                  >
                    {opportunity.portal_link}
                  </a>
                </div>
              )}
              {opportunity.risk_flags && opportunity.risk_flags.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Risk Flags</p>
                  <div className="flex flex-wrap gap-2">
                    {opportunity.risk_flags.map((flag, idx) => (
                      <span key={idx} className="badge badge-high">{flag}</span>
                    ))}
                  </div>
                </div>
              )}
              <div className="pt-4 border-t">
                <div className="flex gap-4">
                  <Button 
                    onClick={() => navigate(`/compliance/${id}`)}
                    data-testid="compliance-checker-btn"
                  >
                    <CheckCircle className="mr-2" size={16} />
                    Compliance Checker
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate(`/documents/${id}`)}
                    data-testid="document-manager-btn"
                  >
                    <FileText className="mr-2" size={16} />
                    Document Manager
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" data-testid="tab-content-activity">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Recent activities and changes to this opportunity</CardDescription>
            </CardHeader>
            <CardContent>
              {activities.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No activity recorded yet</p>
              ) : (
                <div className="space-y-4">
                  {activities.map(activity => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg" data-testid={`activity-${activity.id}`}>
                      <div className="flex-1">
                        <p className="font-semibold">{activity.activity_type}</p>
                        <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-2">by {activity.user} • {new Date(activity.created_at).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}