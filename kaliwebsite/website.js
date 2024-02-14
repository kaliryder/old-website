//declare express consts
const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()

//fs to read json files
const fs = require('fs')

//static files or folders are specified before any route
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }));

//configure our express app to use handlebars
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))

app.set('view engine','handlebars')

//set products.json data to const
const itemData = JSON.parse(fs.readFileSync('data/items.json', 'utf-8'));

//setup port
const port = process.env.port || 3000

//home route
app.get('/',(req,res)=>{
    const allItems = itemData.items;
    var data = require('./data/items.json')

    //choose a subset of 5 random items for featured items
    const selectedItems = chooseRandomItems(allItems, 5);

    //choose a subset of 5 random items for slideshow
    const slideshowItems = chooseRandomItems(allItems, 5);

    //sort items of each category into their own consts
    const sculptureItems = itemData.items.filter(item => getCategoryFromId(item.id) === 'sculpture');
    const paperItems = itemData.items.filter(item => getCategoryFromId(item.id) === 'paper');
    const codeItems = itemData.items.filter(item => getCategoryFromId(item.id) === 'code');
    const digitalItems = itemData.items.filter(item => getCategoryFromId(item.id) === 'digital');
    const fashionItems = itemData.items.filter(item => getCategoryFromId(item.id) === 'fashion');

    //choose one random item from each category
    const sculptureItem = chooseRandomItems(sculptureItems, 1);
    const paperItem = chooseRandomItems(paperItems, 1);
    const codeItem = chooseRandomItems(codeItems, 1);
    const digitalItem = chooseRandomItems(digitalItems, 1);
    const fashionItem = chooseRandomItems(fashionItems, 1);
    
    //render home view
    res.render('home-page',{ data, products: selectedProducts, slideshow: slideshowProducts, top: topProduct, bottom: bottomsProduct, outerwear: outerwearProduct, digital: digitalItem, fashion: fashionItem })
})

//helper functions for home route

    //function to choose a random subset of products
    function chooseRandomProducts(allProducts, numProducts) {
        //spread operator creates temp copy of allProducts, sorts and assigns to shuffledProducts
        const shuffledProducts = [...allProducts].sort(() => 0.5 - Math.random()); //0.5 - Math.random creates roughly 50% negative 50% positive values
        //slice selected first numProducts of shuffled allProducts array
        return shuffledProducts.slice(0, numProducts);
    }

    //function to determine the category based on the productId range
    function getCategoryFromId(productId) {
        if (productId >= 1 && productId <= 12) {
            return 'outerwear';
        } else if (productId >= 13 && productId <= 24) {
            return 'tops';
        } else if (productId >= 25 && productId <= 36) {
            return 'bottoms';
        }
        //handle else
        return null;
    }

//individual product routes from home, category and product pages using productId
app.get(['/item/:id', '/product/:id'], (req, res) => {
    const productId = req.params.id;

    //find the product with matching id in productData
    const selectedProduct = productData.products.find(item => item.id === parseInt(productId, 10)); //parseInt converts productId to int (base 10)

    if (!selectedProduct) {
        //if product is not found
        res.status(404).send('Product not found');
        return;
    }

    const category = getCategoryFromId(productId);
    //take all category products from productData and store in categoryData
    const categoryData = productData.products.filter(product => getCategoryFromId(product.id) === category);
    //choose four other products from the same category
    const otherProducts = chooseRandomProducts(categoryData, 4);

    //render view with the selected product and other products in category
    res.render('itemdetails-page', { product: selectedProduct, otherProducts, productData });
});

//route for Tops page
app.get('/tops', (req, res) => {
    const topsData = require('./data/products.json');
    const topsProducts = productData.products.filter(product => getCategoryFromId(product.id) === 'tops');
    res.render('category-page', { data: topsData, products: topsProducts, category: 'Tops' });
});

//route for Bottoms page
app.get('/bottoms', (req, res) => {
    const bottomsData = require('./data/products.json');
    const bottomsProducts = productData.products.filter(product => getCategoryFromId(product.id) === 'bottoms');
    res.render('category-page', { data: bottomsData, products: bottomsProducts, category: 'Bottoms' });
});

//route for Outerwear page
app.get('/outerwear', (req, res) => {
    const outerwearData = require('./data/products.json');
    const outerwearProducts = productData.products.filter(product => getCategoryFromId(product.id) === 'outerwear');
    res.render('category-page', { data: outerwearData, products: outerwearProducts, category: 'Outerwear' });
});

//route for About page
app.get('/about',(req,res)=>{
    var data = require('./data/info.json')
    res.render('about-page',{ data })
})

//error handling ->  app.use() basic express route 
app.use((req,res) => {
    res.status(404)
    res.render('404')
})

//server error 500
app.use((error,req,res,next) => {
    console.log(error.message)
    res.status(500)
    res.render('500') 
}) 

//setup listener
app.listen(port,()=>{
    console.log(`Server started http://localhost:${port}`)
    console.log('To close press Ctrl-C')
})