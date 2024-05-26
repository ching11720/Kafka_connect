document.getElementById('buyButton').addEventListener('click', () => {
    fetch('/buy')
      .then(response => response.text())
      .then(data => {
        console.log(data);
        alert('購買請求已發送');
      })
      .catch(error => console.error('Error:', error));
  });
  