import express from "express";
import StudientsPromotion from "../models/studientsPromotion.js";

const router = express.Router();

// Ajouter un étudiant à une promotion
router.post("/", async (req, res) => {
    try {
        const { studient_id, promotion_id } = req.body;

        if (!studient_id || !promotion_id) {
            return res.status(400).json({ message: "studient_id et promotion_id sont requis." });
        }

        // Vérifier si l'étudiant est déjà dans la promotion
        const existingEntry = await StudientsPromotion.findOne({ 
            where: { studient_id, promotion_id } 
        });

        if (existingEntry) {
            return res.status(400).json({ message: "Cet étudiant est déjà dans cette promotion." });
        }

        // Ajouter l'étudiant à la promotion
        const newEntry = await StudientsPromotion.create({ studient_id, promotion_id });

        res.status(201).json({ message: "Étudiant ajouté à la promotion avec succès.", data: newEntry });
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'étudiant à la promotion :", error);
        res.status(500).json({ message: "Erreur serveur.", error });
    }
});

// Supprimer un étudiant de la promotion
router.delete("/:studient_id/:promotion_id", async (req, res) => {
    try {
        const { studient_id, promotion_id } = req.params;

        if (!studient_id || !promotion_id) {
            return res.status(400).json({ message: "studient_id et promotion_id sont requis." });
        }

        // Supprimer l'étudiant de la promotion
        await StudientsPromotion.destroy({ 
            where: { studient_id, promotion_id } 
        });

        res.status(200).json({ message: "Étudiant supprimé de la promotion avec succès." });
    } catch (error) {
        console.error("Erreur lors de la suppression de l'étudiant de la promotion :", error);
        res.status(500).json({ message: "Erreur serveur.", error });
    }
});


export default router;
