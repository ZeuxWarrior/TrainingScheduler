const Events = require('../models').Events;
const validator = require('validator');

const create = async function (req, res) {
  res.setHeader('ContentType', 'application/json');
  let body = req.body;

  /*if (!body.email) {
    return ReE(res, 'Please enter an email to register', 422);
  } else if (!body.password) {
    return ReE(res, 'Please enter a password to register', 422);
  } else {*/
    let err, event;

    [err, event] = await to(Events.create(body));
    if (err) return ReE(res, err, 422);

    return ReS(res, event, 201);
  //}
};
module.exports.create = create;

const get = async function (req, res) {
    let err, event, data;
    data = req.params.id;

    [err, event] = await to(Events.find({
        where: { id: data }
    }));
    if (err) return ReE(res, err, 422);

    return ReS(res, event, 200);
};
module.exports.get = get;

const getAll = async function (req, res) {
    let err, events;
    let whereStatement = {};
    if (req.query.name) {
        whereStatement.name = {
            $like: '%' + req.query.name + '%'
        };
    }
    if (req.query.isCompleted) {
        whereStatement.isCompleted = {
            $eq: (req.query.isCompleted === 'true')
        };
    }
    whereStatement.userId = {
        $eq: req.user.id
    };
    [err, events] = await to(Events.findAll({ where: whereStatement }));
    if (err) return ReE(res, err, 404);

    return ReS(res, events, 200);
};
module.exports.getAll = getAll;

const update = async function (req, res) {
  let err, event, data;
  data = req.body;

  [err, event] = await to(Events.update(data, {
      where: { id: data.id }
  }));
  if (err) return ReE(res, err, 422);

  return ReS(res, event, 200);
};
module.exports.update = update;

const deleted = async function (req, res) {
    let err, event, data;
    data = req.params.id;

    [err, event] = await to(Events.destroy({
        where: { id: data }
    }));
    if (err) return ReE(res, err, 422);

    return ReS(res, event, 200);
};
module.exports.delete = deleted;