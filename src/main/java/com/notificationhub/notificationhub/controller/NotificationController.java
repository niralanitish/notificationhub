package com.notificationhub.notificationhub.controller;

import com.notificationhub.notificationhub.model.Notification;
import com.notificationhub.notificationhub.service.NotificationService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin("*")
public class NotificationController {

    private final NotificationService notificationService;

    private final List<SseEmitter> emitters = new ArrayList<>();

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/subscribe")
    public SseEmitter subscribe() {

        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);

        emitters.add(emitter);

        emitter.onCompletion(() -> emitters.remove(emitter));

        emitter.onTimeout(() -> emitters.remove(emitter));

        return emitter;
    }

    @PostMapping
    public Notification addNotification(@RequestBody Notification notification) {

        Notification saved = notificationService.addNotification(notification);

        for (SseEmitter emitter : emitters) {

            try {

                emitter.send(saved);

            } catch (IOException e) {

                emitter.complete();

            }

        }

        return saved;
    }

    @GetMapping
    public List<Notification> getAllNotifications() {

        return notificationService.getAllNotifications();

    }

    @GetMapping("/{id}")
    public Notification getNotificationById(@PathVariable Long id) {

        return notificationService.getNotificationById(id);

    }

    @PutMapping("/{id}")
    public Notification updateNotification(@PathVariable Long id,
                                           @RequestBody Notification notification) {

        return notificationService.updateNotification(id, notification);

    }

    @DeleteMapping("/{id}")
    public String deleteNotification(@PathVariable Long id) {

        return notificationService.deleteNotification(id);

    }
}