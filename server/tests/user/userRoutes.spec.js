import chai from 'chai';
import chaiHttp from 'chai-http';
import colors from 'colors';
import serverData from '../fakerData/server-data';
import server from '../../server';

const expect = chai.expect;
let newuser = serverData.newUser;
let createdUser;
let serverResponse;

process.env.NODE_ENV = 'test';
chai.use(chaiHttp);

/*
  Test User Routes
*/
describe(colors.green('UserRoutes'), () => {
  // Test that route can create a user
  describe(colors.underline('POST /users'), () => {
    it('should create a new user in database', (done) => {
      chai.request(server)
      .post('/users')
      .send(newuser)
      .end((err, res) => {
        serverResponse = res.body;
        createdUser = serverResponse.user;
        expect(res.status).to.equal(201);
        expect(serverResponse.message)
        .to.equal('User was created successfully');
        done();
      });
    });
  });

  //  Test that route can login a user
  describe(colors.underline('POST /users/login'), () => {
    it('should check if user exists in the database', (done) => {
      const user = newuser.email;
      const password = newuser.password;

      chai.request(server)
      .post('/users/login')
      .send({user, password})
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message)
        .to.equal('User was logged in successfully');
        done();
      });
    });
  });

  // Test that route can logout a user
  describe(colors.underline('POST /users/logout'), () => {
    it('should log user out ot app', (done) => {
      chai.request(server)
      .post('/users/logout')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal('User is logged out');
        done();
      });
    });
  });

  // Test that route can fetech users from database
  describe(colors.underline('GET /users'), () => {
    it('should return an error if no token is provided', (done) => {
      chai.request(server)
      .get('/users')
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('No token provided');
        done();
      });
    });
    it('should return users if token is provided', (done) => {
      chai.request(server)
      .get('/users')
      .set('authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Users were retrieved successfully');
        done();
      });
    });
  });

  // Test that route can fetch users by id
  describe(colors.underline('GET /users/:userId'), () => {
    it('should return an error if no token is provided', (done) => {
    chai.request(server)
    .get(`/users/${createdUser.id}`)
    .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
    });
  });

  // Test that route can edit a user
  describe(colors.underline('PUT /users/:userId'), () => {
    it('should get a user with the id specified', (done) => {
      const fullName = serverData.newFullName;
      chai.request(server)
      .put(`/users/${createdUser.id}`)
      .send({ fullName })
      .set('authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal(`Username: ${createdUser.userName} was updated successfully`);
        done();
      });
    });
    it('should give an error if user does not exist', (done) => {
      chai.request(server)
      .put('/users/-1')
      .send({ userName: 'invalidUserId' })
      .set('authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('User not found');
        done();
      });
    });
  });

  // Test that route can delete a user
  describe(colors.underline('DELETE /users/:userId'), () => {
    it('should delete a user with the id specified', (done) => {
      chai.request(server)
      .delete(`/users/${createdUser.id}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('User was successfully deleted');
        done();
      });
    });
    it('should give an error if user does not exist', (done) => {
      chai.request(server)
      .delete('/users/-1')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('User not found');
        done();
      });
    });
  });
});