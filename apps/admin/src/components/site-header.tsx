'use client';

import { useRole } from '@/hooks/use-role';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';

export function SiteHeader() {
  const { isCore, isModerator, level, role } = useRole();

  const getRoleBadge = () => {
    if (isCore) {
      return <Badge variant="default">Core Team</Badge>;
    }
    if (isModerator && level) {
      return <Badge variant="secondary">Moderator L{level}</Badge>;
    }
    return null;
  };

  return (
    <header className="flex h-[--header-height] shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[--header-height]">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Admin Dashboard</h1>
        <div className="ml-auto flex items-center gap-2">
          {getRoleBadge()}
        </div>
      </div>
    </header>
  );
}
