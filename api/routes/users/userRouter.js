const express = require("express");
const authRequired = require("../../middleware/authRequired");
const Users = require("./userModel");
const router = express.Router();
const restrictTo = require("../../middleware/restrictTo");

router.get("/me", authRequired, (req, res) => {
	const { user } = req;
	res.status(200).json({
		user,
	});
});

router.get("/", authRequired, restrictTo("admin"), async (req, res) => {
	try {
		let users = await Users.findAll();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.get(
	"/requests",
	authRequired,
	restrictTo("admin", "program_manager"),
	async (req, res) => {
		try {
			let users = await Users.findAll({
				is_requesting_assistance: true,
			});

			res.status(200).json(users);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}
);

router.post("/", authRequired, (req, res) => {
	Users.findOrCreateProfile(req.body)
		.then(() => {
			res.status(201).json({ message: "Profile created" });
		})
		.catch(() => {
			res.status(500).json({
				message: "Unable to create profile",
			});
		});
});

router.get("/:id", authRequired, restrictTo("admin"), (req, res) => {
	const id = String(req.params.id);
	Users.findById(id)
		.then((profile) => {
			if (profile) {
				res.status(200).json(profile);
			} else {
				res.status(404).json({
					error: "ProfileNotFound",
				});
			}
		})
		.catch((err) => {
			res.status(500).json({ error: err.message });
		});
});

router.get(
	"/:id/address",
	authRequired,
	restrictTo("admin"),
	async (req, res) => {
		let { id } = req.params;
		try {
			let address = await Users.findAddressByUserId(id);
			res.status(200).json({ address: address[0] });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}
);

router.put(
	"/:id/address",
	authRequired,
	restrictTo("admin"),
	async (req, res) => {
		let { id } = req.params;

		// Make it impossible to update the id
		req.body["id"] = undefined;

		let payload = req.body;

		try {
			let user = await Users.findById(id);

			let updatedAddress = await Users.updateAddressById(
				user.address_id,
				payload
			);

			res.status(200).json({ address: updatedAddress[0] });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}
);

router.put("/:id", authRequired, restrictTo("admin"), (req, res) => {
	const profile = req.body;
	const { id } = req.params;
	Users.findById(id)
		.then(
			Users.update(id, profile)
				.then((updated) => {
					res.status(200).json({
						message: "profile updated",
						profile: updated[0],
					});
				})
				.catch((err) => {
					res.status(500).json({
						message: `Could not update profile '${id}'`,
						error: err.message,
					});
				})
		)
		.catch((err) => {
			res.status(404).json({
				message: `Could not find profile '${id}'`,
				error: err.message,
			});
		});
});

router.delete("/:id", restrictTo("admin"), (req, res) => {
	const { id } = req.params;
	try {
		Users.findById(id).then((profile) => {
			Users.remove(profile.id).then(() => {
				res.status(200).json({
					message: `Profile '${id}' was deleted.`,
					profile,
				});
			});
		});
	} catch (err) {
		res.status(500).json({
			message: `Could not delete profile with ID: ${id}`,
			error: err.message,
		});
	}
});

module.exports = router;
