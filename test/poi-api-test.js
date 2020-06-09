'use strict';

const assert = require('chai').assert;
const PoiService = require('./poi-service');
const fixtures = require('./fixtures.json');
const _ =require('lodash');
const axios = require('axios');

suite('POI API tests', function() {

  let pois = fixtures.pois;
  let newPoi = fixtures.newPoi;
  let newUser = fixtures.newUser;

  const poiService = new PoiService(fixtures.poiService);

  suiteSetup(async function () {
    await poiService.deleteAllPois();
    const returnedUser = await poiService.createUser(newUser);
    const response = await poiService.authenticate(newUser)
  });

  suiteTeardown(async function () {
    await poiService.deleteAllUsers();
    poiService.clearAuth();
  });

  setup(async function () {
    await poiService.deleteAllPois();
  });

  teardown( async function () {
    await poiService.deleteAllPois();
  });


  test('get pois', async function() {
    const response = await axios.get('http://localhost:3000/api/pois');
    const pois = response.data;
    assert.equal(3, pois.length);
  });

  /*test('create a poi', async function () {
    const returnedPoi =await poiService.createPoi(newPoi);
    assert.equal(returnedPoi.poiName, newPoi.poiName);
    assert.equal(returnedPoi.poiDescription, newPoi.poiDescription);
    assert.equal(returnedPoi.poiCategory, newPoi.poiCategory);
    assert.equal(returnedPoi.poiLatitude, newPoi.poiLatitude);
    assert.equal(returnedPoi.poiLongitude, newPoi.poiLongitude);
    assert.isDefined(returnedPoi._id);
  });
*/
  test('create a poi', async function () {
    const returnedPoi = await poiService.createPoi(newPoi);
    assert(_.some([returnedPoi], newPoi), 'returnedPoi must be a superset of newPoi');
    assert.isDefined(returnedPoi._id);
  })

  test('delete a poi', async function () {
    let c = await poiService.createPoi(newPoi);
    assert(c._id !=null);
    await poiService.deleteOnePoi(c._id);
    c = await poiService.getPoi(c._id);
    assert(c == null);
  });

  test( 'delete all pois', async function () {
    let response = await axios.get('http://localhost:3000/api/pois');
    let pois = response.data;
    const originalSize = pois.length;
    assert(originalSize > 0);
    response = await axios.delete('http://localhost:3000/api/pois');
    response = await axios.get('http://localhost:3000/api/pois');
    assert.equal(pois.length, 0);
  })
});