var request = require("request");
var server = require("../server.js");
var base_url = "http://localhost:3000/";

describe("api/", function() {
    describe('getAll', function () {
        describe("GET method", function() {
            it("should returns status code 200", function() {
                request.get(base_url, function(error, response, body) {
                    expect(response.statusCode).toBe(200);
                    done();
                });
            });

            it("should have a response with some blog data", function() {
                request.get(base_url, function(error, response, body) {
                    expect(response.data.blog).toBeDefined();
                    done();
                });
            });

            it("should have a response with some blog array data", function() {
                request.get(base_url, function(error, response, body) {
                    expect(response.data.blog).toContain([]);
                    server.closeServer();
                    done();
                });
            });
        });
    });
});
