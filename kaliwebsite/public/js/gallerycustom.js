const screenHeight = window.innerHeight;
console.log(screenHeight);
const screenWidth = window.innerWidth;
console.log(screenWidth);

/* item input variables */
const navBlockHeightPercentage = (1/6);
const titleBlockHeightPercentage = (1/6);
const spaceBlockHeightPercentage = (1/12);
const endSpaceWidthPercentage = (1/12);
const itemSpaceWidthPercentage = (1/24);
const numColumns = 3;
const numItems = 6;

/* nav variables */
const navItemCount = 4;
const navSpaceSize = (screenWidth / 24);
const x = screenWidth;
const y = screenHeight;
const n = navItemCount;
const s = navSpaceSize;

function calculateSizes() {
    calculateNavSizes();
    calculateItemSizes();
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

function calculateItemSizes() {
    const nameBlockSizeHeight = (2/3)*y;
    const nameBlockSizeWidth = x;

        const letterEndSpaceSizeHeight = (2/3)*y;
        const letterEndSpaceSizeWidth = (5/48)*x;

        const letterSizeHeight = (2/3)*y;
        const letterSizeWidth = (1/6)*x;

            const letterMaskSizeHeight = (2/3)*y;
            const letterMaskSizeWidth = (1/6)*x;

            const letterMediaSizeHeight = (2/3)*y;
            const letterMediaSizeWidth = (1/6)*x;

        const letterSpaceSizeHeight = (2/3)*y;
        const letterSpaceSizeWidth = (1/24)*x;

    //update CSS variables
    //update name-block
    document.documentElement.style.setProperty('--name-block-size-height', `${nameBlockSizeHeight}px`);
    document.documentElement.style.setProperty('--name-block-size-width', `${nameBlockSizeWidth}px`);
        //update letter-end-space
        document.documentElement.style.setProperty('--letter-end-space-size-height', `${letterEndSpaceSizeHeight}px`);
        document.documentElement.style.setProperty('--letter-end-space-size-width', `${letterEndSpaceSizeWidth}px`);
        //update letter
        document.documentElement.style.setProperty('--letter-size-height', `${letterSizeHeight}px`);
        document.documentElement.style.setProperty('--letter-size-width', `${letterSizeWidth}px`);
            //update letter-mask
            document.documentElement.style.setProperty('--letter-mask-size-height', `${letterMaskSizeHeight}px`);
            document.documentElement.style.setProperty('--letter-mask-size-width', `${letterMaskSizeWidth}px`);
            //update letter-media
            document.documentElement.style.setProperty('--letter-media-size-height', `${letterMediaSizeHeight}px`);
            document.documentElement.style.setProperty('--letter-media-size-width', `${letterMediaSizeWidth}px`);
        //update letter-space
        document.documentElement.style.setProperty('--letter-space-size-height', `${letterSpaceSizeHeight}px`);
        document.documentElement.style.setProperty('--letter-space-size-width', `${letterSpaceSizeWidth}px`);
}

// Calculate sizes on initial load and on window resize
calculateSizes();
window.addEventListener('resize', calculateSizes);