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

//json consts
const animationData = JSON.parse(fs.readFileSync('data/animation.json','utf-8'));
const codeData = JSON.parse(fs.readFileSync('data/code.json','utf-8'));
const digitalArtData = JSON.parse(fs.readFileSync('data/digital-art.json','utf-8'));
const fashionData = JSON.parse(fs.readFileSync('data/fashion.json','utf-8'));
const graphicDesignData = JSON.parse(fs.readFileSync('data/graphic-design.json','utf-8'));
const paperData = JSON.parse(fs.readFileSync('data/paper.json','utf-8'));
const sculptureData = JSON.parse(fs.readFileSync('data/sculpture.json','utf-8'));
const uxuiData = JSON.parse(fs.readFileSync('data/ux-ui.json','utf-8'));

//setup port
const port = process.env.port || 3000

//helper function to see if file is mp4
const hbs = expressHandlebars.create({
    helpers: {
        isVideo: function (filename, options) {
            return filename.endsWith('.mp4') ? options.fn(this) : options.inverse(this);
        }
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//home route
app.get('/',(req,res)=>{
    /* create vars for all subcategories */
    const animationItems = animationData.items;
    var animationDataVar = require('./data/animation.json');
    const codeItems = codeData.items;
    var codeDataVar = require('./data/code.json');
    const digitalArtItems = digitalArtData.items;
    var digitalArtDataVar = require('./data/digital-art.json');
    const fashionItems = fashionData.items;
    var fashionDataVar = require('./data/fashion.json');
    const graphicDesignItems = graphicDesignData.items;
    var graphicDesignDataVar = require('./data/graphic-design.json');
    const paperItems = paperData.items;
    var paperDataVar = require('./data/paper.json');
    const sculptureItems = sculptureData.items;
    var sculptureDataVar = require('./data/sculpture.json');
    const uxuiItems = uxuiData.items;
    var uxuiDataVar = require('./data/ux-ui.json');

    /* choose one random item from each subcategory for item links */
    const animationRandomItem = chooseRandomItems(animationItems, 1);
    const codeRandomItem = chooseRandomItems(codeItems, 1);
    const digitalArtRandomItem = chooseRandomItems(digitalArtItems, 1);
    const fashionRandomItem = chooseRandomItems(fashionItems, 1);
    const graphicDesignRandomItem = chooseRandomItems(graphicDesignItems, 1);
    const paperRandomItem = chooseRandomItems(paperItems, 1);
    const sculptureRandomItem = chooseRandomItems(sculptureItems, 1);
    const uxuiRandomItem = chooseRandomItems(uxuiItems, 1);

    /* choose one random item from each subcategory for item links */
    const animationRandomSubcategoryItem = chooseRandomItems(animationItems, 1);
    const codeRandomSubcategoryItem = chooseRandomItems(codeItems, 1);
    const digitalArtRandomSubcategoryItem = chooseRandomItems(digitalArtItems, 1);
    const fashionRandomSubcategoryItem = chooseRandomItems(fashionItems, 1);
    const graphicDesignRandomSubcategoryItem = chooseRandomItems(graphicDesignItems, 1);
    const paperRandomSubcategoryItem = chooseRandomItems(paperItems, 1);
    const sculptureRandomSubcategoryItem = chooseRandomItems(sculptureItems, 1);
    const uxuiRandomSubcategoryItem = chooseRandomItems(uxuiItems, 1);
    
    //render home view
    res.render('home-page',{ 
        animationDataVar,
        codeDataVar,
        digitalArtDataVar,
        fashionDataVar,
        graphicDesignDataVar,
        paperDataVar,
        sculptureDataVar,
        uxuiDataVar,
        animationRandomItem,
        codeRandomItem,
        digitalArtRandomItem,
        fashionRandomItem,
        graphicDesignRandomItem,
        paperRandomItem,
        sculptureRandomItem,
        uxuiRandomItem,
        animationRandomSubcategoryItem,
        codeRandomSubcategoryItem,
        digitalArtRandomSubcategoryItem,
        fashionRandomSubcategoryItem,
        graphicDesignRandomSubcategoryItem,
        paperRandomSubcategoryItem,
        sculptureRandomSubcategoryItem,
        uxuiRandomSubcategoryItem 
    })
})

//helper functions for home route

    //function to choose a random subset of items
    function chooseRandomItems(allItems, numItems) {
        //spread operator creates temp copy of allItems, sorts and assigns to shuffledItems
        const shuffledItems = [...allItems].sort(() => 0.5 - Math.random()); //0.5 - Math.random creates roughly 50% negative 50% positive values
        //slice selected first numItems of shuffled allItems array
        return shuffledItems.slice(0, numItems);
    }

//individual item routes from home, subcategory and item pages using itemId
app.get(['/item/:subcategory/:id'], (req, res) => {
    const { subcategory, id } = req.params;
    const itemId = parseInt(id, 10); 

    const subcategoryData = JSON.parse(fs.readFileSync(`data/${subcategory}.json`, 'utf-8'));

    const selectedItem = subcategoryData.items.find(item => item.id === itemId);

    if (!selectedItem) {
        //if item is not found
        res.status(404).send('Item not found');
        return;
    }

    // filter other items from the same subcategory
    const otherItems = subcategoryData.items.filter(item => item.id !== itemId);
    // choose four random items from the other items
    const randomOtherItems = chooseRandomItems(otherItems, 4);

    //render view with the selected item and other items in subcategory
    res.render('item-page', { item: selectedItem, otherItems: randomOtherItems });
});

/* Category Pages */

//route for Physical page
app.get('/physical', (req, res) => {
    const sculptureData = require('./data/sculpture.json');
    const sculptureItems = sculptureData.items;
    const sculptureRandomItem = chooseRandomItems(sculptureItems, 1);

    const paperData = require('./data/paper.json');
    const paperItems = paperData.items;
    const paperRandomItem = chooseRandomItems(paperItems, 1);

    const fashionData = require('./data/fashion.json');
    const fashionItems = fashionData.items;
    const fashionRandomItem = chooseRandomItems(fashionItems, 1);

    res.render('subcategory-page', { 
        sculptureRandomItem,
        paperRandomItem,
        fashionRandomItem
    });
});

//route for Digital page
app.get('/digital', (req, res) => {
    const animationData = require('./data/animation.json');
    const animationItems = animationData.items;
    const animationRandomItem = chooseRandomItems(animationItems, 1);

    const codeData = require('./data/code.json');
    const codeItems = codeData.items;
    const codeRandomItem = chooseRandomItems(codeItems, 1);

    const graphicDesignData = require('./data/graphic-design.json');
    const graphicDesignItems = graphicDesignData.items;
    const graphicDesignRandomItem = chooseRandomItems(graphicDesignItems, 1);

    const uxuiData = require('./data/ux-ui.json');
    const uxuiItems = uxuiData.items;
    const uxuiRandomItem = chooseRandomItems(uxuiItems, 1);

    const webData = require('./data/web.json');
    const webItems = webData.items;
    const webRandomItem = chooseRandomItems(webItems, 1);

    res.render('subcategory-page', { 
        animationRandomItem,
        codeRandomItem,
        graphicDesignRandomItem,
        uxuiRandomItem,
        webRandomItem
    });
});

//route for About page
app.get('/about', (req, res) => {
    const aboutData = require('./data/about.json');

    const writingData = require('./data/writing.json');
    const writingItems = writingData.items;

    res.render('about-page', { 
        aboutData,
        writingItems
    });
});

/* Subcategory Pages */

//route for Animation page
app.get('/animation', (req, res) => {
    const animationData = require('./data/animation.json');
    const animationItems = animationData.items;
    res.render('subcategory-page', { 
        data: animationData, 
        items: animationItems, 
        subcategory: 'Animation' });
});

//route for Code page
app.get('/code', (req, res) => {
    const codeData = require('./data/code.json');
    const codeItems = codeData.items;
    res.render('subcategory-page', { 
        data: codeData, 
        items: codeItems, 
        subcategory: 'Code' });
});

//route for Digital Art page
app.get('/digitalart', (req, res) => {
    const digitalArtData = require('./data/digital-art.json');
    const digitalArtItems = digitalArtData.items;
    res.render('subcategory-page', { 
        data: digitalArtData, 
        items: digitalArtItems, 
        subcategory: 'Digital Art' });
});

//route for Fashion page
app.get('/fashion', (req, res) => {
    const fashionData = require('./data/fashion.json');
    const fashionItems = fashionData.items;
    res.render('subcategory-page', { 
        data: fashionData, 
        items: fashionItems, 
        subcategory: 'Fashion' });
});

//route for Graphic Design page
app.get('/graphicdesign', (req, res) => {
    const graphicDesignData = require('./data/graphic-design.json');
    const graphicDesignItems = graphicDesignData.items;
    res.render('subcategory-page', { 
        data: graphicDesignData, 
        items: graphicDesignItems, 
        subcategory: 'Graphic Design' });
});

//route for Paper page
app.get('/paper', (req, res) => {
    const paperData = require('./data/paper.json');
    const paperItems = paperData.items;
    res.render('subcategory-page', { 
        data: paperData, 
        items: paperItems, 
        subcategory: 'Paper' });
});

//route for Sculpture page
app.get('/sculpture', (req, res) => {
    const sculptureData = require('./data/sculpture.json');
    const sculptureItems = sculptureData.items;
    res.render('subcategory-page', { 
        data: sculptureData, 
        items: sculptureItems, 
        subcategory: 'Sculpture' });
});

//route for UX/UI page
app.get('/uxui', (req, res) => {
    const uxuiData = require('./data/ux-ui.json');
    const uxuiItems = uxuiData.items;
    res.render('subcategory-page', { 
        data: uxuiData, 
        items: uxuiItems, 
        subcategory: 'UX UI' });
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