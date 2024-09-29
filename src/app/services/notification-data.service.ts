import {inject, Injectable} from '@angular/core';
import {NotificationType} from "../types/notification";
import {BehaviorSubject, delay, filter, iif, map, Observable, of, Subject, switchMap, tap} from "rxjs";
import {NotificationStatusEnum} from "../types/status";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class NotificationDataService {

  private notificationData: NotificationType[] = [
    {
      id: crypto.randomUUID(),
      status: NotificationStatusEnum.Done,
      createdAt: new Date(2024, 10, 28),
      finishedAt: new Date(2024, 10, 29),
      shortDescription: 'Созвон',
      description: 'Позвонить по работе'
    },
    {
      id: crypto.randomUUID(),
      status: NotificationStatusEnum.PastDue,
      createdAt: new Date(2024, 9, 1),
      finishedAt: new Date(2024, 9, 13),
      shortDescription: 'Автосалон',
      description: 'Забрать машину из автосалона'
    },
    {
      id: crypto.randomUUID(),
      status: NotificationStatusEnum.Done,
      createdAt: new Date(2023, 2, 5),
      finishedAt: new Date(2024, 10, 9),
      shortDescription: 'Отчет',
      description: 'Написать отчет'
    },
    {
      id: crypto.randomUUID(),
      status: NotificationStatusEnum.New,
      createdAt: new Date(2024, 5, 31),
      finishedAt: new Date(2024, 9, 13),
      shortDescription: 'Договор',
      description: 'Составить договор'
    },
    {
      id: crypto.randomUUID(),
      status: NotificationStatusEnum.Planned,
      createdAt: new Date(2024, 3, 14),
      finishedAt: new Date(2024, 12, 3),
      shortDescription: 'Семинар (бизнес)',
      description: 'Провести семинар по назначенному адресу'
    },
  ]

  private readonly localStorageService = inject(LocalStorageService);

  constructor() {
  }

  public fetchData(notificationId?: string): Observable<NotificationType[]> {
    return of(this.notificationData).pipe(
      switchMap(() => {
          if (!this.localStorageService.hasData('notifications_key')) {
            this.localStorageService.setData('notifications_key', this.notificationData);
          }
          return of(this.localStorageService.getData('notifications_key')).pipe(delay(500));
        }
      ),
      map((data: NotificationType[]) => notificationId ? data.filter(i => i.id === notificationId) : data),
    );
  }

  public saveData(notificationId: string, newData: NotificationType): Observable<string> {
    return of(notificationId).pipe(
      delay(450),
      tap((id: string) => {
        const editedData = this.localStorageService.getData('notifications_key').map(i => {
          if (i.id === notificationId) return { ...i, ...newData };
          return i;
        });
        this.localStorageService.setData('notifications_key', editedData);
      }),
    )
  }
}
