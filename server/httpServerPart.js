var http = require('http');

var server = http.createServer(function (req, res) {
    var URL = req.url;
    console.log('=================================================================');
    console.log('######'+URL+' START');
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
        // var receiveData_json = {
        //     userId: 'userIdMock',
        //     userName: 'userNameMocl'
        // }

        if (URL == '/user/getMyInfo') {
            console.log('=================================================================');
            console.log('======'+URL+'开始处理数据');
            console.log('=================================================================');
            var userId = receiveData_json.userId;
            console.log(userId);
            var userName = receiveData_json.userName;
            console.log(userName);

            responseData_json = {
                "name": "pass",
                "id": "userId",
                "logup_date": "9999-99-99",
                "total_value": "99999",
                "rank": "1",
                "account": "00000",
                "tel": "010-12345678",
                "email": "my@test.com",
                "address": "the TWO Street"
            }
        }
        else if (URL == '/login') {
            console.log('=================================================================');
            console.log('====== '+URL+' 开始处理数据');
            console.log('=================================================================');
            var password = receiveData_json.password;
            var username = receiveData_json.username;
            console.log('username: '+username);
            console.log('password: '+password);
            
            //数据准备并装载json
            if (username=="user") {
                responseData_json = {
                    "code": "1",
                    "roleCode": "1",
                    "userId": "NodeJsId"
                }
            }
            else if (username=="ranker") {
                responseData_json = {
                    "code": "1",
                    "roleCode": "2",
                    "userId": "NodeJsId"
                }
            }
            else if (username=="accessor") {
                responseData_json = {
                    "code": "1",
                    "roleCode": "3",
                    "userId": "NodeJsId"
                }
            }
            else if (username=="supervior") {
                responseData_json = {
                    "code": "1",
                    "roleCode": "4",
                    "userId": "NodeJsId"
                }
            }

        }
        else if (URL == "/XXX" && false) {
            console.log('=================================================================');
            console.log('====== '+URL+' 开始处理数据');
            console.log('=================================================================');
            var para1 = receiveData_json.userId;
            var para2 = receiveData_json.userName;

            //TODO 服务端数据准备并装载json

            responseData_json = {
                "": "",
                "": "",
                "": "",
                "": ""
            }
        }


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
        console.log('....开始装载json数据');
        console.log('....json为：');
        console.log(responseData_json);
        console.log('');
        var str = JSON.stringify(responseData_json);
        console.log('....json字符串即将返回：')
        console.log(str);
        console.log('');
        res.end(str);
        console.log('....正在返回')
        console.log('##################################################################################');
        console.log("############FINISH######FINISH#####FINISH######FINISH######FINISH#################");
        console.log('##################################################################################');
        console.log('');
    });
});

server.listen(8080, function () {
    console.log('listening on localhost:8080');
});