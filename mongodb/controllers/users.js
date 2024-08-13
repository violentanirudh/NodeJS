const User = require("../models/users");

const handleGetUsers = async (req, res) => {
    const users = await User.find({});
    res.status(200).json({ status: "success", data: users });
};

const handleGetUserById = async (req, res) => {
    if (!req.params.id)
        return res
            .status(400)
            .json({ status: "error", data: "Missing Parameters" });

    const user = await User.findById(req.params.id);

    if (user) return res.status(200).json({ status: "success", data: user });

    return res.status(404).json({ status: "error", data: "User Not Found" });
};

const handleDeleteUserById = async (req, res) => {
    if (!req.params.id)
        return res
            .status(400)
            .json({ status: "error", data: "Missing Parameters" });

    const user = await User.findByIdAndDelete(req.params.id);

    if (user) return res.status(200).json({ status: "success", data: user });

    return res.status(404).json({ status: "error", data: "User Not Found" });
};

const handleUpdateUserById = async (req, res) => {
    if (!req.params.id)
        return res
            .status(400)
            .json({ status: "error", data: "Missing Parameters" });

    const { firstName, lastName, email, gender } = req.body;

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            firstName,
            lastName,
            email,
            gender,
        },
        { new: true, runValidators: true }
    );

    if (user) {
        return res
            .status(200)
            .json({ status: "success", data: user });
    }

    return res.status(400).json({ status: 'error', data: "User Not Found" });

};

const handleCreateUser = async (req, res) => {
    const { firstName, lastName, email, gender } = req.body;

    if ( !firstName || !lastName || !email || !gender )
        return res.status(400).json({ status: 'error', data: 'Missing Parameters' });

    try {
        const user = await User.create({ firstName, lastName, email, gender });
        return res.status(201).json({ status: 'success', data: user });
    } catch (error) {
        return res.status(400).json({ status: 'error', data: error.message });
    }
};


module.exports = {
    handleGetUsers,
    handleGetUserById,
    handleDeleteUserById,
    handleUpdateUserById,
    handleCreateUser
};
