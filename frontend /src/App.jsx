import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  BarChart3, 
  LayoutDashboard, 
  UserPlus, 
  Search,
  Menu,
  X,
  ChevronRight,
  Save,
  Phone,
  Mail,
  QrCode
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

/**
 * MOCK DATA & CONFIGURATION
 * In a real app, this would come from Supabase via FastAPI
 */

const CATEGORIES = [
  { id: 'food', name: 'Food & Prasad', color: 'bg-orange-100 text-orange-800' },
  { id: 'parking', name: 'Parking & Security', color: 'bg-blue-100 text-blue-800' },
  { id: 'cultural', name: 'Cultural Programs', color: 'bg-purple-100 text-purple-800' },
  { id: 'decor', name: 'Decoration', color: 'bg-pink-100 text-pink-800' },
  { id: 'logistics', name: 'Logistics & Cleanup', color: 'bg-gray-100 text-gray-800' },
];

const SUBTASKS = {
  food: ['Serving', 'Cooking Prep', 'Water Station', 'Line Management'],
  parking: ['Main Lot', 'Overflow Lot', 'Traffic Direction', 'VIP Assistance'],
  cultural: ['Stage Management', 'Green Room', 'Audio/Visual Assist', 'Crowd Control'],
  decor: ['Flower Setup', 'Rangoli', 'Stage Decor', 'Diyas/Lighting'],
  logistics: ['Shoe Stall', 'Trash Collection', 'Setup Crew', 'Takedown Crew']
};

const INITIAL_VOLUNTEERS = [
  { id: 1, name: 'Aarav Patel', email: 'aarav@example.com', phone: '512-555-0101', category: 'food', task: 'Serving', status: 'confirmed', registeredAt: '2023-10-01' },
  { id: 2, name: 'Priya Sharma', email: 'priya@example.com', phone: '512-555-0102', category: 'cultural', task: 'Stage Management', status: 'pending', registeredAt: '2023-10-02' },
  { id: 3, name: 'Rohan Gupta', email: 'rohan@example.com', phone: '512-555-0103', category: 'parking', task: 'Main Lot', status: 'checked-in', registeredAt: '2023-10-02' },
  { id: 4, name: 'Sneha Reddy', email: 'sneha@example.com', phone: '512-555-0104', category: 'food', task: 'Cooking Prep', status: 'confirmed', registeredAt: '2023-10-03' },
  { id: 5, name: 'Vikram Singh', email: 'vikram@example.com', phone: '512-555-0105', category: 'decor', task: 'Rangoli', status: 'pending', registeredAt: '2023-10-03' },
];

const TARGETS = {
  food: 10,
  parking: 10,
  cultural: 10,
  decor: 10,
  logistics: 10
};

/**
 * COMPONENT: Stat Card
 */
const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between">
    <div>
      <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
      {subtext && <p className="text-slate-400 text-xs mt-2">{subtext}</p>}
    </div>
    <div className={`p-3 rounded-lg ${color}`}>
      <Icon size={24} className="text-white" />
    </div>
  </div>
);

/**
 * COMPONENT: Coverage Bar
 */
const CoverageBar = ({ category, current, target }) => {
  const percentage = Math.min(100, Math.round((current / target) * 100));
  const isLow = percentage < 50;
  const isGood = percentage >= 80;
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-end mb-1">
        <span className="font-medium text-slate-700">{category}</span>
        <span className="text-sm text-slate-500">{current} / {target} Volunteers</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${isLow ? 'bg-red-500' : isGood ? 'bg-green-500' : 'bg-orange-500'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

/**
 * COMPONENT: Registration Form
 */
const RegistrationForm = ({ onSubmit, categories, subtasks, volunteers }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    task: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setSubmitted(true);
    // Reset after 3 seconds for demo
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', category: '', task: '' });
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto bg-green-50 p-8 rounded-xl border border-green-200 text-center animate-fade-in">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">Registration Complete!</h3>
        <p className="text-green-700">Thank you for volunteering (Seva). You will receive a confirmation SMS shortly.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="mt-6 text-green-700 hover:text-green-900 font-medium underline"
        >
          Register another volunteer
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border-t-4 border-orange-600">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Volunteer Registration</h2>
        <p className="text-slate-500">Sign up for upcoming temple events</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
            <input 
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
              placeholder="e.g. Amit Kumar"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
            <input 
              required
              type="tel"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
              placeholder="(512) 000-0000"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
          <input 
            required
            type="email"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
            placeholder="volunteer@email.com"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Category</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {categories.map(cat => {
              // Calculate remaining spots
              const currentCount = volunteers.filter(v => v.category === cat.id).length;
              const capacity = TARGETS[cat.id];
              const remaining = capacity - currentCount;
              const isWaitlist = remaining <= 0;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFormData({...formData, category: cat.id, task: ''})}
                  className={`p-3 rounded-lg text-sm font-medium border text-left transition-all flex flex-col justify-between min-h-[80px] ${
                    formData.category === cat.id 
                      ? 'border-orange-500 bg-orange-50 text-orange-700 ring-1 ring-orange-500' 
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <span className="font-bold block mb-1">{cat.name}</span>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full w-fit ${
                    isWaitlist 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {isWaitlist ? 'Join Waitlist' : `${remaining} spots left`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {formData.category && (
          <div className="animate-fade-in">
            <label className="block text-sm font-medium text-slate-700 mb-2">Select Specific Task</label>
            <select 
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
              value={formData.task}
              onChange={e => setFormData({...formData, task: e.target.value})}
            >
              <option value="">Select a task...</option>
              {subtasks[formData.category].map(task => (
                <option key={task} value={task}>{task}</option>
              ))}
            </select>
          </div>
        )}

        <button 
          type="submit"
          className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95"
        >
          Submit Registration
        </button>
      </form>
    </div>
  );
};

/**
 * COMPONENT: Admin Dashboard
 */
const AdminDashboard = ({ volunteers, updateStatus, deleteVolunteer }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Computed Stats
  const stats = useMemo(() => {
    return {
      total: volunteers.length,
      checkedIn: volunteers.filter(v => v.status === 'checked-in').length,
      pending: volunteers.filter(v => v.status === 'pending').length,
      foodCoverage: volunteers.filter(v => v.category === 'food').length
    };
  }, [volunteers]);

  // Filter Logic
  const filteredVolunteers = volunteers.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          v.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || v.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Chart Data Preparation
  const chartData = CATEGORIES.map(cat => ({
    name: cat.name,
    Registered: volunteers.filter(v => v.category === cat.id).length,
    Required: TARGETS[cat.id]
  }));

  return (
    <div className="space-y-6">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Volunteers" 
          value={stats.total} 
          icon={Users} 
          color="bg-blue-500" 
          subtext="+5 since yesterday"
        />
        <StatCard 
          title="Checked In" 
          value={stats.checkedIn} 
          icon={CheckCircle} 
          color="bg-green-500" 
          subtext="Live Event Status"
        />
        <StatCard 
          title="Pending Approval" 
          value={stats.pending} 
          icon={AlertCircle} 
          color="bg-orange-500" 
          subtext="Action Required"
        />
        <StatCard 
          title="Food Team" 
          value={`${stats.foodCoverage}/${TARGETS.food}`} 
          icon={LayoutDashboard} 
          color="bg-purple-500" 
          subtext="High Priority"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Coverage Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <BarChart3 size={20} className="text-slate-400" />
            Category Coverage Analysis
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip cursor={{ fill: '#f1f5f9' }} />
                <Legend />
                <Bar dataKey="Registered" fill="#ea580c" radius={[4, 4, 0, 0]} barSize={30} />
                <Bar dataKey="Required" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Coverage List */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Coverage Gaps</h3>
          <div className="space-y-4 overflow-y-auto max-h-[280px] pr-2">
            {CATEGORIES.map(cat => (
              <CoverageBar 
                key={cat.id} 
                category={cat.name} 
                current={volunteers.filter(v => v.category === cat.id).length} 
                target={TARGETS[cat.id]} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Volunteer Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-slate-800">Volunteer Management</h3>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search volunteers..."
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none bg-slate-50 text-slate-600"
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVolunteers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-400">
                    No volunteers found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredVolunteers.map(volunteer => (
                  <tr key={volunteer.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{volunteer.name}</div>
                      <div className="text-xs text-slate-400">{volunteer.registeredAt}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium mb-1 ${CATEGORIES.find(c => c.id === volunteer.category)?.color}`}>
                        {CATEGORIES.find(c => c.id === volunteer.category)?.name}
                      </span>
                      <div className="text-slate-500 text-xs">{volunteer.task}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Mail size={12} className="text-slate-400" />
                        <span>{volunteer.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={12} className="text-slate-400" />
                        <span>{volunteer.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={volunteer.status}
                        onChange={(e) => updateStatus(volunteer.id, e.target.value)}
                        className={`px-2 py-1 rounded-full text-xs font-medium border-0 cursor-pointer outline-none focus:ring-2 focus:ring-offset-1 ${
                          volunteer.status === 'confirmed' ? 'bg-green-100 text-green-700 focus:ring-green-500' :
                          volunteer.status === 'checked-in' ? 'bg-blue-100 text-blue-700 focus:ring-blue-500' :
                          'bg-yellow-100 text-yellow-700 focus:ring-yellow-500'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="checked-in">Checked In</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => deleteVolunteer(volunteer.id)}
                        className="p-2 hover:bg-red-50 text-red-400 hover:text-red-600 rounded-lg transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/**
 * MAIN APP COMPONENT
 */
const App = () => {
  const [currentView, setCurrentView] = useState('registration'); // 'registration' or 'admin'
  const [volunteers, setVolunteers] = useState(INITIAL_VOLUNTEERS);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);

  const handleRegistration = (data) => {
    const newVolunteer = {
      id: volunteers.length + 1,
      ...data,
      status: 'pending',
      registeredAt: new Date().toISOString().split('T')[0]
    };
    setVolunteers([newVolunteer, ...volunteers]);
  };

  const updateStatus = (id, status) => {
    setVolunteers(volunteers.map(v => v.id === id ? { ...v, status } : v));
  };

  const deleteVolunteer = (id) => {
    if (confirm('Are you sure you want to remove this volunteer?')) {
      setVolunteers(volunteers.filter(v => v.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* Navigation */}
      <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-orange-600 p-2 rounded-lg">
              <Users size={24} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">AHT Volunteer Maker</h1>
              <p className="text-xs text-slate-400">Service • Devotion • Community</p>
            </div>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-1 bg-slate-800 p-1 rounded-lg">
            <button 
              onClick={() => setCurrentView('registration')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                currentView === 'registration' ? 'bg-orange-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              Public Registration
            </button>
            <button 
              onClick={() => setCurrentView('admin')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                currentView === 'admin' ? 'bg-orange-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              Admin Dashboard
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-slate-700 p-4 space-y-2">
            <button 
              onClick={() => { setCurrentView('registration'); setIsMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium ${
                currentView === 'registration' ? 'bg-orange-600 text-white' : 'text-slate-300'
              }`}
            >
              Public Registration
            </button>
            <button 
              onClick={() => { setCurrentView('admin'); setIsMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium ${
                currentView === 'admin' ? 'bg-orange-600 text-white' : 'text-slate-300'
              }`}
            >
              Admin Dashboard
            </button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        
        {currentView === 'registration' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold tracking-wide uppercase mb-2">
                Upcoming Event
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Diwali Mela 2025</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Join us in celebrating the festival of lights! We need enthusiastic volunteers to make this event a grand success. Seva starts here.
              </p>
            </div>
            <RegistrationForm 
              onSubmit={handleRegistration} 
              categories={CATEGORIES}
              subtasks={SUBTASKS}
              volunteers={volunteers}
            />
          </div>
        )}

        {currentView === 'admin' && (
          <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Coordinator Dashboard</h2>
                <p className="text-slate-500">Real-time coverage and volunteer tracking</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowQrCode(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 text-sm font-medium transition"
                >
                  <QrCode size={16} /> QR Code
                </button>
                 <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 text-sm font-medium transition">
                  <Save size={16} /> Export CSV
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm font-medium shadow-sm transition">
                  <UserPlus size={16} /> Add Volunteer
                </button>
              </div>
            </div>
            
            <AdminDashboard 
              volunteers={volunteers}
              updateStatus={updateStatus}
              deleteVolunteer={deleteVolunteer}
            />

            {/* QR Code Modal */}
            {showQrCode && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
                <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center relative">
                  <button 
                    onClick={() => setShowQrCode(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-50 p-1 rounded-full"
                  >
                    <X size={20} />
                  </button>
                  
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <QrCode size={24} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Volunteer Sign-up</h3>
                  <p className="text-slate-500 text-sm mb-6">Scan this code to access the registration form directly.</p>
                  
                  <div className="bg-white p-4 rounded-xl border-2 border-slate-100 inline-block mb-6">
                    {/* In a real app, this URL would be window.location.href or the specific event link */}
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://volunteer.austinhindutemple.org/register" 
                      alt="Registration QR Code" 
                      className="w-48 h-48"
                    />
                  </div>

                  <button 
                    onClick={() => window.print()}
                    className="w-full py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition"
                  >
                    Print Flyer
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">© 2025 Austin Hindu Temple. All rights reserved.</p>
          <p className="text-slate-300 text-xs mt-2">Volunteer Management System v1.0</p>
        </div>
      </footer>
    </div>
  );
};

export default App;