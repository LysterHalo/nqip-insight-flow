import { UserRole } from '@/types/submission';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { User, Shield } from 'lucide-react';

interface RoleSelectorProps {
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const RoleSelector = ({ role, onRoleChange }: RoleSelectorProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Role:</span>
      <Select value={role} onValueChange={(value) => onRoleChange(value as UserRole)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="reviewer">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Reviewer (QI Collector)</span>
            </div>
          </SelectItem>
          <SelectItem value="submitter">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Submitter (QI Approver)</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
