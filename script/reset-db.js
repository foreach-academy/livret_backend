import 'dotenv/config';
import pkg from 'pg';
const { Client } = pkg;

import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Pour remplacer __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const {
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
} = process.env;

// Connexion à la base postgres pour supprimer/créer la base "livret"
const adminClient = new Client({
  user: DATABASE_USER,
  host: DATABASE_HOST,
  password: DATABASE_PASSWORD,
  port: DATABASE_PORT,
  database: 'postgres',
});

async function resetDatabase() {
  try {
    await adminClient.connect();

    // 🛑 Terminer les connexions actives
    console.log(`🛑 Fermeture des connexions actives sur la base ${DATABASE_NAME}...`);
    await adminClient.query(`
      SELECT pg_terminate_backend(pg_stat_activity.pid)
      FROM pg_stat_activity
      WHERE pg_stat_activity.datname = '${DATABASE_NAME}'
        AND pid <> pg_backend_pid();
    `);

    // 🔴 Supprimer et recréer la base
    console.log(`🔴 Suppression de la base ${DATABASE_NAME}...`);
    await adminClient.query(`DROP DATABASE IF EXISTS ${DATABASE_NAME}`);

    console.log(`✅ Création de la base ${DATABASE_NAME}...`);
    await adminClient.query(`CREATE DATABASE ${DATABASE_NAME}`);
    await adminClient.end();

    // Connexion à la nouvelle base pour exécuter le fichier SQL
    const appClient = new Client({
      user: DATABASE_USER,
      host: DATABASE_HOST,
      password: DATABASE_PASSWORD,
      port: DATABASE_PORT,
      database: DATABASE_NAME,
    });

    await appClient.connect();
    console.log(`📄 Exécution du script ./config/bdd-livret.sql...`);

    const sqlPath = path.join(__dirname, '../config/bdd-livret.sql');
    const sql = await readFile(sqlPath, 'utf-8');
    await appClient.query(sql);

    await appClient.end();
    console.log(`🎉 Base ${DATABASE_NAME} recréée avec succès !`);
  } catch (err) {
    console.error('❌ Erreur lors du reset de la base :', err);
  }
}

resetDatabase();
