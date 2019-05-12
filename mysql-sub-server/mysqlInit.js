var Sequelize = require('sequelize');

const sequelize = new Sequelize('DLUTdatabase', 'root', 'Password000!', {
    host: 'localhost',
    // host: '192.168.29.1',
    dialect: 'mysql',
    define: {
        // The `timestamps` field specify whether or not the `createdAt` and `updatedAt` fields will be created.
        // This was true by default, but now is false by default
        timestamps: false
    }
});

class UserA extends Sequelize.Model { }
class UserB extends Sequelize.Model { }
class Ranker extends Sequelize.Model { }
class Accessor extends Sequelize.Model { }

UserA.init(
    {
        id: { type: Sequelize.STRING(10), primaryKey: true },
        password: { type: Sequelize.STRING(20), allowNull: false },
        name: { type: Sequelize.STRING(40), allowNull: true, defaultValue: 'Edward Gao' },
        logup_date: { type: Sequelize.DATEONLY, allowNull: true, defaultValue: '2019-06-30' },
        tel: { type: Sequelize.STRING(20), allowNull: true, defaultValue: '510-64587637' },
        email: { type: Sequelize.STRING(40), allowNull: true, defaultValue: 'fabric@dlut.my.com' },
        address: { type: Sequelize.STRING(50), allowNull: true, defaultValue: '321,TuQiang Street,JinZhou,DaLian' },
        account: { type: Sequelize.INTEGER, allowNull: true, defaultValue: 10000 },
        rankInfo: { type: Sequelize.INTEGER, allowNull: true, defaultValue: 1 },
    },
    {
        sequelize,
        modelName: 'user_a'
    }
);

UserB.init(
    {
        id: { type: Sequelize.STRING(10), primaryKey: true },
        password: { type: Sequelize.STRING(20), allowNull: false },
        name: { type: Sequelize.STRING(40), allowNull: true, defaultValue: 'Edward Gao' },
        logup_date: { type: Sequelize.DATEONLY, allowNull: true, defaultValue: '2019-06-30' },
        tel: { type: Sequelize.STRING(20), allowNull: true, defaultValue: '510-64587637' },
        email: { type: Sequelize.STRING(40), allowNull: true, defaultValue: 'fabric@dlut.my.com' },
        address: { type: Sequelize.STRING(50), allowNull: true, defaultValue: '321,TuQiang Street,JinZhou,DaLian' },
        account: { type: Sequelize.INTEGER, allowNull: true, defaultValue: 10000 },
        rankInfo: { type: Sequelize.INTEGER, allowNull: true, defaultValue: 1 },
    },
    {
        sequelize,
        modelName: 'user_b'
    }
);

Ranker.init(
    {
        id: { type: Sequelize.STRING(10), primaryKey: true },
        password: { type: Sequelize.STRING(20), allowNull: false },
        name: { type: Sequelize.STRING(40), allowNull: true, defaultValue: 'Edward Gao' },
        logup_date: { type: Sequelize.DATEONLY, allowNull: true, defaultValue: '2019-06-30' },
        tel: { type: Sequelize.STRING(20), allowNull: true, defaultValue: '510-64587637' },
        email: { type: Sequelize.STRING(40), allowNull: true, defaultValue: 'fabric@dlut.my.com' },
        address: { type: Sequelize.STRING(50), allowNull: true, defaultValue: '321,TuQiang Street,JinZhou,DaLian' },
        break_date: { type: Sequelize.DATEONLY, allowNull: true, defaultValue: '2019-06-30' },
    },
    {
        sequelize,
        modelName: 'ranker'
    }
);

Accessor.init(
    {
        id: { type: Sequelize.STRING(10), primaryKey: true },
        password: { type: Sequelize.STRING(20), allowNull: false },
        name: { type: Sequelize.STRING(40), allowNull: true, defaultValue: 'Edward Gao' },
        logup_date: { type: Sequelize.DATEONLY, allowNull: true, defaultValue: '2019-06-30' },
        tel: { type: Sequelize.STRING(20), allowNull: true, defaultValue: '510-64587637' },
        email: { type: Sequelize.STRING(40), allowNull: true, defaultValue: 'fabric@dlut.my.com' },
        address: { type: Sequelize.STRING(50), allowNull: true, defaultValue: '321,TuQiang Street,JinZhou,DaLian' },
        break_date: { type: Sequelize.DATEONLY, allowNull: true, defaultValue: '2019-06-30' },
    },
    {
        sequelize,
        modelName: 'accessor'
    }
);
sequelize.sync({ force: true }).then(() => {
    UserA
        .bulkCreate([
            {
                "id": "user1",
                "name": "XiXiA_O Co. one",
                "password": "password1",
                "enroll_date": "2018-05-01",
                "tel": "100-73947391",
                "email": "XiXiA_O@users.com",
                "address": "143-1, LAST Street, DREAMing Block",
                "account": "1100000",
                "rankInfo": "1"
            },
            {
                "id": "user2",
                "name": "YOUR_O Co. two",
                "password": "password2",
                "enroll_date": "2018-05-02",
                "tel": "100-73923452",
                "email": "YOUR_O@users.com",
                "address": "143-2, LAST Street, DREAMing Block",
                "account": "2100000",
                "rankInfo": "2"
            },
            {
                "id": "user3",
                "name": "PIZZA_O LT thr",
                "password": "password3",
                "enroll_date": "2018-05-03",
                "tel": "100-93945793",
                "email": "PIZZA_O@users.com",
                "address": "143-3, LAST Street, DREAMing Block",
                "account": "3100000",
                "rankInfo": "3"
            },
            {
                "id": "user4",
                "name": "PePa_O fou",
                "password": "password4",
                "enroll_date": "2018-05-04",
                "tel": "100-73947384",
                "email": "PearPa_O@users.com",
                "address": "143-4, LAST Street, DREAMing Block",
                "account": "4100000",
                "rankInfo": "4"
            }
        ])
        .then(useras => {
            // console.log(user);
        });

    UserB
        .bulkCreate([
            {
                "id": "user5",
                "name": "Jaga_T fiv",
                "password": "password5",
                "enroll_date": "2018-05-05",
                "tel": "200-34647395",
                "email": "Jaga_T@users.com",
                "address": "243-5, LAST Street, DREAMing Block",
                "account": "5200000",
                "rankInfo": "5"
            },
            {
                "id": "user6",
                "name": "SISA_T six",
                "password": "password6",
                "enroll_date": "2018-05-06",
                "tel": "230-12452396",
                "email": "SISAMine_T@users.com",
                "address": "243-6, LAST Street, DREAMing Block",
                "account": "6200000",
                "rankInfo": "6"
            },
            {
                "id": "user7",
                "name": "COR_T Co. sev",
                "password": "password7",
                "enroll_date": "2018-05-07",
                "tel": "200-34473097",
                "email": "COR_T@users.com",
                "address": "243-7, LAST Street, DREAMing Block",
                "account": "7200000",
                "rankInfo": "7"
            },
            {
                "id": "user8",
                "name": "PASS_T Co. eig",
                "password": "password8",
                "enroll_date": "2018-05-08",
                "tel": "200-73947398",
                "email": "PASS_T@users.com",
                "address": "243-8, LAST Street, DREAMing Block",
                "account": "8200000",
                "rankInfo": "8"
            }
        ])
        .then(userbs => {
            // console.log(user);
        });

    Ranker
        .bulkCreate([
            {
                "id": "PA",
                "name": "HONEST Bank Group Pone",
                "password": "ranker1",
                "enroll_date": "2018-05-01",
                "tel": "222-83292731",
                "email": "HONEST@ranker.com",
                "address": "222-1, Fist Street, OBEY Block",
                "break_date": "2019-05-01"
            },
            {
                "id": "PB",
                "name": "FIGHTing Group PT",
                "password": "ranker2",
                "enroll_date": "2018-05-02",
                "tel": "222-83292732",
                "email": "FIGHTing@ranker.com",
                "address": "222-2, Fist Street, OBEY Block",
                "break_date": "2019-05-02"
            },
            {
                "id": "PC",
                "name": "MyPapers Organization Pthr",
                "password": "ranker3",
                "enroll_date": "2018-05-03",
                "tel": "222-83292733",
                "email": "MyPapers@ranker.com",
                "address": "222-3, Fist Street, OBEY Block",
                "break_date": "2019-05-03"
            }
        ])
        .then(rankers => {
            // console.log(user);
        });

    Accessor
        .bulkCreate([
            {
                "id": "ZA",
                "name": "Marketing Co. Zone",
                "password": "password1",
                "enroll_date": "2018-05-01",
                "tel": "222-83292731",
                "email": "Marketing@accessor.com",
                "address": "222-1, Certer Avenue, NET Block",
                "break_date": "2019-05-01"
            },
            {
                "id": "ZB",
                "name": "Commerial Organization ZT",
                "password": "password2",
                "enroll_date": "2018-05-02",
                "tel": "222-83292732",
                "email": "Commerial@accessor.com",
                "address": "222-2, Certer Avenue, NET Block",
                "break_date": "2019-05-02"
            }
        ])
        .then(accessor => {
            // console.log(user);
        });
});
// User.findAll({
//     where: {
//         id: 'user_test'
//     }
// }).then(users => {
//     console.log(users[0].address);
// })