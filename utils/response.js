class GeneralResponse {
  constructor(success, data, statusCode = 200, message) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message || "Success";
    this.data = data;
  }
}

module.exports = {
  GeneralResponse
}
