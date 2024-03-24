// ITERATION 1

function updateSubtotal(product) {
  const price = parseFloat(product.querySelector('.price span').innerText);
  const quantity = parseInt(product.querySelector('.quantity input').value);
  const subtotal = price * quantity;
  
  const subtotalElement = product.querySelector('.subtotal span');
  subtotalElement.innerText = subtotal.toFixed(2);
  
  return subtotal;
}


function calculateAll() {
  const products = document.getElementsByClassName('product');
  
  let total = 0;
  
  for(let product of products) {
      total += updateSubtotal(product);
  }
  
  const totalElement = document.querySelector('#cart .total-value span');
  totalElement.innerText = total.toFixed(2);
}


// ITERATION 4

function removeProduct(event) {
  const buttonClicked = event.currentTarget;
  const productRow = buttonClicked.parentNode.parentNode;
  
  productRow.parentNode.removeChild(productRow);
  
  calculateAll();  // Recalculate total after removing a product
}


// ITERATION 5

function createProduct() {
  const productNameInput = document.querySelector('.create-product td:nth-child(1) input');
  const productPriceInput = document.querySelector('.create-product td:nth-child(2) input');
  
  const productName = productNameInput.value;
  const productPrice = parseFloat(productPriceInput.value);
  
  const tbody = document.querySelector('#cart tbody');
  
  const newRow = `
      <tr class="product">
          <td class="name">
              <span>${productName}</span>
          </td>
          <td class="price">$<span>${productPrice.toFixed(2)}</span></td>
          <td class="quantity">
              <input type="number" value="0" min="0" placeholder="Quantity" />
          </td>
          <td class="subtotal">$<span>0</span></td>
          <td class="action">
              <button class="btn btn-remove">Remove</button>
          </td>
      </tr>
  `;
  
  tbody.innerHTML += newRow;
  
  // Clear input fields
  productNameInput.value = '';
  productPriceInput.value = '0';
  
  const removeButtons = document.querySelectorAll('.btn-remove');
  
  removeButtons.forEach(button => {
      button.addEventListener('click', removeProduct);
  });
}
window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  const removeButtons = document.querySelectorAll('.btn-remove');
  
  removeButtons.forEach(button => {
      button.addEventListener('click', removeProduct);
  });

  const createBtn = document.getElementById('create');
  createBtn.addEventListener('click', createProduct);
});

