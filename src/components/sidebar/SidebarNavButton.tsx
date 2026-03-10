import { ChevronRight } from 'lucide-react';

import { SidebarNavItem, isSidebarParentItem } from '@/components/sidebar/sidebar-config';

interface SidebarNavButtonProps {
  item: SidebarNavItem;
  isActive: boolean;
  isOpen?: boolean;
  isCollapsed?: boolean;
  onClick: () => void;
  title?: string;
}

export function SidebarNavButton({
  item,
  isActive,
  isOpen = false,
  isCollapsed = false,
  onClick,
  title,
}: SidebarNavButtonProps) {
  const Icon = item.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`georim-sidebar-item ${isActive ? 'is-active' : ''} ${isOpen ? 'is-open' : ''} ${
        'accent' in item && item.accent === 'danger' ? 'is-danger' : ''
      } ${isCollapsed ? 'is-collapsed' : ''}`}
      aria-expanded={isSidebarParentItem(item) ? isOpen : undefined}
      aria-current={isActive && !isSidebarParentItem(item) ? 'page' : undefined}
      title={title}
    >
      <span className="georim-sidebar-item__icon-shell">
        <Icon className="georim-sidebar-item__icon" />
      </span>
      {!isCollapsed && (
        <>
          <span className="georim-sidebar-item__label">{item.label}</span>
          {isSidebarParentItem(item) && (
            <ChevronRight className={`georim-sidebar-item__chevron ${isOpen ? 'is-rotated' : ''}`} />
          )}
        </>
      )}
    </button>
  );
}
