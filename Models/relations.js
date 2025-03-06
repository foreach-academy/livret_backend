import Role from "./role.js";
import Training from "./training.js";
import Promotion from "./promotion.js";
import User from "./user.js";
import SupervisorsPromotion from "./supervisorsPromotion.js";
import TrainersPromotion from "./trainersPromotion.js";
import StudientsPromotion from "./studientsPromotion.js";
import Module from "./module.js";
import EvaluationTypeList from "./evaluationTypeList.js";
import EvaluationType from "./evaluationType.js";
import EvaluationResult from "./evaluationResult.js";
import Evaluation from "./evaluation.js";
import ModulePromotion from "./modulePromotion.js";
import EvaluationUser from "./evaluationUser.js";

export function setupRelations() {
    // 🟢 Relation entre User et Role
    User.belongsTo(Role, { foreignKey: 'role_id', as: 'userRole', onDelete: "SET NULL", onUpdate: "CASCADE" });
    Role.hasMany(User, { foreignKey: 'role_id', as: 'roleUsers' });

    // 🟢 Relation entre Training et Promotion
    Promotion.belongsTo(Training, { foreignKey: "training_id", as: "training", onDelete: "SET NULL", onUpdate: "CASCADE" });
    Training.hasMany(Promotion, { foreignKey: "training_id", as: "promotions" });

    // 🟢 Relation entre User et Promotion via les tables de liaison
    User.hasMany(SupervisorsPromotion, { foreignKey: 'supervisor_id', as: 'supervisedPromotions' });
    Promotion.hasMany(SupervisorsPromotion, { foreignKey: 'promotion_id', as: 'promotionSupervisors' });
    SupervisorsPromotion.belongsTo(User, { foreignKey: 'supervisor_id', as: 'supervisorUser' });
    SupervisorsPromotion.belongsTo(Promotion, { foreignKey: 'promotion_id', as: 'supervisorPromotion' });

    User.hasMany(TrainersPromotion, { foreignKey: 'trainer_id', as: 'trainerPromotions' });
    Promotion.hasMany(TrainersPromotion, { foreignKey: 'promotion_id', as: 'promotionTrainers' });
    TrainersPromotion.belongsTo(User, { foreignKey: 'trainer_id', as: 'trainerUser' });
    TrainersPromotion.belongsTo(Promotion, { foreignKey: 'promotion_id', as: 'trainerPromotion' });

    User.hasMany(StudientsPromotion, { foreignKey: 'studient_id', as: 'enrolledPromotions' });
    Promotion.hasMany(StudientsPromotion, { foreignKey: 'promotion_id', as: 'promotionStudients' });
    StudientsPromotion.belongsTo(User, { foreignKey: 'studient_id', as: 'studientUser' });
    StudientsPromotion.belongsTo(Promotion, { foreignKey: 'promotion_id', as: 'studientPromotion' });

    // 🟢 Relation entre Module et Training
    Module.belongsTo(Training, { foreignKey: "training_id", as: "trainingModule", onDelete: "SET NULL", onUpdate: "CASCADE" });
    Training.hasMany(Module, { foreignKey: "training_id", as: "modules" });

    // 🟢 Relations pour ModulePromotion
    ModulePromotion.belongsTo(User, { foreignKey: 'trainer_id', as: 'trainerModule', onDelete: "SET NULL", onUpdate: "CASCADE" });
    ModulePromotion.belongsTo(Promotion, { foreignKey: 'promotion_id', as: 'promotionModule', onDelete: "CASCADE", onUpdate: "CASCADE" });
    ModulePromotion.belongsTo(Module, { foreignKey: 'module_id', as: 'modulePromotion', onDelete: "CASCADE", onUpdate: "CASCADE" });
    ModulePromotion.belongsTo(Evaluation, { foreignKey: 'evaluation_id', as: 'evaluationModule', onDelete: "SET NULL", onUpdate: "CASCADE" });

    // 🟢 Relation entre Evaluation et EvaluationTypeList
    EvaluationType.belongsTo(EvaluationTypeList, { foreignKey: 'type_eval', as: 'evaluationTypeList', onDelete: "SET NULL", onUpdate: "CASCADE" });
    Evaluation.belongsTo(EvaluationType, { foreignKey: 'evaluation_id', as: 'evaluationType', onDelete: "SET NULL", onUpdate: "CASCADE" });

    // 🟢 Relations pour les évaluations utilisateurs
    User.hasMany(EvaluationUser, { foreignKey: 'user_id', as: 'userEvaluations' });
    ModulePromotion.hasMany(EvaluationUser, { foreignKey: 'module_promotion_id', as: 'moduleEvaluations' });
    EvaluationResult.hasMany(EvaluationUser, { foreignKey: 'result_id', as: 'resultEvaluations' });

    EvaluationUser.belongsTo(User, { foreignKey: 'user_id', as: 'evaluationUser' });
    EvaluationUser.belongsTo(ModulePromotion, { foreignKey: 'module_promotion_id', as: 'evaluationModulePromotion' });
    EvaluationUser.belongsTo(EvaluationResult, { foreignKey: 'result_id', as: 'evaluationResult' });

}
