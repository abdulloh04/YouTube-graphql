import pg from 'pg'

const pool = new pg.Pool({
    port: 5432,
    host: 'heffalump.db.elephantsql.com',
    user: 'menzpgqm',
    password: 'wyDrnrB6b0dCnUPq1zzdfs525fV-BXpp',
    database: 'menzpgqm',
})
    
async function db (query, ...params) {
    const client = await pool.connect()
    try {
        const { rows } = await client.query(query, params.length ? params : null)
        return rows
    } catch (error) {
        console.log(query, params);
        console.log('Database error:', error.message)
        throw new Error(error.message)
    } finally {
        
        client.release()
    }
}

export default db