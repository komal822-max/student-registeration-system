const form = document.getElementById('studentForm');
const tableBody = document.getElementById('tableBody');

let students = JSON.parse(localStorage.getItem('students')) || [];

function renderStudents() {
  tableBody.innerHTML = '';
  students.forEach((student, index) => {
    const row = `<tr>
      <td>${student.name}</td>
      <td>${student.id}</td>
      <td>${student.email}</td>
      <td>${student.contact}</td>
      <td>
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
      </td>
    </tr>`;
    tableBody.innerHTML += row;
  });

  // Add scrollbar dynamically if needed
  const listSection = document.getElementById('studentList');
  if (students.length > 5) {
    listSection.style.overflowY = 'scroll';
    listSection.style.maxHeight = '300px';
  } else {
    listSection.style.overflowY = 'auto';
  }
}

function validateInputs(name, id, email, contact) {
  const nameRegex = /^[A-Za-z\s]+$/;
  const idRegex = /^\d+$/;
  const emailRegex = /^[^@]+@[^@]+\.[a-z]{2,}$/;
  const contactRegex = /^\d{10,}$/;

  return (
    nameRegex.test(name) &&
    idRegex.test(id) &&
    emailRegex.test(email) &&
    contactRegex.test(contact)
  );
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const id = document.getElementById('studentId').value.trim();
  const email = document.getElementById('email').value.trim();
  const contact = document.getElementById('contact').value.trim();

  if (!name || !id || !email || !contact) {
    alert('Please fill in all fields.');
    return;
  }

  if (!validateInputs(name, id, email, contact)) {
    alert('Please enter valid data.');
    return;
  }

  const student = { name, id, email, contact };
  students.push(student);
  localStorage.setItem('students', JSON.stringify(students));
  form.reset();
  renderStudents();
});

function editStudent(index) {
  const student = students[index];
  document.getElementById('name').value = student.name;
  document.getElementById('studentId').value = student.id;
  document.getElementById('email').value = student.email;
  document.getElementById('contact').value = student.contact;

  students.splice(index, 1);
  localStorage.setItem('students', JSON.stringify(students));
  renderStudents();
}

function deleteStudent(index) {
  if (confirm('Are you sure you want to delete this record?')) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderStudents();
  }
}

window.onload = renderStudents;
