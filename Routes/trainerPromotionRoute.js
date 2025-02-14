import express from "express";
import TrainersPromotion from "../models/trainersPromotion.js";

const router = express.Router();

// Ajouter un formateur à une promotion
router.post("/", async (req, res) => {
    try {
        const { trainer_id, promotion_id } = req.body;

        if (!trainer_id || !promotion_id) {
            return res.status(400).json({ message: "trainer_id et promotion_id sont requis." });
        }

        // Vérifier si le formateur est déjà dans la promotion
        const existingEntry = await TrainersPromotion.findOne({ 
            where: { trainer_id, promotion_id } 
        });

        if (existingEntry) {
            return res.status(400).json({ message: "Ce formateur est déjà dans cette promotion." });
        }

        // Ajouter le formateur à la promotion
        const newEntry = await TrainersPromotion.create({ trainer_id, promotion_id });

        res.status(201).json({ message: "Formateur ajouté à la promotion avec succès.", data: newEntry });
    } catch (error) {
        console.error("Erreur lors de l'ajout du formateur à la promotion :", error);
        res.status(500).json({ message: "Erreur serveur.", error });
    }
});

// Supprimer un formateur de la promotion
router.delete("/:trainer_id/:promotion_id", async (req, res) => {
    try {
        const { trainer_id, promotion_id } = req.params;

        if (!trainer_id || !promotion_id) {
            return res.status(400).json({ message: "trainer_id et promotion_id sont requis." });
        }

        // Supprimer le formateur de la promotion
        await TrainersPromotion.destroy({ 
            where: { trainer_id, promotion_id } 
        });

        res.status(200).json({ message: "Formateur supprimé de la promotion avec succès." });
    } catch (error) {
        console.error("Erreur lors de la suppression du formateur de la promotion :", error);
        res.status(500).json({ message: "Erreur serveur.", error });
    }
});

export default router;
