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
  if(req.body.project_id && req.body.notes && req.body.description) {
    Actions.insert(req.body)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(400).json(err.message)
    })
  } else {
    res.status(400)
  }
})

router.put("/:id", (req, res) => {
  if(req.body.id && req.body.project_id && req.body.description && req.body.notes) {
    Actions.update(req.params.id, req.body)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json(err.message)
    })
  } else {
    res.status(400)
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