const screenHeight = window.innerHeight;
console.log(screenHeight);
const screenWidth = window.innerWidth;
console.log(screenWidth);

/* nav variables */
const navItemCount = 4;
const navSpaceSize = (screenWidth / 24);
const x = screenWidth;
const y = screenHeight;
const n = navItemCount;
const s = navSpaceSize;

/* item input variables */
const navBlockHeightPercentage = (1/6);
const titleBlockHeightPercentage = (1/6);
const spaceBlockHeightPercentage = (1/12);

const textBlockHeightPercentage = (1/12);
const textBlockEndSpaceWidthPercentage = (5/12);

const itemBlockHeightPercentage = (2/3);
const itemBlockEndSpaceWidthPercentage = (1/12);
const itemBlockPaddingSpaceWidthPercentage = (1/24);
    const leftContentStackPaddingSpaceHeightPercentage = (3/8);
    const leftContentStackMediumHeightPercentage = (1/8);
    const leftContentStackDateHeightPercentage = (1/8);
    const rightContentStackPaddingSpaceHeightPercentage = (1/8);
    const rightContentStackTitleHeightPercentage = (1/8);
    const rightContentStackGroupHeightPercentage = (1/8);
    const rightContentStackDescriptionHeightPercentage = (1/2); //percentages of parent containers (left/rightContentStacks)

const numAdditionalMedia = 3;
const additionalMediaBlockHeightPercentage = (1/6);
const additionalMediaBlockEndSpaceWidthPercentage = (7/24);
const additionalMediaBlockPaddingSpaceWidthPercentage = (1/24);

const numAdditionalItems = 3;
const additionalItemsBlockHeightPercentage = (1/3);
const additionalItemsBlockEndSpaceWidthPercentage = (1/6);
const additionalItemsBlockPaddingSpaceWidthPercentage = (1/24);


function calculateSizes() {
    calculateNavSizes();
    calculateBlockSizes();
    calculateItemBlockSizes();
    calculateAdditionalMediaBlockSizes();
    calculateAdditionalItemsBlockSizes();
}
function calculateNavSizes() {
    const navBlockSizeHeight = (1/6)*y;
    const navBlockSizeWidth = x;

        const logoSizeHeight = (1/6)*y;
        const logoSizeWidth = (1/6)*x;

        const navBarSizeHeight = (1/6)*y;
        const navBarSizeWidth = (5/6)*x;

            const navSpaceSizeHeight = (1/6)*y;
            const navSpaceSizeWidth = s;

            const navItemSizeHeight = (1/6)*y;
            const navItemSizeWidth = ((((5/6)*x)-(s*(n+1)))/n);

    //update CSS variables

    //update nav-block
    document.documentElement.style.setProperty('--nav-block-size-height', `${navBlockSizeHeight}px`);
    document.documentElement.style.setProperty('--nav-block-size-width', `${navBlockSizeWidth}px`);
        //update logo
        document.documentElement.style.setProperty('--logo-size-height', `${logoSizeHeight}px`);
        document.documentElement.style.setProperty('--logo-size-width', `${logoSizeWidth}px`);
        //update nav-bar
        document.documentElement.style.setProperty('--nav-bar-size-height', `${navBarSizeHeight}px`);
        document.documentElement.style.setProperty('--nav-bar-size-width', `${navBarSizeWidth}px`);
            //update nav-space
            document.documentElement.style.setProperty('--nav-space-size-height', `${navSpaceSizeHeight}px`);
            document.documentElement.style.setProperty('--nav-space-size-width', `${navSpaceSizeWidth}px`);
            //update nav-item
            document.documentElement.style.setProperty('--nav-item-size-height', `${navItemSizeHeight}px`);
            document.documentElement.style.setProperty('--nav-item-size-width', `${navItemSizeWidth}px`);
}

function calculateBlockSizes() {
    const navBlockHeight = (1/6)*screenHeight;
    const navBlockWidth = screenWidth;
    const titleBlockHeight = (1/6)*screenHeight;
    const titleBlockWidth = screenWidth;
    const spaceBlockHeight = (1/12)*screenHeight;
    const spaceBlockWidth = screenWidth;
    const textBlockHeight = (1/12)*screenHeight;
    const textBlockWidth = screenWidth;
    const textBlockEndSpaceHeight = (1/12)*screenHeight;
    const textBlockEndSpaceWidth = (5/12)*screenWidth;

    //update nav-block
    document.documentElement.style.setProperty('--nav-block-height', `${navBlockHeight}px`);
    document.documentElement.style.setProperty('--nav-block-width', `${navBlockWidth}px`);

    //update title-block
    document.documentElement.style.setProperty('--title-block-height', `${titleBlockHeight}px`);
    document.documentElement.style.setProperty('--title-block-width', `${titleBlockWidth}px`);

    //update space-block
    document.documentElement.style.setProperty('--space-block-height', `${spaceBlockHeight}px`);
    document.documentElement.style.setProperty('--space-block-width', `${spaceBlockWidth}px`);

    //update text-block
    document.documentElement.style.setProperty('--text-block-height', `${textBlockHeight}px`);
    document.documentElement.style.setProperty('--text-block-width', `${textBlockWidth}px`);
        document.documentElement.style.setProperty('--text-block-end-space-height', `${textBlockEndSpaceHeight}px`);
        document.documentElement.style.setProperty('--text-block-end-space-width', `${textBlockEndSpaceWidth}px`);
}

function calculateItemBlockSizes() {
    const itemBlockHeight = ;
    const itemBlockWidth = ;
    const itemBlockEndSpaceHeight = ;
    const itemBlockEndSpaceWidth = ;
    const itemBlockPaddingSpaceHeight = ;
    const itemBlockPaddingSpaceWidth = ;

    const leftContentStackHeight = ;
    const leftContentStackWidth = ;
    const leftContentStackPaddingSpaceHeight = ;
    const leftContentStackPaddingSpaceWidth = ;
    const leftContentStackMediumHeight = ;
    const leftContentStackMediumWidth = ;
    const leftContentStackDateHeight = ;
    const leftContentStackDateWidth = ;

    const contentHeight = ;
    const contentWidth = ;

    const rightContentStackHeight = ;
    const rightContentStackWidth = ;
    const rightContentStackPaddingSpaceHeight = ;
    const rightContentStackPaddingSpaceWidth = ;
    const rightContentStackTitleHeight = ;
    const rightContentStackTitleWidth = ;
    const rightContentStackGroupHeight = ;
    const rightContentStackGroupWidth = ;
    const rightContentStackDescriptionHeight = ;
    const rightContentStackDescriptionWidth = ;

    //update item-block
    document.documentElement.style.setProperty('--item-block-height', `${itemBlockHeight}px`);
    document.documentElement.style.setProperty('--item-block-width', `${itemBlockWidth}px`);
        //update item-block-end-space
        document.documentElement.style.setProperty('--item-block-end-space-height', `${itemBlockEndSpaceHeight}px`);
        document.documentElement.style.setProperty('--item-block-end-space-width', `${itemBlockEndSpaceWidth}px`);
        //update item-block-padding-space
        document.documentElement.style.setProperty('--item-block-padding-space-height', `${itemBlockPaddingSpaceHeight}px`);
        document.documentElement.style.setProperty('--item-block-padding-space-width', `${itemBlockPaddingSpaceWidth}px`);
    
    //update left-content-stack
    document.documentElement.style.setProperty('--left-content-stack-height', `${leftContentStackHeight}px`);
    document.documentElement.style.setProperty('--left-content-stack-width', `${leftContentStackWidth}px`);
        //update left-content-stack-padding-space
        document.documentElement.style.setProperty('--left-content-stack-padding-space-height', `${leftContentStackPaddingSpaceHeight}px`);
        document.documentElement.style.setProperty('--left-content-stack-padding-space-width', `${leftContentStackPaddingSpaceWidth}px`);
        //update left-content-stack-medium
        document.documentElement.style.setProperty('--left-content-stack-medium-height', `${leftContentStackMediumHeight}px`);
        document.documentElement.style.setProperty('--left-content-stack-medium-width', `${leftContentStackMediumWidth}px`);
        //update left-content-stack-date
        document.documentElement.style.setProperty('--left-content-stack-date-height', `${leftContentStackDateHeight}px`);
        document.documentElement.style.setProperty('--left-content-stack-date-width', `${leftContentStackDateWidth}px`);
    
    //update content
    document.documentElement.style.setProperty('--content-height', `${contentHeight}px`);
    document.documentElement.style.setProperty('--content-width', `${contentWidth}px`);

 //update right-content-stack
 document.documentElement.style.setProperty('--right-content-stack-height', `${rightContentStackHeight}px`);
 document.documentElement.style.setProperty('--right-content-stack-width', `${rightContentStackWidth}px`);
     //update right-content-stack-padding-space
     document.documentElement.style.setProperty('--right-content-stack-padding-space-height', `${rightContentStackPaddingSpaceHeight}px`);
     document.documentElement.style.setProperty('--right-content-stack-padding-space-width', `${rightContentStackPaddingSpaceWidth}px`);
     //update right-content-stack-title
     document.documentElement.style.setProperty('--right-content-stack-title-height', `${rightContentStackTitleHeight}px`);
     document.documentElement.style.setProperty('--right-content-stack-title-width', `${rightContentStackTitleWidth}px`);
     //update right-content-stack-group
     document.documentElement.style.setProperty('--right-content-stack-group-height', `${rightContentStackGroupHeight}px`);
     document.documentElement.style.setProperty('--right-content-stack-group-width', `${rightContentStackGroupWidth}px`);
     //update right-content-stack-description
     document.documentElement.style.setProperty('--right-content-stack-description-height', `${rightContentStackDescriptionHeight}px`);
     document.documentElement.style.setProperty('--right-content-stack-description-width', `${rightContentStackDescriptionWidth}px`);
    
}
function calculateAdditionalMediaBlockSizes() {
    
}
function calculateAdditionalItemsBlockSizes() {

}

// Calculate sizes on initial load and on window resize
calculateSizes();
window.addEventListener('resize', calculateSizes);