// src/pages/WaitlistDashboard.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { AuthService } from '../lib/auth';
import { 
  Search, Filter, Download, Mail, CheckCircle, 
  RefreshCw, Users, Calendar, LogOut, Trash2,
  ChevronLeft, ChevronRight, Menu, X, Shield
} from 'lucide-react';

const WaitlistDashboard = () => {
  const [waitlist, setWaitlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    contacted: 0,
    today: 0,
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Check screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch user data
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);
  }, []);

  // Fetch waitlist data
  const fetchWaitlist = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('waitlist')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%`);
      }

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      
      setWaitlist(data || []);
      updateStats(data || []);
      
    } catch (error) {
      console.error('Error fetching waitlist:', error);
      alert('Failed to fetch waitlist data');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, statusFilter]);

  // Calculate statistics
  const updateStats = (data) => {
    const today = new Date().toISOString().split('T')[0];
    const todayCount = data.filter(item => 
      item.created_at.split('T')[0] === today
    ).length;

    setStats({
      total: data.length,
      active: data.filter(item => item.status === 'active').length,
      contacted: data.filter(item => item.status === 'contacted').length,
      today: todayCount,
    });
  };

  // Update status
  const updateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('waitlist')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setWaitlist(waitlist.map(item => 
        item.id === id ? { ...item, status: newStatus } : item
      ));
      
      fetchWaitlist();
      
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  // Delete entry
  const deleteEntry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;

    try {
      const { error } = await supabase
        .from('waitlist')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setWaitlist(waitlist.filter(item => item.id !== id));
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
      fetchWaitlist();
      
    } catch (error) {
      console.error('Error deleting entry:', error);
      alert('Failed to delete entry');
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Location', 'Status', 'Joined Date'];
    const csvData = waitlist.map(item => [
      `"${item.name}"`,
      item.email,
      item.location,
      item.status,
      new Date(item.created_at).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `waitlist-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Send email to selected
  const sendBulkEmail = () => {
    if (selectedRows.length === 0) {
      alert('Please select at least one entry');
      return;
    }

    const emails = waitlist
      .filter(item => selectedRows.includes(item.id))
      .map(item => item.email)
      .join(',');

    window.location.href = `mailto:?bcc=${emails}&subject=EazyHire Waitlist Update&body=Dear EazyHire Early Access Member,%0D%0A%0D%0A`;
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await AuthService.logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Select/deselect all
  const toggleSelectAll = () => {
    if (selectedRows.length === currentItems.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentItems.map(item => item.id));
    }
  };

  // Handle row selection
  const toggleRowSelection = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Pagination
  const totalPages = Math.ceil(waitlist.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = waitlist.slice(indexOfFirstItem, indexOfLastItem);

  // Initial fetch
  useEffect(() => {
    fetchWaitlist();
  }, [fetchWaitlist]);

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Styles
  const styles = {
    container: {
      minHeight: '100vh',
      background: '#f8f9fa',
      fontFamily: 'Inter, sans-serif',
      color: '#333333',
    },
    
    header: {
      background: '#ffffff',
      borderBottom: '1px solid #e9ecef',
      padding: '0 20px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    },
    
    headerContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '70px',
    },
    
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
    },
    
    mobileMenuButton: {
      background: 'none',
      border: 'none',
      color: '#6c757d',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8px',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
    },
    
    logoIcon: {
      width: '36px',
      height: '36px',
      background: 'linear-gradient(135deg, #00B894 0%, #009975 100%)',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    logoText: {
      fontSize: '20px',
      fontWeight: 700,
      color: '#333333',
      margin: 0,
    },
    
    logoSubtext: {
      fontSize: '12px',
      color: '#6c757d',
      margin: 0,
    },
    
    desktopActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
    },
    
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '8px 16px',
      background: '#f8f9fa',
      borderRadius: '12px',
      border: '1px solid #e9ecef',
    },
    
    userAvatar: {
      width: '32px',
      height: '32px',
      background: '#00B894',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      fontWeight: 600,
      fontSize: '14px',
    },
    
    logoutButton: {
      padding: '10px 20px',
      background: '#ffffff',
      color: '#dc3545',
      border: '1px solid #dc3545',
      borderRadius: '8px',
      fontWeight: 600,
      fontSize: '14px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.3s ease',
    },
    
    mobileActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    
    mobileLogoutButton: {
      padding: '8px',
      background: 'none',
      color: '#dc3545',
      border: '1px solid #dc3545',
      borderRadius: '8px',
      fontWeight: 600,
      fontSize: '12px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      transition: 'all 0.3s ease',
    },
    
    mobileMenuOverlay: {
      position: 'fixed',
      top: '70px',
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      zIndex: 90,
    },
    
    mobileMenuContent: {
      background: '#ffffff',
      width: '280px',
      height: '100%',
      padding: '20px',
      borderRight: '1px solid #e9ecef',
      overflowY: 'auto',
    },
    
    mobileUserInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '15px',
      background: '#f8f9fa',
      borderRadius: '12px',
      border: '1px solid #e9ecef',
      marginBottom: '20px',
    },
    
    mobileUserAvatar: {
      width: '40px',
      height: '40px',
      background: '#00B894',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      fontWeight: 600,
      fontSize: '16px',
    },
    
    mobileStats: {
      background: '#f8f9fa',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid #e9ecef',
      marginBottom: '20px',
    },
    
    mainContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '20px',
    },
    
    dashboardHeader: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      marginBottom: '30px',
    },
    
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '20px',
      marginBottom: '30px',
    },
    
    statCard: {
      background: '#ffffff',
      borderRadius: '16px',
      padding: '25px',
      border: '1px solid #e9ecef',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s ease',
    },
    
    controlsCard: {
      background: '#ffffff',
      borderRadius: '16px',
      padding: '25px',
      border: '1px solid #e9ecef',
      marginBottom: '30px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    },
    
    dataTable: {
      background: '#ffffff',
      borderRadius: '16px',
      overflow: 'hidden',
      border: '1px solid #e9ecef',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
      marginBottom: '30px',
      overflowX: 'auto',
    },
    
    quickActions: {
      padding: '25px',
      background: '#ffffff',
      borderRadius: '16px',
      border: '1px solid #e9ecef',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    },
    
    footer: {
      background: '#ffffff',
      borderTop: '1px solid #e9ecef',
      padding: '30px 20px',
      marginTop: '60px',
    },
    
    footerContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      textAlign: 'center',
    },
  };

  // Conditional styles based on screen size
  const responsiveStyles = {
    mobileMenuButton: {
      ...styles.mobileMenuButton,
      display: isMobile ? 'flex' : 'none',
    },
    
    logoText: {
      ...styles.logoText,
      fontSize: isMobile ? '18px' : '20px',
    },
    
    logoSubtext: {
      ...styles.logoSubtext,
      display: isMobile ? 'none' : 'block',
    },
    
    desktopActions: {
      ...styles.desktopActions,
      display: isMobile ? 'none' : 'flex',
    },
    
    mobileActions: {
      ...styles.mobileActions,
      display: isMobile ? 'flex' : 'none',
    },
    
    mobileMenuOverlay: {
      ...styles.mobileMenuOverlay,
      display: mobileMenuOpen ? 'block' : 'none',
    },
    
    dashboardHeader: {
      ...styles.dashboardHeader,
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: isMobile ? 'flex-start' : 'space-between',
      alignItems: isMobile ? 'flex-start' : 'center',
    },
    
    mainContent: {
      ...styles.mainContent,
      padding: isMobile ? '20px' : '30px',
    },
    
    statCard: {
      ...styles.statCard,
      padding: isMobile ? '20px' : '25px',
    },
  };

  return (
    <div style={styles.container}>
      {/* Top Navigation */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          {/* Logo and mobile menu button */}
          <div style={styles.logoContainer}>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={responsiveStyles.mobileMenuButton}
              onMouseEnter={(e) => {
                e.target.style.background = '#f8f9fa';
                e.target.style.color = '#333333';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'none';
                e.target.style.color = '#6c757d';
              }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={styles.logoIcon}>
                <Shield size={20} color="#ffffff" />
              </div>
              <div>
                <h1 style={responsiveStyles.logoText}>
                  EazyHire Admin
                </h1>
                <p style={responsiveStyles.logoSubtext}>
                  Waitlist Dashboard
                </p>
              </div>
            </div>
          </div>

          {/* Desktop actions */}
          <div style={responsiveStyles.desktopActions}>
            <div style={styles.userInfo}>
              <div style={styles.userAvatar}>
                {user?.email?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div>
                <p style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#333333',
                  margin: 0,
                }}>
                  {user?.email?.split('@')[0] || 'Admin'}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              style={styles.logoutButton}
              onMouseEnter={(e) => {
                e.target.style.background = '#dc3545';
                e.target.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#ffffff';
                e.target.style.color = '#dc3545';
              }}
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {/* Mobile actions */}
          <div style={responsiveStyles.mobileActions}>
            <button
              onClick={handleLogout}
              style={styles.mobileLogoutButton}
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div style={responsiveStyles.mobileMenuOverlay} onClick={() => setMobileMenuOpen(false)}>
          <div style={styles.mobileMenuContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.mobileUserInfo}>
              <div style={styles.mobileUserAvatar}>
                {user?.email?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <p style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#333333',
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {user?.email || 'Admin User'}
                </p>
                <p style={{
                  fontSize: '12px',
                  color: '#6c757d',
                  margin: 0,
                }}>
                  Administrator
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div style={styles.mobileStats}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '15px',
              }}>
                <div>
                  <p style={{
                    fontSize: '12px',
                    color: '#6c757d',
                    margin: 0,
                  }}>
                    Today's Signups
                  </p>
                  <p style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#333333',
                    margin: '5px 0 0 0',
                  }}>
                    {stats.today}
                  </p>
                </div>
                <Users size={24} color="#00B894" />
              </div>
              <div style={{
                height: '4px',
                background: '#e9ecef',
                borderRadius: '2px',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: '75%',
                  height: '100%',
                  background: '#00B894',
                  borderRadius: '2px',
                }}></div>
              </div>
            </div>

            {/* Stats cards for mobile */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              marginBottom: '20px',
            }}>
              <div style={{
                background: '#ffffff',
                borderRadius: '10px',
                padding: '15px',
                border: '1px solid #e9ecef',
                textAlign: 'center',
              }}>
                <p style={{
                  fontSize: '12px',
                  color: '#6c757d',
                  marginBottom: '5px',
                }}>
                  Total
                </p>
                <p style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#333333',
                  margin: 0,
                }}>
                  {stats.total}
                </p>
              </div>
              <div style={{
                background: '#ffffff',
                borderRadius: '10px',
                padding: '15px',
                border: '1px solid #e9ecef',
                textAlign: 'center',
              }}>
                <p style={{
                  fontSize: '12px',
                  color: '#6c757d',
                  marginBottom: '5px',
                }}>
                  Active
                </p>
                <p style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#333333',
                  margin: 0,
                }}>
                  {stats.active}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div style={responsiveStyles.mainContent}>
        {/* Dashboard header */}
        <div style={responsiveStyles.dashboardHeader}>
          <div>
            <h2 style={{
              fontSize: isMobile ? '20px' : '24px',
              fontWeight: 700,
              color: '#333333',
              marginBottom: '8px',
            }}>
              Waitlist Management
            </h2>
            <p style={{
              color: '#6c757d',
              fontSize: isMobile ? '14px' : '16px',
            }}>
              Manage and monitor your waitlist subscribers
            </p>
          </div>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <button
              onClick={fetchWaitlist}
              disabled={loading}
              style={{
                padding: isMobile ? '10px 20px' : '12px 24px',
                background: loading ? '#e9ecef' : '#ffffff',
                color: loading ? '#6c757d' : '#333333',
                border: '1px solid #e9ecef',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: isMobile ? '13px' : '14px',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease',
              }}
            >
              <RefreshCw size={18} className={loading ? 'spin' : ''} />
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
            <button
              onClick={exportToCSV}
              style={{
                padding: isMobile ? '10px 20px' : '12px 24px',
                background: '#00B894',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: isMobile ? '13px' : '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease',
              }}
            >
              <Download size={18} />
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats cards */}
        <div style={styles.statsGrid}>
          {[
            {
              title: 'Total Subscribers',
              value: stats.total,
              icon: <Users size={24} />,
              color: '#00B894',
            },
            {
              title: 'Active',
              value: stats.active,
              icon: <CheckCircle size={24} />,
              color: '#28a745',
            },
            {
              title: 'Contacted',
              value: stats.contacted,
              icon: <Mail size={24} />,
              color: '#17a2b8',
            },
            {
              title: "Today's Signups",
              value: stats.today,
              icon: <Calendar size={24} />,
              color: '#ffc107',
            },
          ].map((stat, index) => (
            <div
              key={index}
              style={responsiveStyles.statCard}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '15px',
              }}>
                <div>
                  <p style={{
                    fontSize: '14px',
                    color: '#6c757d',
                    marginBottom: '8px',
                    fontWeight: 500,
                  }}>
                    {stat.title}
                  </p>
                  <h3 style={{
                    fontSize: isMobile ? '28px' : '32px',
                    fontWeight: 700,
                    color: '#333333',
                    margin: 0,
                  }}>
                    {stat.value}
                  </h3>
                </div>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: `${stat.color}10`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: stat.color,
                }}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div style={styles.controlsCard}>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '20px',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'stretch' : 'center',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '15px',
              width: '100%',
              alignItems: isMobile ? 'stretch' : 'center',
            }}>
              {/* Search */}
              <div style={{ position: 'relative', width: '100%' }}>
                <Search size={18} style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#6c757d',
                }} />
                <input
                  type="text"
                  placeholder="Search subscribers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 45px',
                    border: '1px solid #e9ecef',
                    borderRadius: '10px',
                    fontSize: '14px',
                    color: '#333333',
                    background: '#ffffff',
                    transition: 'all 0.3s ease',
                  }}
                />
              </div>

              {/* Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding: '12px 16px',
                  border: '1px solid #e9ecef',
                  borderRadius: '10px',
                  fontSize: '14px',
                  color: '#333333',
                  background: '#ffffff',
                  cursor: 'pointer',
                  width: isMobile ? '100%' : '180px',
                  transition: 'all 0.3s ease',
                }}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="contacted">Contacted</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {selectedRows.length > 0 && (
              <button
                onClick={sendBulkEmail}
                style={{
                  padding: '12px 24px',
                  background: '#17a2b8',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                <Mail size={18} />
                Email Selected ({selectedRows.length})
              </button>
            )}
          </div>

          {/* Selected actions */}
          {selectedRows.length > 0 && (
            <div style={{
              padding: '16px',
              background: '#f8f9fa',
              borderRadius: '10px',
              border: '1px solid #e9ecef',
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              marginTop: '20px',
              flexWrap: 'wrap',
            }}>
              <span style={{
                fontSize: '14px',
                color: '#333333',
                fontWeight: 500,
              }}>
                {selectedRows.length} subscribers selected
              </span>
              <button
                onClick={() => setSelectedRows([])}
                style={{
                  padding: '6px 12px',
                  background: '#ffffff',
                  color: '#6c757d',
                  border: '1px solid #e9ecef',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                Clear selection
              </button>
            </div>
          )}
        </div>

        {/* Data Table */}
        <div style={styles.dataTable}>
          {loading ? (
            <div style={{ padding: '80px', textAlign: 'center' }}>
              <div style={{
                width: '50px',
                height: '50px',
                border: '3px solid #e9ecef',
                borderTopColor: '#00B894',
                borderRadius: '50%',
                margin: '0 auto 20px',
                animation: 'spin 1s linear infinite'
              }}></div>
              <p style={{
                color: '#6c757d',
                fontSize: '16px',
                fontWeight: 500,
              }}>
                Loading waitlist data...
              </p>
            </div>
          ) : (
            <>
              <div style={{ minWidth: isMobile ? '800px' : 'auto' }}>
                <table style={{ 
                  width: '100%', 
                  borderCollapse: 'collapse',
                }}>
                  <thead>
                    <tr style={{ 
                      background: '#f8f9fa',
                      borderBottom: '1px solid #e9ecef',
                    }}>
                      <th style={{ 
                        padding: '20px',
                        textAlign: 'left',
                        borderBottom: '1px solid #e9ecef',
                        fontWeight: 600,
                        color: '#333333',
                        fontSize: '13px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        width: '50px',
                      }}>
                        <input
                          type="checkbox"
                          checked={selectedRows.length === currentItems.length && currentItems.length > 0}
                          onChange={toggleSelectAll}
                          style={{
                            width: '18px',
                            height: '18px',
                            accentColor: '#00B894',
                            cursor: 'pointer',
                          }}
                        />
                      </th>
                      {[
                        { label: 'Subscriber', width: '25%' },
                        { label: 'Email', width: '25%' },
                        { label: 'Location', width: '15%' },
                        { label: 'Status', width: '15%' },
                        { label: 'Joined', width: '15%' },
                        { label: 'Actions', width: '10%' },
                      ].map((header, idx) => (
                        <th 
                          key={idx}
                          style={{ 
                            padding: '20px',
                            textAlign: 'left',
                            borderBottom: '1px solid #e9ecef',
                            fontWeight: 600,
                            color: '#333333',
                            fontSize: '13px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            width: header.width,
                          }}
                        >
                          {header.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length === 0 ? (
                      <tr>
                        <td colSpan="7" style={{ 
                          padding: '60px', 
                          textAlign: 'center', 
                          color: '#6c757d',
                        }}>
                          <Users size={40} style={{ marginBottom: '20px', opacity: 0.5 }} />
                          <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '10px' }}>
                            No waitlist entries found
                          </div>
                          <div style={{ fontSize: '14px', color: '#6c757d' }}>
                            {searchTerm ? 'Try adjusting your search filters' : 'Start by adding subscribers to your waitlist'}
                          </div>
                        </td>
                      </tr>
                    ) : (
                      currentItems.map((item, index) => (
                        <tr 
                          key={item.id}
                          style={{ 
                            borderBottom: '1px solid #f8f9fa',
                            transition: 'all 0.2s ease',
                            background: selectedRows.includes(item.id) ? '#00B89405' : 'transparent',
                          }}
                        >
                          <td style={{ padding: '20px' }}>
                            <input
                              type="checkbox"
                              checked={selectedRows.includes(item.id)}
                              onChange={() => toggleRowSelection(item.id)}
                              style={{
                                width: '18px',
                                height: '18px',
                                accentColor: '#00B894',
                                cursor: 'pointer',
                              }}
                            />
                          </td>
                          <td style={{ padding: '20px' }}>
                            <div style={{ 
                              fontSize: '15px', 
                              fontWeight: 600, 
                              color: '#333333',
                            }}>
                              {item.name}
                            </div>
                          </td>
                          <td style={{ padding: '20px' }}>
                            <a 
                              href={`mailto:${item.email}`}
                              style={{
                                color: '#00B894',
                                textDecoration: 'none',
                                fontSize: '14px',
                                fontWeight: 500,
                                transition: 'color 0.3s ease',
                              }}
                            >
                              {item.email}
                            </a>
                          </td>
                          <td style={{ 
                            padding: '20px', 
                            fontSize: '14px',
                            color: '#333333',
                          }}>
                            {item.location}
                          </td>
                          <td style={{ padding: '20px' }}>
                            <select
                              value={item.status}
                              onChange={(e) => updateStatus(item.id, e.target.value)}
                              style={{
                                padding: '8px 12px',
                                borderRadius: '8px',
                                border: '1px solid #e9ecef',
                                background: item.status === 'active' ? '#00B89410' : 
                                          item.status === 'contacted' ? '#ffc10710' : 
                                          '#dc354510',
                                color: item.status === 'active' ? '#00B894' : 
                                      item.status === 'contacted' ? '#ffc107' : 
                                      '#dc3545',
                                fontWeight: 600,
                                fontSize: '13px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                minWidth: '120px',
                              }}
                            >
                              <option value="active">Active</option>
                              <option value="contacted">Contacted</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </td>
                          <td style={{ 
                            padding: '20px', 
                            color: '#6c757d',
                            fontSize: '14px',
                          }}>
                            {formatDate(item.created_at)}
                          </td>
                          <td style={{ padding: '20px' }}>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                onClick={() => window.location.href = `mailto:${item.email}?subject=EazyHire Update`}
                                title="Send email"
                                style={{
                                  padding: '8px',
                                  background: '#f8f9fa',
                                  border: '1px solid #e9ecef',
                                  borderRadius: '8px',
                                  color: '#17a2b8',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  transition: 'all 0.3s ease',
                                }}
                              >
                                <Mail size={16} />
                              </button>
                              <button
                                onClick={() => deleteEntry(item.id)}
                                title="Delete"
                                style={{
                                  padding: '8px',
                                  background: '#f8f9fa',
                                  border: '1px solid #e9ecef',
                                  borderRadius: '8px',
                                  color: '#dc3545',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  transition: 'all 0.3s ease',
                                }}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: '15px',
                  padding: '20px 25px',
                  borderTop: '1px solid #e9ecef',
                  background: '#ffffff',
                  justifyContent: 'space-between',
                  alignItems: isMobile ? 'stretch' : 'center',
                }}>
                  <div style={{ 
                    color: '#6c757d', 
                    fontSize: '14px',
                  }}>
                    Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, waitlist.length)} of {waitlist.length} entries
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      style={{
                        padding: '8px 16px',
                        background: currentPage === 1 ? '#f8f9fa' : '#ffffff',
                        border: '1px solid #e9ecef',
                        borderRadius: '8px',
                        color: currentPage === 1 ? '#adb5bd' : '#333333',
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14px',
                        fontWeight: 500,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <ChevronLeft size={18} />
                      Previous
                    </button>
                    
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(page => 
                          page === 1 || 
                          page === totalPages || 
                          Math.abs(page - currentPage) <= 2
                        )
                        .map((page, index, array) => (
                          <React.Fragment key={page}>
                            {index > 0 && array[index - 1] !== page - 1 && (
                              <span style={{ 
                                padding: '8px 12px',
                                color: '#6c757d',
                                fontSize: '14px',
                              }}>...</span>
                            )}
                            <button
                              onClick={() => setCurrentPage(page)}
                              style={{
                                padding: '8px 12px',
                                background: currentPage === page ? '#00B894' : '#ffffff',
                                border: `1px solid ${currentPage === page ? '#00B894' : '#e9ecef'}`,
                                borderRadius: '8px',
                                color: currentPage === page ? '#ffffff' : '#333333',
                                cursor: 'pointer',
                                fontWeight: currentPage === page ? 600 : 400,
                                fontSize: '14px',
                                transition: 'all 0.3s ease',
                                minWidth: '40px',
                              }}
                            >
                              {page}
                            </button>
                          </React.Fragment>
                        ))}
                    </div>
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      style={{
                        padding: '8px 16px',
                        background: currentPage === totalPages ? '#f8f9fa' : '#ffffff',
                        border: '1px solid #e9ecef',
                        borderRadius: '8px',
                        color: currentPage === totalPages ? '#adb5bd' : '#333333',
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14px',
                        fontWeight: 500,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Next
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Quick actions */}
        <div style={styles.quickActions}>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: 600, 
            marginBottom: '20px', 
            color: '#333333',
          }}>
            Quick Actions
          </h3>
          <div style={{ 
            display: 'flex', 
            gap: '15px', 
            flexWrap: 'wrap',
            flexDirection: isMobile ? 'column' : 'row',
          }}>
            <button
              onClick={() => window.location.href = `mailto:?bcc=${waitlist.map(item => item.email).join(',')}&subject=EazyHire Launch Announcement`}
              style={{
                padding: '12px 24px',
                background: '#ffffff',
                color: '#00B894',
                border: '1px solid #00B894',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.3s ease',
                width: isMobile ? '100%' : 'auto',
              }}
            >
              <Mail size={18} />
              Email All Subscribers
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              style={{
                padding: '12px 24px',
                background: '#ffffff',
                color: '#28a745',
                border: '1px solid #28a745',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.3s ease',
                width: isMobile ? '100%' : 'auto',
              }}
            >
              <Users size={18} />
              Show Active Only
            </button>
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setCurrentPage(1);
              }}
              style={{
                padding: '12px 24px',
                background: '#ffffff',
                color: '#6c757d',
                border: '1px solid #e9ecef',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.3s ease',
                width: isMobile ? '100%' : 'auto',
              }}
            >
              <Filter size={18} />
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Global footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <p style={{
            color: '#6c757d',
            fontSize: '14px',
            margin: 0,
          }}>
            © {new Date().getFullYear()} EazyHire Admin Dashboard
          </p>
        </div>
      </footer>

      <style data-jsx="true">{`
        .spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        input:focus, select:focus {
          outline: none;
          border-color: #00B894 !important;
          box-shadow: 0 0 0 3px rgba(0, 184, 148, 0.1);
        }
        
        button:focus {
          outline: 2px solid #00B894;
          outline-offset: 2px;
        }
        
        tr:hover td {
          background-color: #f8f9fa !important;
        }
        
        button:hover:not(:disabled) {
          transform: translateY(-2px);
        }
        
        a:hover {
          color: #009975 !important;
        }
        
        /* Responsive table for mobile */
        @media (max-width: 768px) {
          table {
            font-size: 14px;
          }
          
          th, td {
            padding: 12px 8px !important;
          }
        }
        
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default WaitlistDashboard;