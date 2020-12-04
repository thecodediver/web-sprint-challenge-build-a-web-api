const router = require("express").Router()
const Actions = require("./actions-model")

router.get("/", (req, res) => {
  Actions.get()
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(500).json({ err: err.message})
  })
})

router.get("/:id", (req, res) => {
  Actions.get(req.params.id)
  .then(data => {
    if(data) {
      res.status(200).json(data)
    } else {
      res.status(404).json("Not Found")
    }
  })
  .catch(err => {
    res.status(404).json(err.message)
  })
})

router.post("/", (req, res) => {
    Actions.insert(req.body)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(400).json(err.message)
    })
})

router.put('/:id', (req, res) => {
  const changes = req.body
  const { id } = req.params
  if (!req.body.description || !req.body.notes) {
    res.status(400).json({ message: "name, description, notes, and id are required"})
  } else {
    Actions.update(id, changes)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(error => {
        res.status(500).json({
            message: 'Error updating action'
        })
    })
  }
})

router.delete("/:id", (req, res) => {
  Actions.remove(req.params.id)
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(500).json(err.message)
  })
})

module.exports = router