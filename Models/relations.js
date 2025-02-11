import Role from "./role.js";
import Training from "./training.js";
import Promotion from "./promotion.js";
import User from "./user.js";
import SupervisorsPromotion from "./supervisorsPromotion.js";
import TrainersPromotion from "./trainersPromotion.js";
import StudientsPromotion from "./studientsPromotion.js";
import Module from "./module.js";
import EvaluationType from "./evaluationType.js";
import ModuleEvaluationType from "./moduleEvaluationType.js";
import TrainingModule from "./trainingModule.js";
import EvaluationResult from "./evaluationResult.js";
import Evaluation from "./evaluation.js";

// Fonction pour configurer les relations
export function setupRelations() {
    // Relation entre User et Role
    User.belongsTo(Role, { foreignKey: 'role_id', as: 'userRole' });  // Alias corrigé pour éviter les conflits
    Role.hasMany(User, { foreignKey: 'role_id', as: 'roleUsers' });    // Alias corrigé pour éviter les conflits

    // Relation entre Training et Promotion
    Training.hasMany(Promotion, { foreignKey: 'training_id', as: 'trainingPromotions' });
    Promotion.belongsTo(Training, { foreignKey: 'training_id', as: 'promotionTraining' });

    // Relations entre User et Promotion via les tables de liaison
    User.hasMany(SupervisorsPromotion, { foreignKey: 'supervisor_id', as: 'supervisedPromotions' });
    Promotion.hasMany(SupervisorsPromotion, { foreignKey: 'promotion_id', as: 'promotionSupervisors' });
    SupervisorsPromotion.belongsTo(User, { foreignKey: 'supervisor_id', as: 'supervisorUser' });
    SupervisorsPromotion.belongsTo(Promotion, { foreignKey: 'promotion_id', as: 'supervisorPromotion' });

    User.hasMany(TrainersPromotion, { foreignKey: 'trainer_id', as: 'trainerPromotions' });
    Promotion.hasMany(TrainersPromotion, { foreignKey: 'promotion_id', as: 'promotionTrainers' });
    TrainersPromotion.belongsTo(User, { foreignKey: 'trainer_id', as: 'trainerUser' });
    TrainersPromotion.belongsTo(Promotion, { foreignKey: 'promotion_id', as: 'trainerPromotion' });

    User.hasMany(StudientsPromotion, { foreignKey: 'studient_id', as: 'enrolledPromotions' });
    Promotion.hasMany(StudientsPromotion, { foreignKey: 'promotion_id', as: 'promotionStudents' });
    StudientsPromotion.belongsTo(User, { foreignKey: 'studient_id', as: 'studentUser' });
    StudientsPromotion.belongsTo(Promotion, { foreignKey: 'promotion_id', as: 'studentPromotion' });

    // Relations entre Module, EvaluationType et ModuleEvaluationType
    Module.hasMany(ModuleEvaluationType, { foreignKey: 'module_id', as: 'moduleEvaluationTypes' });
    EvaluationType.hasMany(ModuleEvaluationType, { foreignKey: 'evaluation_type_id', as: 'evaluationTypeModules' });
    ModuleEvaluationType.belongsTo(Module, { foreignKey: 'module_id', as: 'evaluationTypeModule' });
    ModuleEvaluationType.belongsTo(EvaluationType, { foreignKey: 'evaluation_type_id', as: 'moduleEvaluationType' });

    // Relation entre Training et Module via TrainingModule
    Training.hasMany(TrainingModule, { foreignKey: 'training_id', as: 'trainingModules' });
    Module.hasMany(TrainingModule, { foreignKey: 'module_id', as: 'moduleTrainings' });
    User.hasMany(TrainingModule, { foreignKey: 'trainer_id', as: 'trainerModules' });
    TrainingModule.belongsTo(Training, { foreignKey: 'training_id', as: 'trainingModuleTraining' });
    TrainingModule.belongsTo(Module, { foreignKey: 'module_id', as: 'trainingModuleModule' });
    TrainingModule.belongsTo(User, { foreignKey: 'trainer_id', as: 'trainingModuleTrainer' });

    // Relations pour les évaluations
    Module.hasMany(Evaluation, { foreignKey: 'module_id', as: 'moduleEvaluations' });
    User.hasMany(Evaluation, { foreignKey: 'studient_id', as: 'studentEvaluations' });
    EvaluationResult.hasMany(Evaluation, { foreignKey: 'evaluation_result_id', as: 'evaluationResultEvaluations' });
    Evaluation.belongsTo(Module, { foreignKey: 'module_id', as: 'evaluationModule' });
    Evaluation.belongsTo(User, { foreignKey: 'studient_id', as: 'evaluationStudent' });
    Evaluation.belongsTo(EvaluationResult, { foreignKey: 'evaluation_result_id', as: 'evaluationResult' });
}
