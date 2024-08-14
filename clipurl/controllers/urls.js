const validator = require("validator");
const { generate } = require("randomstring");
const urls = require("../models/urls");

const handleGetURL = async (req, res) => {
    const allURLs = await urls.find({});
    return res.status(200).json({ status: "success", data: allURLs });
};

const handleCreateURL = async (req, res) => {
    const { url } = req.body;

    if (!validator.isURL(url))
        return res.status(400).json({ status: "error", data: "Missing URL" });

    const alias = generate(8);

    const user = req.user.id
    const data = await urls.create({ alias, url, user });
    return res.status(201).json({ status: "success", data: data });
};

const handleGetURLByAlias = async (req, res) => {
    const alias = req.params.alias;

    if (!alias)
        return res.status(400).json({ status: "error", data: "Missing Alias" });

    const data = await urls.findOneAndUpdate(
        { alias },
        { $inc: { clicks: 1 } },
        { new: true }
    );

    if ( data )
        return res.status(200).json({ status: "success", data: data })
    
    return res.status(404).json({ status: "error", data: "URL Not Found" });

};

const handleDeleteURLByAlias = async (req, res) => {
    const alias = req.params.alias;

    if (!alias)
        return res.status(400).json({ status: "error", data: "Missing Alias" });

    const data = await urls.findOneAndDelete({ alias });

    if ( data )
        return res.status(200).json({ status: "success", data: "URL Deleted" })
    
    return res.status(404).json({ status: "error", data: "URL Not Found" });
};

module.exports = {
    handleCreateURL,
    handleDeleteURLByAlias,
    handleGetURL,
    handleGetURLByAlias,
};
