const header = document.querySelector("header");

window.addEventListener ("scroll", function(){
    header.classList.toggle ("sticky", this.window.scrollY > 0);
})

let menu = document.querySelector('#menu-icon');
let navmenu = document.querySelector('.navmenu');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navmenu.classList.toggle('open');
}

const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
})

//

const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// lista de todos los contenedores de productos
const productsList = document.querySelector('.products');

// variable de arreglos de productos 
let allProducts =  []

let valorTotal = document.querySelector('.total-pagar');

const countProducts = document.querySelector('#contador-productos')


productsList.addEventListener('click', e => {
    if(e.target.classList.contains('btn-add-cart')){
        const product = e.target.parentElement

        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h4').textContent,
            price: product.querySelector('p').textContent,
        };

        const exits = allProducts.some(product => product.title === infoProduct.title)

        if (exits){
            const products = allProducts.map(product => {
                if(product.title === infoProduct.title){
                    product.quantity++;
                    return product;
                } else {
                    return product;
                }
            });
            allProducts = [...products];
        } else {
            allProducts = [...allProducts, infoProduct];
        }

        showHTML();  
    }
});

rowProduct.addEventListener('click', (e) => {
    if(e.target.classList.contains('icon-close')){
        const product = e.target.parentElement
        const title = product.querySelector('p').textContent

        allProducts = allProducts.filter(
            product => product.title !== title
        );

        console.log(allProducts)
        showHTML()
    }
});

// funcion para mostrar html
const showHTML = () => {

    if(!allProducts.length) {
        containerCartProducts.innerHTML= `
            <p class="cart-empty">El carrito está vacío</p>
        `
        
    }


// limpiar HTML
     rowProduct.innerHTML = '';

     let total = 0;
     let totalOfPorducrts= 0;


    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = `
        <div class="info-cart-products">
								<span class="cantidad-producto-carrito">${product.quantity}</span>
								<p class="titulo-producto-carrito">${product.title}</p>
								<span class="precio-producto-carrito">${product.price}</span>
							</div>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
							  </svg>              
        `;

        rowProduct.append(containerProduct);

        total = total + parseInt(product.quantity * product.price.slice(1));
        totalOfPorducrts = totalOfPorducrts + product.quantity;

    });


    valorTotal.innerText = `$${total}`;
    countProducts.innerText =totalOfPorducrts;
};
