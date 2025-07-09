const LOGIN_PASSWORD = "aerivjsjifgv3845345";
const API_URL = "https://script.google.com/macros/s/AKfycbyXgEU3U9vpLeQopE9edm8QrVRnffOwsb64LfPzVUOBT4HHwt3I397OAOoM-2_12DPR/exec";

function checkPassword() {
  const input = document.getElementById("password").value;
  if (input === LOGIN_PASSWORD) {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("app").style.display = "block";
    loadAccounts();
  } else {
    document.getElementById("login-error").innerText = "Sai mật khẩu!";
  }
}

function addAccount() {
  const data = {
    Username: document.getElementById("username").value,
    Password: document.getElementById("passwordAcc").value,
    "Giá tiền": document.getElementById("price").value,
    "Trạng thái": document.getElementById("status").value,
    "Email khôi phục": document.getElementById("recovery").value,
    "Mã 2FA": document.getElementById("fa2").value,
    "Ghi chú": document.getElementById("note").value
  };

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
  .then(r => r.json())
  .then(res => {
    document.getElementById("form-status").innerText = res.success ? "✔️ Đã thêm!" : "❌ Lỗi!";
    loadAccounts();
  });
}

function loadAccounts() {
  fetch(API_URL)
    .then(r => r.json())
    .then(data => {
      window.allData = data.data;
      displayAccounts(data.data);
    });
}

function displayAccounts(data) {
  const tbody = document.getElementById("accTable");
  tbody.innerHTML = "";

  data.forEach(row => {
    const tr = document.createElement("tr");

    const showHide = (text) => {
      const span = document.createElement("span");
      span.textContent = "••••••";
      span.style.cursor = "pointer";
      span.onclick = () => {
        span.textContent = span.textContent === "••••••" ? text : "••••••";
      };
      return span;
    };

    tr.innerHTML += `<td>${row["ID"]}</td>`;
    tr.innerHTML += `<td>${row["Username"]}</td>`;
    tr.appendChild(document.createElement("td")).appendChild(showHide(row["Password"]));
    tr.innerHTML += `<td>${row["Giá tiền"]}</td>`;
    tr.innerHTML += `<td>${row["Trạng thái"]}</td>`;
    tr.innerHTML += `<td>${row["Ngày bán"]}</td>`;
    tr.innerHTML += `<td>${row["Email khôi phục"]}</td>`;
    tr.appendChild(document.createElement("td")).appendChild(showHide(row["Mã 2FA"]));
    tr.innerHTML += `<td>${row["Ghi chú"]}</td>`;

    tbody.appendChild(tr);
  });
}

function filterStatus(status) {
  if (status === "all") return displayAccounts(window.allData);
  const filtered = window.allData.filter(acc => acc["Trạng thái"] === status);
  displayAccounts(filtered);
}
