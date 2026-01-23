try {
    const fm = require('framer-motion');
    console.log('framer-motion version:', require('framer-motion/package.json').version);
    console.log('motion exported:', !!fm.motion);
    console.log('Keys:', Object.keys(fm).slice(0, 10));
} catch (e) {
    console.error(e);
}
