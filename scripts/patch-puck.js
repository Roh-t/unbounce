try {
  const fs = require('fs');
  const path = require('path');

  const targetFiles = [
    'node_modules/@puckeditor/core/dist/chunk-T2XFCN6B.mjs',
    'node_modules/@puckeditor/core/dist/index.js',
    'node_modules/@puckeditor/core/dist/no-external.js',
  ];

  let totalPatched = 0;

  for (const relPath of targetFiles) {
    const filePath = path.join(process.cwd(), relPath);
    if (!fs.existsSync(filePath)) {
      continue;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let filePatched = 0;

    // 1. Patch pointerIntersection: dragOperation.position.current -> dragOperation?.position?.current
    if (content.includes('dragOperation.position.current')) {
      content = content.replace(/dragOperation\.position\.current/g, 'dragOperation?.position?.current');
      filePatched++;
    }

    // 2. Patch manager.dragOperation: manager.dragOperation.position.current -> manager?.dragOperation?.position?.current
    if (content.includes('manager.dragOperation.position.current')) {
      content = content.replace(/manager\.dragOperation\.position\.current/g, 'manager?.dragOperation?.position?.current');
      filePatched++;
    }

    // 3. Patch Outline LayerTree indicatorPosition:
    const outlineRegex = /\(\(\w+\s*=\s*(\w+)\.indicator\)\s*==\s*null\s*\?\s*void 0\s*:\s*\w+\.targetId\)\s*===\s*itemId\s*\?\s*\w+\.indicator\.position\s*:\s*null/g;
    if (outlineRegex.test(content)) {
      content = content.replace(outlineRegex, '($1.indicator && itemId && $1.indicator.targetId === itemId ? $1.indicator?.position : null)');
      filePatched++;
    }

    // 4. Safe optional chaining for any remaining .indicator.position
    if (content.includes('.indicator.position')) {
      content = content.replace(/(\w+)\.indicator\.position/g, '$1.indicator?.position');
      filePatched++;
    }

    if (filePatched > 0) {
      fs.writeFileSync(filePath, content, 'utf8');
      totalPatched += filePatched;
    }
  }

  console.log(`[patch-puck] Successfully verified/patched ${totalPatched} occurrences.`);
} catch (err) {
  console.warn('[patch-puck] Non-fatal notice during patch:', err.message);
}
process.exit(0);
