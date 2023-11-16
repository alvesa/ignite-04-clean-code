import { Notification } from '../../enterprise/entitites/notification'

export interface NotificationRepository {
  create(notification: Notification): Promise<void>
}
