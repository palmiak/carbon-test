const fetch = require('node-fetch');

async function green_score( url ) {
    const response = await fetch('https://api.websitecarbon.com/b?url='+url);
    return await response.json();
}

function start( url ) {
    return green_score( url );
}

// Call start
(async() => {
    const url = process.argv.slice(2)[0];
    const min_score = process.argv.slice(2)[1] || 80;

    const result = await start( url );
    if ( result.error ) {
        console.log( 'There was an error connecting to the site. Skipping.' );
        process.exit(0);
    }
    if ( result.p < min_score ) {
        console.log( 'Make you site more green 🌳🌳' );
        process.exit(1);
    } else {
        process.exit(0);
    }
})();