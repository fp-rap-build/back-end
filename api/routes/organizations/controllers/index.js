const Org = require('../org-model');

const getAllOrganizations = async (req, res) => {
  try {
    const orgs = await Org.findAll();
    res.status(200).json(orgs);
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
};

const getOrganizationById = async (req, res) => {
  const { id } = req.params;
  try {
    const org = await Org.findById(id);
    res.status(200).json(org);
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
};

const createOrganization = async (req, res) => {
  const uploadOrg = req.body;
  try {
    const newOrg = await Org.create(uploadOrg);
    res.status(200).json(newOrg);
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
};

const updateOrganizationById = async (req, res) => {
  const { id } = req.params;
  const newOrg = req.body;
  try {
    const edit = await Org.update(id, newOrg);
    res.status(200).json({ organization: edit[0] });
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
};

const deleteOrganizationById = async (req, res) => {
  const { id } = req.params;
  try {
    await Org.remove(id);
    res.status(200).json({ message: 'Organization Deleted' });
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
};

module.exports = {
  getAllOrganizations,
  createOrganization,
  getOrganizationById,
  updateOrganizationById,
  deleteOrganizationById,
};
