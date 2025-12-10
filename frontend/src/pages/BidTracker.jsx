import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function BidTracker() {
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    client: '',
    project_type: '',
    rfp_release_date: '',
    submission_deadline: '',
    proposal_owner: '',
    status: 'Drafting',
    compliance_percentage: 0,
    priority_level: 'Medium',
    portal_link: '',
    risk_flags: [],
    submission_format: 'Portal',
    budget: '',
    industry: ''
  });

  useEffect(() => {
    loadOpportunities();
  }, []);

  useEffect(() => {
    filterOpportunities();
  }, [opportunities, searchTerm, statusFilter]);

  const loadOpportunities = async () => {
    try {
      const response = await axios.get(`${API}/opportunities`);
      setOpportunities(response.data);
    } catch (error) {
      console.error('Error loading opportunities:', error);
      toast.error('Failed to load opportunities');
    } finally {
      setLoading(false);
    }
  };

  const filterOpportunities = () => {
    let filtered = opportunities;

    if (searchTerm) {
      filtered = filtered.filter(opp => 
        opp.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.project_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.proposal_owner.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(opp => opp.status === statusFilter);
    }

    setFilteredOpportunities(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API}/opportunities/${editingId}`, formData);
        toast.success('Opportunity updated successfully');
      } else {
        await axios.post(`${API}/opportunities`, formData);
        toast.success('Opportunity created successfully');
      }
      setIsDialogOpen(false);
      resetForm();
      loadOpportunities();
    } catch (error) {
      console.error('Error saving opportunity:', error);
      toast.error('Failed to save opportunity');
    }
  };

  const handleEdit = (opp) => {
    setEditingId(opp.id);
    setFormData({
      client: opp.client,
      project_type: opp.project_type,
      rfp_release_date: opp.rfp_release_date,
      submission_deadline: opp.submission_deadline,
      proposal_owner: opp.proposal_owner,
      status: opp.status,
      compliance_percentage: opp.compliance_percentage,
      priority_level: opp.priority_level,
      portal_link: opp.portal_link,
      risk_flags: opp.risk_flags,
      submission_format: opp.submission_format,
      budget: opp.budget || '',
      industry: opp.industry || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this opportunity?')) {
      try {
        await axios.delete(`${API}/opportunities/${id}`);
        toast.success('Opportunity deleted successfully');
        loadOpportunities();
      } catch (error) {
        console.error('Error deleting opportunity:', error);
        toast.error('Failed to delete opportunity');
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      client: '',
      project_type: '',
      rfp_release_date: '',
      submission_deadline: '',
      proposal_owner: '',
      status: 'Drafting',
      compliance_percentage: 0,
      priority_level: 'Medium',
      portal_link: '',
      risk_flags: [],
      submission_format: 'Portal',
      budget: '',
      industry: ''
    });
  };

  const getDeadlineClass = (deadline, status) => {
    if (status === 'Won' || status === 'Lost' || status === 'Submitted') return 'deadline-normal';
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const hoursRemaining = (deadlineDate - now) / (1000 * 60 * 60);
    if (hoursRemaining <= 24) return 'deadline-urgent';
    if (hoursRemaining <= 48) return 'deadline-warning';
    return 'deadline-normal';
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading opportunities...</div>;
  }

  return (
    <div data-testid="bid-tracker-page">
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">Bid & RFP Tracker</h1>
            <p className="page-subtitle">Comprehensive opportunity tracking and management</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button data-testid="add-opportunity-btn" onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2" size={20} />
                Add Opportunity
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingId ? 'Edit Opportunity' : 'Add New Opportunity'}</DialogTitle>
                <DialogDescription>
                  {editingId ? 'Update the opportunity details below.' : 'Fill in the details to create a new opportunity.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="client">Client Name *</Label>
                    <Input
                      id="client"
                      data-testid="input-client"
                      value={formData.client}
                      onChange={(e) => setFormData({...formData, client: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="project_type">Project Type *</Label>
                    <Input
                      id="project_type"
                      data-testid="input-project-type"
                      value={formData.project_type}
                      onChange={(e) => setFormData({...formData, project_type: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rfp_release_date">RFP Release Date *</Label>
                    <Input
                      id="rfp_release_date"
                      data-testid="input-rfp-date"
                      type="date"
                      value={formData.rfp_release_date}
                      onChange={(e) => setFormData({...formData, rfp_release_date: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="submission_deadline">Submission Deadline *</Label>
                    <Input
                      id="submission_deadline"
                      data-testid="input-deadline"
                      type="datetime-local"
                      value={formData.submission_deadline}
                      onChange={(e) => setFormData({...formData, submission_deadline: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="proposal_owner">Proposal Owner *</Label>
                    <Input
                      id="proposal_owner"
                      data-testid="input-owner"
                      value={formData.proposal_owner}
                      onChange={(e) => setFormData({...formData, proposal_owner: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status *</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                      <SelectTrigger data-testid="select-status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Drafting">Drafting</SelectItem>
                        <SelectItem value="Review">Review</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Submitted">Submitted</SelectItem>
                        <SelectItem value="Won">Won</SelectItem>
                        <SelectItem value="Lost">Lost</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="compliance_percentage">Compliance % *</Label>
                    <Input
                      id="compliance_percentage"
                      data-testid="input-compliance"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.compliance_percentage}
                      onChange={(e) => setFormData({...formData, compliance_percentage: parseInt(e.target.value) || 0})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="priority_level">Priority Level *</Label>
                    <Select value={formData.priority_level} onValueChange={(value) => setFormData({...formData, priority_level: value})}>
                      <SelectTrigger data-testid="select-priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="submission_format">Submission Format *</Label>
                    <Select value={formData.submission_format} onValueChange={(value) => setFormData({...formData, submission_format: value})}>
                      <SelectTrigger data-testid="select-format">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Portal">Portal</SelectItem>
                        <SelectItem value="Email">Email</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Input
                      id="industry"
                      data-testid="input-industry"
                      value={formData.industry}
                      onChange={(e) => setFormData({...formData, industry: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="portal_link">Portal Link</Label>
                  <Input
                    id="portal_link"
                    data-testid="input-portal-link"
                    type="url"
                    value={formData.portal_link}
                    onChange={(e) => setFormData({...formData, portal_link: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="budget">Budget</Label>
                  <Input
                    id="budget"
                    data-testid="input-budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  />
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => { setIsDialogOpen(false); resetForm(); }}>Cancel</Button>
                  <Button type="submit" data-testid="submit-opportunity-btn">{editingId ? 'Update' : 'Create'}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <Input
            data-testid="search-input"
            placeholder="Search by client, project type, or owner..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48" data-testid="filter-status">
            <Filter className="mr-2" size={16} />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Drafting">Drafting</SelectItem>
            <SelectItem value="Review">Review</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Submitted">Submitted</SelectItem>
            <SelectItem value="Won">Won</SelectItem>
            <SelectItem value="Lost">Lost</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="data-table">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="table-header text-left text-sm font-semibold text-gray-700">
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Project Type</th>
                <th className="px-4 py-3">Owner</th>
                <th className="px-4 py-3">Deadline</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Compliance</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOpportunities.map(opp => (
                <tr key={opp.id} className="table-row" data-testid={`opportunity-row-${opp.id}`}>
                  <td className="px-4 py-3 font-medium">{opp.client}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{opp.project_type}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{opp.proposal_owner}</td>
                  <td className={`px-4 py-3 text-sm ${getDeadlineClass(opp.submission_deadline, opp.status)}`}>
                    {new Date(opp.submission_deadline).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`badge badge-${opp.status.toLowerCase()}`}>{opp.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`badge badge-${opp.priority_level.toLowerCase()}`}>{opp.priority_level}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-24 compliance-bar">
                        <div 
                          className={`compliance-fill ${
                            opp.compliance_percentage >= 80 ? 'compliance-high' :
                            opp.compliance_percentage >= 60 ? 'compliance-medium' :
                            'compliance-low'
                          }`}
                          style={{ width: `${opp.compliance_percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{opp.compliance_percentage}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => navigate(`/opportunity/${opp.id}`)}
                        data-testid={`view-btn-${opp.id}`}
                      >
                        <Eye size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(opp)}
                        data-testid={`edit-btn-${opp.id}`}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(opp.id)}
                        data-testid={`delete-btn-${opp.id}`}
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredOpportunities.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No opportunities found. Create your first opportunity to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}