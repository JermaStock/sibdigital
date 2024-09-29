import {NotificationStatusEnum} from "./status";

export type NotificationType = {
  id: string,
  status: NotificationStatusEnum,
  createdAt: Date,
  finishedAt: Date,
  shortDescription: string,
  description: string,
}
