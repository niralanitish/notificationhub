package com.notificationhub.notificationhub.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    
    public String home() {
        return """
                🚀 Notification Hub API is Running!

                Available Endpoints:

                GET    /api/notifications
                GET    /api/notifications/{id}
                POST   /api/notifications
                PUT    /api/notifications/{id}
                DELETE /api/notifications/{id}
                GET    /api/notifications/subscribe
                """;
    }
}