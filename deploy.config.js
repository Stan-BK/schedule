module.exports = {
  app: [
    {
      name: 'xiaomi-project',
      script: 'app.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  deploy: {
    production: {
      user: 'root',
      host: '120.78.190.140',
      ref: 'origin/master',
      repo: 'https://gitee.com/stan-bk/xiaomi_project.git',
      path: '/www/xiaomi/production',
      'pre-deploy': 'git fetch --all',
      'post-deploy': 'npm install && npm run prd && pm2 startOrRestart deploy.config.js --env production'
    }
  }
}