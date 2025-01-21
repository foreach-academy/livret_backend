// import User from "./user.js"
// import Role from "./role.js"
// import Formation from "./formation.js"
// import Module from "./module.js"
// import Evaluation from "./evaluation.js"
// import EvaluationType from "./evaluationType.js"
// import EvaluationResultat from "./evaluationResultat.js"
// import ApprenantsFormation from "./apprenantsFormation.js" 
// import FormationModule from "./formationModule.js"
// import ResponsablesFormation from "./responsablesFormation.js"
// import ModuleEvaluationType from "./moduleEvaluationType.js"

// // Définir les relations

// Evaluation.belongsTo(User, { foreignKey: 'apprenant_id', as: 'apprenant' });
// User.hasMany(Evaluation, { foreignKey: 'apprenant_id', as: 'evaluation' });

// Evaluation.belongsTo(Module, { foreignKey: 'module_id', as: 'module' });
// Module.hasMany(Evaluation, { foreignKey: 'module_id', as: 'evaluation' });

// Module.belongsTo(User, { foreignKey: 'formateur_id', as: 'formateur' });
// User.hasMany(Module, { foreignKey: 'formateur_id', as: 'modules' });

// Evaluation.belongsTo(EvaluationResultat, { foreignKey: 'evaluation_resultat_id', as: 'resultat' });
// EvaluationResultat.hasMany(Evaluation, { foreignKey: 'evaluation_resultat_id', as: 'evaluations' });

// Formation.belongsToMany(Module, {
//     through: FormationModule,
//     as: 'modules',
//     foreignKey: 'formation_id'
// });

// Module.belongsToMany(Formation, {
//     through: FormationModule, 
//     as: 'formations', 
//     foreignKey: 'module_id'
// });

// ResponsablesFormation.belongsTo(User, { foreignKey: 'responsable_id', as: 'responsable' });
// User.hasMany(ResponsablesFormation, { foreignKey: 'responsable_id', as: 'responsables' });

// ResponsablesFormation.belongsTo(Formation, { foreignKey: 'formation_id', as: 'formation' });
// Formation.hasMany(ResponsablesFormation, { foreignKey: 'formation_id', as: 'responsables' });

// User.belongsToMany(Formation, {
//     through: ApprenantsFormation,
//     as: 'formation', 
//     foreignKey: 'apprenant_id',
// });

// Formation.belongsToMany(User, {
//     through: ApprenantsFormation,
//     as: 'apprenants', 
//     foreignKey: 'formation_id',
// });

// Module.belongsToMany(EvaluationType, {
//     through: ModuleEvaluationType,
//     as: 'evaluation_types', 
//     foreignKey: 'module_id',
// });

// EvaluationType.belongsToMany(Module, {
//     through: ModuleEvaluationType,
//     as: 'modules', 
//     foreignKey: 'evaluation_type_id',
// });

// export default {
//     User,
//     Role,
//     Formation,
//     Module,
//     Evaluation,
//     EvaluationType,
//     EvaluationResultat,
//     ApprenantsFormation,
//     FormationModule,
//     ResponsablesFormation,
//     ModuleEvaluationType
// };

