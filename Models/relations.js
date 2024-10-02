const User = require('./user');
const Role = require('./role');
const Formation = require('./formation');
const Module = require('./module');
const Evaluation = require('./evaluation');
const EvaluationType = require('./evaluation_type');
const EvaluationResultat = require('./evaluation_resultat');
const ApprenantsFormation = require('./apprenants_formations');
const FormationModule = require('./formation_module');
const ResponsablesFormation = require('./responsables_formation');

// Définir les relations
// User et Role
User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });
Role.hasMany(User, { foreignKey: 'role_id', as: 'users' });

// User et Evaluation
Evaluation.belongsTo(User, { foreignKey: 'apprenant_id', as: 'apprenant' });
User.hasMany(Evaluation, { foreignKey: 'apprenant_id', as: 'evaluations' });

// Module et User
Module.belongsTo(User, { foreignKey: 'formateur_id', as: 'formateur' });
User.hasMany(Module, { foreignKey: 'formateur_id', as: 'modules' });

// Evaluation et Module
Evaluation.belongsTo(Module, { foreignKey: 'module_id', as: 'module' });
Module.hasMany(Evaluation, { foreignKey: 'module_id', as: 'evaluations' });

// Evaluation et EvaluationType
Evaluation.belongsTo(EvaluationType, { foreignKey: 'evaluation_type_id', as: 'evaluationType' });
EvaluationType.hasMany(Evaluation, { foreignKey: 'evaluation_type_id', as: 'evaluations' });

// Evaluation et EvaluationResultat
Evaluation.belongsTo(EvaluationResultat, { foreignKey: 'evaluation_restulat_id', as: 'resultat' });
EvaluationResultat.hasMany(Evaluation, { foreignKey: 'evaluation_restulat_id', as: 'evaluations' });


// Formation et FormationModule
FormationModule.belongsTo(Formation, { foreignKey: 'formation_id', as: 'formation' });
Formation.hasMany(FormationModule, { foreignKey: 'formation_id', as: 'modules' });

// Module et FormationModule
FormationModule.belongsTo(Module, { foreignKey: 'module_id', as: 'module' });
Module.hasMany(FormationModule, { foreignKey: 'module_id', as: 'formations' });

// ResponsablesFormation et User
ResponsablesFormation.belongsTo(User, { foreignKey: 'responsable_id', as: 'responsable' });
User.hasMany(ResponsablesFormation, { foreignKey: 'responsable_id', as: 'responsables' });

// ResponsablesFormation et Formation
ResponsablesFormation.belongsTo(Formation, { foreignKey: 'formation_id', as: 'formation' });
Formation.hasMany(ResponsablesFormation, { foreignKey: 'formation_id', as: 'responsables' });

// Formation et User via ApprenantsFormation
User.belongsToMany(Formation, {
    through: ApprenantsFormation,
    as: 'formation',
    foreignKey: 'apprenant_id',
})
Formation.belongsToMany(User, {
    through: ApprenantsFormation,
    as: "user",
    foreignKey: 'formation_id'
})

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
