import pool from "../../../config/db.js"

export const addAnnouncementQuery = (array)=> {
    let query = `INSERT INTO announcements (
        event_type,
        priority,
        from_date, 
        to_date, 
        title, 
        description
    ) VALUES (?,?,?,?,?,?);`
    return pool.query(query, array);
}

export const fetchAnnouncementsQuery = ()=> {
    let query = `
        SELECT
        title,
        description,
        priority,
        DATE_FORMAT(from_date, '%Y-%m-%d') AS from_date,
        DATE_FORMAT(to_date, '%Y-%m-%d') AS to_date
    FROM
        announcements
    ORDER BY
        created_at DESC;
    `

    return pool.query(query);
}

export const deleteAnnouncementQuery = (array)=> {
    let query = `DELETE FROM announcements WHERE _id = ?`
    return pool.query(query, array);
}

export const updateAnnouncementQuery = (query, array)=> {
    return pool.query(query, array);
}