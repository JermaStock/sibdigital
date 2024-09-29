import {Injectable} from '@angular/core';
import {NotificationType} from "../types/notification";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  hasData(key: string): boolean {
    return Boolean(localStorage.getItem(key));
  }

  getData(key: string): NotificationType[] {
    const data = localStorage.getItem(key) as string;
    return JSON.parse(data);
  }

  setData(key: string, data: NotificationType[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
