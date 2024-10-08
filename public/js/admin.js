// public/js/admin.js

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const adminKey = urlParams.get('admin_key');

  if (!adminKey) {
    alert('Admin key is missing');
    return;
  }

  // Fetch users data
  fetch(`/admin/users?admin_key=${adminKey}`)
    .then(response => response.json())
    .then(users => {
      const usersTableBody = document.querySelector('#usersTable tbody');
      users.forEach(user => {
        const row = `
          <tr>
            <td>${user.id}</td>
            <td>${user.email}</td>
            <td>${user.name}</td>
            <td>${user.given_name}</td>
            <td>${user.family_name}</td>
            <td>${user.locale}</td>
            <td>${user.account_type}</td>
            <td>${user.rtl_counter}</td>
            <td>${user.created_at}</td>
          </tr>
        `;
        usersTableBody.insertAdjacentHTML('beforeend', row);
      });
    })
    .catch(error => {
      console.error('Error fetching users:', error);
    });

  // Fetch pages data
  fetch(`/admin/pages?admin_key=${adminKey}`)
    .then(response => response.json())
    .then(pages => {
      const pagesTableBody = document.querySelector('#pagesTable tbody');
      pages.forEach(page => {
        const row = `
          <tr>
            <td>${page.page_id}</td>
            <td>${page.user_email}</td>
            <td>${page.page_url}</td>
            <td>${page.created_at}</td>
          </tr>
        `;
        pagesTableBody.insertAdjacentHTML('beforeend', row);
      });
    })
    .catch(error => {
      console.error('Error fetching pages:', error);
    });
});
