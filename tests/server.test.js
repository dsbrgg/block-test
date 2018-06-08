const expect = require('chai').expect;
const request = require('supertest');

const { server } = require('./../server/server');

describe('GET /balance/:addrs', () => {
    /* 
        This seems to be a public wallet address but in case this is a sensitive type of info
        it should probably be kept in a separate file other than here
    */
   
    let addrsOk = "738d145faabb1e00cf5a017588a9c0f998318012";
    let addrsBad = "738d145faabb1e00cf5a017588a9c0f9983180" // Same as above, missing two characters

    it('should correctly fetch Weis balance converted to Ether', (done) => {
        request(server)
            .get(`/balance/${addrsOk}`)
            .expect(200)
            .expect((res) => {
                expect(res.body).to.have.own.property('ether');
                expect(res.body.ether).to.be.a('number');
            })
            .end(done);
    });

    it('should return an error for bad address format', (done) => {
        request(server)
            .get(`/balance/${addrsBad}`)
            .expect(500)
            .expect((res) => {
                expect(res.body).to.have.own.property('error');
            })
            .end(done);
    });
});