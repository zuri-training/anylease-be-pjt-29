const validator = require("validator");

const User = require("../../../models/User")

module.exports = (req, res) => {
    const user = req.body
    const { name, email, phone, role, password } = user;
    let response = { data: null, error: false, message: '' };
    
    if (!/\d/.test(password)) {
        response = { ...response, error: true, message: "Password must contain a number" }
    } else if (!/[A-Z]/.test(password)) {
        response = { ...response, error: true, message: "Password must contain an uppercase letter" }
    } else if (password.length < 6) {
        response = { ...response, error: true, message: "Password must be at least 6 characters long" }
    }

    if (!validator.isMobilePhone(phone || "", 'en-NG')) {
        response = { ...response, error: true, message: "Phone number is invalid" }
    }

    if (!validator.isEmail(email)) {
        response = { ...response, error: true, message: "Email is invalid" }
    }

    if (!name || !email || !phone || !password) {
        response = { ...response, error: true, message: "All fields are required" }
    }

    if (response.error) return res.status(400).send(response);

    const logic = email
        ? User.findOne({ email, isDeleted: false })
        : User.findOne({ phone, isDeleted: false });

    logic.then((found) => {
        if(found) {
            return res
                    .status(409)
                    .send({...response, message: "User already exists", error: true})
        }

        const finalUser = new User(user)
        finalUser.setPassword(password);


        return finalUser
                .save()
                .then(async (data) => res
                                        .status(201)
                                        .send({...response, data, error: false, message: "User created successfully"})
                )
                .catch((message) =>
                    res.status(500).send({ data: null, message, error: true })
                );
    })
    .catch((message) =>
        res.status(500).send({ data: null, message, error: true })
    );

}