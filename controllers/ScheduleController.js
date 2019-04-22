const Schedule = require('../models').Schedule;

const create = async function (req, res) {
  res.setHeader('ContentType', 'application/json');
  let body = req.body;
  let user = req.user;

  /*if (!body.email) {
    return ReE(res, 'Please enter an email to register', 422);
  } else if (!body.password) {
    return ReE(res, 'Please enter a password to register', 422);
  } else {*/
    let err, schedule;
    if (user.userRoleId !== 1) {
        body.userId = user.id;
    }

    [err, schedule] = await to(Schedule.create(body));
    if (err) return ReE(res, err, 422);

    return ReS(res, schedule, 201);
  //}
};
module.exports.create = create;

const get = async function (req, res) {
    let err, schedule, data;
    data = req.params.id;

    [err, schedule] = await to(Schedule.find({
        include: [{
            model: "Events",
            attributes: ["name"],
            include: [{
                model: "Sessions",
                attributes: ["topicName"]
            }]
        }],
        where: { id: data }
    }));
    if (err) return ReE(res, err, 422);

    return ReS(res, schedule, 200);
};
module.exports.get = get;

const getAll = async function (req, res) {
    let err, schedule;
    let whereStatement = {}, eventWhereStatement = {};
    if (req.query.name) {
        eventWhereStatement.name = {
            $like: '%' + req.query.name + '%'
        };
    }
    
    if (!req.query.getAll) {
        whereStatement.userId = {
            $eq: req.user.id
        };
    }
    [err, schedule] = await to(Schedule.findAll({
        include: [{
            model: "Events",
            attributes: ["name","startDate"],
            where: eventWhereStatement,
            order: [["startDate","ASC"]]
        }],
        where: whereStatement
    }));
    if (err) return ReE(res, err, 404);

    return ReS(res, schedule, 200);
};
module.exports.getAll = getAll;

const deleted = async function (req, res) {
    let err, schedule, data;
    data = req.params.id;

    [err, schedule] = await to(Schedule.destroy({
        where: { id: data }
    }));
    if (err) return ReE(res, err, 422);

    return ReS(res, schedule, 204);
};
module.exports.delete = deleted;