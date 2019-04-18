const Sessions = require('../models').Sessions;

const create = async function (req, res) {
  res.setHeader('ContentType', 'application/json');
  let body = req.body;
  let user = req.user;

  if (!user.isTrainer && user.userRoleId !== 1){
    return ReE(res, 'Access Denied', 401);
  }

  /*if (!body.email) {
    return ReE(res, 'Please enter an email to register', 422);
  } else if (!body.password) {
    return ReE(res, 'Please enter a password to register', 422);
  } else {*/
    let err, session;
    if (user.isTrainer) {
        body.trainerId = user.id;
    }

    [err, session] = await to(Sessions.create(body));
    if (err) return ReE(res, err, 422);

    return ReS(res, session, 201);
  //}
};
module.exports.create = create;

const get = async function (req, res) {
    let err, session, data;
    data = req.params.id;

    [err, session] = await to(Sessions.find({
        where: { id: data }
    }));
    if (err) return ReE(res, err, 422);

    return ReS(res, session, 200);
};
module.exports.get = get;

const getAll = async function (req, res) {
    let err, sessions;
    let whereStatement = {};
    if (req.query.name) {
        whereStatement.topicName = {
            $like: '%' + req.query.name + '%'
        };
    }
    if (req.query.isCompleted) {
        whereStatement.isCompleted = {
            $eq: (req.query.isCompleted === 'true')
        };
    }
    if (req.user.isTrainer) {
        whereStatement.trainerId = {
            $eq: req.user.id
        };
    }
    [err, sessions] = await to(Sessions.findAll({
        include: [{
            model: Events,
            attributes: ['id', 'name']
        },{
            model: Venues,
            attributes: ['id', 'name']
        },{
            model: Users,
            attributes: ['id', 'first', 'last']
        }],
        where: whereStatement
    }));
    if (err) return ReE(res, err, 404);

    return ReS(res, sessions, 200);
};
module.exports.getAll = getAll;

const update = async function (req, res) {
  let err, session, data;
  data = req.body;

  if (!req.user.isTrainer && req.user.userRoleId !== 1){
    return ReE(res, 'Access Denied', 401);
  }

  [err, session] = await to(Sessions.update(data, {
      where: { id: data.id }
  }));
  if (err) return ReE(res, err, 422);

  return ReS(res, session, 200);
};
module.exports.update = update;

const deleted = async function (req, res) {
    let err, session, data;
    data = req.params.id;

    if (req.user.userRoleId !== 1){
      return ReE(res, 'Access Denied', 401);
    }

    [err, session] = await to(Sessions.destroy({
        where: { id: data }
    }));
    if (err) return ReE(res, err, 422);

    return ReS(res, session, 200);
};
module.exports.delete = deleted;