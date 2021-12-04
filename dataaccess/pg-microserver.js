const { Client } = require('pg')
const client = new Client({
    user: 'ig',
    host: '172.26.117.18',
    database: 'postgres',
    password: 'zxc123**',
    port: 5432,
})
client.connect()

module.exports = {
    query: (text, params) => {
        return client.query(text, params)
    },

    getTouristPost: async (start, end) => {
        const sql = `SELECT * FROM igdata.post_metadata WHERE id >= $1 and id <= $2`
        const values = [start, end]
        const { rows } = await client.query(sql, values)
        return rows
    },

    updateTouristPost: async (id, labels, landmark) => {
        const sql = `UPDATE igdata.post_metadata SET labels = $2, landmark = $3 WHERE id = $1 RETURNING *`
        const values = [id, labels, landmark]
        try {
            const { rows } = await client.query(sql, values)
            return rows         
        } catch (err) {
            console.log(err.stack)
        }
    }
}