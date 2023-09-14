document.addEventListener('DOMContentLoaded', function () {
    const directoryList = document.getElementById('directory-list');
  
    fetch('/COMP4537/labs/1/js')
      .then(response => response.json())
      .then(data => {
        data.forEach(item => {
          const listItem = document.createElement('li');
          const link = document.createElement('a');
          link.textContent = item;
          link.href = '/COMP4537/labs/1/js/' + item;
          listItem.appendChild(link);
          directoryList.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error('Error fetching directory listing:', error);
      });
  });