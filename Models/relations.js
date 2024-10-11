const User = require('./user');
const Role = require('./role');
const Formation = require('./formation');
const Module = require('./module');
const Evaluation = require('./evaluation');
const EvaluationType = require('./evaluation_type');
const EvaluationResultat = require('./evaluation_resultat');
const ApprenantsFormation = require('../Models/apprenants_formations'); 
const FormationModule = require('./formation_module');
const ResponsablesFormation = require('./responsables_formation');

// Définir les relations
User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });
Role.hasMany(User, { foreignKey: 'role_id', as: 'users' });

Evaluation.belongsTo(User, { foreignKey: 'apprenant_id', as: 'apprenant' });
User.hasMany(Evaluation, { foreignKey: 'apprenant_id', as: 'evaluation' });

Evaluation.belongsTo(Module, { foreignKey: 'module_id', as: 'module' });
Module.hasMany(Evaluation, { foreignKey: 'module_id', as: 'evaluation' });

Module.belongsTo(User, { foreignKey: 'formateur_id', as: 'formateur' });
User.hasMany(Module, { foreignKey: 'formateur_id', as: 'modules' });

Evaluation.belongsTo(EvaluationType, { foreignKey: 'evaluation_type_id', as: 'evaluationType' });
EvaluationType.hasMany(Evaluation, { foreignKey: 'evaluation_type_id', as: 'evaluation' });

Evaluation.belongsTo(EvaluationResultat, { foreignKey: 'evaluation_resultat_id', as: 'resultat' });
EvaluationResultat.hasMany(Evaluation, { foreignKey: 'evaluation_resultat_id', as: 'evaluations' });

Formation.belongsToMany(Module, {
    through: FormationModule,
    as: 'modules',
    foreignKey: 'formation_id'
});

Module.belongsToMany(Formation, {
    through: FormationModule, 
    as: 'formations', 
    foreignKey: 'module_id'
});

ResponsablesFormation.belongsTo(User, { foreignKey: 'responsable_id', as: 'responsable' });
User.hasMany(ResponsablesFormation, { foreignKey: 'responsable_id', as: 'responsables' });

ResponsablesFormation.belongsTo(Formation, { foreignKey: 'formation_id', as: 'formation' });
Formation.hasMany(ResponsablesFormation, { foreignKey: 'formation_id', as: 'responsables' });

User.belongsToMany(Formation, {
    through: ApprenantsFormation,
    as: 'formation', 
    foreignKey: 'apprenant_id',
});

Formation.belongsToMany(User, {
    through: ApprenantsFormation,
    as: 'apprenants', 
    foreignKey: 'formation_id',
});

module.exports = {
    User,
    Role,
    Formation,
    Module,
    Evaluation,
    EvaluationType,
    EvaluationResultat,
    ApprenantsFormation,
    FormationModule,
    ResponsablesFormation
};

