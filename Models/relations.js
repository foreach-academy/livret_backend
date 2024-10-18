const User = require('../Models/user');
const Role = require('../Models/role');
const Formation = require('../Models/formation');
const Module = require('../Models/module');
const Evaluation = require('../Models/evaluation');
const EvaluationType = require('../Models/evaluation_type');
const EvaluationResultat = require('../Models/evaluation_resultat');
const ApprenantsFormation = require('../Models/apprenants_formations'); 
const FormationModule = require('../Models/formation_module');
const ResponsablesFormation = require('../Models/responsables_formation');
const ModuleEvaluationType = require('./module_evaluation_type');

// Définir les relations
User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });
Role.hasMany(User, { foreignKey: 'role_id', as: 'users' });

Evaluation.belongsTo(User, { foreignKey: 'apprenant_id', as: 'apprenant' });
User.hasMany(Evaluation, { foreignKey: 'apprenant_id', as: 'evaluation' });

Evaluation.belongsTo(Module, { foreignKey: 'module_id', as: 'module' });
Module.hasMany(Evaluation, { foreignKey: 'module_id', as: 'evaluation' });

Module.belongsTo(User, { foreignKey: 'formateur_id', as: 'formateur' });
User.hasMany(Module, { foreignKey: 'formateur_id', as: 'modules' });

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

Module.belongsToMany(EvaluationType, {
    through: ModuleEvaluationType,
    as: 'evaluation_types', 
    foreignKey: 'module_id',
});

EvaluationType.belongsToMany(Module, {
    through: ModuleEvaluationType,
    as: 'modules', 
    foreignKey: 'evaluation_type_id',
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
    ResponsablesFormation,
    ModuleEvaluationType
};

