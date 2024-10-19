document.addEventListener("DOMContentLoaded", function () {
    const sidebarContainer = document.getElementById('sidebar-container');

    fetch('../componentes/sidebar.html')
        .then(response => response.text())
        .then(data => {
            sidebarContainer.innerHTML = data;

            const btn = document.querySelector('#btn');
            const sidebar = document.querySelector('.sidebar');
            btn.onclick = function () {
                sidebar.classList.toggle('active');
            };
        });
});
