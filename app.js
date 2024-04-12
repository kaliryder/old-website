// express and handlebars setup
const express = require('express');
const expressHandlebars = require('express-handlebars');
const fs = require('fs');
const app = express();

// set up static files and URL encoding
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

// setup port
const port = process.env.PORT || 3005;

// read and store json data
const data = JSON.parse(fs.readFileSync('data/data.json', 'utf-8'));
const navItems = data.nav.navItems;
const headers = data.headers;

// gallery variables
const numColumns = 3;

// handlebars
// configuration with custom helper
const hbs = expressHandlebars.create({
    defaultLayout: 'main',
    helpers: {
        isVideo: function (filename, options) {
            if (filename && typeof filename === 'string') {
                return filename.endsWith('.mp4') ? options.fn(this) : options.inverse(this);
            } else {
                // handle filename undefined or not a string
                return options.inverse(this);
            }
        }
    }
});
// apply handlebars engine and set view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// functions
// choose a random subset of items
function chooseRandomItems(allItems, numItems) {
    // spread operator creates temp copy of allItems, sorts and assigns to shuffledItems
    const shuffledItems = [...allItems].sort(() => 0.5 - Math.random());
    // slice selected first numItems of shuffled allItems array
    return shuffledItems.slice(0, numItems);
}
// gets all items from a category
function getAllItemsFromCategory(categoryName) {
    const category = data.categories[categoryName];
    let allItems = [];
    // parse through and concatonate all items
    for (const subcategory in category.subcategories) {
        for(const group in subcategory.groups) {
            allItems = allItems.concat(category.subcategories[subcategory].groups[group].items);
        }
    }
    return allItems;
}
// gets all items from a subcategory
function getAllItemsFromSubcategory(categoryName, subcategoryName) {
    const subcategory = data.categories[categoryName].subcategories[subcategoryName];
    let allItems = [];

    for (const group in subcategory.groups) {
        allItems = allItems.concat(subcategory.groups[group].items);
    }

    return allItems;
}

app.use((req, res, next) => {
    if (/Mobi|Android/i.test(req.headers['user-agent'])) {
        // Render the mobile landing page
        res.render('mobile-landing');
    } else {
        // Continue with the rest of the middleware if not a mobile device
        next();
    }
});

// routes
// route for home page
app.get('/',(req,res)=>{
    // one random item for each subcategory;
    const physicalArtRandomItem = chooseRandomItems(getAllItemsFromSubcategory("physical", "physical-art"), 1)[0];
    const clothesRandomItem = chooseRandomItems(getAllItemsFromSubcategory("physical", "clothes"), 1)[0];
    const digitalArtRandomItem = chooseRandomItems(getAllItemsFromSubcategory("digital", "digital-art"), 1)[0];
    const codeRandomItem = chooseRandomItems(getAllItemsFromSubcategory("digital", "code"), 1)[0];

    // render home page
    res.render('home-page',{ layout: 'home.handlebars', physicalArtRandomItem, clothesRandomItem, digitalArtRandomItem, codeRandomItem, navItems })
})

// route for item pages
app.get('/item/:category/:subcategory/:group/:id', (req, res) => {
    const { category, subcategory, group, id } = req.params;

    //retrieve items data from group
    const items = data.categories[category].subcategories[subcategory].groups[group].items;
    // isolate item
    const item = items.find(item => item.id.toString() === id);

    if (item) {
        // add all additional images and videos (links) into an array
        let additionalMedia = [];
        if (item.images.length !== 0) {
            additionalMedia = additionalMedia.concat(item.images);
        }
        if (item.videos.length !== 0) {
            additionalMedia = additionalMedia.concat(item.videos);
        }

        // choose four random items from the other items (DEBUG: exclude item)
        const numItems = items.length;
        var additionalItems;
        if (numItems < 4) {
            additionalItems = chooseRandomItems(items, numItems);
        } else {
            additionalItems = chooseRandomItems(items, 3);
        }

        // default additionalMedia to an empty array if it's not provided
        const media = additionalMedia || [];   

        //render item page
        res.render('item-page', { layout: 'item.handlebars', item, additionalItems, additionalMedia: media, navItems });
    } else {
        res.status(404).send('Item not found');
    }
});

//route for subcategory pages
app.get('/subcategory/:category/:subcategory', (req, res) => {
    const { category, subcategory } = req.params;
    const thisHeader = headers.subcategories.find(subcat => subcat.subcategory === subcategory);
    //retrieve subcategory data
    const subcategoryData = getAllItemsFromSubcategory(category, subcategory);
    //create 2d array for item gallery rows
    const numItems = subcategoryData.length;
    const numRows = Math.ceil(numItems / numColumns);
    let rowArray = [];
    let itemCounter = 0;
    for (let r = 0; r < numRows; r++) {
        rowArray[r] = [];
        for (let c = 0; c < numColumns; c++) {
            rowArray[r][c] = subcategoryData[itemCounter];
            itemCounter++;
        }
    }

    //render subcategory page
    res.render('subcategory-page', { layout: 'gallery.handlebars', subcategory: subcategory, subcategoryData: subcategoryData, navItems, header: thisHeader, rowArray });
});

//route for category pages
app.get('/category/:category', (req, res) => {
    const { category } = req.params;
    const thisHeader = headers.categories.find(cat => cat.category === category);
    //create array of subcategories
    let subcategoryArray = [];
    //create array of random items for each subcategory, idx matches subcategoryArray
    let randomItemArray = [];
    for (const subcategory in data.categories[category].subcategories) {
        subcategoryArray = subcategoryArray.concat(subcategory);
        randomItemArray = randomItemArray.concat(chooseRandomItems(getAllItemsFromSubcategory(category, subcategory), 1));
    }
    //create 2d array for item gallery rows
    const numItems = randomItemArray.length;
    const numRows = Math.ceil(numItems / numColumns);
    let rowArray = [];
    let itemCounter = 0;
    for (let r = 0; r < numRows; r++) {
        rowArray[r] = [];
        for (let c = 0; c < numColumns; c++) {
            rowArray[r][c] = randomItemArray[itemCounter];
            itemCounter++;
        }
    }

    //render category page
    res.render('category-page', { layout: 'gallery.handlebars', category: category, subcategoryArray: subcategoryArray, randomItemArray: randomItemArray, navItems, header: thisHeader, rowArray });
});

//route for about page
app.get('/about',(req,res)=>{
    //retrieve about data
    const aboutData = data.about;
    //render about page
    res.render('about-page',{ data: aboutData, navItems });
})

//error handling app.use() basic express route 
app.use((req,res) => {
    res.status(404);
    res.render('404', { navItems });
})

//server error 500
app.use((error,req,res,next) => {
    console.log(error.message);
    res.status(500);
    res.render('500', { navItems }); 
}) 

//setup listener
app.listen(port,()=>{
    console.log(`Server started http://localhost:${port}`)
    console.log('To close press Ctrl-C')
})