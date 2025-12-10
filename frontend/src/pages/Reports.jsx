import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Download, FileText, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Reports() {
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
      toast.error('Failed to load report data');
    } finally {
      setLoading(false);
    }
  };

  const generatePDFReport = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('ABPTS Weekly Report', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 105, 30, { align: 'center' });
    
    // Executive Summary
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Executive Summary', 20, 45);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    let yPos = 55;
    
    doc.text(`Total Opportunities: ${statistics?.total_opportunities || 0}`, 20, yPos);
    yPos += 8;
    doc.text(`Win Rate: ${statistics?.win_rate || 0}%`, 20, yPos);
    yPos += 8;
    doc.text(`Average Compliance: ${statistics?.average_compliance || 0}%`, 20, yPos);
    yPos += 8;
    doc.text(`Urgent Deadlines: ${statistics?.urgent_deadlines || 0}`, 20, yPos);
    yPos += 15;
    
    // Status Breakdown
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Opportunities by Status', 20, yPos);
    yPos += 10;
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    if (statistics?.status_counts) {
      Object.keys(statistics.status_counts).forEach(status => {
        doc.text(`${status}: ${statistics.status_counts[status]}`, 25, yPos);
        yPos += 8;
      });
    }
    yPos += 10;
    
    // Active Opportunities
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Active Opportunities', 20, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const activeOpps = opportunities.filter(opp => 
      !['Won', 'Lost'].includes(opp.status)
    ).slice(0, 10);
    
    activeOpps.forEach(opp => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(`• ${opp.client} - ${opp.project_type}`, 25, yPos);
      yPos += 6;
      doc.text(`  Status: ${opp.status} | Deadline: ${new Date(opp.submission_deadline).toLocaleDateString()}`, 27, yPos);
      yPos += 8;
    });
    
    // Recommendations
    yPos += 10;
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Recommendations', 20, yPos);
    yPos += 10;
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const recommendations = [
      'Focus on opportunities with urgent deadlines to ensure timely submissions',
      'Review non-compliant items to improve overall compliance rate',
      'Allocate resources to high-priority opportunities in drafting stage',
      'Monitor portal access for timely RFP updates'
    ];
    
    recommendations.forEach(rec => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      const lines = doc.splitTextToSize(`• ${rec}`, 170);
      doc.text(lines, 25, yPos);
      yPos += (lines.length * 6) + 4;
    });
    
    doc.save(`ABPTS_Report_${new Date().toISOString().split('T')[0]}.pdf`);
    toast.success('Report downloaded successfully');
  };

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    
    // Opportunities sheet
    const oppData = opportunities.map(opp => ({
      'Client': opp.client,
      'Project Type': opp.project_type,
      'RFP Release Date': opp.rfp_release_date,
      'Submission Deadline': new Date(opp.submission_deadline).toLocaleString(),
      'Proposal Owner': opp.proposal_owner,
      'Status': opp.status,
      'Compliance %': opp.compliance_percentage,
      'Priority': opp.priority_level,
      'Industry': opp.industry || 'N/A',
      'Budget': opp.budget || 'N/A'
    }));
    const oppSheet = XLSX.utils.json_to_sheet(oppData);
    XLSX.utils.book_append_sheet(workbook, oppSheet, 'Opportunities');
    
    // Statistics sheet
    const statsData = [
      { 'Metric': 'Total Opportunities', 'Value': statistics?.total_opportunities || 0 },
      { 'Metric': 'Win Rate', 'Value': `${statistics?.win_rate || 0}%` },
      { 'Metric': 'Average Compliance', 'Value': `${statistics?.average_compliance || 0}%` },
      { 'Metric': 'Urgent Deadlines', 'Value': statistics?.urgent_deadlines || 0 }
    ];
    
    if (statistics?.status_counts) {
      Object.keys(statistics.status_counts).forEach(status => {
        statsData.push({
          'Metric': `${status} Count`,
          'Value': statistics.status_counts[status]
        });
      });
    }
    
    const statsSheet = XLSX.utils.json_to_sheet(statsData);
    XLSX.utils.book_append_sheet(workbook, statsSheet, 'Statistics');
    
    XLSX.writeFile(workbook, `ABPTS_Data_${new Date().toISOString().split('T')[0]}.xlsx`);
    toast.success('Data exported successfully');
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading reports...</div>;
  }

  const activeOpportunities = opportunities.filter(opp => !['Won', 'Lost'].includes(opp.status));
  const urgentOpportunities = activeOpportunities.filter(opp => {
    const deadline = new Date(opp.submission_deadline);
    const now = new Date();
    const hoursRemaining = (deadline - now) / (1000 * 60 * 60);
    return hoursRemaining <= 48 && hoursRemaining > 0;
  });

  return (
    <div data-testid="reports-page">
      <div className="page-header mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">Reports & Analytics</h1>
            <p className="page-subtitle">Generate and export comprehensive reports for stakeholders</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={exportToExcel} data-testid="export-excel-btn">
              <Download className="mr-2" size={20} />
              Export to Excel
            </Button>
            <Button onClick={generatePDFReport} data-testid="generate-pdf-btn">
              <FileText className="mr-2" size={20} />
              Generate PDF Report
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card data-testid="metric-total">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{statistics?.total_opportunities || 0}</div>
            <p className="text-xs text-gray-600 mt-1">{activeOpportunities.length} active</p>
          </CardContent>
        </Card>

        <Card data-testid="metric-win-rate">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{statistics?.win_rate || 0}%</div>
            <p className="text-xs text-gray-600 mt-1">
              {statistics?.status_counts?.Won || 0} won / {statistics?.status_counts?.Lost || 0} lost
            </p>
          </CardContent>
        </Card>

        <Card data-testid="metric-compliance">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Avg Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{statistics?.average_compliance || 0}%</div>
            <p className="text-xs text-gray-600 mt-1">Across all opportunities</p>
          </CardContent>
        </Card>

        <Card data-testid="metric-urgent">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Urgent Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{urgentOpportunities.length}</div>
            <p className="text-xs text-gray-600 mt-1">Within 48 hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Report Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card data-testid="section-status-summary">
          <CardHeader>
            <CardTitle>Status Summary</CardTitle>
            <CardDescription>Current distribution of opportunities by status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {statistics?.status_counts && Object.keys(statistics.status_counts).map(status => {
                const count = statistics.status_counts[status];
                const percentage = statistics.total_opportunities > 0 
                  ? Math.round((count / statistics.total_opportunities) * 100)
                  : 0;
                return (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`badge badge-${status.toLowerCase()}`}>{status}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold w-12 text-right">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card data-testid="section-urgent-items">
          <CardHeader>
            <CardTitle>Urgent Action Items</CardTitle>
            <CardDescription>Opportunities requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            {urgentOpportunities.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No urgent deadlines at this time</p>
            ) : (
              <div className="space-y-3">
                {urgentOpportunities.slice(0, 5).map(opp => {
                  const deadline = new Date(opp.submission_deadline);
                  const now = new Date();
                  const hoursRemaining = Math.floor((deadline - now) / (1000 * 60 * 60));
                  return (
                    <div key={opp.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900">{opp.client}</p>
                        <p className="text-sm text-gray-600">{opp.project_type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-red-600">{hoursRemaining}h remaining</p>
                        <p className="text-xs text-gray-600">{deadline.toLocaleDateString()}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card data-testid="section-compliance">
          <CardHeader>
            <CardTitle>Compliance Analysis</CardTitle>
            <CardDescription>Compliance status across opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {opportunities.slice(0, 5).map(opp => (
                <div key={opp.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{opp.client}</span>
                    <span className="text-sm font-bold">{opp.compliance_percentage}%</span>
                  </div>
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
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card data-testid="section-recommendations">
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>Strategic actions to improve performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <TrendingUp className="text-green-600 mt-1" size={16} />
                <div>
                  <p className="font-semibold text-sm">Prioritize Urgent Submissions</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {urgentOpportunities.length} opportunities have deadlines within 48 hours
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <TrendingUp className="text-blue-600 mt-1" size={16} />
                <div>
                  <p className="font-semibold text-sm">Improve Compliance Tracking</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Average compliance is at {statistics?.average_compliance || 0}% - aim for 90%+
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <TrendingUp className="text-purple-600 mt-1" size={16} />
                <div>
                  <p className="font-semibold text-sm">Resource Allocation</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {statistics?.status_counts?.Drafting || 0} opportunities in drafting stage need attention
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <TrendingUp className="text-orange-600 mt-1" size={16} />
                <div>
                  <p className="font-semibold text-sm">Portal Monitoring</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Regularly check bid portals for RFP updates and clarifications
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Report Information */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Report Generation Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">PDF Report Includes:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                <li>Executive summary with key metrics</li>
                <li>Opportunities breakdown by status</li>
                <li>Active opportunities details</li>
                <li>Strategic recommendations</li>
                <li>Professional formatting for stakeholders</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Excel Export Includes:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                <li>Complete opportunities data with all fields</li>
                <li>Statistics summary sheet</li>
                <li>Filterable and sortable columns</li>
                <li>Ready for further analysis</li>
                <li>Compatible with Excel and Google Sheets</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}