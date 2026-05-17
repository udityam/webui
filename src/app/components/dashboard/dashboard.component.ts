import {
  Component,
  OnInit,
  OnDestroy,
  signal,
  computed,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

// Angular Material
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatChipsModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatDividerModule,
    MatBadgeModule,
    MatSnackBarModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly displayedColumns = ['id', 'username', 'email', 'full_name', 'role', 'is_active', 'actions'];
  dataSource = new MatTableDataSource<User>([]);

  isLoading = signal(false);
  totalUsers = signal(0);
  currentPage = signal(0);
  pageSize = signal(20);
  errorMessage = signal<string | null>(null);

  readonly activeCount = computed(() =>
    this.dataSource.data.filter((u) => u.is_active).length
  );
  readonly inactiveCount = computed(() =>
    this.dataSource.data.filter((u) => !u.is_active).length
  );

  private destroy$ = new Subject<void>();

  constructor(
    readonly authService: AuthService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadUsers(page = 1, size = 20): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.userService
      .getUsers(page, size)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.dataSource.data = response.items;
          this.totalUsers.set(response.total);
          this.isLoading.set(false);

          // Wire up client-side sort after data loads
          setTimeout(() => {
            this.dataSource.sort = this.sort;
          });
        },
        error: (err) => {
          this.isLoading.set(false);
          if (err.status === 401) {
            // errorInterceptor already handles the redirect
            return;
          }
          const msg = err.error?.detail ?? 'Failed to load users. Please try again.';
          this.errorMessage.set(msg);
          this.snackBar.open(msg, 'Dismiss', {
            duration: 6000,
            panelClass: ['error-snackbar'],
          });
        },
      });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.loadUsers(event.pageIndex + 1, event.pageSize);
  }

  refreshUsers(): void {
    this.loadUsers(this.currentPage() + 1, this.pageSize());
  }

  logout(): void {
    this.authService.logout();
  }

  trackByUserId(_: number, user: User): string | number {
    return user.id;
  }

  getRoleColor(role?: string): string {
    const map: Record<string, string> = {
      admin: 'role-admin',
      operator: 'role-operator',
      viewer: 'role-viewer',
      superuser: 'role-superuser',
    };
    return map[role?.toLowerCase() ?? ''] ?? 'role-default';
  }
}
