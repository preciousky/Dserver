var http = require('http');
var fabricQuery = require('./queryPart');
var fabricInvoke = require('./invokePart');
var { UserA, UserB, Ranker, Accessor } = require('./mysqlServerPart');
var server = http.createServer(function (req, res) {
    var URL = req.url;
    console.log('\n\n\n');
    console.log('## START ##' + URL);
    console.log('=================================================================');
    // 定义了一个post变量，用于暂存请求体的信息
    var post = "";

    // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    req.on('data', function (chunk) {
        post += chunk;
    });

    // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    req.on('end', function () {
        console.log('....接收数据完成,接受到的数据为：');
        console.log(post);
        console.log('');
        var responseData_json;
        var receiveData_json = JSON.parse(post);
        if (URL == '/login') {
            console.log('=================================================================');
            console.log('====== ' + URL + ' 开始处理数据');
            console.log('=================================================================');
            // {"role":"1","accessorId":"1","username":"1","password":"1"}
            var { role, accessorId, username, password } = receiveData_json;
            var responseData_json_login_fail = { "code": "2", "roleCode": "", "userId": "" };
            console.log('accessorId' + accessorId);
            //数据准备并装载json
            if (role == "1") {
                (accessorId == 'ZA' ? UserA : UserB)
                    .findAll({ where: { id: username } })
                    .then(users => {
                        if (users.length != 0 && users[0].password == password) {
                            responseData_json = {
                                "code": "1",
                                "roleCode": "1",
                                "userId": `${(accessorId == 'ZA' ? 'ZA' : 'ZB')}_${username}`
                            }
                        }
                        else {
                            responseData_json = responseData_json_login_fail;
                        }
                        httpRes(JSON.stringify(responseData_json));
                    })
            }
            else if (role == "2") {
                Ranker
                    .findAll({ where: { id: username } })
                    .then(rankers => {
                        if (rankers[0].password == password) {
                            responseData_json = {
                                "code": "1",
                                "roleCode": "2",
                                "userId": username
                            }
                        }
                        else {
                            responseData_json = responseData_json_login_fail;
                        }
                        httpRes(JSON.stringify(responseData_json));
                    })
            }
            else if (role == "3") {
                Accessor
                    .findAll({ where: { id: username } })
                    .then(accessors => {
                        if (accessors[0].password == 'XXXXXX') {
                            responseData_json = {
                                "code": "1",
                                "roleCode": "3",
                                "userId": username
                            }
                        }
                        else {
                            responseData_json = responseData_json_login_fail;
                        }
                        httpRes(JSON.stringify(responseData_json));
                    })
            }
            else if (role == "4") {
                responseData_json = {
                    "code": "1",
                    "roleCode": "4",
                    "userId": "ROOT"
                }
                httpRes(JSON.stringify(responseData_json));
            }
        }
        /**
         * TODO 这里还没有加上票据总价值的返回值
         */
        else if (URL == '/user/getMyInfo') {
            console.log('=================================================================');
            console.log('======' + URL + '开始处理数据');
            console.log('=================================================================');
            var { userId } = receiveData_json;
            var accessorId_userId = userId.toString().split("_");
            if (accessorId_userId[0] == "ZA") {
                UserA
                    .findAll({ where: { id: accessorId_userId[1] } })
                    .then(users => {
                        if (users.length != 0) {
                            // console.log(users[0]['dataValues']);
                            httpRes(JSON.stringify(users[0]['dataValues']));
                        }
                        else {
                            httpRes('{"code": "2"}');
                        }
                    })
            }
            else {
                UserB
                    .findAll({ where: { id: accessorId_userId[1] } })
                    .then(users => {
                        if (users.length != 0) {
                            httpRes(JSON.stringify(users[0]['dataValues']));
                        }
                        else {
                            httpRes('{"code": "2"}');
                        }
                    })
            }
        }
        else if (URL == '/user/myBusiness/getUserPapersById') {
            console.log('=================================================================');
            console.log('======' + URL + '开始处理数据');
            console.log('=================================================================');
            var { userId } = receiveData_json;

            // fabricQuery('queryPaper', [userId])
            fabricQuery('queryPapersByHolderId', [userId])
                .then((fabricRes) => {
                    console.log('\n');
                    if (fabricRes == '') {
                        console.log("PAYLOAD is NULL\nNo payloads were returned from FABRIC query");
                        httpRes_NoAvailableData('No payloads were returned from FABRIC query');
                    }
                    else {
                        console.log('FabricRes{' + typeof (fabricRes) + '}:\n' + fabricRes);
                        var fabricRes_json = JSON.parse(fabricRes);
                        var arr = [];
                        for (var i = 0; i < fabricRes_json.length; i++) {
                            arr.push(fabricRes_json[i]['Record']);
                        }
                        responseData_json = {
                            "cards": arr
                        }
                        httpRes(JSON.stringify(responseData_json));
                    }
                })
                .catch((err) => {
                    console.error("Hyperledger Fabric Query results can not return.");
                    console.log(err);
                    httpRes('Server FABRIC QueryPart error!');
                });
        }
        else if (URL == "/user/myBusiness/releaseRank") {
            console.log('=================================================================');
            console.log('====== ' + URL + ' 开始处理数据');
            console.log('=================================================================');
            var { paperId, rankerId, cashData } = receiveData_json;
            Ranker
                .findAll({ where: { id: rankerId } })
                .then(rankers => {
                    if (rankers.length == 0) {
                        httpRes_NoAvailableData('Ranker with ' + rankerId + ' is not found')
                    }
                    rankerName = rankers[0].name;
                    fabricInvoke("releaseRank", [paperId, rankerId, rankerName, cashData.toString()])
                        .then((fabricRes) => {
                            responseData_json = {
                                "code": (fabricRes == 'SUCCESS' ? "1" : "2")
                            }
                            httpRes(JSON.stringify(responseData_json));
                        })
                })
        }
        else if (URL == "/supervisor/getPaperLogsById") {
            console.log('=================================================================');
            console.log('====== ' + URL + ' 开始处理数据');
            console.log('=================================================================');
            var { paperId } = receiveData_json;
            fabricQuery('getPaperLogsById', [paperId])
                .then((fabricRes) => {
                    console.log('\n');
                    if (fabricRes == '') {
                        console.log("PAYLOAD is NULL\nNo payloads were returned from FABRIC query");
                        httpRes_NoAvailableData('No payloads were returned from FABRIC query');
                    }
                    else {
                        console.log('FabricRes{' + typeof (fabricRes) + '}:\n' + fabricRes);
                        var fabricRes_json = JSON.parse(fabricRes);
                        var arr = [];
                        for (var i = 0; i < fabricRes_json.length; i++) {
                            singleLog_json = fabricRes_json[i]['Value'];
                            singleLog_json['stateTime'] = fabricRes_json[i]['Timestamp'];
                            arr.push(singleLog_json);
                        }
                        responseData_json = {
                            "paperName": fabricRes_json[0]['Value']['paperName'],
                            "paperId": fabricRes_json[0]['Value']['paperId'],
                            "value": fabricRes_json[0]['Value']['value'],
                            "rankInfo": fabricRes_json[0]['Value']['rankInfo'],
                            "rankerName": fabricRes_json[0]['Value']['rankerName'],
                            "rankDate": fabricRes_json[0]['Value']['rankDate'],
                            "dDate": fabricRes_json[0]['Value']['dDate'],
                            "mDate": fabricRes_json[0]['Value']['mDate'],
                            "drawerName": fabricRes_json[0]['Value']['drawerName'],
                            "payerName": fabricRes_json[0]['Value']['payerName'],
                            "payeeName": fabricRes_json[0]['Value']['payeeName'],
                            "drawerId": fabricRes_json[0]['Value']['drawerId'],
                            "payerId": fabricRes_json[0]['Value']['payerId'],
                            "payeeId": fabricRes_json[0]['Value']['payeeId'],
                            "logs": arr
                        }
                        httpRes(JSON.stringify(responseData_json));
                    }
                })
                .catch((err) => {
                    console.error("Hyperledger Fabric Query results can not return.");
                    console.log(err);
                    httpRes('Server FABRIC QueryPart error!');
                });
        }
        else if (URL == "/XXX" && false) {
            console.log('=================================================================');
            console.log('====== ' + URL + ' 开始处理数据');
            console.log('=================================================================');
            var { paperId, rankerId, cashData } = receiveData_json;

            //TODO 服务端数据准备并装载json

            responseData_json = {
                "": "",
                "": "",
                "": "",
                "": ""
            }
            httpRes(JSON.stringify(responseData_json));
        }

        // else if (URL = '/init') {
        //     fabricInvoke('initLedger', [])
        //         .then((fabricRes) => {
        //             if (fabricRes == 'SUCCESS') {
        //                 httpRes(JSON.stringify("{\"code\":\"1\"}"));
        //             }
        //             else {
        //                 httpRes(JSON.stringify("{\"code\":\"2\"}"));
        //             }

        //         })
        // }


        /**
         * 
         * @param {string} responseData_string 
         */
        function httpRes(responseData_string) {
            console.log('');
            console.log('=================================================================');
            console.log('======服务端数据处理结束，开始组装包，准备返回');
            console.log('=================================================================');
            console.log('....开始组装包头');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
            res.setHeader('Access-Control-Max-Age', '3600');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE,x-requested-with,Authorization');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.writeHead(200, { 'Content-Type': 'application/json;charset=UTF-8' });
            console.log('....开始装载数据');
            console.log('....json字符串即将返回：')
            console.log(responseData_string);
            console.log('');
            res.end(responseData_string);
            console.log('....正在返回')
            console.log('##################################################################################');
            console.log("############FINISH######FINISH#####FINISH######FINISH######FINISH#################");
            console.log('##################################################################################');
            console.log('');
        }
        function httpRes_NoAvailableData(responseData_string) {
            console.log('');
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            console.log('!!!!!!!!!!!  服务端数据出错，开始组装包，准备报告错误');
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            console.log('....开始组装包头');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
            res.setHeader('Access-Control-Max-Age', '3600');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE,x-requested-with,Authorization');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.writeHead(200, { 'Content-Type': 'application/json;charset=UTF-8' });
            responseData_json = {
                "error": "Server can not get available!",
                "Info": responseData_string
            }
            console.log('....开始装载数据');
            console.log('....json字符串即将返回：')
            console.log(JSON.stringify(responseData_json));
            console.log('');
            res.end(JSON.stringify(responseData_json));
            console.log('....正在返回')
            console.log('##################################################################################');
            console.log("############FINISH######FINISH#####FINISH######FINISH######FINISH#################");
            console.log('##################################################################################');
            console.log('');
        }

    });
});

server.listen(8080, function () {
    console.log('listening on localhost:8080');
});