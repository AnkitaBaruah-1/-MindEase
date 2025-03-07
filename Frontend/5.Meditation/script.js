
document.querySelector('.dropdown select').addEventListener('change', function(event) {
    const selectedCategory = event.target.value;
    alert(`You selected ${selectedCategory}!`);
});
  