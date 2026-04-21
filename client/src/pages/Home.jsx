import React, { useEffect, useState } from "react";
import { getVisits, addVisit, deleteVisit, updateVisit } from "../api";

export default function GatedGuestLog() {
  const [visits, setVisits] = useState([]);
  const [newVisit, setNewVisit] = useState({ 
    visitor_name: "", 
    visitor_phone: "", 
    house_number: "", 
    purpose: "Guest" 
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    loadVisits();
  }, []);

  async function loadVisits() {
    try {
      const data = await getVisits();
      setVisits(data);
    } catch (err) {
      console.error("Error fetching visits:", err);
      setErrorMessage("Failed to load visitors");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  }

  async function handleAddVisit() {
    if (!newVisit.visitor_name || !newVisit.purpose) {
      setErrorMessage("Please fill all required fields!");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    
    try {
      await addVisit(newVisit);
      setNewVisit({ visitor_name: "", visitor_phone: "", house_number: "", purpose: "Guest" });
      loadVisits();
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to add visit. Check console for details.");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  }

  async function handleCheckOut(id) {
    if (!window.confirm("Check out this visitor?")) return;
    
    try {
      await updateVisit(id, { check_out: new Date().toISOString() });
      loadVisits();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to check out visitor");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this visit?")) return;
    
    try {
      await deleteVisit(id);
      loadVisits();
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to delete visit");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  }

  function formatDateTime(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  function isSameDate(date1String, date2String) {
    if (!date1String || !date2String) return false;
    const d1 = new Date(date1String);
    const d2 = new Date(date2String);
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  }

  function filterVisitorsByDate(visitors) {
    if (!selectedDate) return visitors;
    return visitors.filter(v => isSameDate(v.check_in, selectedDate));
  }

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    toast: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '16px 24px',
      borderRadius: '12px',
      color: 'white',
      fontWeight: '600',
      boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      animation: 'slideIn 0.3s ease-out'
    },
    successToast: {
      background: '#10b981'
    },
    errorToast: {
      background: '#ef4444'
    },
    wrapper: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px'
    },
    icon: {
      width: '80px',
      height: '80px',
      background: 'rgba(255,255,255,0.2)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
      fontSize: '40px',
      backdropFilter: 'blur(10px)'
    },
    title: {
      fontSize: '3rem',
      fontWeight: '800',
      color: 'white',
      marginBottom: '10px',
      textShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    subtitle: {
      fontSize: '1.2rem',
      color: 'rgba(255,255,255,0.9)',
      fontWeight: '500'
    },
    card: {
      background: 'rgba(255,255,255,0.95)',
      borderRadius: '24px',
      padding: '32px',
      marginBottom: '30px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      backdropFilter: 'blur(10px)'
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      marginBottom: '30px'
    },
    cardIcon: {
      width: '48px',
      height: '48px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      color: 'white'
    },
    cardTitle: {
      fontSize: '1.8rem',
      fontWeight: '700',
      color: '#1f2937',
      margin: 0
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginBottom: '24px'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    label: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#374151',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    inputWrapper: {
      position: 'relative'
    },
    inputIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '18px',
      color: '#9ca3af'
    },
    input: {
      width: '100%',
      padding: '12px 12px 12px 40px',
      fontSize: '1rem',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      outline: 'none',
      transition: 'all 0.2s',
      backgroundColor: 'white',
      boxSizing: 'border-box'
    },
    select: {
      width: '100%',
      padding: '12px 12px 12px 40px',
      fontSize: '1rem',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      outline: 'none',
      transition: 'all 0.2s',
      backgroundColor: 'white',
      boxSizing: 'border-box',
      cursor: 'pointer',
      appearance: 'none',
      backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%239ca3af\' d=\'M6 9L1 4h10z\'/%3E%3C/svg%3E")',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 12px center'
    },
    button: {
      padding: '14px 32px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      transition: 'all 0.2s',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
    },
    badge: {
      marginLeft: 'auto',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '20px',
      fontSize: '0.875rem',
      fontWeight: '600'
    },
    visitorCard: {
      background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%)',
      border: '2px solid #e0e7ff',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '16px',
      transition: 'all 0.2s'
    },
    visitorGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '16px',
      marginBottom: '16px'
    },
    visitorField: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    },
    fieldLabel: {
      fontSize: '0.75rem',
      fontWeight: '600',
      color: '#6b7280',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    fieldValue: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#1f2937',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    buttonGroup: {
      display: 'flex',
      gap: '10px',
      justifyContent: 'flex-end',
      marginTop: '16px',
      flexWrap: 'wrap'
    },
    checkoutButton: {
      padding: '10px 20px',
      background: '#10b981',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '600',
      transition: 'all 0.2s'
    },
    deleteButton: {
      padding: '10px 20px',
      background: '#ef4444',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '600',
      transition: 'all 0.2s'
    },
    statusBadge: {
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    activeStatus: {
      background: '#dcfce7',
      color: '#166534'
    },
    checkedOutStatus: {
      background: '#fee2e2',
      color: '#991b1b'
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 20px',
      color: '#6b7280'
    },
    emptyIcon: {
      fontSize: '64px',
      marginBottom: '16px',
      opacity: 0.5
    },
    required: {
      color: '#ef4444',
      marginLeft: '4px'
    },
    dateFilterContainer: {
      background: 'rgba(255,255,255,0.95)',
      borderRadius: '24px',
      padding: '24px 32px',
      marginBottom: '30px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      flexWrap: 'wrap'
    },
    dateFilterLabel: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#374151',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    dateInput: {
      padding: '12px 16px',
      fontSize: '1rem',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      outline: 'none',
      transition: 'all 0.2s',
      backgroundColor: 'white',
      cursor: 'pointer',
      fontWeight: '600',
      color: '#374151'
    },
    clearButton: {
      padding: '12px 24px',
      background: '#6b7280',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '600',
      transition: 'all 0.2s'
    },
    todayButton: {
      padding: '12px 24px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '600',
      transition: 'all 0.2s',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
    },
    filterInfo: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#6b7280',
      fontSize: '0.875rem',
      fontWeight: '600'
    }
  };

  const activeVisits = filterVisitorsByDate(visits.filter(v => !v.check_out));
  const checkedOutVisits = filterVisitorsByDate(visits.filter(v => v.check_out));

  const totalActiveVisits = visits.filter(v => !v.check_out).length;
  const totalCheckedOutVisits = visits.filter(v => v.check_out).length;

  return (
    <div style={styles.container}>
      {showSuccess && (
        <div style={{...styles.toast, ...styles.successToast}}>
          <span>✓</span>
          <span>Action completed successfully!</span>
        </div>
      )}

      {showError && (
        <div style={{...styles.toast, ...styles.errorToast}}>
          <span>✕</span>
          <span>{errorMessage}</span>
        </div>
      )}

      <div style={styles.wrapper}>
        <div style={styles.header}>
          <div style={styles.icon}>🏘️</div>
          <h1 style={styles.title}>Gated Community</h1>
          <p style={styles.subtitle}>Visitor Management System</p>
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardIcon}>➕</div>
            <h2 style={styles.cardTitle}>Register New Visitor</h2>
          </div>

          <div style={styles.formGrid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Visitor Name <span style={styles.required}>*</span>
              </label>
              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>👤</span>
                <input
                  type="text"
                  value={newVisit.visitor_name}
                  onChange={(e) => setNewVisit({ ...newVisit, visitor_name: e.target.value })}
                  placeholder="Enter full name"
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Phone Number</label>
              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>📞</span>
                <input
                  type="tel"
                  value={newVisit.visitor_phone}
                  onChange={(e) => setNewVisit({ ...newVisit, visitor_phone: e.target.value })}
                  placeholder="Enter phone number"
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>House Number</label>
              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>🏠</span>
                <input
                  type="text"
                  value={newVisit.house_number}
                  onChange={(e) => setNewVisit({ ...newVisit, house_number: e.target.value })}
                  placeholder="Enter house/unit number"
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Purpose of Visit <span style={styles.required}>*</span>
              </label>
              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>📝</span>
                <select
                  value={newVisit.purpose}
                  onChange={(e) => setNewVisit({ ...newVisit, purpose: e.target.value })}
                  style={styles.select}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                >
                  <option value="Guest">Guest</option>
                  <option value="Delivery">Delivery</option>
                  <option value="Helper">Helper</option>
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={handleAddVisit}
            style={styles.button}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
            }}
          >
            <span>➕</span>
            <span>Check In Visitor</span>
          </button>
        </div>

        {/* Date Filter Section */}
        <div style={styles.dateFilterContainer}>
          <span style={styles.dateFilterLabel}>
            <span>📅</span>
            Filter by Date:
          </span>
          
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={styles.dateInput}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />

          <button
            onClick={() => setSelectedDate(getTodayDate())}
            style={styles.todayButton}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            📆 Today
          </button>

          {selectedDate && (
            <button
              onClick={() => setSelectedDate("")}
              style={styles.clearButton}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.background = '#4b5563';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = '#6b7280';
              }}
            >
              ✕ Clear Filter
            </button>
          )}

          <div style={styles.filterInfo}>
            {selectedDate ? (
              <span>Showing visitors for {new Date(selectedDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
            ) : (
              <span>Showing all visitors</span>
            )}
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardIcon}>👥</div>
            <h2 style={styles.cardTitle}>Active Visitors</h2>
            <span style={styles.badge}>
              {selectedDate ? `${activeVisits.length} of ${totalActiveVisits}` : `${activeVisits.length} Active`}
            </span>
          </div>

          {activeVisits.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>👥</div>
              <p style={{fontSize: '1.2rem', fontWeight: '600', marginBottom: '8px'}}>
                {selectedDate ? 'No active visitors on this date' : 'No active visitors'}
              </p>
              <p style={{fontSize: '0.9rem'}}>
                {selectedDate ? 'Try selecting a different date' : 'All visitors have checked out'}
              </p>
            </div>
          ) : (
            <div>
              {activeVisits.map((v) => (
                <div
                  key={v.id}
                  style={styles.visitorCard}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
                    <span style={{...styles.statusBadge, ...styles.activeStatus}}>
                      🟢 Active
                    </span>
                    <span style={{fontSize: '0.875rem', color: '#6b7280'}}>
                      ID: #{v.id}
                    </span>
                  </div>

                  <div style={styles.visitorGrid}>
                    <div style={styles.visitorField}>
                      <span style={styles.fieldLabel}>Visitor Name</span>
                      <span style={styles.fieldValue}>
                        <span>👤</span>
                        {v.visitor_name}
                      </span>
                    </div>
                    
                    <div style={styles.visitorField}>
                      <span style={styles.fieldLabel}>Phone Number</span>
                      <span style={styles.fieldValue}>
                        <span>📞</span>
                        {v.visitor_phone || 'N/A'}
                      </span>
                    </div>
                    
                    <div style={styles.visitorField}>
                      <span style={styles.fieldLabel}>House Number</span>
                      <span style={styles.fieldValue}>
                        <span>🏠</span>
                        {v.house_number || 'N/A'}
                      </span>
                    </div>
                    
                    <div style={styles.visitorField}>
                      <span style={styles.fieldLabel}>Purpose</span>
                      <span style={styles.fieldValue}>
                        <span>📝</span>
                        {v.purpose}
                      </span>
                    </div>

                    <div style={styles.visitorField}>
                      <span style={styles.fieldLabel}>Check-In Time</span>
                      <span style={styles.fieldValue}>
                        <span>🕐</span>
                        {formatDateTime(v.check_in)}
                      </span>
                    </div>
                  </div>

                  <div style={styles.buttonGroup}>
                    <button
                      onClick={() => handleCheckOut(v.id)}
                      style={styles.checkoutButton}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.background = '#059669';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.background = '#10b981';
                      }}
                    >
                      ✓ Check Out
                    </button>
                    <button
                      onClick={() => handleDelete(v.id)}
                      style={styles.deleteButton}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.background = '#dc2626';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.background = '#ef4444';
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {(checkedOutVisits.length > 0 || (selectedDate && totalCheckedOutVisits > 0)) && (
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.cardIcon}>📋</div>
              <h2 style={styles.cardTitle}>Checked Out Visitors</h2>
              <span style={{...styles.badge, background: '#6b7280'}}>
                {selectedDate ? `${checkedOutVisits.length} of ${totalCheckedOutVisits}` : `${checkedOutVisits.length} Completed`}
              </span>
            </div>

            {checkedOutVisits.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>📋</div>
                <p style={{fontSize: '1.2rem', fontWeight: '600', marginBottom: '8px'}}>
                  No checked out visitors on this date
                </p>
                <p style={{fontSize: '0.9rem'}}>Try selecting a different date</p>
              </div>
            ) : (
            <div>
              {checkedOutVisits.map((v) => (
                <div
                  key={v.id}
                  style={{...styles.visitorCard, opacity: 0.7}}
                >
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
                    <span style={{...styles.statusBadge, ...styles.checkedOutStatus}}>
                      🔴 Checked Out
                    </span>
                    <span style={{fontSize: '0.875rem', color: '#6b7280'}}>
                      ID: #{v.id}
                    </span>
                  </div>

                  <div style={styles.visitorGrid}>
                    <div style={styles.visitorField}>
                      <span style={styles.fieldLabel}>Visitor Name</span>
                      <span style={styles.fieldValue}>
                        <span>👤</span>
                        {v.visitor_name}
                      </span>
                    </div>
                    
                    <div style={styles.visitorField}>
                      <span style={styles.fieldLabel}>Purpose</span>
                      <span style={styles.fieldValue}>
                        <span>📝</span>
                        {v.purpose}
                      </span>
                    </div>

                    <div style={styles.visitorField}>
                      <span style={styles.fieldLabel}>Check-In</span>
                      <span style={styles.fieldValue}>
                        <span>🕐</span>
                        {formatDateTime(v.check_in)}
                      </span>
                    </div>

                    <div style={styles.visitorField}>
                      <span style={styles.fieldLabel}>Check-Out</span>
                      <span style={styles.fieldValue}>
                        <span>🕐</span>
                        {formatDateTime(v.check_out)}
                      </span>
                    </div>
                  </div>

                  <div style={styles.buttonGroup}>
                    <button
                      onClick={() => handleDelete(v.id)}
                      style={styles.deleteButton}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.background = '#dc2626';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.background = '#ef4444';
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}