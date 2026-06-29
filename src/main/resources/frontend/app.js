const API = "https://notificationhub-production-9a77.up.railway.app/api/notifications";

let notifications = [];
let editId = null;

// Load Notifications
function loadNotifications() {

    fetch(API)
        .then(res => res.json())
        .then(data => {

            notifications = data;

            displayNotifications(data);

            updateDashboard();

        });

}

// Display Notifications

function displayNotifications(data) {

    const list = document.getElementById("notificationList");

    list.innerHTML = "";

    data.reverse().forEach(n => {

        list.innerHTML += `

        <div class="notification">

            <h3>${n.title}</h3>

            <p>${n.message}</p>

            <small>
                Type : ${n.type}
            </small>

            <br>

            <small>
                ${n.createdAt ?? ""}
            </small>

            <div class="actions">

                <button
                    class="edit"
                    onclick="editNotification(${n.id})">

                    ✏ Edit

                </button>

                <button
                    class="delete"
                    onclick="deleteNotification(${n.id})">

                    🗑 Delete

                </button>

            </div>

        </div>

        `;

    });

}

// Dashboard Count

function updateDashboard() {

    document.getElementById("count").innerHTML = notifications.length;

    document.getElementById("infoCount").innerHTML =
        notifications.filter(x => x.type === "INFO").length;

    document.getElementById("warningCount").innerHTML =
        notifications.filter(x => x.type === "WARNING").length;

    document.getElementById("successCount").innerHTML =
        notifications.filter(x => x.type === "SUCCESS").length;

}

// Add Notification

function addNotification() {

    const notification = {

        id: Number(document.getElementById("id").value),

        title: document.getElementById("title").value,

        message: document.getElementById("message").value,

        type: document.getElementById("type").value

    };

    if (editId == null) {

        fetch(API, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(notification)

        })

        .then(() => {

            showToast("Notification Added Successfully");

            clearForm();

            loadNotifications();

        });

    } else {

        fetch(API + "/" + editId, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(notification)

        })

        .then(() => {

            showToast("Notification Updated");

            editId = null;

            clearForm();

            loadNotifications();

        });

    }

}

// Delete

function deleteNotification(id) {

    if (!confirm("Delete this notification?")) {

        return;

    }

    fetch(API + "/" + id, {

        method: "DELETE"

    })

    .then(() => {

        showToast("Notification Deleted");

        loadNotifications();

    });

}

// Edit

function editNotification(id) {

    const notification = notifications.find(x => x.id == id);

    if (!notification) return;

    editId = id;

    document.getElementById("id").value = notification.id;

    document.getElementById("title").value = notification.title;

    document.getElementById("message").value = notification.message;

    document.getElementById("type").value = notification.type;

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

// Search

function searchNotification() {

    const value = document
        .getElementById("search")
        .value
        .toLowerCase();

    const filtered = notifications.filter(n =>

        n.title.toLowerCase().includes(value)

        ||

        n.message.toLowerCase().includes(value)

        ||

        n.type.toLowerCase().includes(value)

    );

    displayNotifications(filtered);

}

// Clear Form

function clearForm() {

    document.getElementById("id").value = "";

    document.getElementById("title").value = "";

    document.getElementById("message").value = "";

    document.getElementById("type").value = "INFO";

}

// Toast

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.innerHTML = message;

    toast.style.display = "block";

    setTimeout(() => {

        toast.style.display = "none";

    }, 2500);

}

// Dark Mode

document.getElementById("darkBtn").addEventListener("click", () => {

    document.body.classList.toggle("dark");

});

// Auto Refresh Every 5 Seconds

setInterval(loadNotifications, 5000);

// Initial Load

loadNotifications();