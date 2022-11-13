
      const connection = new signalR.HubConnectionBuilder()
          .withUrl('https://localhost:44377/chatHub', {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets
        })
        .configureLogging(signalR.LogLevel.Information)
        .build();

        connection.on("ReceiveMessage", function (user, message) {
            var li = document.createElement("li");
            document.getElementById("messagesList").appendChild(li);
            li.textContent = `${user} says ${message}`;
        });

        connection.start().then(function () {
            document.getElementById("sendButton").disabled = false;
        }).catch(function (err) {
            return console.error(err.toString());
        });
        document.getElementById("sendButton").addEventListener("click", function (event) {
            var user = document.getElementById("userInput").value;
            var message = document.getElementById("messageInput").value;
            connection.invoke("SendMessage", user, message).catch(function (err) {
                return console.error(err.toString());
            });
            event.preventDefault();
        });

        connection.onclose(async () => {
            await start();
        });
    /*XXX End of mesageing*/

    
       