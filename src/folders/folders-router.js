const { json } = require('express')
const express = require('express')
const xss = require('xss')
const FoldersService = require('./folders-service')
const FoldersRouter = express.Router()
const jsonParser = express.json()

const serializeFolder = folder => ({
    id: folder.id,
    name: xss(folder.folder_name)
})

FoldersRouter.route('/')
    .get((req,res,next)=>{
        FoldersService.getAllFolders( req.app.get('db'))
            .then(folders => { res.json(folders.map(serializeFolder))})
    })
    .post(jsonParser,(req,res,next)=>{
        const { name } = req.body
        
        if(!name) {
            return res.status(400).json({error: {message: 'Folder must have a name'}})
        }
        FoldersService.addFolder(req.app.get('db'), name)
            .then(folder => {
                res.status(201)
                .location(path.posix.join(req.originalUrl +`/${folder.id}`))
                .json(serializeFolder(folder))
            })
            .catch(next)
    })
    
FoldersRouter.route('/:folder_id')
  .all((req, res, next) => {
    FoldersService.getById( req.app.get('db'), req.params.folder_id )
      .then(folder => {
        console.log('this::::',folder)
        if(!folder) { return res.status(404).json({error: {message: 'Folder does not exist'} }) }
        res.folder = folder;
        next();
      })
      .catch(next)
  })
  .get((req, res, next) => {
    return res.json(serializeFolder(res.folder))
  })
  .delete((req, res, next) => {
    FoldersService.deleteFolder( req.app.get('db'), req.params.folder_id )
    .then(() => { res.status(204).end() })
    .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const { name } = req.body;

    if(!name) {
      return res.status(400).json({ error: {message: `Folder updates must include new name`} })
    }
    FoldersService.updateFolder(req.app.patch.get('db'), req.params.folder_id, name)
      .then(rows => { res.status(204).end() })
      .catch(next)
  })
  
module.exports = FoldersRouter