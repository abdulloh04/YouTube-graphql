import pg from 'pg'

// postgres://ueoezjwg:h1j1QfBIieYcMMfA_BR8RBHJzGDcBvg-@arjuna.db.elephantsql.com/ueoezjwg

const pool = new pg.Pool({
    port: 5432,
    host: 'arjuna.db.elephantsql.com',
    user: 'ueoezjwg',
    password: 'h1j1QfBIieYcMMfA_BR8RBHJzGDcBvg-',
    database: 'ueoezjwg',
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