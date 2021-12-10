let cartDiv = document.getElementById("cartDiv");
let modal = document.querySelector(".modal");
let name = document.getElementById("name");
let nameError = document.getElementById("nameError");
let email = document.getElementById("email");
let emailError = document.getElementById("emailError");
let pnumber = document.getElementById("pnumber");
let phoneError = document.getElementById("phoneError");
let sub = document.querySelector("#sub");
let continueShopping = document.getElementById("continue");
let quantity = document.getElementById("quantity");
let increase = document.getElementsByClassName("increase");
let decrease = document.getElementsByClassName("decrease");
let productBtn = document.getElementsByClassName("product-btn");
let check_out = document.getElementById("check-out");
let finalTotal = document.querySelector("#total");
let checkOutTotal = document.getElementById("checkOutTotal");
let closeSummary = document.getElementById("closeSummary");
let addedToCart = document.querySelectorAll(".addedToCart");
let product_container = document.querySelector(".product-container");

// let counter = 1;
cartDiv.addEventListener("click", () => {
  modal.classList.add("active");
});
// Close Modal
window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.classList.remove("active");
  }
});
//Continue Shopping BTN
continueShopping.addEventListener("click", () => {
  modal.classList.remove("active");
});
//Close Summary Btn
closeSummary.addEventListener("click", function () {
  document.querySelector(".summary-modal").classList.remove("active");
  document.location.reload();
});
// let productsArray = [];
let productObj = {};

//select All add to cart button and loopthrough
// let quantity = document.getElementsById('')
let myTable = document.getElementById("myTable");
let addCart = document.querySelectorAll(".addToCart");
let cartCounter = document.getElementById("cartCounter");
let remove = document.getElementsByClassName("remove");

for (let i = 0; i < addCart.length; i++) {
  addCart[i].addEventListener("click", addToCart);
  grandTotal();
}

for (let i = 0; i < remove.length; i++) {
  removeBtn = remove[i];
  console.log(removeBtn);
}

//Add to Cart Function
function addToCart() {
  // let productsArray = [];
  if (event.target.textContent == "ADD TO CART") {
    let parent = event.target.parentElement;
    let btn = parent.children[2];

    //get Product ID
    let productId = parent.id;
    productObj.id = productId;
    //get Product Name
    let productName = parent.children[1].textContent;
    productObj.name = productName;
    //Get Product Price
    let productPrice = parent.children[0].children[1].children[1].textContent;
    productObj.price = productPrice;
    // console.log(productObj);
    let tr = document.createElement("tr");
    // console.log(tr);
    // let itemTotal = parseInt(cartQty.value) * item_price;
    tr.innerHTML = `
        <td class="id"><p id="counter"></p></td>
        <td class="cartProduct">${productObj.name}</td>
        <td class="price"><span>&#8358</span>${productObj.price}</td>
        <td class= "quantity">
          <button class="decrease qtdBtn">-</button>
          <input class="cartQtdValue" value="1"/>
          <button class="increase qtdBtn">+</button>
        </td>
        <td class="item-total">${productObj.price}</td>
        <td><button  class="remove">remove</button></td>`;
    tr.className = "cartTr";
    event.target.textContent = "REMOVE FROM CART";

    // productsArray.push(productObj);

    myTable.appendChild(tr);

    for (let i = 0; i < increase.length; i++) {
      let btnClicked = increase[i];
      btnClicked.addEventListener("click", increaseItm);
    }
    for (let i = 0; i < decrease.length; i++) {
      let btnClicked = decrease[i];
      btnClicked.addEventListener("click", decreaseItm);
    }
    grandTotal();

    for (let i = 0; i < remove.length; i++) {
      removeBtn = remove[i];
      removeBtn.addEventListener("click", removeItem);
    }
    // }
  } else if (event.target.textContent == "REMOVE FROM CART") {
    removeItemFromCart(event);
  }
}

//INCREASE CART ITEM FUNCTION
function increaseItm(event) {
  let parentElem = event.target.parentElement.parentElement;
  // counter++;
  let item_total = parentElem.getElementsByClassName("item-total")[0];

  let item_price = parentElem.children[2].textContent.slice(1);
  // console.log(item_price);
  let cartQty = parentElem.children[3].children[1];
  // let cartQtyValue = counter;
  let inputValue = cartQty.value;
  let newInputValue = parseInt(inputValue) + 1;
  cartQty.value = newInputValue;
  let itemTotal = parseInt(cartQty.value) * item_price;
  item_total.textContent = itemTotal;

  // totalArray.push(itemTotal);
  grandTotal();
  // console.log(totalArray);
}

//DECREASE CART ITEM FUNCTION
function decreaseItm(event) {
  let parentElem = event.target.parentElement.parentElement;
  // counter++;
  let item_total = parentElem.getElementsByClassName("item-total")[0];

  let item_price = parentElem.children[2].textContent.slice(1);
  // console.log(item_price);
  let cartQty = parentElem.children[3].children[1];
  // let cartQtyValue = counter;
  let inputValue = cartQty.value;
  let newInputValue = parseInt(inputValue) - 1;
  cartQty.value = newInputValue;
  if (cartQty.value < 1) {
    alert("Item Quantity can't be less than 1, Click remove Instead");
    cartQty.value = 1;
    item_total.textContent = item_price;
  }
  let itemTotal = parseInt(cartQty.value) * item_price;
  item_total.textContent = itemTotal;
  grandTotal();
  // console.log(itemTotal);
}

function grandTotal() {
  let total = 0;
  let all_item_total = document.querySelectorAll(".item-total");
  for (let i = 0; i < all_item_total.length; i++) {
    let priceTotal = Number(all_item_total[i].textContent);
    total += Number(priceTotal);
  }
  checkOutTotal.innerHTML = total;
  cartCounter.textContent = all_item_total.length;
}

check_out.addEventListener("click", checkOut);

//Remove Item From Cart INSIDE CART FUNCTION
function removeItem(event) {
  let productCard = document.querySelectorAll(".productcard");
  let target = event.target.parentElement.parentElement;

  for (let i = 0; i < productCard.length; i++) {
    let clickedItem = productCard[i].children[1];
    if (clickedItem.textContent == target.children[1].textContent) {
      let selectedItem = clickedItem.parentElement.children[2];
      selectedItem.textContent = "ADD TO CART";
      target.remove();
    }
  }
  grandTotal();
}

function removeItemFromCart(event) {
  let carTrs = myTable.querySelectorAll(".cartTr");
  let targetParent = event.target.parentElement;
  //Get productName
  let targetItemPname = targetParent.children[1].textContent;
  carTrs.forEach((item) => {
    let cartItemPname = item.children[1].textContent;
    if (cartItemPname == targetItemPname) {
      item.remove();
    }
    event.target.textContent = "ADD TO CART";
  });
  grandTotal();
}

// Form Validation
name.addEventListener("blur", () => {
  // validateName();
});
email.addEventListener("blur", () => {
  // validateEmail();
});
pnumber.addEventListener("blur", () => {
  // validatepnumber();
});
let error = false;
function validateEmail() {
  if (email.value == "") {
    emailError.textContent = "Email is Empty";
    emailError.style.color = "red";
    email.style.borderColor = "red";
    return (error = true);
  } else if (!email.value.includes("@")) {
    emailError.textContent = "Invalid Email";
    email.style.borderColor = "red";
    return (error = true);
  } else {
    emailError.textContent = "";
    email.style.borderColor = "green";
  }
  return (error = false);
}

function validateName() {
  if (name.value == "") {
    nameError.textContent = "Name is Empty";
    nameError.style.color = "red";
    name.style.borderColor = "red";
    return (error = true);
  } else {
    nameError.textContent = "";
    name.style.borderColor = "green";
    return (error = false);
  }
}

function regexNum() {
  var compare = /[0-9]{11}/;
  if (pnumber.value.match(compare)) {
    return (error = false);
  } else {
    phoneError.style.color = "red";
    pnumber.style.borderColor = "red";
    return (error = true);
  }
}
function validatepnumber() {
  regexNum();
  if (pnumber.value == "") {
    phoneError.textContent = "phone field is Empty";
    phoneError.style.color = "red";
    pnumber.style.borderColor = "red";
    return (error = true);
  } else if (pnumber.value.length < 11 || pnumber.value.length > 11) {
    phoneError.style.color = "red";
    pnumber.style.borderColor = "red";
    alert("Incorrect Phone number");
    return (error = true);
  } else if (isNaN(pnumber.value)) {
    return (error = true);
  } else {
    phoneError.textContent = "";
    pnumber.style.borderColor = "green";
    pnumber.style.border = "2px solid green";
    return (error = false);
  }
}

const customer = {};
function checkOut() {
  validateName();
  validateEmail();
  validatepnumber();
  customer.name = name.value;
  customer.email = email.value;
  customer.pnumber = pnumber.value;
  customer.cart = Number(cartCounter.textContent);

  let myTotal = total.textContent.slice(1);

  Number(myTotal);

  if (myTotal <= 0) {
    alert("Your cart is Empty");
    // window.location.reload();
    return;
  } else if (error == true) {
    alert("One or Two fields are empty or incorrect");
  } else {
    document.getElementById(
      "thankYouMsg"
    ).innerHTML = `Thank You, <h3>${customer.name},</h3> Your Order Has been Received`;
    payWithPaystack();
  }
}

function showSummary() {
  let productArray = [];
  let output = "";
  // let productObj = {};
  let trs = myTable.querySelectorAll(".cartTr");
  for (let i = 0; i < trs.length; i++) {
    let productObj = {
      name: trs[i].querySelector(".cartProduct").textContent,
      quantity: trs[i].querySelector(".cartQtdValue").value,
    };
    console.log(productObj.name, productObj.quantity);
    output += `
              <tr>
              <td>${[i + 1]}   </td>
              <td>${productObj.name}</td>
              <td>${productObj.quantity}</td>
              </tr>
              `;
  }
  console.log(output);
  document.querySelector(".summaryTable").innerHTML = output;
  document.querySelector(".summary-modal").classList.add("active");
}

function payWithPaystack() {
  let handler = PaystackPop.setup({
    key: "pk_test_93680fdf2e4c2a94ce07d985f07a0e29e7fc5ddc", // Replace with your public key
    email: document.getElementById("email").value,
    amount: checkOutTotal.textContent * 100, //document.getElementById("amount").value * 100,
    ref: "" + Math.floor(Math.random() * 1000000000 + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
    // label: "Optional string that replaces customer email"
    onClose: function () {
      alert("Window closed.");
    },
    callback: function () {
      // let message = "Payment complete! Reference: " + response.reference;
      // alert(message);
      showSummary();
    },
  });

  handler.openIframe();
}

//Remove Item from Cart
