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
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(500).json(err.message)
  })
})

router.post("/", (req, res) => {
  Actions.insert(req.body)
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(500).json(err.message)
  })
})

router.put("/", (req, res) => {
  Actions.update(req.id, req.body)
  .then(data => {
    res.status(200).json(data)
  })
})

router.delete("/", (req, res) => {
  Actions.remove(req.body.id)
  .then(() => {
    res.status(200)
  })
})

module.exports = router