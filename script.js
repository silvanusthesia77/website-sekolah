// --- FUNGSI NAVIGASI HALAMAN ---
function showPage(page) {
  const home = document.getElementById("home-page");
  const pendaftaran = document.getElementById("pendaftaran-page");

  if (page === "pendaftaran") {
    home.style.display = "none";
    pendaftaran.style.display = "block";
  } else {
    home.style.display = "block";
    pendaftaran.style.display = "none";
  }
}

// --- LOGIKA CRUD (Lanjutan dari sebelumnya) ---
const form = document.getElementById("registrationForm");
const tableBody = document.getElementById("resultTable");
const editIndexInput = document.getElementById("editIndex");

function renderTable() {
  const data = JSON.parse(localStorage.getItem("pendaftar")) || [];
  tableBody.innerHTML = "";
  data.forEach((item, index) => {
    tableBody.innerHTML += `
            <tr>
                <td style="padding: 10px;">${item.nama}</td>
                <td style="padding: 10px;">${item.email}</td>
                <td style="padding: 10px; text-align: center;">
                    <button onclick="editData(${index})">Edit</button>
                    <button onclick="hapusData(${index})">Hapus</button>
                </td>
            </tr>`;
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const nama = document.getElementById("nama").value;
  const email = document.getElementById("email").value;
  const editIndex = editIndexInput.value;

  let data = JSON.parse(localStorage.getItem("pendaftar")) || [];

  if (editIndex === "") {
    data.push({ nama, email });
  } else {
    data[editIndex] = { nama, email };
    editIndexInput.value = "";
  }

  localStorage.setItem("pendaftar", JSON.stringify(data));
  form.reset();
  renderTable();
});

function hapusData(index) {
  let data = JSON.parse(localStorage.getItem("pendaftar"));
  data.splice(index, 1);
  localStorage.setItem("pendaftar", JSON.stringify(data));
  renderTable();
}

function editData(index) {
  const data = JSON.parse(localStorage.getItem("pendaftar"));
  document.getElementById("nama").value = data[index].nama;
  document.getElementById("email").value = data[index].email;
  editIndexInput.value = index;
  document.getElementById("form-title").innerText = "Edit Data";
}

// Load data awal
renderTable();
