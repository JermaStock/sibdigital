import {Component, inject, input, OnInit, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {NotificationType} from "../../types/notification";
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {toObservable} from "@angular/core/rxjs-interop";
import {NotificationDataService} from "../../services/notification-data.service";
import {map, switchMap, tap} from "rxjs";
import {ReactiveFormsModule, UntypedFormBuilder, Validators} from "@angular/forms";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatOption, MatSelect} from "@angular/material/select";
import {NotificationStatusEnum} from "../../types/status";

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [RouterOutlet, MatButton, MatIcon, MatFabButton, RouterLink, ReactiveFormsModule, MatFormField, MatInput, MatProgressSpinner, MatDatepickerInput, MatDatepickerToggle, MatDatepicker, MatHint, MatLabel, MatSuffix, MatSelect, MatOption],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit {

  private readonly dataService = inject(NotificationDataService);
  private readonly fb = inject(UntypedFormBuilder);

  notificationId = input.required<string>();
  loadNotification$ = toObservable<string>(this.notificationId).pipe(
    switchMap(id => this.dataService.fetchData(id)),
    map((response: NotificationType[]) => response[0]),
    tap(notification => this.patchForm(notification)),
    tap(() => this.isLoading.set(false)),
  );
  isLoading = signal<boolean>(false);
  isPending = signal<boolean>(false);

  notificationForm = this.fb.group({
    status: [null, Validators.required],
    createdAt: [null, Validators.required],
    finishedAt: [null, Validators.required],
    shortDescription: [null],
    description: [null],
  })

  statuses: NotificationStatusEnum[] = [
    NotificationStatusEnum.New,
    NotificationStatusEnum.PastDue,
    NotificationStatusEnum.Planned,
    NotificationStatusEnum.Done,
  ];

  constructor() {
  }

  get status() {
    return this.notificationForm.get('status');
  }

  get createdAt() {
    return this.notificationForm.get('createdAt');
  }

  get finishedAt() {
    return this.notificationForm.get('finishedAt');
  }

  get shortDescription() {
    return this.notificationForm.get('shortDescription');
  }

  get description() {
    return this.notificationForm.get('description');
  }

  ngOnInit() {
    this.isLoading.set(true);
    this.loadNotification$.subscribe();

    this.notificationForm.valueChanges.subscribe(console.log);
  }

  private patchForm(notificationData: NotificationType) {
    const { id, ...changeableFields } = notificationData;
    this.notificationForm.setValue(changeableFields, { emitEvent: false });
  }

  onSave() {
    this.isPending.set(true);
    this.dataService.saveData(this.notificationId(), this.notificationForm.value).pipe(
      tap(() => this.isPending.set(false)),
    ).subscribe();
  }

}
