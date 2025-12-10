import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Plus, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function ComplianceChecker() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [opportunity, setOpportunity] = useState(null);
  const [complianceItems, setComplianceItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    requirement: '',
    status: 'Pending',
    notes: '',
    assigned_to: ''
  });

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const [oppRes, compRes] = await Promise.all([
        axios.get(`${API}/opportunities/${id}`),
        axios.get(`${API}/compliance/${id}`)
      ]);
      setOpportunity(oppRes.data);
      setComplianceItems(compRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load compliance data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/compliance`, {
        ...formData,
        opportunity_id: id
      });
      toast.success('Compliance item added successfully');
      setIsDialogOpen(false);
      resetForm();
      loadData();
    } catch (error) {
      console.error('Error adding compliance item:', error);
      toast.error('Failed to add compliance item');
    }
  };

  const handleDelete = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this compliance item?')) {
      try {
        await axios.delete(`${API}/compliance/${itemId}`);
        toast.success('Compliance item deleted successfully');
        loadData();
      } catch (error) {
        console.error('Error deleting compliance item:', error);
        toast.error('Failed to delete compliance item');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      requirement: '',
      status: 'Pending',
      notes: '',
      assigned_to: ''
    });
  };

  const calculateComplianceRate = () => {
    if (complianceItems.length === 0) return 0;
    const completed = complianceItems.filter(item => item.status === 'Compliant').length;
    return Math.round((completed / complianceItems.length) * 100);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Compliant':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'Non-Compliant':
        return <XCircle className="text-red-600" size={20} />;
      default:
        return <AlertCircle className="text-yellow-600" size={20} />;
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const complianceRate = calculateComplianceRate();

  return (
    <div data-testid="compliance-checker-page">
      <Button variant="ghost" onClick={() => navigate(`/opportunity/${id}`)} className="mb-4" data-testid="back-btn">
        <ArrowLeft className="mr-2" size={20} />
        Back to Opportunity
      </Button>

      <div className="page-header mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">Compliance Checker</h1>
            <p className="page-subtitle">{opportunity?.client} - {opportunity?.project_type}</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button data-testid="add-requirement-btn">
                <Plus className="mr-2" size={20} />
                Add Requirement
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Compliance Requirement</DialogTitle>
                <DialogDescription>
                  Add a new RFP requirement to track compliance.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="requirement">Requirement *</Label>
                  <Textarea
                    id="requirement"
                    data-testid="input-requirement"
                    value={formData.requirement}
                    onChange={(e) => setFormData({...formData, requirement: e.target.value})}
                    required
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status *</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                    <SelectTrigger data-testid="select-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Compliant">Compliant</SelectItem>
                      <SelectItem value="Non-Compliant">Non-Compliant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="assigned_to">Assigned To *</Label>
                  <Input
                    id="assigned_to"
                    data-testid="input-assigned-to"
                    value={formData.assigned_to}
                    onChange={(e) => setFormData({...formData, assigned_to: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    data-testid="input-notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows={2}
                  />
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => { setIsDialogOpen(false); resetForm(); }}>Cancel</Button>
                  <Button type="submit" data-testid="submit-requirement-btn">Add Requirement</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card data-testid="card-compliance-rate">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{complianceRate}%</div>
            <div className="mt-2 compliance-bar">
              <div 
                className={`compliance-fill ${
                  complianceRate >= 80 ? 'compliance-high' :
                  complianceRate >= 60 ? 'compliance-medium' :
                  'compliance-low'
                }`}
                style={{ width: `${complianceRate}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-total-requirements">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{complianceItems.length}</div>
          </CardContent>
        </Card>

        <Card data-testid="card-pending">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Pending Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {complianceItems.filter(item => item.status === 'Pending').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compliance Matrix</CardTitle>
          <CardDescription>Track all RFP requirements and their compliance status</CardDescription>
        </CardHeader>
        <CardContent>
          {complianceItems.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No compliance requirements added yet. Click "Add Requirement" to get started.</p>
          ) : (
            <div className="space-y-4">
              {complianceItems.map(item => (
                <div 
                  key={item.id} 
                  className="flex items-start gap-4 p-4 bg-white border rounded-lg hover:shadow-md transition"
                  data-testid={`compliance-item-${item.id}`}
                >
                  <div className="mt-1">
                    {getStatusIcon(item.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{item.requirement}</p>
                        {item.notes && (
                          <p className="text-sm text-gray-600 mt-1">{item.notes}</p>
                        )}
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-gray-500">Assigned to: <strong>{item.assigned_to}</strong></span>
                          <span className={`badge badge-${item.status === 'Compliant' ? 'approved' : item.status === 'Non-Compliant' ? 'lost' : 'review'}`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(item.id)}
                        data-testid={`delete-item-${item.id}`}
                      >
                        <XCircle size={16} className="text-red-600" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}