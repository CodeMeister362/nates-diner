import menuArray from './data.js';
import { formatCheckoutFields } from './field-formats.js';

let orderArr = [];

document.addEventListener('input', (e) => {
    if (e.target.className === 'input-fields') {
        formatCheckoutFields(e);
    }
})

document.addEventListener('click', (e) => {
    if (e.target.dataset.add) {
        handleAddItem(e.target.dataset.add)
    } 
    if (e.target.dataset.remove) {
        handleRemoveItem(e.target.dataset.remove)
    }
    if (e.target.id === 'place-order') {
        handlePlaceOrder()
    }
    if (e.target.id === 'close-modal') {
        document.getElementById('checkout').classList.add('hidden');
    }
})

document.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSubmitOrder(e);
})

const handleAddItem = (id) => {
  menuArray.forEach((item) => {
    if (item.id === id) {
        orderArr.push(item)
        }
    });

    document.getElementById('order-summary').classList.remove('hidden');
    render();
}

const getMenuHTML = () => {
  const menuHTML =  menuArray.map((item) => {
        return  `
            <div class="menu-item" id=${item.id}>
                <span class="food-emoji">${item.emoji}</span>
                <div class="details">
                    <h3>${item.name}</h3>
                    <p>${item.ingredients.join(', ')}</p>
                    <p>$${item.price}</p>
                </div>
                <i class="fa-solid fa-circle-plus add" data-add="${item.id}"></i>
            </div>
            `
    }).join('');

    return menuHTML;
}

const getOrderHTML = () => {
    const orderHTML = orderArr.map((item, index) => {
        return `
        <div class="order" id=${item.id}>
            <h3>${item.name}
            <span>
                <i class="fa-solid fa-circle-minus remove" data-remove="${index}"></i>
            </span></h3>
            <p>$${item.price}</p>
        </div>`
    }).join('');
    
    return orderHTML;
}  

const handleRemoveItem = (index) => {
    orderArr.splice(index, 1);
    render();
}

const updateTotal = () => {
    const total = orderArr.reduce((acc, item) => {
        return acc + item.price;
    }, 0);

    document.getElementById('order-total').textContent = "$" + total;
}

const handlePlaceOrder = () => {
    document.getElementById('checkout').classList.remove('hidden');
    render();
}

const handleSubmitOrder = (e) => {
    const input = document.getElementsByClassName('input-fields');
    const select = document.getElementsByClassName('select-fields');

    const formData = {
        name: input[0].value,
        creditCard: input[1].value,
        experation: input[2].value,
        cvv: input[3].value,
        street1: input[4].value,
        street2: input[5].value,
        city: input[6].value,
        state: select[0].value,
        zip: input[7].value,
        email: input[8].value,
        phone: input[9].value,
    }

   const orderData = orderArr.map((item) => {
        return {
            name: item.name,
            ingredients: item.ingredients.join(', '),
        }
    })

    console.log("Payment Information:", formData);
    console.log('Order Summary:', orderData);

    alert('Order Submitted!');

    orderArr = [];
    render();
}

const render = () => {
    document.getElementById('menu').innerHTML = getMenuHTML();

    if (orderArr.length > 0) {
        document.getElementById('order-list').innerHTML = getOrderHTML();
        updateTotal();
    } else {
        document.getElementById('order-list').innerHTML = ''
        document.getElementById('order-summary').classList.add('hidden');
        document.getElementById('checkout').classList.add('hidden');
    }
}

render();

