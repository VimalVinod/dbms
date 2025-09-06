// ---------- Supabase Placeholder ----------
const supabase = null; // Replace with Supabase client when ready

// ---------- Signup ----------
function signup() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  let users = JSON.parse(localStorage.getItem('users')) || [];
  if(users.find(u => u.email === email)) { alert('Email exists'); return; }
  users.push({ name, email, password });
  localStorage.setItem('users', JSON.stringify(users));

  alert('Signup successful!');
  window.location.href = 'login.html';
}

// ---------- Login ----------
function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  let users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email && u.password === password);
  if(user) { localStorage.setItem('currentUser', JSON.stringify(user)); window.location.href = 'index.html'; }
  else { alert('Invalid credentials'); }
}

// ---------- Post Service ----------
function postService() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const price = document.getElementById('price').value;
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  let services = JSON.parse(localStorage.getItem('services')) || [];
  services.push({ title, description, price, user: currentUser.name });
  localStorage.setItem('services', JSON.stringify(services));

  alert('Service posted successfully!');
  window.location.href = 'index.html';
}

// ---------- Display Services ----------
function displayServices() {
  const container = document.getElementById('services-list');
  if(!container) return;
  let services = JSON.parse(localStorage.getItem('services')) || [];
  container.innerHTML = '';
  services.forEach(service => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<h3>${service.title}</h3><p>${service.description}</p><strong>Price: ₹${service.price}</strong><p>By: ${service.user}</p>`;
    container.appendChild(div);
  });
}

// ---------- Post Request ----------
function postRequest() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  let requests = JSON.parse(localStorage.getItem('requests')) || [];
  requests.push({ title, description, user: currentUser.name });
  localStorage.setItem('requests', JSON.stringify(requests));

  alert('Request posted successfully!');
  window.location.href = 'requests.html';
}

// ---------- Display Requests ----------
function displayRequests() {
  const container = document.getElementById('requests-list');
  if(!container) return;
  let requests = JSON.parse(localStorage.getItem('requests')) || [];
  container.innerHTML = '';
  requests.forEach(req => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<h3>${req.title}</h3><p>${req.description}</p><p>Posted by: ${req.user}</p>`;
    container.appendChild(div);
  });
}

// ---------- Display Profile ----------
function displayProfile() {
  const container = document.getElementById('profile-info');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if(!container || !currentUser) return;
  container.innerHTML = `<h2>${currentUser.name}</h2><p>Email: ${currentUser.email}</p>`;
}

// ---------- Logout ----------
function logout() { localStorage.removeItem('currentUser'); window.location.href = 'login.html'; }

// ---------- On Load ----------
window.onload = function() {
  displayServices();
  displayRequests();
  displayProfile();
}
