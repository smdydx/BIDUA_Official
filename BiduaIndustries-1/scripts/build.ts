
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

async function build() {
  console.log('🚀 Starting build process...');

  try {
    // Clean dist directory
    console.log('🧹 Cleaning dist directory...');
    await fs.rm(path.resolve('dist'), { recursive: true, force: true });

    // Run Vite build
    console.log('📦 Building client...');
    await execAsync('vite build');

    // Run TypeScript compilation
    console.log('🔧 Compiling TypeScript...');
    await execAsync('tsc');

    // Bundle server
    console.log('🛠️ Building server...');
    await execAsync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist');

    console.log('✅ Build completed successfully!');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

build();
