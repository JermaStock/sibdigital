import {Routes} from '@angular/router';
import {NotificationsComponent} from "./components/notifications/notifications.component";
import {NotificationComponent} from "./components/notification/notification.component";

export const routes: Routes = [
  {
    path: 'notifications',
    loadComponent: () =>
      import('./components/notifications/notifications.component').then(c => c.NotificationsComponent),
  },
  {
    path: 'notifications/:notificationId',
    loadComponent: () =>
      import('./components/notification/notification.component').then(c => c.NotificationComponent),
  },
  { path: '**', redirectTo: 'notifications' },
];
