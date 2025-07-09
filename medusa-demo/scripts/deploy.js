const { execSync } = require('child_process');

async function deploy() {
  try {
    console.log('🚀 Starting deployment process...');
    
    // Run database migrations
    console.log('📦 Running database migrations...');
    execSync('npx medusa db:migrate', { stdio: 'inherit' });
    
    // Seed the database if needed
    if (process.env.SEED_DATABASE === 'true') {
      console.log('🌱 Seeding database...');
      execSync('yarn seed', { stdio: 'inherit' });
    }
    
    console.log('✅ Deployment completed successfully!');
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

deploy();
