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
    const sculptureItems = itemData.items.filter(item => item.category === "Sculpture");
    const paperItems = itemData.items.filter(item => item.category === "Paper");
    const codeItems = itemData.items.filter(item => item.category === "Code");
    const digitalItems = itemData.items.filter(item => item.category === "Digital");
    const fashionItems = itemData.items.filter(item => item.category === "Fashion");

    //choose one random item from each category
    const sculptureItem = chooseRandomItems(sculptureItems, 1);
    const paperItem = chooseRandomItems(paperItems, 1);
    const codeItem = chooseRandomItems(codeItems, 1);
    const digitalItem = chooseRandomItems(digitalItems, 1);
    const fashionItem = chooseRandomItems(fashionItems, 1);
    
    //render home view
    res.render('home-page',{ data, items: selectedItems, slideshow: slideshowItems, sculpture: sculptureItem, paper: paperItem, code: codeItem, digital: digitalItem, fashion: fashionItem })
})

//helper functions for home route

    //function to choose a random subset of items
    function chooseRandomItems(allItems, numItems) {
        //spread operator creates temp copy of allItems, sorts and assigns to shuffledItems
        const shuffledItems = [...allItems].sort(() => 0.5 - Math.random()); //0.5 - Math.random creates roughly 50% negative 50% positive values
        //slice selected first numItems of shuffled allItems array
        return shuffledItems.slice(0, numItems);
    }

    function getCategory(itemCategory) {
        if(itemCategory == "Sculpture") {
            return 'sculpture';
        } else if (itemCategory == "Paper") {
            return 'paper';
        } else if (itemCategory == "Code") {
            return 'code';
        } else if (itemCategory == "Digital") {
            return 'digital';
        } else if (itemCategory == "Fashion") {
            return 'fashion';
        }
        return null
    }

//individual item routes from home, category and item pages using itemId
app.get(['/item/:id'], (req, res) => {
    const itemId = parseInt(req.params.id, 10); 

    //find the item with matching id in itemData
    const selectedItem = itemData.items.find(item => item.id === itemId);

    if (!selectedItem) {
        //if item is not found
        res.status(404).send('Item not found');
        return;
    }

    const category = selectedItem.category;
    //take all category items from itemData and store in categoryData
    const categoryData = itemData.items.filter(item => item.category === category);
    //choose four other items from the same category
    const otherItems = chooseRandomItems(categoryData, 4);

    //render view with the selected item and other items in category
    res.render('item-page', { item: selectedItem, otherItems, itemData });
});

//route for Sculpture page
app.get('/sculpture', (req, res) => {
    const sculptureData = require('./data/items.json');
    const sculptureItems = itemData.items.filter(item => getCategory(item.category) === 'sculpture');
    res.render('category-page', { data: sculptureData, items: sculptureItems, category: 'Sculpture' });
});

//route for Paper page
app.get('/paper', (req, res) => {
    const paperData = require('./data/items.json');
    const paperItems = itemData.items.filter(item => getCategory(item.category) === 'paper');
    res.render('category-page', { data: paperData, items: paperItems, category: 'Paper' });
});

//route for Code page
app.get('/code', (req, res) => {
    const codeData = require('./data/items.json');
    const codeItems = itemData.items.filter(item => getCategory(item.category) === 'code');
    res.render('category-page', { data: codeData, items: codeItems, category: 'Code' });
});

//route for Digital page
app.get('/digital', (req, res) => {
    const digitalData = require('./data/items.json');
    const digitalItems = itemData.items.filter(item => getCategory(item.category) === 'digital');
    res.render('category-page', { data: digitalData, items: digitalItems, category: 'Digital' });
});

//route for Fashion page
app.get('/fashion', (req, res) => {
    const fashionData = require('./data/items.json');
    const fashionItems = itemData.items.filter(item => getCategory(item.category) === 'fashion');
    res.render('category-page', { data: fashionData, items: fashionItems, category: 'Fashion' });
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