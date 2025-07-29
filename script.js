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
  if (formData.get("business_connection_id"))
    payload.business_connection_id = formData.get("business_connection_id");
  if (formData.get("message_thread_id"))
    payload.message_thread_id = parseInt(formData.get("message_thread_id"));
  if (formData.get("parse_mode"))
    payload.parse_mode = formData.get("parse_mode");
  if (formData.get("entities")) {
    try {
      payload.entities = JSON.parse(formData.get("entities"));
    } catch (e) {
      displayResponse({ error: "Invalid JSON format in entities field" }, true);
      return;
    }
  }

  // Link preview options
  const linkPreviewOptions = {};
  if (formData.get("link_preview_url"))
    linkPreviewOptions.url = formData.get("link_preview_url");
  if (formData.get("link_preview_disabled"))
    linkPreviewOptions.is_disabled = true;
  if (formData.get("link_preview_above_text"))
    linkPreviewOptions.prefer_large_media = true;
  if (formData.get("link_preview_small_media"))
    linkPreviewOptions.prefer_small_media = true;
  if (formData.get("link_preview_large_media"))
    linkPreviewOptions.prefer_large_media = true;
  if (formData.get("link_preview_above_text"))
    linkPreviewOptions.show_above_text = true;

  if (Object.keys(linkPreviewOptions).length > 0) {
    payload.link_preview_options = linkPreviewOptions;
  }

  if (formData.get("disable_web_page_preview"))
    payload.disable_web_page_preview = true;
  if (formData.get("disable_notification")) payload.disable_notification = true;
  if (formData.get("protect_content")) payload.protect_content = true;
  if (formData.get("allow_paid_broadcast")) payload.allow_paid_broadcast = true;
  if (formData.get("message_effect_id"))
    payload.message_effect_id = formData.get("message_effect_id");

  // Reply parameters
  if (formData.get("reply_to_message_id")) {
    const replyParameters = {
      message_id: parseInt(formData.get("reply_to_message_id")),
    };

    if (formData.get("reply_to_chat_id"))
      replyParameters.chat_id = formData.get("reply_to_chat_id");
    if (formData.get("allow_sending_without_reply"))
      replyParameters.allow_sending_without_reply = true;
    if (formData.get("quote")) replyParameters.quote = formData.get("quote");
    if (formData.get("quote_parse_mode"))
      replyParameters.quote_parse_mode = formData.get("quote_parse_mode");
    if (formData.get("quote_position"))
      replyParameters.quote_position = parseInt(formData.get("quote_position"));

    payload.reply_parameters = replyParameters;
  }

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
  if (formData.get("business_connection_id"))
    payload.append(
      "business_connection_id",
      formData.get("business_connection_id")
    );
  if (formData.get("message_thread_id"))
    payload.append("message_thread_id", formData.get("message_thread_id"));
  if (formData.get("caption"))
    payload.append("caption", formData.get("caption"));
  if (formData.get("parse_mode"))
    payload.append("parse_mode", formData.get("parse_mode"));
  if (formData.get("caption_entities")) {
    try {
      JSON.parse(formData.get("caption_entities")); // Validate JSON
      payload.append("caption_entities", formData.get("caption_entities"));
    } catch (e) {
      displayResponse(
        { error: "Invalid JSON format in caption_entities field" },
        true
      );
      return;
    }
  }
  if (formData.get("show_caption_above_media"))
    payload.append("show_caption_above_media", "true");
  if (formData.get("has_spoiler")) payload.append("has_spoiler", "true");
  if (formData.get("disable_notification"))
    payload.append("disable_notification", "true");
  if (formData.get("protect_content"))
    payload.append("protect_content", "true");
  if (formData.get("allow_paid_broadcast"))
    payload.append("allow_paid_broadcast", "true");
  if (formData.get("message_effect_id"))
    payload.append("message_effect_id", formData.get("message_effect_id"));

  // Reply parameters
  if (formData.get("reply_to_message_id")) {
    const replyParameters = {
      message_id: parseInt(formData.get("reply_to_message_id")),
    };

    if (formData.get("reply_to_chat_id"))
      replyParameters.chat_id = formData.get("reply_to_chat_id");
    if (formData.get("allow_sending_without_reply"))
      replyParameters.allow_sending_without_reply = true;
    if (formData.get("quote")) replyParameters.quote = formData.get("quote");
    if (formData.get("quote_parse_mode"))
      replyParameters.quote_parse_mode = formData.get("quote_parse_mode");
    if (formData.get("quote_position"))
      replyParameters.quote_position = parseInt(formData.get("quote_position"));

    payload.append("reply_parameters", JSON.stringify(replyParameters));
  }

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

    formData.append(
      "business_connection_id",
      document.getElementById("businessConnectionId").value
    );
    formData.append("chat_id", document.getElementById("chatId").value);
    formData.append(
      "message_thread_id",
      document.getElementById("messageThreadId").value
    );
    formData.append("text", document.getElementById("messageText").value);
    formData.append("parse_mode", document.getElementById("parseMode").value);
    formData.append("entities", document.getElementById("entities").value);

    // Link preview options
    formData.append(
      "link_preview_url",
      document.getElementById("linkPreviewUrl").value
    );
    if (document.getElementById("linkPreviewDisabled").checked)
      formData.append("link_preview_disabled", "true");
    if (document.getElementById("linkPreviewAboveText").checked)
      formData.append("link_preview_above_text", "true");
    if (document.getElementById("linkPreviewSmallMedia").checked)
      formData.append("link_preview_small_media", "true");
    if (document.getElementById("linkPreviewLargeMedia").checked)
      formData.append("link_preview_large_media", "true");

    if (document.getElementById("disableWebPagePreview").checked)
      formData.append("disable_web_page_preview", "true");
    if (document.getElementById("disableNotification").checked)
      formData.append("disable_notification", "true");
    if (document.getElementById("protectContent").checked)
      formData.append("protect_content", "true");
    if (document.getElementById("allowPaidBroadcast").checked)
      formData.append("allow_paid_broadcast", "true");

    formData.append(
      "message_effect_id",
      document.getElementById("messageEffectId").value
    );
    formData.append(
      "reply_to_message_id",
      document.getElementById("replyToMessageId").value
    );
    formData.append(
      "reply_to_chat_id",
      document.getElementById("replyToChatId").value
    );

    if (document.getElementById("allowSendingWithoutReply").checked)
      formData.append("allow_sending_without_reply", "true");

    formData.append("quote", document.getElementById("quote").value);
    formData.append(
      "quote_parse_mode",
      document.getElementById("quoteParseMode").value
    );
    formData.append(
      "quote_position",
      document.getElementById("quotePosition").value
    );

    await sendMessage(formData);
  });

document
  .getElementById("sendPhotoForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append(
      "business_connection_id",
      document.getElementById("photoBusinessConnectionId").value
    );
    formData.append("chat_id", document.getElementById("photoChatId").value);
    formData.append(
      "message_thread_id",
      document.getElementById("photoMessageThreadId").value
    );
    formData.append("caption", document.getElementById("photoCaption").value);
    formData.append(
      "parse_mode",
      document.getElementById("photoParseMode").value
    );
    formData.append(
      "caption_entities",
      document.getElementById("photoCaptionEntities").value
    );

    if (document.getElementById("showCaptionAboveMedia").checked)
      formData.append("show_caption_above_media", "true");
    if (document.getElementById("hasSpoiler").checked)
      formData.append("has_spoiler", "true");
    if (document.getElementById("photoDisableNotification").checked)
      formData.append("disable_notification", "true");
    if (document.getElementById("photoProtectContent").checked)
      formData.append("protect_content", "true");
    if (document.getElementById("photoAllowPaidBroadcast").checked)
      formData.append("allow_paid_broadcast", "true");

    formData.append(
      "message_effect_id",
      document.getElementById("photoMessageEffectId").value
    );
    formData.append(
      "reply_to_message_id",
      document.getElementById("photoReplyToMessageId").value
    );
    formData.append(
      "reply_to_chat_id",
      document.getElementById("photoReplyToChatId").value
    );

    if (document.getElementById("photoAllowSendingWithoutReply").checked)
      formData.append("allow_sending_without_reply", "true");

    formData.append("quote", document.getElementById("photoQuote").value);
    formData.append(
      "quote_parse_mode",
      document.getElementById("photoQuoteParseMode").value
    );
    formData.append(
      "quote_position",
      document.getElementById("photoQuotePosition").value
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

// Collapsible sections functionality
document.addEventListener("DOMContentLoaded", function () {
  const sectionHeaders = document.querySelectorAll(".param-section-header");

  sectionHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const content = this.nextElementSibling;

      // Toggle collapsed class
      this.classList.toggle("collapsed");
      content.classList.toggle("collapsed");
    });
  });
});
