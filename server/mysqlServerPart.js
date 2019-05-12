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

module.exports={
    sequelize,
    UserA,
    UserB,
    Ranker,
    Accessor
}