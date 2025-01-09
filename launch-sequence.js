// First, register the service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register(
        "/service-worker.js"
      );
      console.log("ServiceWorker registration successful:", registration.scope);
    } catch (error) {
      console.error("ServiceWorker registration failed:", error);
    }
  });
}

// async function so that we can use the await keyword
async function submitCode() {
  try {
    // Your investigation code should go here
    // Leave your lines of code in when you find something out, so that you can always come back to it and see how you got there

    // see the logs
    const response = await fetch("/api/logs");
    const data = await response.json();
    console.log(data);

    // see who created the activity in the logs

    const personResponse = await fetch(`/api/personnel/${data[5].who}`);
    const personData = await personResponse.json();
    console.log(personData);

    // see what messages were sent to them

    const messageResponse = await fetch(`/api/messages?to=${personData.id}`);
    const messageData = await messageResponse.json();
    console.log(messageData[0].message);

    const dogResponse = await fetch(`/api/personnel/11`);
    const dogData = await dogResponse.json();

    console.log(dogData);

    const submitResponse = await fetch(`/api/codes`, {
      method: "POST",
      body: JSON.stringify({
        enter: dogData.name.toUpperCase(),
      }),
    });

    const submitData = await submitResponse.json();
    console.log(submitData);


  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

// Wait for service worker to be ready before making requests
navigator.serviceWorker.ready
  .then(() => {
    submitCode(); // calls the function above to run your code
  })
  .catch((error) => {
    console.error("Service Worker not ready:", error);
  });