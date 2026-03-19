describe("API Tests - JSONPlaceholder", () => {
  const baseUrl = "https://jsonplaceholder.typicode.com";

  // ✅ GET USER TESTS
  describe("Get User API", () => {
    it("✅ Should get a single user successfully", () => {
      cy.request({
        method: "GET",
        url: `${baseUrl}/users/1`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("id");
        expect(response.body).to.have.property("name");
        expect(response.body).to.have.property("email");
        expect(response.body.id).to.eq(1);
        cy.log(`User name: ${response.body.name}`);
      });
    });

    it("✅ Should get list of all users", () => {
      cy.request({
        method: "GET",
        url: `${baseUrl}/users`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an("array");
        expect(response.body.length).to.eq(10);
        cy.log(`Total users: ${response.body.length}`);
      });
    });

    it("❌ Should return 404 for non-existent user", () => {
      cy.request({
        method: "GET",
        url: `${baseUrl}/users/999`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
        cy.log("User not found as expected");
      });
    });
  });

  // ✅ GET POSTS TESTS
  describe("Get Posts API", () => {
    it("✅ Should get all posts", () => {
      cy.request({
        method: "GET",
        url: `${baseUrl}/posts`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an("array");
        expect(response.body.length).to.eq(100);
        cy.log(`Total posts: ${response.body.length}`);
      });
    });

    it("✅ Should get posts by user", () => {
      cy.request({
        method: "GET",
        url: `${baseUrl}/posts?userId=1`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an("array");
        // All posts should belong to user 1
        response.body.forEach((post) => {
          expect(post.userId).to.eq(1);
        });
        cy.log(`Posts for user 1: ${response.body.length}`);
      });
    });
  });

  // ✅ CREATE USER TESTS
  describe("Create User API", () => {
    it("✅ Should create a new user successfully", () => {
      cy.fixture("apidata").then((data) => {
        cy.request({
          method: "POST",
          url: `${baseUrl}/users`,
          body: data.newUser,
        }).then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body.name).to.eq(data.newUser.name);
          expect(response.body.email).to.eq(data.newUser.email);
          expect(response.body).to.have.property("id");
          cy.log(`New user created with ID: ${response.body.id}`);
        });
      });
    });
  });

  // ✅ UPDATE USER TESTS
  describe("Update User API", () => {
    it("✅ Should update a user successfully", () => {
      cy.fixture("apidata").then((data) => {
        cy.request({
          method: "PUT",
          url: `${baseUrl}/users/1`,
          body: data.updateUser,
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.name).to.eq(data.updateUser.name);
          expect(response.body.email).to.eq(data.updateUser.email);
          cy.log(`User updated: ${response.body.name}`);
        });
      });
    });

    it("✅ Should partially update a user (PATCH)", () => {
      cy.request({
        method: "PATCH",
        url: `${baseUrl}/users/1`,
        body: { name: "Patched QA Engineer" },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq("Patched QA Engineer");
        cy.log("Partial update successful");
      });
    });
  });

  // ✅ DELETE USER TESTS
  describe("Delete User API", () => {
    it("✅ Should delete a user successfully", () => {
      cy.request({
        method: "DELETE",
        url: `${baseUrl}/users/1`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        cy.log("User deleted successfully");
      });
    });
  });
});