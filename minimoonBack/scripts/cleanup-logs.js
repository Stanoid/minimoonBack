#!/usr/bin/env node

/**
 * Script to find and report console.log statements in the codebase
 * Run: node scripts/cleanup-logs.js
 */

const fs = require('fs');
const path = require('path');

const excludeDirs = ['node_modules', '.cache', '.tmp', 'build', 'dist', 'scripts'];
const targetExtensions = ['.js', '.ts'];

function findConsoleLogs(dir, results = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!excludeDirs.includes(file)) {
        findConsoleLogs(filePath, results);
      }
    } else if (targetExtensions.includes(path.extname(file))) {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');

      lines.forEach((line, index) => {
        if (line.includes('console.log') || line.includes('console.dir')) {
          results.push({
            file: filePath,
            line: index + 1,
            content: line.trim()
          });
        }
      });
    }
  });

  return results;
}

console.log('🔍 Searching for console.log statements...\n');

const results = findConsoleLogs(path.join(__dirname, '..', 'src'));

if (results.length === 0) {
  console.log('✅ No console.log statements found!');
} else {
  console.log(`⚠️  Found ${results.length} console.log statements:\n`);
  
  results.forEach(({ file, line, content }) => {
    console.log(`${file}:${line}`);
    console.log(`  ${content}\n`);
  });

  console.log('\n💡 Recommendation: Replace console.log with strapi.log.debug() or remove them');
}
