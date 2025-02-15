/**
 * @typedef {Object} IUser
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {string} phone_no
 * @property {string} userType
 */

/**
 * @typedef {Object} ICreateUser
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {number} phone_no
 * @property {string} userType
 */

/**
 * @typedef {Object} IUpdateUser
 * @property {string} [name]
 * @property {string} [email]
 * @property {string} [password]
 * @property {string} [phone_no]
 * @property {string} [userType]
 */

class CreateUserDTO {
    /**
     * @param {ICreateUser} data
     */
    print() {
        console.log(this);
    }
    constructor(data) {
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;  
        this.phone_no = data.phone_no;
        this.userType = data.userType;
        this.print(data)
    }
}

class UpdateUserDTO {
    /**
     * @param {IUpdateUser} data
     */
    constructor(data) {
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
        this.rePassword = data.rePassword;
        this.phone_no = data.phone_no;
        this.userType = data.userType;
    }
}

module.exports = {
    CreateUserDTO,
    UpdateUserDTO,
};