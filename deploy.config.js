module.exports = {
  app: [
    {
      name: 'schedule-project',
      script: 'app.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'production'
      },
      env_development: {
        NODE_ENV: 'development'
      }
    }
  ],

  deploy: {
    production: {
      user: 'root',
      host: '120.78.190.140',
      ref: 'origin/master',
      repo: 'https://gitee.com/stan-bk/schedule.git',
      path: '/www/schedule/production',
      'pre-deploy': 'git fetch --all',
      'post-deploy': 'npm install && pm2 startOrRestart deploy.config.js --env development'
    }
  }
}
