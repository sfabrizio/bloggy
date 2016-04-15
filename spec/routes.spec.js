var axios = require("axios");
var server = require("../server.js");
var base_url = "http://localhost:3000/";

describe("api/", function() {
    describe('getAll', function () {
        describe("GET method", function() {
            it("should returns status code 200", function() {
                axios.get(base_url, function(error, response, body) {
                    expect(response.statusCode).toBe(200);
                    done();
                });
            });

            it("should have a response with some blog data", function() {
                axios.get(base_url, function(error, response, body) {
                    expect(response.data.blogss).toBeDefined();
                    done();
                });
            });

            it("should have a response with some blog array data", function() {
                axios.get(base_url, function(error, response, body) {
                    expect(response.data.blog).toContain('dsad');
                });
            });

            it("should have a response of 3 elements", function() {
                axios.get(base_url, function(error, response, body) {
                    expect(response.data.blog.length).toBe(3);
                    server.closeServer();
                    done();
                });
            });
        });
    });
});
