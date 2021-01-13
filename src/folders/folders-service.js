
const FoldersService = {
    getAllFolders(db) {
        return db('folders').select('*')
    },
    getById(db, idx){
        return db('folders')
                .select('*')
                .where('id',idx)
                .first()
    },
    addFolder(db, newFolder){
        return db('folders')
                .insert(newFolder)
                .returning('*')
                .then(rows => rows[0])
    },
    updateFolder(db, id, info){
        return db('folders')
                .where({id})
                .update(info)
    },
    deleteFolder(db, idx){
        return db('folders')
                .where({idx})
                .delete()
    },
    getNotesFromFolder(db, folderId){
        return db('notes')
    }
}

module.exports = FoldersService