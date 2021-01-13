
const NotesService = {

    getAllNotes(db) {
        return db('notes')
        .select('*')
    },
    addNewNote(db, note) {
        return db('notes')
        .insert(note)
        .returning('*')
        .then(rows => rows[0])
    },
    getNoteById(db, idx) {
        return db('notes')
        .select('*')
        .where('id', idx)
        .first()
    },
    deleteNote(db, idx) {
        return db('notes')
        .where('id', idx)
        .delete()
    },
    updateNote(db, idx, data) {
        return db('notes')
        .where('id', idx)
        .update(data)
    }
}

module.exports = NotesService