const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// SIGNUP
exports.signup = async(req, res) => {
    const { name, email, password} =
    req.body;


try {
    const hashedPassword = await
    bcrypt.hash(password, 10);

    const user = new User({
        name,
        email,
        password: hashedPassword
    });

    await user.save();

    res.json({ message: "User created successfully"});
} catch (err) {
    res.status(500).json({ error:
         err.message});
}
};

//LOGIN
exports.login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await
        User.findOne({email});

        if (!user) return
        res.status(400).json({ message: "User not found"});

        const isMatch = await
        bcrypt.compare(password, 
            user.password
        );

        if (!isMatch) return
        res.status(400).json({ message: "Wrong password"});

        const token = jwt.sign(
            {id: user_id},
            ProcessingInstruction.env.JWT_SECRET,
            {expiresIn: "1d"}
        );

        res.json({token, user});
    } catch (err) {
        res.status(500).json({ error:
            err.message
        });
    }
};
