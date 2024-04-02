import pool from "../../../config/db.js"

export const insertCategoryQuery = async (array) => {
    try {
        let query = `INSERT INTO categories (category) VALUES (?)`;
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing insertCategoryQuery:", error);
        throw error;
    }
}

export const updateCategoryWorksheetQuery = async (query,array) => {
    try {
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing updateCategoryWorksheetQuery:", error);
        throw error;
    }
};

export const getAllCategoryQuery = async () => {
    try {
        let query = `SELECT * FROM categories`
        return pool.query(query);
    } catch (error) {
        console.error("Error executing getAllCategoryQuery:", error);
        throw error;
    }
}

export const deleteCategoryQuery = async (array) => {
    try {
        let query = `DELETE FROM categories WHERE _id = ?`;
        return await pool.query(query, array);
    } catch (error) {
        console.error("Error executing deleteCategoryQuery:", error);
        throw error;
    }
}