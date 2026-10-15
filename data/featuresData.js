import {
  Briefcase,
  CheckCircle2,
  Clock,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Layers,
  Users,
  Building2,
  UserCheck,
} from 'lucide-react';

export const KEY_FEATURES = [
  {
    title: 'Projects & Tasks',
    desc: 'Plan, assign and track work across teams with real-time status updates.',
    icon: Briefcase,
    badge: '4/5 Tasks Done',
    badgeBg: '#e6f9fc',
    badgeColor: '#00B4D8',
  },
  {
    title: 'Daily Work Log',
    desc: 'Capture daily updates, progress, and team shift logs effortlessly.',
    icon: CheckCircle2,
    badge: 'Today • 05 Logs',
    badgeBg: '#dcfce7',
    badgeColor: '#16a34a',
  },
  {
    title: 'Time Tracking',
    desc: 'Track billable vs non-billable hours with precision time logs.',
    icon: Clock,
    badge: '⏱️ 04h : 20m Active',
    badgeBg: '#fef3c7',
    badgeColor: '#d97706',
  },
  {
    title: 'Project Costing',
    desc: 'Monitor project budgets, labor expenses, and profit margins.',
    icon: TrendingUp,
    badge: '📈 +24% ROI Saved',
    badgeBg: '#e0e7ff',
    badgeColor: '#4f46e5',
  },
  {
    title: 'Dashboards & Reports',
    desc: 'Get real-time organizational metrics and exportable PDF summaries.',
    icon: BarChart3,
    badge: '📊 98.4% On-time',
    badgeBg: '#e6f9fc',
    badgeColor: '#00B4D8',
  },
  {
    title: 'Roles & Access',
    desc: 'Enforce security with role-based access control for Admin, PM, and Staff.',
    icon: ShieldCheck,
    badge: '🔒 Admin • PM • Staff',
    badgeBg: '#f3e8ff',
    badgeColor: '#9333ea',
  },
];

export const INDUSTRY_SOLUTIONS = [
  { title: 'IT Services', desc: 'Agile, flexible, scalable.', icon: Layers },
  { title: 'Agencies', desc: 'Creative teams, real results.', icon: Users },
  { title: 'Construction', desc: 'Plan, execute, deliver.', icon: Building2 },
  { title: 'Consulting', desc: 'Strategy to success.', icon: Briefcase },
];

export const ROLES_DATA = [
  { id: 'leadership', title: 'Leadership', sub: 'See the bigger picture.', icon: UserCheck },
  { id: 'pm', title: 'Project Managers', sub: 'Keep work on track.', icon: Briefcase },
  { id: 'accountant', title: 'Accountants', sub: 'Track hours & costs.', icon: TrendingUp },
  { id: 'employee', title: 'Employees', sub: "Know what's next.", icon: Clock },
];
