//* CHECKOUT *//

const SHIPPING_PRICE = 25.99
const FREE_SHIPPING_LIMIT = 3000
const TAX_RATE = 0.18
const deleteProducts = document.querySelector(".fa-trash-can");
const products = document.querySelector(".products");

//? Delete Products button event
deleteProducts.addEventListener("click", (e) => {
	Swal.fire({
		title: "Are you sure?",
		text: "You won't be able to revert this!",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "green",
		cancelButtonColor: "#d33",
		confirmButtonText: "Yes, delete it!",
	}).then((result) => {
		if (result.isConfirmed) {
			Swal.fire({
				title: "Deleted!",
				text: "Your product has been deleted.",
				icon: "success",
			});
			products.textContent = "No product";
			products.classList.add("no-product");
			e.target.parentElement.style.display = "none";
		}
	});
});

products.addEventListener("click", (e) => {
	console.log(e.target);
	if (e.target.classList.contains("fa-plus")) {
		// document.getElementById("quantity").innerText++

		//Traversing Dom for closest pick.
		e.target.previousElementSibling.innerText++;
		caluclateProductPrice(e.target);
	} else if(e.target.classList.contains("fa-minus")){
        e.target.nextElementSibling.innerText > 1 &&
        e.target.nextElementSibling.innerText--;
		caluclateProductPrice(e.target);
    } else if (e.target.classList.contains("fa-trash-can")){
        e.target.closest(".product").remove()
    }
});

const caluclateProductPrice = (btn) => {
	const discountedPrice = btn
		.closest(".product-info")
		.querySelector("#discounted-price").textContent;
	const quantity = btn
		.closest(".buttons-div")
		.querySelector("#quantity").textContent;
	const productPrice = btn
		.closest(".buttons-div")
		.querySelector("#product-price");
        productPrice.textContent = discountedPrice * quantity;
        calculateTotalPrices()
};

const calculateTotalPrices = () => {
    const prices = document.querySelectorAll("#product-price")
    console.log(prices)

    //? Selected Products (Total Cost)
    const subtotal =  [...prices].reduce((sum,price)=> sum + Number(price.textContent),0)

    //? write total cost on dom
    document.getElementById("selected-price").textContent = subtotal.toFixed(2)

}
