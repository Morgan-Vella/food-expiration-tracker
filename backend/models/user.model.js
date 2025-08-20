import mongoose from "mongoose";
import bcrypt from "bcrypt"

const UserSchema = new mongoose.Schema(
    {
        'firstName': {
            type: String,
            required: [true, "You must have a first name."]
        },
        'lastName': {
            type: String,
            required: [true, "You must have a last name."]
        },
        'email': {
            type: String,
            required: [true, "You must enter an email."],
            unique: true,
            validate : {
                validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: "You must provide a valid email."
            }
        },
        'password': {
            type: String,
            required: [true, "You must enter a password."],
            minLength: [8, "Password must include at least 8 characters."]
        }
    }, {timestamps: true} 
)

//define a temporary field that doesn't persist to the database.
UserSchema.virtual("confirmPassword")
    .get(function () { return this._confirmPassword })
    .set(function (value) { return this._confirmPassword = value })

//'pre' allows you to define a middleware function that will execute BEFORE the rest of the model functionality 
UserSchema.pre("validate", function(next) {
    if(this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Your passwords must match.")
    }
    next()
})

// this will be our middleware function that hashes the given password before sending to the database.
UserSchema.pre("save", function(next) {
    bcrypt.hash(this.password, 10)
        .then((hashedPassword) => {
            this.password = hashedPassword
            next()
        })
})

export default mongoose.model("User", UserSchema)