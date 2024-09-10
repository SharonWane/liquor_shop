

    let subtotal = 0;
basket.forEach(item => {
subtotal += item.price * item.quantity;
document.getElementById("subtotal").innerHTML=subtotal;
console.log(subtotal);

});




