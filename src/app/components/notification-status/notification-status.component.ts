import {Component, computed, input} from '@angular/core';
import {NotificationStatusEnum} from "../../types/status";
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-notification-status',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './notification-status.component.html',
  styleUrl: './notification-status.component.scss'
})
export class NotificationStatusComponent {

  notificationStatusData = input.required<NotificationStatusEnum>();
  notificationStatusColor = computed(() => {
    switch (this.notificationStatusData()) {
      case NotificationStatusEnum.Done: return '#56F000';
      case NotificationStatusEnum.Planned: return '#FFB302';
      case NotificationStatusEnum.PastDue: return '#FF3838';
      case NotificationStatusEnum.New: return '#2DCCFF';
      default: return '#000';
    }
  });

}
