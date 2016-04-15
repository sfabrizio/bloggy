var axios = require("axios");
var server = require("../server.js");
var base_url = "http://localhost:3000/";

describe("Basic Test Server", function() {
    describe("GET /", function() {
        it("should returns status code 200", function() {
            axios.get(base_url, function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });

        it('should return some body text', function () {
            axios.get(base_url, function(error, response, body) {
                expect(typeof(body)).toBe("string");
                server.closeServer();
                done();
            });
        });
    });
});
