console.log('Testing imports...');

try {
    console.log('1. Importing express...');
    await import('express');
    console.log('✓ express OK');
} catch (e) {
    console.error('✗ express FAILED:', e.message);
}

try {
    console.log('2. Importing dotenv...');
    await import('dotenv');
    console.log('✓ dotenv OK');
} catch (e) {
    console.error('✗ dotenv FAILED:', e.message);
}

try {
    console.log('3. Importing cors...');
    await import('cors');
    console.log('✓ cors OK');
} catch (e) {
    console.error('✗ cors FAILED:', e.message);
}

try {
    console.log('4. Importing helmet...');
    await import('helmet');
    console.log('✓ helmet OK');
} catch (e) {
    console.error('✗ helmet FAILED:', e.message);
}

try {
    console.log('5. Importing multer...');
    await import('multer');
    console.log('✓ multer OK');
} catch (e) {
    console.error('✗ multer FAILED:', e.message);
}

try {
    console.log('6. Importing uuid...');
    await import('uuid');
    console.log('✓ uuid OK');
} catch (e) {
    console.error('✗ uuid FAILED:', e.message);
}

try {
    console.log('7. Importing elevenLabsApi...');
    await import('./services/elevenLabsApi.js');
    console.log('✓ elevenLabsApi OK');
} catch (e) {
    console.error('✗ elevenLabsApi FAILED:', e.message);
}

try {
    console.log('8. Importing stabilityApi...');
    await import('./services/stabilityApi.js');
    console.log('✓ stabilityApi OK');
} catch (e) {
    console.error('✗ stabilityApi FAILED:', e.message);
}

try {
    console.log('9. Importing audioProcessor...');
    await import('./services/audioProcessor.js');
    console.log('✓ audioProcessor OK');
} catch (e) {
    console.error('✗ audioProcessor FAILED:', e.message);
}

console.log('\nAll tests complete!');
