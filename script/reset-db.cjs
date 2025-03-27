require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

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
  database: 'postgres', // base temporaire pour manipuler la vraie
});

async function resetDatabase() {
  try {
    await adminClient.connect();

    // 🛑 Terminer toutes les connexions à la base
    console.log(`🛑 Fermeture des connexions actives sur la base ${DATABASE_NAME}...`);
    await adminClient.query(`
      SELECT pg_terminate_backend(pg_stat_activity.pid)
      FROM pg_stat_activity
      WHERE pg_stat_activity.datname = '${DATABASE_NAME}'
        AND pid <> pg_backend_pid();
    `);

    // 🔴 Drop + Create
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

    const sql = fs.readFileSync(path.join(__dirname, '../config/bdd-livret.sql')).toString();
    await appClient.query(sql);

    await appClient.end();
    console.log(`🎉 Base ${DATABASE_NAME} recréée avec succès !`);
  } catch (err) {
    console.error('❌ Erreur lors du reset de la base :', err);
  }
}

resetDatabase();
