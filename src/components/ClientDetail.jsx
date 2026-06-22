import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import jsPDF from 'jspdf';
import './ClientDetail.css';

const API_BASE_URL = 'http://localhost:4004/api';

export default function ClientDetail({ id, onBack }) {
  const { getAuthHeaders } = useAuth();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lots, setLots] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [showLotModal, setShowLotModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showLotInvoiceModal, setShowLotInvoiceModal] = useState(false);
  const [showInvoiceDownloadModal, setShowInvoiceDownloadModal] = useState(false);
  const [selectedInvoiceForDownload, setSelectedInvoiceForDownload] = useState(null);
  const [selectedLotForInvoice, setSelectedLotForInvoice] = useState(null);
  const [editingLot, setEditingLot] = useState(null);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ type: null, id: null });
  const [lotForm, setLotForm] = useState({
    lotNumber: '',
    description: '',
    quantity: '',
    unit: 'pieces',
    unitPrice: '',
    receivedDate: new Date().toISOString().split('T')[0],
    status: 'pending',
    location: '',
    notes: '',
  });
  const [invoiceForm, setInvoiceForm] = useState({
    invoiceNumber: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    items: [{ description: '', quantity: '', unitPrice: '', total: '' }],
    taxRate: 0,
    discount: 0,
    shippingCharges: 0,
    notes: '',
  });

  useEffect(() => {
    if (id) {
      fetchClient();
      fetchLots();
      fetchInvoices();
    }
  }, [id]);

  const fetchLots = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/lots?partyId=${id}`, {
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        setLots(data);
      }
    } catch (error) {
      // Handle error silently
    }
  };

  const fetchInvoices = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/invoices?partyId=${id}`, {
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        setInvoices(data);
      }
    } catch (error) {
      // Handle error silently
    }
  };

  const handleLotSubmit = async (e) => {
    e.preventDefault();
    try {
      const lotData = {
        ...lotForm,
        partyId: id,
        quantity: parseFloat(lotForm.quantity),
        unitPrice: parseFloat(lotForm.unitPrice),
        totalPrice: parseFloat(lotForm.quantity) * parseFloat(lotForm.unitPrice),
      };

      const url = editingLot 
        ? `${API_BASE_URL}/lots/${editingLot}`
        : `${API_BASE_URL}/lots`;
      const method = editingLot ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(lotData),
      });

      if (response.ok) {
        const lotResult = await response.json();
        
        // Auto-generate invoice for the lot
        if (!editingLot && lotResult._id) {
          try {
            const invoiceNumber = `INV-${lotResult.lotNumber}-${Date.now()}`;
            const invoiceItems = [{
              description: lotForm.description || `Lot ${lotForm.lotNumber}`,
              quantity: parseFloat(lotForm.quantity) || 0,
              unitPrice: parseFloat(lotForm.unitPrice) || 0,
              total: parseFloat(lotForm.quantity) * parseFloat(lotForm.unitPrice) || 0,
            }];

            const subtotal = invoiceItems.reduce((sum, item) => sum + item.total, 0);
            const invoiceData = {
              invoiceNumber: invoiceNumber,
              invoiceDate: new Date().toISOString().split('T')[0],
              dueDate: '',
              partyId: id,
              lotIds: [lotResult._id],
              items: invoiceItems,
              subtotal: subtotal,
              taxAmount: 0,
              discount: 0,
              shippingCharges: 0,
              totalAmount: subtotal,
              status: 'draft',
              notes: `Auto-generated invoice for Lot: ${lotForm.lotNumber}`,
            };

            await fetch(`${API_BASE_URL}/invoices`, {
              method: 'POST',
              headers: getAuthHeaders(),
              body: JSON.stringify(invoiceData),
            });
            
            fetchInvoices();
          } catch (error) {
            // Invoice generation failed, but lot was created successfully
            console.error('Failed to auto-generate invoice:', error);
          }
        }
        
        setShowLotModal(false);
        setEditingLot(null);
        setLotForm({
          lotNumber: '',
          description: '',
          quantity: '',
          unit: 'pieces',
          unitPrice: '',
          receivedDate: new Date().toISOString().split('T')[0],
          status: 'pending',
          location: '',
          notes: '',
        });
        fetchLots();
      }
    } catch (error) {
      setError('Failed to save lot');
    }
  };

  const handleLotEdit = (lot) => {
    setEditingLot(lot._id);
    setLotForm({
      lotNumber: lot.lotNumber || '',
      description: lot.description || '',
      quantity: lot.quantity?.toString() || '',
      unit: lot.unit || 'pieces',
      unitPrice: lot.unitPrice?.toString() || '',
      receivedDate: lot.receivedDate ? new Date(lot.receivedDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      status: lot.status || 'pending',
      location: lot.location || '',
      notes: lot.notes || '',
    });
    setShowLotModal(true);
  };

  const handleLotDelete = async (lotId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/lots/${lotId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        setDeleteConfirm({ type: null, id: null });
        fetchLots();
      }
    } catch (error) {
      setError('Failed to delete lot');
    }
  };

  const handleInvoiceSubmit = async (e) => {
    e.preventDefault();
    try {
      const items = invoiceForm.items.map(item => ({
        description: item.description,
        quantity: parseFloat(item.quantity) || 0,
        unitPrice: parseFloat(item.unitPrice) || 0,
        total: parseFloat(item.total) || 0,
      }));

      const subtotal = items.reduce((sum, item) => sum + item.total, 0);
      const taxAmount = ((subtotal - parseFloat(invoiceForm.discount || 0)) * parseFloat(invoiceForm.taxRate || 0)) / 100;
      const totalAmount = subtotal - parseFloat(invoiceForm.discount || 0) + taxAmount + parseFloat(invoiceForm.shippingCharges || 0);

      // Preserve existing lotIds if editing, or use selected lot
      let lotIds = [];
      if (editingInvoice) {
        // Get existing invoice to preserve lotIds
        const existingInvoice = invoices.find(inv => inv._id === editingInvoice);
        if (existingInvoice && existingInvoice.lotIds) {
          lotIds = [...existingInvoice.lotIds];
        }
      } else if (selectedLotForInvoice) {
        lotIds = [selectedLotForInvoice._id];
      }

      const invoiceData = {
        ...invoiceForm,
        partyId: id,
        lotIds: lotIds,
        items,
        subtotal,
        taxAmount,
        totalAmount,
      };

      if (!editingInvoice) {
        invoiceData.status = 'draft';
      }

      const url = editingInvoice 
        ? `${API_BASE_URL}/invoices/${editingInvoice}`
        : `${API_BASE_URL}/invoices`;
      const method = editingInvoice ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(invoiceData),
      });

      if (response.ok) {
        const createdInvoice = await response.json();
        
        // Refresh invoices
        await fetchInvoices();
        
        // Close invoice creation modal
        setShowInvoiceModal(false);
        setEditingInvoice(null);
        setInvoiceForm({
          invoiceNumber: '',
          invoiceDate: new Date().toISOString().split('T')[0],
          dueDate: '',
          items: [{ description: '', quantity: '', unitPrice: '', total: '' }],
          taxRate: 0,
          discount: 0,
          shippingCharges: 0,
          notes: '',
        });
        
        // If invoice was created from lot modal, directly show download modal
        if (selectedLotForInvoice) {
          // Close lot invoice modal and show download modal directly
          setShowLotInvoiceModal(false);
          setSelectedInvoiceForDownload(createdInvoice);
          setShowInvoiceDownloadModal(true);
        } else {
          setSelectedLotForInvoice(null);
          setShowLotInvoiceModal(false);
        }
      }
    } catch (error) {
      setError('Failed to save invoice');
    }
  };

  const handleInvoiceEdit = (invoice) => {
    setEditingInvoice(invoice._id);
    setInvoiceForm({
      invoiceNumber: invoice.invoiceNumber || '',
      invoiceDate: invoice.invoiceDate ? new Date(invoice.invoiceDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      dueDate: invoice.dueDate ? new Date(invoice.dueDate).toISOString().split('T')[0] : '',
      items: invoice.items?.length > 0 
        ? invoice.items.map(item => ({
            description: item.description || '',
            quantity: item.quantity?.toString() || '',
            unitPrice: item.unitPrice?.toString() || '',
            total: item.total?.toString() || '',
          }))
        : [{ description: '', quantity: '', unitPrice: '', total: '' }],
      taxRate: invoice.taxRate?.toString() || '0',
      discount: invoice.discount?.toString() || '0',
      shippingCharges: invoice.shippingCharges?.toString() || '0',
      notes: invoice.notes || '',
    });
    setShowInvoiceModal(true);
  };

  const handleInvoiceDelete = async (invoiceId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/invoices/${invoiceId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        setDeleteConfirm({ type: null, id: null });
        fetchInvoices();
      }
    } catch (error) {
      setError('Failed to delete invoice');
    }
  };

  const handleDownloadInvoice = async (invoice) => {
    try {
      const doc = new jsPDF();
      
      // Company Header
      doc.setFontSize(20);
      doc.text('INVOICE', 105, 20, { align: 'center' });
      
      doc.setFontSize(16);
      doc.text('Denim Gartex', 105, 30, { align: 'center' });
      
      // Invoice Details
      let yPos = 50;
      doc.setFontSize(10);
      doc.text(`Invoice Number: ${invoice.invoiceNumber}`, 20, yPos);
      yPos += 7;
      doc.text(`Invoice Date: ${new Date(invoice.invoiceDate).toLocaleDateString()}`, 20, yPos);
      yPos += 7;
      if (invoice.dueDate) {
        doc.text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}`, 20, yPos);
        yPos += 7;
      }
      doc.text(`Client: ${client.name}`, 20, yPos);
      yPos += 10;

      // Client Address (if available)
      if (client.address) {
        const addressLines = [];
        if (client.address.street) addressLines.push(client.address.street);
        if (client.address.city || client.address.state) {
          addressLines.push(`${client.address.city || ''}${client.address.city && client.address.state ? ', ' : ''}${client.address.state || ''}`);
        }
        if (client.address.zipCode) addressLines.push(`PIN: ${client.address.zipCode}`);
        
        if (addressLines.length > 0) {
          doc.text('Bill To:', 120, yPos);
          yPos += 6;
          addressLines.forEach(line => {
            doc.text(line, 120, yPos);
            yPos += 6;
          });
        }
      }
      yPos += 10;

      // Table Header
      doc.setFillColor(240, 240, 240);
      doc.rect(20, yPos, 170, 8, 'F');
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text('Description', 22, yPos + 6);
      doc.text('Qty', 100, yPos + 6);
      doc.text('Unit Price', 120, yPos + 6);
      doc.text('Total', 165, yPos + 6);
      
      yPos += 12;
      doc.setFont(undefined, 'normal');

      // Table Items
      if (invoice.items && invoice.items.length > 0) {
        invoice.items.forEach((item, index) => {
          if (yPos > 250) {
            doc.addPage();
            yPos = 20;
          }
          
          // Wrap description if too long
          const description = item.description || '';
          const maxWidth = 75;
          const lines = doc.splitTextToSize(description, maxWidth);
          
          lines.forEach((line, lineIndex) => {
            doc.text(line, 22, yPos + (lineIndex * 6));
          });
          
          const qtyHeight = lines.length * 6;
          doc.text(`${item.quantity || 0}`, 100, yPos + (qtyHeight / 2));
          doc.text(`₹${(item.unitPrice || 0).toLocaleString('en-IN')}`, 120, yPos + (qtyHeight / 2));
          doc.text(`₹${(item.total || 0).toLocaleString('en-IN')}`, 165, yPos + (qtyHeight / 2));
          
          yPos += Math.max(qtyHeight, 8) + 2;
        });
      }

      yPos += 5;

      // Totals Section
      const totalsX = 120;
      if (yPos > 240) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFont(undefined, 'normal');
      doc.text('Subtotal:', totalsX, yPos);
      doc.text(`₹${(invoice.subtotal || 0).toLocaleString('en-IN')}`, 165, yPos, { align: 'right' });
      yPos += 7;

      if (invoice.discount && invoice.discount > 0) {
        doc.text('Discount:', totalsX, yPos);
        doc.text(`₹${invoice.discount.toLocaleString('en-IN')}`, 165, yPos, { align: 'right' });
        yPos += 7;
      }

      if (invoice.taxAmount && invoice.taxAmount > 0) {
        doc.text('Tax:', totalsX, yPos);
        doc.text(`₹${invoice.taxAmount.toLocaleString('en-IN')}`, 165, yPos, { align: 'right' });
        yPos += 7;
      }

      if (invoice.shippingCharges && invoice.shippingCharges > 0) {
        doc.text('Shipping:', totalsX, yPos);
        doc.text(`₹${invoice.shippingCharges.toLocaleString('en-IN')}`, 165, yPos, { align: 'right' });
        yPos += 7;
      }

      // Total Amount
      doc.setFont(undefined, 'bold');
      doc.setFontSize(12);
      doc.text('Total Amount:', totalsX, yPos);
      doc.text(`₹${(invoice.totalAmount || 0).toLocaleString('en-IN')}`, 165, yPos, { align: 'right' });

      yPos += 15;

      // Notes
      if (invoice.notes) {
        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }
        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text('Notes:', 20, yPos);
        yPos += 7;
        doc.setFont(undefined, 'normal');
        const noteLines = doc.splitTextToSize(invoice.notes, 170);
        noteLines.forEach(line => {
          doc.text(line, 20, yPos);
          yPos += 6;
        });
      }

      // Footer
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.text(
          `Page ${i} of ${pageCount}`,
          105,
          doc.internal.pageSize.getHeight() - 10,
          { align: 'center' }
        );
        doc.text(
          'Denim Gartex - Premium Denim Processing',
          105,
          doc.internal.pageSize.getHeight() - 5,
          { align: 'center' }
        );
      }

      // Save the PDF
      doc.save(`Invoice_${invoice.invoiceNumber}_${new Date().getTime()}.pdf`);
    } catch (error) {
      setError('Failed to generate PDF invoice');
    }
  };

  const fetchClient = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/parties/${id}`, {
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        const data = await response.json();
        setClient(data);
      } else {
        setError('Client not found');
      }
    } catch (error) {
      setError('Failed to load client details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="detail-container">
        <div className="detail-loading">Loading...</div>
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="detail-container">
        <div className="detail-error">{error || 'Client not found'}</div>
        <button onClick={onBack} className="back-button">
          Back to Clients
        </button>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <div className="detail-header">
        <button onClick={onBack} className="back-button">
          ← Back to Clients
        </button>
        <h1>Client Details</h1>
      </div>

      <div className="detail-card">
        <div className="detail-section">
          <h2>Company Information</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <label>Company Name</label>
              <p>{client.name}</p>
            </div>
            <div className="detail-item">
              <label>Contact Person</label>
              <p>{client.contactPerson || 'N/A'}</p>
            </div>
            <div className="detail-item">
              <label>Type</label>
              <p className={`type-badge type-${client.type}`}>
                {client.type}
              </p>
            </div>
            <div className="detail-item">
              <label>Status</label>
              <p className={`status-badge status-${client.status}`}>
                {client.status}
              </p>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h2>Contact Information</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <label>Email</label>
              <p>{client.email || 'N/A'}</p>
            </div>
            <div className="detail-item">
              <label>Phone</label>
              <p>{client.phone || 'N/A'}</p>
            </div>
          </div>
        </div>

        {client.address && (
          <div className="detail-section">
            <h2>Address</h2>
            <div className="detail-grid">
              <div className="detail-item">
                <label>Street</label>
                <p>{client.address.street || 'N/A'}</p>
              </div>
              <div className="detail-item">
                <label>City</label>
                <p>{client.address.city || 'N/A'}</p>
              </div>
              <div className="detail-item">
                <label>State</label>
                <p>{client.address.state || 'N/A'}</p>
              </div>
              <div className="detail-item">
                <label>Zip Code</label>
                <p>{client.address.zipCode || 'N/A'}</p>
              </div>
              <div className="detail-item">
                <label>Country</label>
                <p>{client.address.country || 'N/A'}</p>
              </div>
            </div>
          </div>
        )}

        <div className="detail-section">
          <h2>Tax Information</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <label>GST Number</label>
              <p>{client.gstNumber || 'N/A'}</p>
            </div>
            <div className="detail-item">
              <label>PAN Number</label>
              <p>{client.panNumber || 'N/A'}</p>
            </div>
          </div>
        </div>

        {client.notes && (
          <div className="detail-section">
            <h2>Notes</h2>
            <p className="notes-text">{client.notes}</p>
          </div>
        )}

        <div className="detail-section">
          <h2>Additional Information</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <label>Created At</label>
              <p>{new Date(client.createdAt).toLocaleString()}</p>
            </div>
            <div className="detail-item">
              <label>Last Updated</label>
              <p>{new Date(client.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lots Section */}
      <div className="detail-actions-section">
        <div className="section-header-actions">
          <h2>Lots ({lots.length})</h2>
          <button onClick={() => setShowLotModal(true)} className="action-button">
            + Add Lot
          </button>
        </div>
        {lots.length === 0 ? (
          <p className="empty-state">No lots found for this client. Add a lot to get started.</p>
        ) : (
          <div className="records-grid">
            {lots.map((lot) => (
              <div key={lot._id} className="record-item">
                <div className="record-item-header">
                  <h3>{lot.lotNumber}</h3>
                  <div className="record-actions">
                    <button onClick={() => handleLotEdit(lot)} className="edit-button" title="Edit">
                      ✏️
                    </button>
                    <button onClick={() => setDeleteConfirm({ type: 'lot', id: lot._id })} className="delete-button" title="Delete">
                      🗑️
                    </button>
                  </div>
                </div>
                <p><strong>Description:</strong> {lot.description || 'N/A'}</p>
                <p><strong>Quantity:</strong> {lot.quantity} {lot.unit}</p>
                <p><strong>Unit Price:</strong> ₹{lot.unitPrice?.toLocaleString()}</p>
                <p><strong>Total Price:</strong> ₹{lot.totalPrice?.toLocaleString()}</p>
                <p><strong>Status:</strong> <span className={`status-badge status-${lot.status}`}>{lot.status}</span></p>
                <p><strong>Received:</strong> {new Date(lot.receivedDate).toLocaleDateString()}</p>
                <button 
                  onClick={async () => {
                    setSelectedLotForInvoice(lot);
                    setShowLotInvoiceModal(true);
                    // Refresh invoices when opening the modal
                    await fetchInvoices();
                  }}
                  className="lot-invoice-button"
                >
                  📄 Invoice Options
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Lot Modal */}
      {showLotModal && (
        <div className="modal-overlay" onClick={() => {
          setShowLotModal(false);
          setEditingLot(null);
          setLotForm({
            lotNumber: '',
            description: '',
            quantity: '',
            unit: 'pieces',
            unitPrice: '',
            receivedDate: new Date().toISOString().split('T')[0],
            status: 'pending',
            location: '',
            notes: '',
          });
        }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingLot ? 'Edit Lot' : 'Add New Lot'}</h2>
              <button className="modal-close" onClick={() => {
                setShowLotModal(false);
                setEditingLot(null);
                setLotForm({
                  lotNumber: '',
                  description: '',
                  quantity: '',
                  unit: 'pieces',
                  unitPrice: '',
                  receivedDate: new Date().toISOString().split('T')[0],
                  status: 'pending',
                  location: '',
                  notes: '',
                });
              }}>×</button>
            </div>
            <form onSubmit={handleLotSubmit} className="admin-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Lot Number *</label>
                  <input
                    type="text"
                    value={lotForm.lotNumber}
                    onChange={(e) => setLotForm({ ...lotForm, lotNumber: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Received Date *</label>
                  <input
                    type="date"
                    value={lotForm.receivedDate}
                    onChange={(e) => setLotForm({ ...lotForm, receivedDate: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={lotForm.description}
                  onChange={(e) => setLotForm({ ...lotForm, description: e.target.value })}
                  rows="3"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Quantity *</label>
                  <input
                    type="number"
                    value={lotForm.quantity}
                    onChange={(e) => setLotForm({ ...lotForm, quantity: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Unit</label>
                  <select
                    value={lotForm.unit}
                    onChange={(e) => setLotForm({ ...lotForm, unit: e.target.value })}
                  >
                    <option value="pieces">Pieces</option>
                    <option value="kg">KG</option>
                    <option value="meters">Meters</option>
                    <option value="yards">Yards</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Unit Price *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={lotForm.unitPrice}
                    onChange={(e) => setLotForm({ ...lotForm, unitPrice: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={lotForm.status}
                    onChange={(e) => setLotForm({ ...lotForm, status: e.target.value })}
                  >
                    <option value="pending">Pending</option>
                    <option value="received">Received</option>
                    <option value="in_process">In Process</option>
                    <option value="completed">Completed</option>
                    <option value="shipped">Shipped</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={lotForm.location}
                    onChange={(e) => setLotForm({ ...lotForm, location: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea
                  value={lotForm.notes}
                  onChange={(e) => setLotForm({ ...lotForm, notes: e.target.value })}
                  rows="2"
                />
              </div>
              <button type="submit" className="submit-button">
                {editingLot ? 'Update Lot' : 'Add Lot'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Create Invoice Modal */}
      {showInvoiceModal && (
        <div className="modal-overlay" onClick={() => {
          setShowInvoiceModal(false);
          setEditingInvoice(null);
          setInvoiceForm({
            invoiceNumber: '',
            invoiceDate: new Date().toISOString().split('T')[0],
            dueDate: '',
            items: [{ description: '', quantity: '', unitPrice: '', total: '' }],
            taxRate: 0,
            discount: 0,
            shippingCharges: 0,
            notes: '',
          });
        }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingInvoice ? 'Edit Invoice' : 'Create Invoice'}</h2>
              <button className="modal-close" onClick={() => {
                setShowInvoiceModal(false);
                setEditingInvoice(null);
                setInvoiceForm({
                  invoiceNumber: '',
                  invoiceDate: new Date().toISOString().split('T')[0],
                  dueDate: '',
                  items: [{ description: '', quantity: '', unitPrice: '', total: '' }],
                  taxRate: 0,
                  discount: 0,
                  shippingCharges: 0,
                  notes: '',
                });
              }}>×</button>
            </div>
            <form onSubmit={handleInvoiceSubmit} className="admin-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Invoice Number *</label>
                  <input
                    type="text"
                    value={invoiceForm.invoiceNumber}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, invoiceNumber: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Invoice Date *</label>
                  <input
                    type="date"
                    value={invoiceForm.invoiceDate}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, invoiceDate: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Due Date</label>
                  <input
                    type="date"
                    value={invoiceForm.dueDate}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, dueDate: e.target.value })}
                  />
                </div>
              </div>
              <h3>Items</h3>
              {invoiceForm.items.map((item, index) => (
                <div key={index} className="invoice-item-row">
                  <div className="form-group">
                    <label>Description</label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => {
                        const newItems = [...invoiceForm.items];
                        newItems[index].description = e.target.value;
                        setInvoiceForm({ ...invoiceForm, items: newItems });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Quantity</label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        const newItems = [...invoiceForm.items];
                        newItems[index].quantity = e.target.value;
                        const qty = parseFloat(e.target.value) || 0;
                        const price = parseFloat(newItems[index].unitPrice) || 0;
                        newItems[index].total = (qty * price).toFixed(2);
                        setInvoiceForm({ ...invoiceForm, items: newItems });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Unit Price</label>
                    <input
                      type="number"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) => {
                        const newItems = [...invoiceForm.items];
                        newItems[index].unitPrice = e.target.value;
                        const qty = parseFloat(newItems[index].quantity) || 0;
                        const price = parseFloat(e.target.value) || 0;
                        newItems[index].total = (qty * price).toFixed(2);
                        setInvoiceForm({ ...invoiceForm, items: newItems });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Total</label>
                    <input
                      type="number"
                      step="0.01"
                      value={item.total}
                      readOnly
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setInvoiceForm({
                    ...invoiceForm,
                    items: [...invoiceForm.items, { description: '', quantity: '', unitPrice: '', total: '' }],
                  });
                }}
                className="add-item-button"
              >
                + Add Item
              </button>
              <div className="form-row">
                <div className="form-group">
                  <label>Tax Rate (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={invoiceForm.taxRate}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, taxRate: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Discount</label>
                  <input
                    type="number"
                    step="0.01"
                    value={invoiceForm.discount}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, discount: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Shipping Charges</label>
                  <input
                    type="number"
                    step="0.01"
                    value={invoiceForm.shippingCharges}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, shippingCharges: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea
                  value={invoiceForm.notes}
                  onChange={(e) => setInvoiceForm({ ...invoiceForm, notes: e.target.value })}
                  rows="2"
                />
              </div>
              <button type="submit" className="submit-button">
                {editingInvoice ? 'Update Invoice' : 'Create Invoice'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Lot Invoice Options Modal */}
      {showLotInvoiceModal && selectedLotForInvoice && (
        <div className="modal-overlay" onClick={() => {
          setShowLotInvoiceModal(false);
          setSelectedLotForInvoice(null);
        }}>
          <div className="modal-content modal-small" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Invoice Options - {selectedLotForInvoice.lotNumber}</h2>
              <button className="modal-close" onClick={() => {
                setShowLotInvoiceModal(false);
                setSelectedLotForInvoice(null);
              }}>×</button>
            </div>
            <div className="invoice-options-content">
              <p><strong>Lot:</strong> {selectedLotForInvoice.lotNumber}</p>
              <p><strong>Description:</strong> {selectedLotForInvoice.description || 'N/A'}</p>
              <p><strong>Quantity:</strong> {selectedLotForInvoice.quantity} {selectedLotForInvoice.unit}</p>
              <p><strong>Total Price:</strong> ₹{selectedLotForInvoice.totalPrice?.toLocaleString()}</p>
              
              <div className="invoice-options-buttons">
                <button
                  onClick={() => {
                    setInvoiceForm({
                      invoiceNumber: '',
                      invoiceDate: new Date().toISOString().split('T')[0],
                      dueDate: '',
                      items: [{
                        description: selectedLotForInvoice.description || `Lot ${selectedLotForInvoice.lotNumber}`,
                        quantity: selectedLotForInvoice.quantity?.toString() || '',
                        unitPrice: selectedLotForInvoice.unitPrice?.toString() || '',
                        total: selectedLotForInvoice.totalPrice?.toString() || '',
                      }],
                      taxRate: 0,
                      discount: 0,
                      shippingCharges: 0,
                      notes: `Invoice for Lot: ${selectedLotForInvoice.lotNumber}`,
                    });
                    setShowLotInvoiceModal(false);
                    setShowInvoiceModal(true);
                  }}
                  className="action-button"
                >
                  Create Invoice from Lot
                </button>
              </div>

              <h3>Existing Invoices for this Lot</h3>
              {(() => {
                const lotInvoices = invoices.filter(inv => {
                  // Check if invoice has lotIds array and includes this lot's ID
                  return inv.lotIds && Array.isArray(inv.lotIds) && inv.lotIds.includes(selectedLotForInvoice._id);
                });
                
                if (lotInvoices.length === 0) {
                  return (
                    <div>
                      <p className="empty-state">No invoices created from this lot yet.</p>
                      <button
                        onClick={() => {
                          // Auto-generate invoice number
                          const invoiceNumber = `INV-${selectedLotForInvoice.lotNumber}-${Date.now()}`;
                          setInvoiceForm({
                            invoiceNumber: invoiceNumber,
                            invoiceDate: new Date().toISOString().split('T')[0],
                            dueDate: '',
                            items: [{
                              description: selectedLotForInvoice.description || `Lot ${selectedLotForInvoice.lotNumber}`,
                              quantity: selectedLotForInvoice.quantity?.toString() || '',
                              unitPrice: selectedLotForInvoice.unitPrice?.toString() || '',
                              total: selectedLotForInvoice.totalPrice?.toString() || '',
                            }],
                            taxRate: 0,
                            discount: 0,
                            shippingCharges: 0,
                            notes: `Invoice for Lot: ${selectedLotForInvoice.lotNumber}`,
                          });
                          // Keep the lot reference so invoice links properly
                          setSelectedLotForInvoice(selectedLotForInvoice);
                          setShowLotInvoiceModal(false);
                          setShowInvoiceModal(true);
                        }}
                        className="action-button"
                        style={{ marginTop: '15px', width: '100%' }}
                      >
                        📄 Create Invoice Now
                      </button>
                    </div>
                  );
                }
                
                return (
                  <div className="lot-invoices-list">
                    {lotInvoices.map((invoice) => (
                      <div 
                        key={invoice._id} 
                        className="lot-invoice-item clickable-invoice"
                        onClick={() => {
                          setSelectedInvoiceForDownload(invoice);
                          setShowInvoiceDownloadModal(true);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <div>
                          <strong>Invoice #{invoice.invoiceNumber}</strong>
                          <span className={`status-badge status-${invoice.status}`} style={{ marginLeft: '10px' }}>
                            {invoice.status}
                          </span>
                        </div>
                        <p>Date: {new Date(invoice.invoiceDate).toLocaleDateString()}</p>
                        <p>Amount: ₹{invoice.totalAmount?.toLocaleString()}</p>
                        <p className="invoice-click-hint">👉 Click here to Download PDF or Edit</p>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Invoice Download Modal */}
      {showInvoiceDownloadModal && selectedInvoiceForDownload && (
        <div className="modal-overlay" onClick={() => {
          setShowInvoiceDownloadModal(false);
          setSelectedInvoiceForDownload(null);
        }}>
          <div className="modal-content modal-small" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Invoice #{selectedInvoiceForDownload.invoiceNumber}</h2>
              <button className="modal-close" onClick={() => {
                setShowInvoiceDownloadModal(false);
                setSelectedInvoiceForDownload(null);
              }}>×</button>
            </div>
            <div className="invoice-download-content">
              <div className="invoice-download-info">
                <p><strong>Invoice Number:</strong> {selectedInvoiceForDownload.invoiceNumber}</p>
                <p><strong>Invoice Date:</strong> {new Date(selectedInvoiceForDownload.invoiceDate).toLocaleDateString()}</p>
                {selectedInvoiceForDownload.dueDate && (
                  <p><strong>Due Date:</strong> {new Date(selectedInvoiceForDownload.dueDate).toLocaleDateString()}</p>
                )}
                <p><strong>Client:</strong> {client.name}</p>
                <p><strong>Total Amount:</strong> ₹{selectedInvoiceForDownload.totalAmount?.toLocaleString()}</p>
                <p><strong>Status:</strong> <span className={`status-badge status-${selectedInvoiceForDownload.status}`}>{selectedInvoiceForDownload.status}</span></p>
              </div>
              
              <div className="invoice-download-actions">
                <button
                  onClick={() => {
                    handleDownloadInvoice(selectedInvoiceForDownload);
                    setShowInvoiceDownloadModal(false);
                    setSelectedInvoiceForDownload(null);
                  }}
                  className="download-pdf-button"
                >
                  📥 Download PDF Invoice
                </button>
                <button
                  onClick={() => {
                    setShowInvoiceDownloadModal(false);
                    setSelectedLotForInvoice(null);
                    handleInvoiceEdit(selectedInvoiceForDownload);
                  }}
                  className="edit-invoice-button"
                >
                  ✏️ Edit Invoice
                </button>
                <button
                  onClick={() => {
                    setShowInvoiceDownloadModal(false);
                    setDeleteConfirm({ type: 'invoice', id: selectedInvoiceForDownload._id });
                  }}
                  className="delete-invoice-button"
                >
                  🗑️ Delete Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.type && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm({ type: null, id: null })}>
          <div className="modal-content modal-small" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Confirm Delete</h2>
              <button className="modal-close" onClick={() => setDeleteConfirm({ type: null, id: null })}>×</button>
            </div>
            <div className="delete-confirm-content">
              <p>Are you sure you want to delete this {deleteConfirm.type}? This action cannot be undone.</p>
              <div className="delete-actions">
                <button
                  onClick={() => {
                    if (deleteConfirm.type === 'lot') {
                      handleLotDelete(deleteConfirm.id);
                    } else if (deleteConfirm.type === 'invoice') {
                      handleInvoiceDelete(deleteConfirm.id);
                    }
                  }}
                  className="delete-confirm-button"
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeleteConfirm({ type: null, id: null })}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


