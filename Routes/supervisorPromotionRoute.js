import express from "express";
import SupervisorsPromotion from "../models/supervisorsPromotion.js";

const router = express.Router();

// Ajouter un superviseur à une promotion
router.post("/", async (req, res) => {
    try {
        const { supervisor_id, promotion_id } = req.body;

        if (!supervisor_id || !promotion_id) {
            return res.status(400).json({ message: "supervisor_id et promotion_id sont requis." });
        }

        // Vérifier si le superviseur est déjà dans la promotion
        const existingEntry = await SupervisorsPromotion.findOne({ 
            where: { supervisor_id, promotion_id } 
        });

        if (existingEntry) {
            return res.status(400).json({ message: "Ce superviseur est déjà dans cette promotion." });
        }

        // Ajouter le superviseur à la promotion
        const newEntry = await SupervisorsPromotion.create({ supervisor_id, promotion_id });

        res.status(201).json({ message: "Superviseur ajouté à la promotion avec succès.", data: newEntry });
    } catch (error) {
        console.error("Erreur lors de l'ajout du superviseur à la promotion :", error);
        res.status(500).json({ message: "Erreur serveur.", error });
    }
});

// Supprimer un superviseur de la promotion
router.delete("/:supervisor_id/:promotion_id", async (req, res) => {
    try {
        const { supervisor_id, promotion_id } = req.params;

        if (!supervisor_id || !promotion_id) {
            return res.status(400).json({ message: "supervisor_id et promotion_id sont requis." });
        }

        // Supprimer le superviseur de la promotion
        await SupervisorsPromotion.destroy({ 
            where: { supervisor_id, promotion_id } 
        });

        res.status(200).json({ message: "Superviseur supprimé de la promotion avec succès." });
    } catch (error) {
        console.error("Erreur lors de la suppression du superviseur de la promotion :", error);
        res.status(500).json({ message: "Erreur serveur.", error });
    }
});

export default router;
