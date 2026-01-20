'use client';

import { useRouter } from 'next/navigation';
import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from '@tabler/icons-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/use-auth';
import { useRole } from '@/hooks/use-role';
import { UserRole } from '@/lib/auth/roles';

/**
 * Get user initials from email
 */
function getInitials(email: string | undefined): string {
  if (!email) return 'U';
  const parts = email.split('@')[0].split('.');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return email.substring(0, 2).toUpperCase();
}

/**
 * Get role badge text
 */
function getRoleBadge(role: UserRole | null, level: number | null): string {
  if (role === UserRole.CORE) {
    return 'Core Team';
  }
  if (role === UserRole.MODERATOR && level) {
    return `Moderator L${level}`;
  }
  return 'User';
}

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user, logout } = useAuth();
  const { role, level } = useRole();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!user) {
    return null;
  }

  const userDisplay = {
    name: user.email?.split('@')[0] || 'User',
    email: user.email || '',
    avatar: '', // Can be extended later with user avatars
    initials: getInitials(user.email),
    roleBadge: getRoleBadge(role, level),
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={userDisplay.avatar} alt={userDisplay.name} />
                <AvatarFallback className="rounded-lg">
                  {userDisplay.initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{userDisplay.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {userDisplay.email}
                </span>
                {role && (
                  <span className="text-muted-foreground truncate text-xs">
                    {userDisplay.roleBadge}
                  </span>
                )}
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={userDisplay.avatar} alt={userDisplay.name} />
                  <AvatarFallback className="rounded-lg">
                    {userDisplay.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{userDisplay.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {userDisplay.email}
                  </span>
                  {role && (
                    <span className="text-muted-foreground truncate text-xs font-medium">
                      {userDisplay.roleBadge}
                    </span>
                  )}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem disabled>
                <IconUserCircle />
                Account
              </DropdownMenuItem>
              {role === UserRole.CORE && (
                <DropdownMenuItem disabled>
                  <IconCreditCard />
                  Settings
                </DropdownMenuItem>
              )}
              <DropdownMenuItem disabled>
                <IconNotification />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
