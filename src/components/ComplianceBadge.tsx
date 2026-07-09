import { CheckCircle, AlertTriangle, XCircle, Clock } from 'lucide-react';

type ComplianceStatus = 'approved' | 'restricted' | 'prohibited' | 'pending';

const statusConfig: Record<ComplianceStatus, { icon: React.ReactNode; label: string; className: string }> = {
  approved: { icon: <CheckCircle className="w-3.5 h-3.5" />, label: '允许', className: 'bg-teal-100 text-teal-700' },
  restricted: { icon: <AlertTriangle className="w-3.5 h-3.5" />, label: '受限', className: 'bg-amber-100 text-amber-700' },
  prohibited: { icon: <XCircle className="w-3.5 h-3.5" />, label: '禁止', className: 'bg-red-100 text-red-700' },
  pending: { icon: <Clock className="w-3.5 h-3.5" />, label: '待审批', className: 'bg-gray-100 text-gray-600' },
};

export function ComplianceBadge({ status }: { status: ComplianceStatus }) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${config.className}`}>
      {config.icon} {config.label}
    </span>
  );
}
