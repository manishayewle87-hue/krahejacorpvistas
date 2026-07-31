const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || 'postgres';
const DB_NAME = process.env.DB_NAME || 'krahejavistas';
const DB_HOST = process.env.DB_HOST || 'localhost';

const backupDir = path.join(__dirname, '../backups');

// Ensure backup directory exists
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

const generateBackup = () => {
  const date = new Date().toISOString().replace(/:/g, '-').split('.')[0];
  const fileName = `pg_backup_${DB_NAME}_${date}.sql`;
  const filePath = path.join(backupDir, fileName);

  console.log(`[Backup] Starting database backup to ${filePath}...`);

  // Execute pg_dump
  const dumpCommand = `PGPASSWORD="${DB_PASSWORD}" pg_dump -U ${DB_USER} -h ${DB_HOST} -d ${DB_NAME} -F p -f "${filePath}"`;

  exec(dumpCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`[Backup] Error during backup: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`[Backup] pg_dump stderr: ${stderr}`);
    }
    console.log(`[Backup] Successfully created backup at ${filePath}`);
    
    // In a real environment, you would push this file to AWS S3 here:
    // await uploadToS3(filePath);
    console.log(`[Backup] Ready to push to AWS S3 / Glacier.`);
  });
};

// Simulate cron trigger if run directly
generateBackup();
