import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './AdminDashboard.css';
import EmployeeDetail from './EmployeeDetail.jsx';
import ClientDetail from './ClientDetail.jsx';

const API_BASE_URL = 'http://localhost:4004/api';

export default function AdminDashboard() {
  const { user, logout, getAuthHeaders } = useAuth();
  const [view, setView] = useState('dashboard'); // 'dashboard', 'employees', 'clients', 'employeeDetail', 'clientDetail'
  const [selectedId, setSelectedId] = useState(null);
  const [activeTab, setActiveTab] = useState('clients'); // 'clients' or 'employees' when in list view
  const [parties, setParties] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ type: null, id: null });
  
  // Pagination and search states
  const [clientSearchTerm, setClientSearchTerm] = useState('');
  const [employeeSearchTerm, setEmployeeSearchTerm] = useState('');
  const [currentClientPage, setCurrentClientPage] = useState(1);
  const [currentEmployeePage, setCurrentEmployeePage] = useState(1);
  const itemsPerPage = 10;

  // Form states
  const [partyForm, setPartyForm] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    type: 'customer',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
    gstNumber: '',
    panNumber: '',
    notes: '',
  });

  const [employeeForm, setEmployeeForm] = useState({
    employeeId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    salary: '',
    salaryType: 'monthly',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
    bankDetails: {
      accountNumber: '',
      bankName: '',
      ifscCode: '',
      branch: '',
    },
  });

  useEffect(() => {
    if (view === 'dashboard') {
      fetchStats();
      fetchParties();
      fetchEmployees();
    } else if (view === 'clients' || activeTab === 'clients') {
      fetchParties();
    } else if (view === 'employees' || activeTab === 'employees') {
      fetchEmployees();
    }
  }, [view, activeTab]);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
    }
  };

  const fetchParties = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/parties`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (response.ok) {
        setParties(data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/employees`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (response.ok) {
        setEmployees(data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handlePartySubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const url = editingClient 
        ? `${API_BASE_URL}/parties/${editingClient}`
        : `${API_BASE_URL}/parties`;
      const method = editingClient ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(partyForm),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(editingClient ? 'Client updated successfully!' : 'Client added successfully!');
        setPartyForm({
          name: '',
          contactPerson: '',
          email: '',
          phone: '',
          type: 'customer',
          address: { street: '', city: '', state: '', zipCode: '', country: '' },
          gstNumber: '',
          panNumber: '',
          notes: '',
        });
        setShowClientModal(false);
        setEditingClient(null);
        fetchParties();
        fetchStats();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || (editingClient ? 'Failed to update client' : 'Failed to add client'));
      }
    } catch (error) {
      setError('Network error. Please try again.');
    }
  };

  const handleClientEdit = (client) => {
    setEditingClient(client._id);
    setPartyForm({
      name: client.name || '',
      contactPerson: client.contactPerson || '',
      email: client.email || '',
      phone: client.phone || '',
      type: client.type || 'customer',
      address: client.address || { street: '', city: '', state: '', zipCode: '', country: '' },
      gstNumber: client.gstNumber || '',
      panNumber: client.panNumber || '',
      notes: client.notes || '',
    });
    setShowClientModal(true);
  };

  const handleClientDelete = async (clientId) => {
    try {
      setError('');
      setSuccess('');
      setLoading(true);
      
      const response = await fetch(`${API_BASE_URL}/parties/${clientId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        const data = await response.json().catch(() => ({ message: 'Client deleted successfully' }));
        setSuccess(data.message || 'Client deleted successfully!');
        setDeleteConfirm({ type: null, id: null });
        await fetchParties();
        await fetchStats();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const data = await response.json().catch(() => ({ message: 'Failed to delete client' }));
        setError(data.message || 'Failed to delete client');
        setTimeout(() => setError(''), 5000);
      }
    } catch (error) {
      setError('Failed to delete client. Please try again.');
      setTimeout(() => setError(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const url = editingEmployee 
        ? `${API_BASE_URL}/employees/${editingEmployee}`
        : `${API_BASE_URL}/employees`;
      const method = editingEmployee ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...employeeForm,
          salary: parseFloat(employeeForm.salary),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(editingEmployee ? 'Employee updated successfully!' : 'Employee added successfully!');
        setEmployeeForm({
          employeeId: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          department: '',
          position: '',
          salary: '',
          salaryType: 'monthly',
          address: { street: '', city: '', state: '', zipCode: '', country: '' },
          bankDetails: { accountNumber: '', bankName: '', ifscCode: '', branch: '' },
        });
        setShowEmployeeModal(false);
        setEditingEmployee(null);
        fetchEmployees();
        fetchStats();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || (editingEmployee ? 'Failed to update employee' : 'Failed to add employee'));
      }
    } catch (error) {
      setError('Network error. Please try again.');
    }
  };

  const handleEmployeeEdit = (employee) => {
    setEditingEmployee(employee._id);
    setEmployeeForm({
      employeeId: employee.employeeId || '',
      firstName: employee.firstName || '',
      lastName: employee.lastName || '',
      email: employee.email || '',
      phone: employee.phone || '',
      department: employee.department || '',
      position: employee.position || '',
      salary: employee.salary?.toString() || '',
      salaryType: employee.salaryType || 'monthly',
      address: employee.address || { street: '', city: '', state: '', zipCode: '', country: '' },
      bankDetails: employee.bankDetails || { accountNumber: '', bankName: '', ifscCode: '', branch: '' },
    });
    setShowEmployeeModal(true);
  };

  const handleEmployeeDelete = async (employeeId) => {
    try {
      setError('');
      setSuccess('');
      setLoading(true);
      
      const response = await fetch(`${API_BASE_URL}/employees/${employeeId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        const data = await response.json().catch(() => ({ message: 'Employee deleted successfully' }));
        setSuccess(data.message || 'Employee deleted successfully!');
        setDeleteConfirm({ type: null, id: null });
        await fetchEmployees();
        await fetchStats();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const data = await response.json().catch(() => ({ message: 'Failed to delete employee' }));
        setError(data.message || 'Failed to delete employee');
        setTimeout(() => setError(''), 5000);
      }
    } catch (error) {
      setError('Failed to delete employee. Please try again.');
      setTimeout(() => setError(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = (type, id) => {
    setSelectedId(id);
    setView(type === 'employee' ? 'employeeDetail' : 'clientDetail');
  };

  // Show detail pages
  if (view === 'employeeDetail' && selectedId) {
    return <EmployeeDetail id={selectedId} onBack={() => setView('employees')} />;
  }

  if (view === 'clientDetail' && selectedId) {
    return <ClientDetail id={selectedId} onBack={() => setView('clients')} />;
  }

  // Dashboard view
  if (view === 'dashboard') {
    return (
      <div className="admin-dashboard">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="sidebar-header">
            <h2>Menu</h2>
          </div>
          <nav className="sidebar-nav">
            <button
              onClick={() => setView('dashboard')}
              className={`sidebar-nav-item ${view === 'dashboard' ? 'active' : ''}`}
            >
              <span className="sidebar-icon">📊</span>
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setView('clients')}
              className={`sidebar-nav-item ${view === 'clients' ? 'active' : ''}`}
            >
              <span className="sidebar-icon">👥</span>
              <span>Clients</span>
              <span className="sidebar-badge">{parties.length}</span>
            </button>
            <button
              onClick={() => setView('employees')}
              className={`sidebar-nav-item ${view === 'employees' ? 'active' : ''}`}
            >
              <span className="sidebar-icon">👤</span>
              <span>Employees</span>
              <span className="sidebar-badge">{employees.length}</span>
            </button>
          </nav>
          <div className="sidebar-cta">
            <h3>Quick Actions</h3>
            <button
              onClick={() => setShowClientModal(true)}
              className="sidebar-cta-button sidebar-cta-client"
            >
              <span className="sidebar-cta-icon">➕</span>
              <span>Add Client</span>
            </button>
            <button
              onClick={() => setShowEmployeeModal(true)}
              className="sidebar-cta-button sidebar-cta-employee"
            >
              <span className="sidebar-cta-icon">➕</span>
              <span>Add Employee</span>
            </button>
          </div>
          <div className="sidebar-footer">
            <div className="sidebar-user-info">
              <span className="sidebar-user-icon">👤</span>
              <div>
                <div className="sidebar-username">{user?.username}</div>
                <div className="sidebar-user-role">Administrator</div>
              </div>
            </div>
            <button onClick={logout} className="sidebar-logout">
              🚪 Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="admin-main-content">
          <header className="admin-header">
            <div className="container">
              <div className="admin-header-content">
                <h1>Dashboard Overview</h1>
              </div>
            </div>
          </header>

          <div className="admin-content">
            <div className="container">
              {error && <div className="alert alert-error">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              {/* Clients Table */}
              <div className="dashboard-table-section">
                <div className="table-section-header">
                  <h2>
                    Recent Clients
                    <span className="count-badge">{parties.length}</span>
                  </h2>
                  <button
                    onClick={() => setView('clients')}
                    className="view-all-button"
                  >
                    View All →
                  </button>
                </div>
                <div className="dashboard-table-container">
                  {loading ? (
                    <div className="table-loading">Loading clients...</div>
                  ) : parties.length === 0 ? (
                    <div className="table-empty">
                      <p>No clients found. Add your first client using the sidebar.</p>
                    </div>
                  ) : (
                    <table className="dashboard-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Contact Person</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Type</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {parties.slice(0, 5).map((party) => (
                          <tr key={party._id}>
                            <td><strong>{party.name}</strong></td>
                            <td>{party.contactPerson || 'N/A'}</td>
                            <td>{party.email || 'N/A'}</td>
                            <td>{party.phone || 'N/A'}</td>
                            <td>
                              <span className={`status-badge type-${party.type}`}>
                                {party.type}
                              </span>
                            </td>
                            <td>
                              <span className={`status-badge status-${party.status || 'active'}`}>
                                {party.status || 'active'}
                              </span>
                            </td>
                            <td>
                              <button
                                onClick={() => handleViewDetail('client', party._id)}
                                className="view-more-button"
                              >
                                View More
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              {/* Employees Table */}
              <div className="dashboard-table-section">
                <div className="table-section-header">
                  <h2>
                    Recent Employees
                    <span className="count-badge">{employees.length}</span>
                  </h2>
                  <button
                    onClick={() => setView('employees')}
                    className="view-all-button"
                  >
                    View All →
                  </button>
                </div>
                <div className="dashboard-table-container">
                  {loading ? (
                    <div className="table-loading">Loading employees...</div>
                  ) : employees.length === 0 ? (
                    <div className="table-empty">
                      <p>No employees found. Add your first employee using the sidebar.</p>
                    </div>
                  ) : (
                    <table className="dashboard-table">
                      <thead>
                        <tr>
                          <th>Employee ID</th>
                          <th>Name</th>
                          <th>Department</th>
                          <th>Position</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employees.slice(0, 5).map((employee) => (
                          <tr key={employee._id}>
                            <td><strong>{employee.employeeId}</strong></td>
                            <td>{employee.firstName} {employee.lastName}</td>
                            <td>{employee.department}</td>
                            <td>{employee.position}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phone}</td>
                            <td>
                              <span className={`status-badge status-${employee.status || 'active'}`}>
                                {employee.status || 'active'}
                              </span>
                            </td>
                            <td>
                              <button
                                onClick={() => handleViewDetail('employee', employee._id)}
                                className="view-more-button"
                              >
                                View More
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Modal */}
        {showClientModal && (
          <div className="modal-overlay" onClick={() => {
            setShowClientModal(false);
            setEditingClient(null);
            setPartyForm({
              name: '',
              contactPerson: '',
              email: '',
              phone: '',
              type: 'customer',
              address: { street: '', city: '', state: '', zipCode: '', country: '' },
              gstNumber: '',
              panNumber: '',
              notes: '',
            });
          }}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editingClient ? 'Edit Client' : 'Add New Client'}</h2>
                <button className="modal-close" onClick={() => {
                  setShowClientModal(false);
                  setEditingClient(null);
                  setPartyForm({
                    name: '',
                    contactPerson: '',
                    email: '',
                    phone: '',
                    type: 'customer',
                    address: { street: '', city: '', state: '', zipCode: '', country: '' },
                    gstNumber: '',
                    panNumber: '',
                    notes: '',
                  });
                }}>
                  ×
                </button>
              </div>
              <form onSubmit={handlePartySubmit} className="admin-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Client Name *</label>
                    <input
                      type="text"
                      value={partyForm.name}
                      onChange={(e) => setPartyForm({ ...partyForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Contact Person</label>
                    <input
                      type="text"
                      value={partyForm.contactPerson}
                      onChange={(e) => setPartyForm({ ...partyForm, contactPerson: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={partyForm.email}
                      onChange={(e) => setPartyForm({ ...partyForm, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={partyForm.phone}
                      onChange={(e) => setPartyForm({ ...partyForm, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Type</label>
                    <select
                      value={partyForm.type}
                      onChange={(e) => setPartyForm({ ...partyForm, type: e.target.value })}
                    >
                      <option value="customer">Customer</option>
                      <option value="supplier">Supplier</option>
                      <option value="both">Both</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>GST Number</label>
                    <input
                      type="text"
                      value={partyForm.gstNumber}
                      onChange={(e) => setPartyForm({ ...partyForm, gstNumber: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Address - Street</label>
                  <input
                    type="text"
                    value={partyForm.address.street}
                    onChange={(e) =>
                      setPartyForm({
                        ...partyForm,
                        address: { ...partyForm.address, street: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      value={partyForm.address.city}
                      onChange={(e) =>
                        setPartyForm({
                          ...partyForm,
                          address: { ...partyForm.address, city: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      value={partyForm.address.state}
                      onChange={(e) =>
                        setPartyForm({
                          ...partyForm,
                          address: { ...partyForm.address, state: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Zip Code</label>
                    <input
                      type="text"
                      value={partyForm.address.zipCode}
                      onChange={(e) =>
                        setPartyForm({
                          ...partyForm,
                          address: { ...partyForm.address, zipCode: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Notes</label>
                  <textarea
                    value={partyForm.notes}
                    onChange={(e) => setPartyForm({ ...partyForm, notes: e.target.value })}
                    rows="3"
                  />
                </div>
                <button type="submit" className="submit-button">
                  {editingClient ? 'Update Client' : 'Add Client'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Employee Modal */}
        {showEmployeeModal && (
          <div className="modal-overlay" onClick={() => setShowEmployeeModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Add New Employee</h2>
                <button className="modal-close" onClick={() => setShowEmployeeModal(false)}>
                  ×
                </button>
              </div>
              <form onSubmit={handleEmployeeSubmit} className="admin-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Employee ID *</label>
                    <input
                      type="text"
                      value={employeeForm.employeeId}
                      onChange={(e) => setEmployeeForm({ ...employeeForm, employeeId: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>First Name *</label>
                    <input
                      type="text"
                      value={employeeForm.firstName}
                      onChange={(e) => setEmployeeForm({ ...employeeForm, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name *</label>
                    <input
                      type="text"
                      value={employeeForm.lastName}
                      onChange={(e) => setEmployeeForm({ ...employeeForm, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      value={employeeForm.email}
                      onChange={(e) => setEmployeeForm({ ...employeeForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone *</label>
                    <input
                      type="tel"
                      value={employeeForm.phone}
                      onChange={(e) => setEmployeeForm({ ...employeeForm, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Department *</label>
                    <input
                      type="text"
                      value={employeeForm.department}
                      onChange={(e) => setEmployeeForm({ ...employeeForm, department: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Position *</label>
                    <input
                      type="text"
                      value={employeeForm.position}
                      onChange={(e) => setEmployeeForm({ ...employeeForm, position: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Salary *</label>
                    <input
                      type="number"
                      value={employeeForm.salary}
                      onChange={(e) => setEmployeeForm({ ...employeeForm, salary: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Salary Type</label>
                    <select
                      value={employeeForm.salaryType}
                      onChange={(e) => setEmployeeForm({ ...employeeForm, salaryType: e.target.value })}
                    >
                      <option value="monthly">Monthly</option>
                      <option value="daily">Daily</option>
                      <option value="hourly">Hourly</option>
                    </select>
                  </div>
                </div>
                <h3>Address</h3>
                <div className="form-group">
                  <label>Street</label>
                  <input
                    type="text"
                    value={employeeForm.address.street}
                    onChange={(e) =>
                      setEmployeeForm({
                        ...employeeForm,
                        address: { ...employeeForm.address, street: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      value={employeeForm.address.city}
                      onChange={(e) =>
                        setEmployeeForm({
                          ...employeeForm,
                          address: { ...employeeForm.address, city: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      value={employeeForm.address.state}
                      onChange={(e) =>
                        setEmployeeForm({
                          ...employeeForm,
                          address: { ...employeeForm.address, state: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
                <h3>Bank Details</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Account Number</label>
                    <input
                      type="text"
                      value={employeeForm.bankDetails.accountNumber}
                      onChange={(e) =>
                        setEmployeeForm({
                          ...employeeForm,
                          bankDetails: { ...employeeForm.bankDetails, accountNumber: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Bank Name</label>
                    <input
                      type="text"
                      value={employeeForm.bankDetails.bankName}
                      onChange={(e) =>
                        setEmployeeForm({
                          ...employeeForm,
                          bankDetails: { ...employeeForm.bankDetails, bankName: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>IFSC Code</label>
                    <input
                      type="text"
                      value={employeeForm.bankDetails.ifscCode}
                      onChange={(e) =>
                        setEmployeeForm({
                          ...employeeForm,
                          bankDetails: { ...employeeForm.bankDetails, ifscCode: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Branch</label>
                    <input
                      type="text"
                      value={employeeForm.bankDetails.branch}
                      onChange={(e) =>
                        setEmployeeForm({
                          ...employeeForm,
                          bankDetails: { ...employeeForm.bankDetails, branch: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
                <button type="submit" className="submit-button">
                  {editingEmployee ? 'Update Employee' : 'Add Employee'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Clients List View
  if (view === 'clients') {
    return (
      <div className="admin-dashboard">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="sidebar-header">
            <h2>Menu</h2>
          </div>
          <nav className="sidebar-nav">
            <button
              onClick={() => setView('dashboard')}
              className={`sidebar-nav-item ${view === 'dashboard' ? 'active' : ''}`}
            >
              <span className="sidebar-icon">📊</span>
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setView('clients')}
              className={`sidebar-nav-item ${view === 'clients' ? 'active' : ''}`}
            >
              <span className="sidebar-icon">👥</span>
              <span>Clients</span>
              <span className="sidebar-badge">{parties.length}</span>
            </button>
            <button
              onClick={() => setView('employees')}
              className={`sidebar-nav-item ${view === 'employees' ? 'active' : ''}`}
            >
              <span className="sidebar-icon">👤</span>
              <span>Employees</span>
              <span className="sidebar-badge">{employees.length}</span>
            </button>
          </nav>
          <div className="sidebar-cta">
            <h3>Quick Actions</h3>
            <button
              onClick={() => setShowClientModal(true)}
              className="sidebar-cta-button sidebar-cta-client"
            >
              <span className="sidebar-cta-icon">➕</span>
              <span>Add Client</span>
            </button>
            <button
              onClick={() => setShowEmployeeModal(true)}
              className="sidebar-cta-button sidebar-cta-employee"
            >
              <span className="sidebar-cta-icon">➕</span>
              <span>Add Employee</span>
            </button>
          </div>
          <div className="sidebar-footer">
            <div className="sidebar-user-info">
              <span className="sidebar-user-icon">👤</span>
              <div>
                <div className="sidebar-username">{user?.username}</div>
                <div className="sidebar-user-role">Administrator</div>
              </div>
            </div>
            <button onClick={logout} className="sidebar-logout">
              🚪 Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="admin-main-content">
          <header className="admin-header">
            <div className="container">
              <div className="admin-header-content">
                <button 
                  onClick={() => {
                    setView('dashboard');
                    setClientSearchTerm('');
                    setCurrentClientPage(1);
                  }} 
                  className="back-button-header"
                >
                  ← Dashboard
                </button>
                <h1>Clients</h1>
              </div>
            </div>
          </header>

        <div className="admin-content">
          <div className="container">
            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            
            {/* Search and Filter Bar */}
            <div className="search-filter-bar">
              <div className="search-input-wrapper">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search clients by name, email, phone, or contact person..."
                  value={clientSearchTerm}
                  onChange={(e) => {
                    setClientSearchTerm(e.target.value);
                    setCurrentClientPage(1); // Reset to first page on search
                  }}
                  className="search-input"
                />
                {clientSearchTerm && (
                  <button
                    onClick={() => setClientSearchTerm('')}
                    className="clear-search-button"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                {/* Filtered and Paginated Results */}
                {(() => {
                  // Filter clients based on search term
                  const filteredClients = parties.filter(party => {
                    if (!clientSearchTerm) return true;
                    const searchLower = clientSearchTerm.toLowerCase();
                    return (
                      party.name?.toLowerCase().includes(searchLower) ||
                      party.email?.toLowerCase().includes(searchLower) ||
                      party.phone?.toLowerCase().includes(searchLower) ||
                      party.contactPerson?.toLowerCase().includes(searchLower)
                    );
                  });

                  // Calculate pagination
                  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
                  const startIndex = (currentClientPage - 1) * itemsPerPage;
                  const endIndex = startIndex + itemsPerPage;
                  const paginatedClients = filteredClients.slice(startIndex, endIndex);

                  return (
                    <>
                      <div className="results-info">
                        <span>
                          Showing {paginatedClients.length > 0 ? startIndex + 1 : 0} - {Math.min(endIndex, filteredClients.length)} of {filteredClients.length} client{filteredClients.length !== 1 ? 's' : ''}
                          {clientSearchTerm && ` (filtered from ${parties.length} total)`}
                        </span>
                      </div>

                      <div className="records-list">
                        {filteredClients.length === 0 ? (
                          <div className="empty-state">
                            <p>{clientSearchTerm ? 'No clients match your search.' : 'No clients found. Add your first client.'}</p>
                          </div>
                        ) : (
                          paginatedClients.map((party) => (
                    <div
                      key={party._id}
                      className="record-card"
                    >
                      <div className="record-card-header">
                        <div 
                          className="record-card-content clickable"
                          onClick={() => handleViewDetail('client', party._id)}
                        >
                          <h3>{party.name}</h3>
                          <p>
                            <strong>Type:</strong> {party.type} | <strong>Contact:</strong>{' '}
                            {party.contactPerson || 'N/A'}
                          </p>
                          <p>
                            <strong>Email:</strong> {party.email || 'N/A'} | <strong>Phone:</strong>{' '}
                            {party.phone || 'N/A'}
                          </p>
                          <p>
                            <strong>Status:</strong> {party.status || 'active'}
                          </p>
                        </div>
                        <div className="record-card-actions">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleClientEdit(party);
                            }}
                            className="edit-button-small"
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteConfirm({ type: 'client', id: party._id });
                            }}
                            className="delete-button-small"
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                          ))
                        )}
                      </div>

                      {/* Pagination Controls */}
                      {totalPages > 1 && (
                        <div className="pagination-controls">
                          <button
                            onClick={() => setCurrentClientPage(prev => Math.max(1, prev - 1))}
                            disabled={currentClientPage === 1}
                            className="pagination-button"
                          >
                            ← Previous
                          </button>
                          <div className="pagination-info">
                            Page {currentClientPage} of {totalPages}
                          </div>
                          <button
                            onClick={() => setCurrentClientPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentClientPage === totalPages}
                            className="pagination-button"
                          >
                            Next →
                          </button>
                        </div>
                      )}
                    </>
                  );
                })()}
              </>
            )}
          </div>
        </div>

        {/* Client Modal */}
        {showClientModal && (
          <div className="modal-overlay" onClick={() => {
            setShowClientModal(false);
            setEditingClient(null);
            setPartyForm({
              name: '',
              contactPerson: '',
              email: '',
              phone: '',
              type: 'customer',
              address: { street: '', city: '', state: '', zipCode: '', country: '' },
              gstNumber: '',
              panNumber: '',
              notes: '',
            });
          }}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editingClient ? 'Edit Client' : 'Add New Client'}</h2>
                <button className="modal-close" onClick={() => {
                  setShowClientModal(false);
                  setEditingClient(null);
                  setPartyForm({
                    name: '',
                    contactPerson: '',
                    email: '',
                    phone: '',
                    type: 'customer',
                    address: { street: '', city: '', state: '', zipCode: '', country: '' },
                    gstNumber: '',
                    panNumber: '',
                    notes: '',
                  });
                }}>
                  ×
                </button>
              </div>
              <form onSubmit={handlePartySubmit} className="admin-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Client Name *</label>
                    <input
                      type="text"
                      value={partyForm.name}
                      onChange={(e) => setPartyForm({ ...partyForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Contact Person</label>
                    <input
                      type="text"
                      value={partyForm.contactPerson}
                      onChange={(e) => setPartyForm({ ...partyForm, contactPerson: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={partyForm.email}
                      onChange={(e) => setPartyForm({ ...partyForm, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={partyForm.phone}
                      onChange={(e) => setPartyForm({ ...partyForm, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Type</label>
                    <select
                      value={partyForm.type}
                      onChange={(e) => setPartyForm({ ...partyForm, type: e.target.value })}
                    >
                      <option value="customer">Customer</option>
                      <option value="supplier">Supplier</option>
                      <option value="both">Both</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>GST Number</label>
                    <input
                      type="text"
                      value={partyForm.gstNumber}
                      onChange={(e) => setPartyForm({ ...partyForm, gstNumber: e.target.value })}
                    />
                  </div>
                </div>
                <button type="submit" className="submit-button">
                  {editingClient ? 'Update Client' : 'Add Client'}
                </button>
              </form>
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
                      if (deleteConfirm.type === 'client') {
                        handleClientDelete(deleteConfirm.id);
                      } else if (deleteConfirm.type === 'employee') {
                        handleEmployeeDelete(deleteConfirm.id);
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
      </div>
    );
  }

  // Employees List View
  if (view === 'employees') {
    return (
      <div className="admin-dashboard">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="sidebar-header">
            <h2>Menu</h2>
          </div>
          <nav className="sidebar-nav">
            <button
              onClick={() => setView('dashboard')}
              className={`sidebar-nav-item ${view === 'dashboard' ? 'active' : ''}`}
            >
              <span className="sidebar-icon">📊</span>
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setView('clients')}
              className={`sidebar-nav-item ${view === 'clients' ? 'active' : ''}`}
            >
              <span className="sidebar-icon">👥</span>
              <span>Clients</span>
              <span className="sidebar-badge">{parties.length}</span>
            </button>
            <button
              onClick={() => setView('employees')}
              className={`sidebar-nav-item ${view === 'employees' ? 'active' : ''}`}
            >
              <span className="sidebar-icon">👤</span>
              <span>Employees</span>
              <span className="sidebar-badge">{employees.length}</span>
            </button>
          </nav>
          <div className="sidebar-cta">
            <h3>Quick Actions</h3>
            <button
              onClick={() => setShowClientModal(true)}
              className="sidebar-cta-button sidebar-cta-client"
            >
              <span className="sidebar-cta-icon">➕</span>
              <span>Add Client</span>
            </button>
            <button
              onClick={() => setShowEmployeeModal(true)}
              className="sidebar-cta-button sidebar-cta-employee"
            >
              <span className="sidebar-cta-icon">➕</span>
              <span>Add Employee</span>
            </button>
          </div>
          <div className="sidebar-footer">
            <div className="sidebar-user-info">
              <span className="sidebar-user-icon">👤</span>
              <div>
                <div className="sidebar-username">{user?.username}</div>
                <div className="sidebar-user-role">Administrator</div>
              </div>
            </div>
            <button onClick={logout} className="sidebar-logout">
              🚪 Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="admin-main-content">
          <header className="admin-header">
            <div className="container">
              <div className="admin-header-content">
                <button 
                  onClick={() => {
                    setView('dashboard');
                    setEmployeeSearchTerm('');
                    setCurrentEmployeePage(1);
                  }} 
                  className="back-button-header"
                >
                  ← Dashboard
                </button>
                <h1>Employees</h1>
              </div>
            </div>
          </header>

        <div className="admin-content">
          <div className="container">
            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            
            {/* Search and Filter Bar */}
            <div className="search-filter-bar">
              <div className="search-input-wrapper">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search employees by name, ID, email, phone, department, or position..."
                  value={employeeSearchTerm}
                  onChange={(e) => {
                    setEmployeeSearchTerm(e.target.value);
                    setCurrentEmployeePage(1); // Reset to first page on search
                  }}
                  className="search-input"
                />
                {employeeSearchTerm && (
                  <button
                    onClick={() => setEmployeeSearchTerm('')}
                    className="clear-search-button"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                {/* Filtered and Paginated Results */}
                {(() => {
                  // Filter employees based on search term
                  const filteredEmployees = employees.filter(employee => {
                    if (!employeeSearchTerm) return true;
                    const searchLower = employeeSearchTerm.toLowerCase();
                    return (
                      employee.firstName?.toLowerCase().includes(searchLower) ||
                      employee.lastName?.toLowerCase().includes(searchLower) ||
                      employee.employeeId?.toLowerCase().includes(searchLower) ||
                      employee.email?.toLowerCase().includes(searchLower) ||
                      employee.phone?.toLowerCase().includes(searchLower) ||
                      employee.department?.toLowerCase().includes(searchLower) ||
                      employee.position?.toLowerCase().includes(searchLower)
                    );
                  });

                  // Calculate pagination
                  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
                  const startIndex = (currentEmployeePage - 1) * itemsPerPage;
                  const endIndex = startIndex + itemsPerPage;
                  const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);

                  return (
                    <>
                      <div className="results-info">
                        <span>
                          Showing {paginatedEmployees.length > 0 ? startIndex + 1 : 0} - {Math.min(endIndex, filteredEmployees.length)} of {filteredEmployees.length} employee{filteredEmployees.length !== 1 ? 's' : ''}
                          {employeeSearchTerm && ` (filtered from ${employees.length} total)`}
                        </span>
                      </div>

                      <div className="records-list">
                        {filteredEmployees.length === 0 ? (
                          <div className="empty-state">
                            <p>{employeeSearchTerm ? 'No employees match your search.' : 'No employees found. Add your first employee.'}</p>
                          </div>
                        ) : (
                          paginatedEmployees.map((employee) => (
                    <div
                      key={employee._id}
                      className="record-card"
                    >
                      <div className="record-card-header">
                        <div 
                          className="record-card-content clickable"
                          onClick={() => handleViewDetail('employee', employee._id)}
                        >
                          <h3>
                            {employee.firstName} {employee.lastName} ({employee.employeeId})
                          </h3>
                          <p>
                            <strong>Department:</strong> {employee.department} | <strong>Position:</strong>{' '}
                            {employee.position}
                          </p>
                          <p>
                            <strong>Email:</strong> {employee.email} | <strong>Phone:</strong> {employee.phone}
                          </p>
                          <p>
                            <strong>Salary:</strong> ₹{employee.salary.toLocaleString()} ({employee.salaryType}) |{' '}
                            <strong>Status:</strong> {employee.status || 'active'}
                          </p>
                        </div>
                        <div className="record-card-actions">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEmployeeEdit(employee);
                            }}
                            className="edit-button-small"
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteConfirm({ type: 'employee', id: employee._id });
                            }}
                            className="delete-button-small"
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                          ))
                        )}
                      </div>

                      {/* Pagination Controls */}
                      {totalPages > 1 && (
                        <div className="pagination-controls">
                          <button
                            onClick={() => setCurrentEmployeePage(prev => Math.max(1, prev - 1))}
                            disabled={currentEmployeePage === 1}
                            className="pagination-button"
                          >
                            ← Previous
                          </button>
                          <div className="pagination-info">
                            Page {currentEmployeePage} of {totalPages}
                          </div>
                          <button
                            onClick={() => setCurrentEmployeePage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentEmployeePage === totalPages}
                            className="pagination-button"
                          >
                            Next →
                          </button>
                        </div>
                      )}
                    </>
                  );
                })()}
              </>
            )}
          </div>
        </div>

        {/* Employee Modal */}
        {showEmployeeModal && (
          <div className="modal-overlay" onClick={() => {
            setShowEmployeeModal(false);
            setEditingEmployee(null);
            setEmployeeForm({
              employeeId: '',
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              department: '',
              position: '',
              salary: '',
              salaryType: 'monthly',
              address: { street: '', city: '', state: '', zipCode: '', country: '' },
              bankDetails: { accountNumber: '', bankName: '', ifscCode: '', branch: '' },
            });
          }}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editingEmployee ? 'Edit Employee' : 'Add New Employee'}</h2>
                <button className="modal-close" onClick={() => {
                  setShowEmployeeModal(false);
                  setEditingEmployee(null);
                  setEmployeeForm({
                    employeeId: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    department: '',
                    position: '',
                    salary: '',
                    salaryType: 'monthly',
                    address: { street: '', city: '', state: '', zipCode: '', country: '' },
                    bankDetails: { accountNumber: '', bankName: '', ifscCode: '', branch: '' },
                  });
                }}>
                  ×
                </button>
              </div>
              <form onSubmit={handleEmployeeSubmit} className="admin-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Employee ID *</label>
                    <input
                      type="text"
                      value={employeeForm.employeeId}
                      onChange={(e) => setEmployeeForm({ ...employeeForm, employeeId: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>First Name *</label>
                    <input
                      type="text"
                      value={employeeForm.firstName}
                      onChange={(e) => setEmployeeForm({ ...employeeForm, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name *</label>
                    <input
                      type="text"
                      value={employeeForm.lastName}
                      onChange={(e) => setEmployeeForm({ ...employeeForm, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      value={employeeForm.email}
                      onChange={(e) => setEmployeeForm({ ...employeeForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone *</label>
                    <input
                      type="tel"
                      value={employeeForm.phone}
                      onChange={(e) => setEmployeeForm({ ...employeeForm, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Department *</label>
                    <input
                      type="text"
                      value={employeeForm.department}
                      onChange={(e) => setEmployeeForm({ ...employeeForm, department: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Position *</label>
                    <input
                      type="text"
                      value={employeeForm.position}
                      onChange={(e) => setEmployeeForm({ ...employeeForm, position: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Salary *</label>
                    <input
                      type="number"
                      value={employeeForm.salary}
                      onChange={(e) => setEmployeeForm({ ...employeeForm, salary: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Salary Type</label>
                    <select
                      value={employeeForm.salaryType}
                      onChange={(e) => setEmployeeForm({ ...employeeForm, salaryType: e.target.value })}
                    >
                      <option value="monthly">Monthly</option>
                      <option value="daily">Daily</option>
                      <option value="hourly">Hourly</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="submit-button">
                  {editingEmployee ? 'Update Employee' : 'Add Employee'}
                </button>
              </form>
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
                      if (deleteConfirm.type === 'client') {
                        handleClientDelete(deleteConfirm.id);
                      } else if (deleteConfirm.type === 'employee') {
                        handleEmployeeDelete(deleteConfirm.id);
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
      </div>
    );
  }

  // Fallback delete confirmation modal (if somehow deleteConfirm is set but view is not clients/employees)
  if (deleteConfirm.type) {
    return (
      <div className="admin-dashboard">
        {/* Sidebar for delete modal */}
        <aside className="admin-sidebar">
          <div className="sidebar-header">
            <h2>Menu</h2>
          </div>
          <nav className="sidebar-nav">
            <button
              onClick={() => setView('dashboard')}
              className={`sidebar-nav-item ${view === 'dashboard' ? 'active' : ''}`}
            >
              <span className="sidebar-icon">📊</span>
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setView('clients')}
              className={`sidebar-nav-item ${view === 'clients' ? 'active' : ''}`}
            >
              <span className="sidebar-icon">👥</span>
              <span>Clients</span>
              <span className="sidebar-badge">{parties.length}</span>
            </button>
            <button
              onClick={() => setView('employees')}
              className={`sidebar-nav-item ${view === 'employees' ? 'active' : ''}`}
            >
              <span className="sidebar-icon">👤</span>
              <span>Employees</span>
              <span className="sidebar-badge">{employees.length}</span>
            </button>
          </nav>
          <div className="sidebar-cta">
            <h3>Quick Actions</h3>
            <button
              onClick={() => setShowClientModal(true)}
              className="sidebar-cta-button sidebar-cta-client"
            >
              <span className="sidebar-cta-icon">➕</span>
              <span>Add Client</span>
            </button>
            <button
              onClick={() => setShowEmployeeModal(true)}
              className="sidebar-cta-button sidebar-cta-employee"
            >
              <span className="sidebar-cta-icon">➕</span>
              <span>Add Employee</span>
            </button>
          </div>
          <div className="sidebar-footer">
            <div className="sidebar-user-info">
              <span className="sidebar-user-icon">👤</span>
              <div>
                <div className="sidebar-username">{user?.username}</div>
                <div className="sidebar-user-role">Administrator</div>
              </div>
            </div>
            <button onClick={logout} className="sidebar-logout">
              🚪 Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="admin-main-content">
          <header className="admin-header">
            <div className="container">
              <div className="admin-header-content">
                <h1>{view === 'clients' ? 'Clients' : 'Employees'}</h1>
              </div>
            </div>
          </header>

        {/* Delete Confirmation Modal */}
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
                    if (deleteConfirm.type === 'client') {
                      handleClientDelete(deleteConfirm.id);
                    } else if (deleteConfirm.type === 'employee') {
                      handleEmployeeDelete(deleteConfirm.id);
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
        </div>
      </div>
    );
  }

  return null;
}
