import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Plus, FileText, Trash2, Download } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function DocumentManager() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [opportunity, setOpportunity] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    document_name: '',
    category: 'Proposal',
    uploaded_by: ''
  });

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const [oppRes, docsRes] = await Promise.all([
        axios.get(`${API}/opportunities/${id}`),
        axios.get(`${API}/documents/${id}`)
      ]);
      setOpportunity(oppRes.data);
      setDocuments(docsRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Calculate next version number
      const sameCategoryDocs = documents.filter(doc => doc.document_name === formData.document_name);
      const version = `V${sameCategoryDocs.length + 1}`;

      await axios.post(`${API}/documents`, {
        ...formData,
        opportunity_id: id,
        version
      });
      toast.success('Document added successfully');
      setIsDialogOpen(false);
      resetForm();
      loadData();
      
      // Log activity
      await axios.post(`${API}/activities`, {
        opportunity_id: id,
        activity_type: 'Document Upload',
        description: `${formData.document_name} (${version}) uploaded to ${formData.category}`,
        user: formData.uploaded_by
      });
    } catch (error) {
      console.error('Error adding document:', error);
      toast.error('Failed to add document');
    }
  };

  const handleDelete = async (docId, docName) => {
    if (window.confirm(`Are you sure you want to delete ${docName}?`)) {
      try {
        await axios.delete(`${API}/documents/${docId}`);
        toast.success('Document deleted successfully');
        loadData();
      } catch (error) {
        console.error('Error deleting document:', error);
        toast.error('Failed to delete document');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      document_name: '',
      category: 'Proposal',
      uploaded_by: ''
    });
  };

  const groupDocumentsByCategory = () => {
    const grouped = {};
    documents.forEach(doc => {
      if (!grouped[doc.category]) {
        grouped[doc.category] = [];
      }
      grouped[doc.category].push(doc);
    });
    return grouped;
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const groupedDocuments = groupDocumentsByCategory();

  return (
    <div data-testid="document-manager-page">
      <Button variant="ghost" onClick={() => navigate(`/opportunity/${id}`)} className="mb-4" data-testid="back-btn">
        <ArrowLeft className="mr-2" size={20} />
        Back to Opportunity
      </Button>

      <div className="page-header mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">Document Manager</h1>
            <p className="page-subtitle">{opportunity?.client} - {opportunity?.project_type}</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button data-testid="add-document-btn">
                <Plus className="mr-2" size={20} />
                Add Document
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Document</DialogTitle>
                <DialogDescription>
                  Add a new document to this opportunity. Version control is automatic.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="document_name">Document Name *</Label>
                  <Input
                    id="document_name"
                    data-testid="input-document-name"
                    value={formData.document_name}
                    onChange={(e) => setFormData({...formData, document_name: e.target.value})}
                    placeholder="e.g., Technical Proposal, Financial Annexure"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger data-testid="select-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Proposal">Proposal</SelectItem>
                      <SelectItem value="Annexures">Annexures</SelectItem>
                      <SelectItem value="Financials">Financials</SelectItem>
                      <SelectItem value="Compliance">Compliance</SelectItem>
                      <SelectItem value="Supporting">Supporting Documents</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="uploaded_by">Uploaded By *</Label>
                  <Input
                    id="uploaded_by"
                    data-testid="input-uploaded-by"
                    value={formData.uploaded_by}
                    onChange={(e) => setFormData({...formData, uploaded_by: e.target.value})}
                    required
                  />
                </div>
                <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
                  Version will be assigned automatically based on existing documents with the same name.
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => { setIsDialogOpen(false); resetForm(); }}>Cancel</Button>
                  <Button type="submit" data-testid="submit-document-btn">Add Document</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card data-testid="card-total-documents">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{documents.length}</div>
          </CardContent>
        </Card>

        <Card data-testid="card-categories">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{Object.keys(groupedDocuments).length}</div>
          </CardContent>
        </Card>

        <Card data-testid="card-latest-version">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Latest Upload</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">
              {documents.length > 0 ? new Date(documents[0].created_at).toLocaleDateString() : 'N/A'}
            </div>
          </CardContent>
        </Card>
      </div>

      {Object.keys(groupedDocuments).length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <p className="text-center text-gray-500">No documents added yet. Click "Add Document" to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.keys(groupedDocuments).map(category => (
            <Card key={category} data-testid={`category-${category}`}>
              <CardHeader>
                <CardTitle>{category}</CardTitle>
                <CardDescription>{groupedDocuments[category].length} document(s)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {groupedDocuments[category].map(doc => (
                    <div 
                      key={doc.id} 
                      className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-md transition"
                      data-testid={`document-${doc.id}`}
                    >
                      <div className="flex items-center gap-4">
                        <FileText className="text-blue-600" size={24} />
                        <div>
                          <p className="font-semibold text-gray-900">{doc.document_name}</p>
                          <p className="text-sm text-gray-600">Version {doc.version} • Uploaded by {doc.uploaded_by}</p>
                          <p className="text-xs text-gray-500 mt-1">{new Date(doc.created_at).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="badge badge-approved">{doc.version}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(doc.id, doc.document_name)}
                          data-testid={`delete-doc-${doc.id}`}
                        >
                          <Trash2 size={16} className="text-red-600" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Version Control Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
            <li>Version numbers are automatically incremented (V1, V2, V3...)</li>
            <li>Documents with the same name are grouped together with version history</li>
            <li>Always upload new versions rather than editing existing ones</li>
            <li>Keep naming conventions consistent for better organization</li>
            <li>Delete outdated versions only after final submission</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}