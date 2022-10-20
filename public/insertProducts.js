console.log('teste');
const formDOM = document.querySelector('.product-form');
const productInputDOM = document.querySelector('.product-input');
const priceInputDOM = document.querySelector('.price-input');
const descriptionInputDOM = document.querySelector('.description-input');
const imagelinkInputDOM = document.querySelector('.image-input');

formDOM.addEventListener('submit', async (e) =>{
    e.preventDefault();
    const name = productInputDOM.value;
    const price = priceInputDOM.value;
    const description = descriptionInputDOM.value;
    const image = imagelinkInputDOM.value;
    
    try{
        await axios.post('/api/v1/products', {name, price, description, image});
    } catch (error) {
        formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
    }
    
})