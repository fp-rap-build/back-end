const express = require("express");
const authRequired = require("../../middleware/authRequired");

const Org = require("./org-model");
const router = express.Router();
const restrictTo = require("../../middleware/restrictTo");

router.get("/", authRequired, restrictTo("admin"), async (req, res) => {
  try {
    const orgs = await Org.findAll();
    res.status(200).json(orgs);
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
});

router.get("/:id", authRequired, restrictTo("admin"), async (req, res) => {
  const { id } = req.params;
  try {
    const org = await Org.findById(id);
    res.status(200).json(org);
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
});

router.post("/", authRequired, restrictTo("admin"), async (req, res) => {
  const uploadOrg = req.body;
  try {
    const newOrg = await Org.create(uploadOrg);
    res.status(200).json(newOrg);
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
});

router.put("/:id", authRequired, restrictTo("admin"), async (req, res) => {
  const { id } = req.params;
  const newOrgName = req.body;
  try {
    const edit = await Org.update(id, newOrgName);
    res.status(200).json({ message: `Organization name succesfully changed` });
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
});

router.delete("/:id", authRequired, restrictTo("admin"), async (req, res) => {
  const { id } = req.params;
  try {
    await Org.remove(id);
    res.status(200).json({ message: "Organization Deleted" });
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
});
module.exports = router;
