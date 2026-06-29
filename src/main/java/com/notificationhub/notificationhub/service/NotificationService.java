package com.notificationhub.notificationhub.service;

import com.notificationhub.notificationhub.model.Notification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationService {

    private final List<Notification> notifications = new ArrayList<>();

    // Create
    public Notification addNotification(Notification notification) {

        notification.setCreatedAt(LocalDateTime.now().toString());

        notifications.add(notification);

        return notification;
    }

    // Read All
    public List<Notification> getAllNotifications() {
        return notifications;
    }

    // Read By Id
    public Notification getNotificationById(Long id) {

        return notifications.stream()
                .filter(n -> n.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    // Update
    public Notification updateNotification(Long id, Notification updatedNotification) {

        for (Notification notification : notifications) {

            if (notification.getId().equals(id)) {

                notification.setTitle(updatedNotification.getTitle());
                notification.setMessage(updatedNotification.getMessage());
                notification.setType(updatedNotification.getType());

                return notification;
            }
        }

        return null;
    }

    // Delete
    public String deleteNotification(Long id) {

        notifications.removeIf(notification -> notification.getId().equals(id));

        return "Notification Deleted Successfully";
    }
}