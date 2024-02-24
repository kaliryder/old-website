//express and handlebars setup
const express = require('express');
const expressHandlebars = require('express-handlebars');
const fs = require('fs');
const app = express();

//set up static files and URL encoding
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

//read and store data.json
const data = JSON.parse(fs.readFileSync('data/data.json', 'utf-8'));

//setup port
const port = process.env.port || 3000

//handlebars configuration with custom helper
const hbs = expressHandlebars.create({
    defaultLayout: 'main',
    helpers: {
        //helper returns true if file is an mp4
        isVideo: function (filename, options) {
            return filename.endsWith('.mp4') ? options.fn(this) : options.inverse(this);
        }
    }
});

//apply handlebars engine and set view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//choose a random subset of items
function chooseRandomItems(allItems, numItems) {
    //spread operator creates temp copy of allItems, sorts and assigns to shuffledItems
    const shuffledItems = [...allItems].sort(() => 0.5 - Math.random());
    //slice selected first numItems of shuffled allItems array
    return shuffledItems.slice(0, numItems);
}

//route for home page
app.get('/',(req,res)=>{
    //choose random items for each subcategory
    const physicalArtRandomItem = chooseRandomItems(data.categories["physical"].subcategories["physical-art"].items, 1);
    const clothesRandomItem = chooseRandomItems(data.categories["physical"].subcategories["clothes"].items, 1);
    const digitalArtRandomItem = chooseRandomItems(data.categories["digital"].subcategories["digital-art"].items, 1);
    const codeRandomItem = chooseRandomItems(data.categories["digital"].subcategories["code"].items, 1);
    //render home page
    res.render('home-page',{ physicalArtRandomItem, clothesRandomItem, digitalArtRandomItem, codeRandomItem })
})

//route for item pages
app.get('/item/:category/:subcategory/:group/:id', (req, res) => {
    const { category, subcategory, group, id } = req.params;
    //retrieve items data from group
    const items = data.categories[category].subcategories[subcategory].groups[group].items;
    //isolate item
    const item = items.find(item => item.id.toString() === id);
    if (item) {
        //choose four random items from the other items (DEBUG: exclude item)
        const numItems = items.length;
        var randomOtherItems;
        if (numItems < 4) {
            randomOtherItems = chooseRandomItems(items, numItems);
        } else {
            randomOtherItems = chooseRandomItems(items, 3);
        }
        //render item page
        res.render('item-page', { otherItems: randomOtherItems, item: item });
    } else {
        res.status(404).send('Item not found');
    }
});

//route for subcategory pages
app.get('/:category/:subcategory', (req, res) => {
    const { category, subcategory } = req.params;
    //retrieve subcategory data
    const subcategoryData = data.categories[category].subcategories[subcategory];
    //render subcategory page
    res.render('subcategory-page', { subcategory, subcategoryData });
});

//route for category pages
app.get('/:category', (req, res) => {
    const { category } = req.params;
    //retrieve category data
    const categoryData = data.categories[category];
    //render category page
    res.render('category-page', { category, categoryData });
});

//route for about page
app.get('/about',(req,res)=>{
    //retrieve about data
    const aboutData = data.about;
    //render about page
    res.render('about-page',{ aboutData })
})

//error handling app.use() basic express route 
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