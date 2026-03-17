var messageCount = 0;
var lastUserEmail = "";
var submissionTimes = [];

function validateForm() {
    var form = document.forms["form1"];

    var name = form["nameText"].value;
    var lastName = form["lastNameText"].value;
    var email = form["emailText"].value;
    var subject = form["subjectText"].value;
    var message = form["messageText"].value;

    // Boş alan kontrolü
    if (name === "" || lastName === "" || email === "" || subject === "" || message === "") {
        alert("Lütfen gerekli tüm alanları doldurunuz.");
        return;
    }

    // Yeni kullanıcı kontrolü
    if (lastUserEmail !== "" && lastUserEmail !== email) {
        messageCount = 0;
        submissionTimes = [];
        document.getElementById("msgList").innerHTML = "";
    }

    messageCount++;
    lastUserEmail = email;

    // Tarih/Saat alma
    var userDate = form["dateText"].value;
    var userTime = form["timeText"].value;

    if (userDate === "") {
        var today = new Date();
        userDate = today.toISOString().split('T')[0];
    }
    if (userTime === "") {
        var now = new Date();
        userTime = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');
    }

    var combinedTimestamp = userDate + " " + userTime;
    submissionTimes.push(combinedTimestamp);

    // Ekrana yazdırma işlemleri
    var messageContainer = document.getElementById("Message");
    var countElement = document.getElementById("msgCount");
    var listElement = document.getElementById("msgList");

    countElement.textContent = messageCount;

    listElement.innerHTML = "";
    for (var i = 0; i < submissionTimes.length; i++) {
        var newListItem = document.createElement("li");
        newListItem.textContent = submissionTimes[i];
        listElement.appendChild(newListItem);
    }

    // Formu gizle, mesajı göster
    document.getElementById("form1").style.display = "none";
    messageContainer.style.display = "block";

    // Form inputlarını temizle
    form.reset();
}

function resetOutput() {
    document.getElementById("Message").style.display = "none";
    document.getElementById("form1").style.display = "block";
}