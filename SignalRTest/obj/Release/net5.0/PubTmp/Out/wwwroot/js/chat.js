
      const connection = new signalR.HubConnectionBuilder()
          .withUrl('https://api.thai2dlive.com/chatHub', {
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

    const connection1 = new signalR.HubConnectionBuilder()
        .withUrl('https://api.thai2dlive.com/liveDataHub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
    })
    .configureLogging(signalR.LogLevel.Information)
    .build();
   //user, message
    connection1.on("liveData", function (user, message) {
    console.log("Message is "+message)
        var li = document.createElement("li");
        document.getElementById("messagesList").appendChild(li);
        li.textContent = `${user} says ${message}`;
    });

    connection1.start().then(function () {
        document.getElementById("sendButton").disabled = false;
    }).catch(function (err) {
        return console.error(err.toString());
    });
    document.getElementById("sendButton").addEventListener("click", function (event) {
        var user = "ThaiSet2D";//document.getElementById("userInput").value;
        var message = document.getElementById("messageInput").value;
        connection1.invoke("ExecuteAsync",user, message).catch(function (err) {
            return console.error(err.toString());//, user, message
        });
        event.preventDefault();
    });

    connection1.onclose(async () => {
        await start();
    });
       