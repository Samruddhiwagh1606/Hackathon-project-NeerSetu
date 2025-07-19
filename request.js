window.addEventListener("DOMContentLoaded", function () {
  window.watsonAssistantChatOptions = {
    integrationID: "your-integration-id", // Replace with your actual ID
    region: "your-region",                 // Replace with your actual region
    serviceInstanceID: "your-service-instance-id", // Replace
    onLoad: function (instance) {
      instance.render();
    },
  };

  setTimeout(function () {
    const t = document.createElement("script");
    t.src =
      "https://web-chat.global.assistant.watson.appdomain.cloud/versions/latest/WatsonAssistantChatEntry.js";
    document.head.appendChild(t);
  });
});
