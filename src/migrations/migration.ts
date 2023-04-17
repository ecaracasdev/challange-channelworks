import migrationConfig from './migration-config';

const MIGRATIONS = [
  {
    name: 'migration-config',
    description: 'Crear colleccion conllection',
    scriptName: 'migration-config',
    init: migrationConfig.init,
  },
];

export default MIGRATIONS;
