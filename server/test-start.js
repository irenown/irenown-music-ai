console.log('Testing imports...');
try {
    console.log('Importing audioProcessor...');
    await import('./services/audioProcessor.js');
    console.log('✅ audioProcessor loaded.');

    console.log('Importing vocalEnhancement...');
    await import('./services/vocalEnhancement.js');
    console.log('✅ vocalEnhancement loaded.');

    console.log('Importing queueService...');
    await import('./services/queueService.js');
    console.log('✅ queueService loaded.');

} catch (e) {
    console.error('❌ Import failed:', e);
    const fs = await import('fs');
    fs.writeFileSync('import_error.txt', e.stack);
}
