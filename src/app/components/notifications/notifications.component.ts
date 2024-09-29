import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import {NotificationDataService} from "../../services/notification-data.service";
import {NotificationType} from "../../types/notification";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {finalize, tap} from "rxjs";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NotificationStatusComponent} from "../notification-status/notification-status.component";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatTable, MatColumnDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatRowDef, MatCellDef, MatHeaderCellDef, MatHeaderRowDef, MatProgressSpinner, NotificationStatusComponent, DatePipe],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit {

  displayedColumns: string[] = [
    'status',
    'createdAt',
    'finishedAt',
    'shortDescription',
  ];
  notifications = signal<NotificationType[]>([]);
  isLoading = signal<boolean>(false);

  constructor(
    private readonly dataService: NotificationDataService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.isLoading.set(true);
    this.dataService.fetchData().pipe(
      finalize(() => this.isLoading.set(false)),
    ).subscribe(data => {
      this.notifications.set(data);
    });
  }

  navigate(notificationId: string): void {
    this.router.navigate([notificationId], { relativeTo: this.route });
  }

}
