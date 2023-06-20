

const fs = require('fs');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'tix',
  host: 'localhost',
  database: 'projet_web',
  password: 'tix.31',
  port: 5432,
});

fs.readFile('./database.sql', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Séparez les instructions SQL du fichier en utilisant des points-virgules
  const sqlStatements = data.split(';');

  // Exécutez chaque instruction SQL en utilisant la méthode query de Pool
  sqlStatements.forEach((statement) => {
    pool.query(statement, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Requête exécutée avec succès');
      }
    });
  });

  pool.end();
});

  