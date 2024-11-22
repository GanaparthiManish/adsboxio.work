import { deployRules } from './src/lib/admin.js';

async function deploy() {
  try {
    await deployRules();
    console.log('Deployment completed successfully');
  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  }
}

deploy();