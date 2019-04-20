const Events = require('../models').Events;

const create = async function (req, res) {
  res.setHeader('ContentType', 'application/json');
  let body = req.body;

  if (req.user.userRoleId !== 1){
    return ReE(res, 'Access Denied', 401);
  }

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

    let includeStatement = [];
    if (req.query.showSessions) {
      includeStatement = [{
        model: "Sessions",
        attributes: ["topicName", "startTime", "endTime"],
        order: [["startTime","ASC"]]
      }];
    }

    [err, event] = await to(Events.find({
        include: includeStatement,
        where: { id: data }
    }));
    if (err) return ReE(res, err, 422);

    return ReS(res, event, 200);
};
module.exports.get = get;

const getAll = async function (req, res) {
    let err, events;
    let whereStatement = {}, orderStatement = [];
    if (req.query.name) {
        whereStatement.name = {
            $like: '%' + req.query.name + '%'
        };
    }

    if (req.query.active) {
        whereStatement.startDate = {
            $gte: Sequelize.NOW()
        };
        orderStatement = [["startDate","ASC"]];
    }

    if (req.query.trainerId) {
        whereStatement.trainerId = {
          $eq: req.query.trainerId
        }
    }
    
    [err, events] = await to(Events.findAll({
        where: whereStatement,
        order: orderStatement
    }));
    if (err) return ReE(res, err, 404);

    return ReS(res, events, 200);
};
module.exports.getAll = getAll;

const update = async function (req, res) {
  let err, event, data;
  data = req.body;

  if (req.user.userRoleId !== 1){
    return ReE(res, 'Access Denied', 401);
  }

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

    if (req.user.userRoleId !== 1){
      return ReE(res, 'Access Denied', 401);
    }

    [err, event] = await to(Events.destroy({
        where: { id: data }
    }));
    if (err) return ReE(res, err, 422);

    return ReS(res, event, 204);
};
module.exports.delete = deleted;