let currentMethod = "sendMessage";

function showMethod(method) {
  currentMethod = method;

  // Update tab buttons
  document.querySelectorAll(".tab-button").forEach((btn) => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");

  // Show/hide forms
  document
    .getElementById("sendMessageForm")
    .classList.toggle("hidden", method !== "sendMessage");
  document
    .getElementById("sendPhotoForm")
    .classList.toggle("hidden", method !== "sendPhoto");
}

function displayResponse(data, isError = false) {
  const container = document.getElementById("responseContent");
  const timestamp = new Date().toLocaleString("id-ID");

  if (isError) {
    container.innerHTML = `<span class="error">❌ Error [${timestamp}]</span>\n\n${JSON.stringify(
      data,
      null,
      2
    )}`;
  } else {
    container.innerHTML = `<span class="success">✅ Success [${timestamp}]</span>\n\n${JSON.stringify(
      data,
      null,
      2
    )}`;
  }
}

function showLoading() {
  const container = document.getElementById("responseContent");
  container.innerHTML = '<span class="loading">Mengirim request...</span>';
}

async function sendMessage(formData) {
  const botToken = document.getElementById("botToken").value.trim();

  if (!botToken) {
    displayResponse({ error: "Bot token harus diisi!" }, true);
    return;
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  const payload = {
    chat_id: formData.get("chat_id"),
    text: formData.get("text"),
  };

  // Add optional parameters
  if (formData.get("parse_mode"))
    payload.parse_mode = formData.get("parse_mode");
  if (formData.get("disable_web_page_preview"))
    payload.disable_web_page_preview = true;
  if (formData.get("disable_notification")) payload.disable_notification = true;
  if (formData.get("reply_to_message_id"))
    payload.reply_to_message_id = parseInt(formData.get("reply_to_message_id"));

  try {
    showLoading();
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    displayResponse(data, !response.ok);
  } catch (error) {
    displayResponse({ error: error.message }, true);
  }
}

async function sendPhoto(formData) {
  const botToken = document.getElementById("botToken").value.trim();

  if (!botToken) {
    displayResponse({ error: "Bot token harus diisi!" }, true);
    return;
  }

  const url = `https://api.telegram.org/bot${botToken}/sendPhoto`;
  const photoFile = document.getElementById("photoFile").files[0];
  const photoUrl = document.getElementById("photoUrl").value.trim();

  if (!photoFile && !photoUrl) {
    displayResponse(
      { error: "Pilih file gambar atau masukkan URL gambar!" },
      true
    );
    return;
  }

  const payload = new FormData();
  payload.append("chat_id", formData.get("chat_id"));

  if (photoFile) {
    payload.append("photo", photoFile);
  } else {
    payload.append("photo", photoUrl);
  }

  // Add optional parameters
  if (formData.get("caption"))
    payload.append("caption", formData.get("caption"));
  if (formData.get("parse_mode"))
    payload.append("parse_mode", formData.get("parse_mode"));
  if (formData.get("disable_notification"))
    payload.append("disable_notification", "true");
  if (formData.get("reply_to_message_id"))
    payload.append("reply_to_message_id", formData.get("reply_to_message_id"));

  try {
    showLoading();
    const response = await fetch(url, {
      method: "POST",
      body: payload,
    });

    const data = await response.json();
    displayResponse(data, !response.ok);
  } catch (error) {
    displayResponse({ error: error.message }, true);
  }
}

// Event listeners
document
  .getElementById("sendMessageForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("chat_id", document.getElementById("chatId").value);
    formData.append("text", document.getElementById("messageText").value);
    formData.append("parse_mode", document.getElementById("parseMode").value);
    if (document.getElementById("disableWebPagePreview").checked)
      formData.append("disable_web_page_preview", "true");
    if (document.getElementById("disableNotification").checked)
      formData.append("disable_notification", "true");
    if (document.getElementById("replyToMessageId").value)
      formData.append(
        "reply_to_message_id",
        document.getElementById("replyToMessageId").value
      );

    await sendMessage(formData);
  });

document
  .getElementById("sendPhotoForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("chat_id", document.getElementById("photoChatId").value);
    if (document.getElementById("photoCaption").value)
      formData.append("caption", document.getElementById("photoCaption").value);
    formData.append(
      "parse_mode",
      document.getElementById("photoParseMode").value
    );
    if (document.getElementById("photoDisableNotification").checked)
      formData.append("disable_notification", "true");
    if (document.getElementById("photoReplyToMessageId").value)
      formData.append(
        "reply_to_message_id",
        document.getElementById("photoReplyToMessageId").value
      );

    await sendPhoto(formData);
  });

// File input label update
document.getElementById("photoFile").addEventListener("change", function (e) {
  const label = document.querySelector(".file-input-label");
  const fileName = e.target.files[0]?.name;
  if (fileName) {
    label.textContent = `📁 ${fileName}`;
    document.getElementById("photoUrl").value = ""; // Clear URL if file selected
  } else {
    label.textContent = "📁 Pilih File Gambar atau masukkan URL";
  }
});

document.getElementById("photoUrl").addEventListener("input", function (e) {
  if (e.target.value.trim()) {
    document.getElementById("photoFile").value = ""; // Clear file if URL entered
    document.querySelector(".file-input-label").textContent =
      "📁 Pilih File Gambar atau masukkan URL";
  }
});
