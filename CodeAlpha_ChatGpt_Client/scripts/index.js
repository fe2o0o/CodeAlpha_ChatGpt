const socket = io("http://localhost:8000");
const send = document.getElementById("send");
const messageBox = document.getElementById("messageBox");

messageBox.addEventListener("keypress", (e) => {
  const welcome = document.getElementById("welcome");
  if (e.key == "Enter") {
    if (welcome != null) {
      welcome.remove();
    }
    const message = messageBox.value;
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");

    const fromDiv = document.createElement("div");
    fromDiv.classList.add("from", "d-flex", "align-items-center");

    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-user", "me-3", "fs-5");
    fromDiv.appendChild(icon);

    const paragraph = document.createElement("p");
    paragraph.classList.add("m-0");
    paragraph.textContent = "You";
    fromDiv.appendChild(paragraph);

    const textParagraph = document.createElement("p");
    textParagraph.classList.add("p-3");
    textParagraph.textContent = message;

    messageDiv.appendChild(fromDiv);
    messageDiv.appendChild(textParagraph);
    document.querySelector(".chat").appendChild(messageDiv);
    socket.emit("message", message);
    messageBox.value = "";
  }
});

send.addEventListener("click", () => {
  const welcome = document.getElementById("welcome");
  if (welcome != null) {
    welcome.remove();
  }
  const message = messageBox.value;
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");

  const fromDiv = document.createElement("div");
  fromDiv.classList.add("from", "d-flex", "align-items-center");

  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-user", "me-3", "fs-5");
  fromDiv.appendChild(icon);

  const paragraph = document.createElement("p");
  paragraph.classList.add("m-0");
  paragraph.textContent = "You";
  fromDiv.appendChild(paragraph);

  const textParagraph = document.createElement("p");
  textParagraph.classList.add("p-3");
  textParagraph.textContent = message;

  messageDiv.appendChild(fromDiv);
  messageDiv.appendChild(textParagraph);
  document.querySelector(".chat").appendChild(messageDiv);
  socket.emit("message", message);
  messageBox.value = "";
});

const text = "This is a typing animation like mine.";

function typeWriter(text, i, typingAnimation) {
  if (i < text.length) {
    typingAnimation.innerHTML += text.charAt(i);
    i++;
    setTimeout(() => typeWriter(text, i, typingAnimation), 50);
  }
}

socket.on("answer", (data) => {
  const { content } = data;
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");

  const fromDiv = document.createElement("div");
  fromDiv.classList.add("from", "d-flex", "align-items-center");

  const img = document.createElement("img");
  img.width = "50";
  img.src = "images/gpt.png";
  img.alt = "ChatGPT";
  fromDiv.appendChild(img);

  const paragraph = document.createElement("p");
  paragraph.classList.add("m-0");
  paragraph.textContent = "ChatGPT";
  fromDiv.appendChild(paragraph);

  const textParagraph = document.createElement("p");
  textParagraph.id = "typing-animation";
  textParagraph.classList.add("p-3");

  messageDiv.appendChild(fromDiv);
  messageDiv.appendChild(textParagraph);

  document.querySelector(".chat").appendChild(messageDiv);

    typeWriter(content, 0, textParagraph);
});
